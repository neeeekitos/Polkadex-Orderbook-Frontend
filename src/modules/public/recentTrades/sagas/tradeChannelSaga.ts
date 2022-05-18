import { call, put, select, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { u8aToString } from "@polkadot/util";
import cryptoRandomString from "crypto-random-string";

import { alertPush, klineUpdateFetch, recentTradesData, selectRecentTrades } from "../../..";

import {
  RabbitmqChannelType,
  selectRabbitmqChannel,
} from "@polkadex/orderbook/modules/public/rabbitmqChannel";
import { DEFAULT_RANDOM_STRING_LENGTH } from "@polkadex/web-constants";

export function* fetchTradeChannelSaga() {
  try {
    const rabbitmqConn = yield select(selectRabbitmqChannel);
    // random prefix to queue name to avoid collisions
    const queueName =
      cryptoRandomString({ length: DEFAULT_RANDOM_STRING_LENGTH }) + "-trade-events";
    if (rabbitmqConn) {
      const channel = yield call(() =>
        fetchTradesChannel(rabbitmqConn, queueName, "*.*.trade-events")
      );
      while (true) {
        const tradesMsg = yield take(channel);
        console.log("tradesMsg =>", tradesMsg);
        // eg:  {"market_id":"PDEX/1","price":"3","amount":"5","order_side":"Bid"}
        const trades = yield select(selectRecentTrades);
        const data = JSON.parse(tradesMsg);
        const tradesArray = [data, ...trades];
        yield put(recentTradesData(tradesArray));
        yield put(klineUpdateFetch(data));
      }
    }
  } catch (error) {
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong (trades fetch)..",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}

async function fetchTradesChannel(
  chann: RabbitmqChannelType,
  queueName: string,
  routingKey: string
) {
  console.log("creating trade queue", queueName, routingKey);
  const queue = await chann.queue(queueName, { durable: false, autoDelete: true });
  await queue.bind("topic_exchange", routingKey);
  queue.purge();
  return eventChannel((emitter) => {
    const amqpConsumer = queue.subscribe({ noAck: false, exclusive: true }, (res) => {
      const msg = u8aToString(res.body);
      emitter(msg);
      res.ack();
    });
    return () => {
      amqpConsumer.then((consumer) => consumer.cancel());
    };
  });
}
