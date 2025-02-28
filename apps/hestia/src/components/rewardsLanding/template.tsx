"use client";

import { useResizeObserver } from "usehooks-ts";
import { Fragment, useMemo, useRef } from "react";
import { useWindowSize } from "react-use";

import { QuickStart } from "../ui/Footer/QuickStart";

import { Info } from "./info";
import { HowItWorks } from "./howItWorks";
import { Faq } from "./faq";
import { CallToAction } from "./callToAction";

import { Footer, Header } from "@/components/ui";
import { useTour } from "@/hooks";

export function Template() {
  const { width } = useWindowSize();

  const footerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const { onOpenChange, open, onClose } = useTour();

  const { height: footerHeight = 0 } = useResizeObserver({
    ref: footerRef,
    box: "border-box",
  });
  const mobileView = useMemo(() => width <= 750, [width]);

  return (
    <Fragment>
      <QuickStart open={open} onOpenChange={onClose} />
      <div
        className="flex flex-1 flex-col bg-backgroundBase h-full"
        vaul-drawer-wrapper=""
      >
        <Header ref={headerRef} />
        <main
          className="flex flex-col flex-1 overflow-auto w-full max-w-[1100px] m-auto"
          style={{
            paddingBottom: `${footerHeight}px`,
          }}
        >
          <Info />
          <HowItWorks />
          <Faq />
          <CallToAction />
        </main>
        {!mobileView && (
          <Footer onOpenChange={onOpenChange} marketsActive ref={footerRef} />
        )}
      </div>
    </Fragment>
  );
}
