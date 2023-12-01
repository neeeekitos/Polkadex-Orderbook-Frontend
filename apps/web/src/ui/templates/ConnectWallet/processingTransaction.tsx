import { ElementType, useEffect } from "react";
import { getExtensionIcon } from "@polkadot-cloud/assets/extensions";
import { Interaction, Spinner, Typography } from "@polkadex/ux";

export const ProcessingTransaction = ({
  logo,
  onRedirect,
  shouldRedirect,
}: {
  logo: string;
  onRedirect: () => void;
  shouldRedirect: boolean;
}) => {
  const IconComponent = getExtensionIcon(logo) as ElementType;

  useEffect(() => {
    if (shouldRedirect) onRedirect();
  }, [onRedirect, shouldRedirect]);

  return (
    <Interaction className="gap-10 min-h-[30rem] h-full justify-center">
      <Interaction.Content className="flex flex-col gap-5 items-center text-center">
        <div className="h-20 w-20 bg-level-2 rounded-full p-3 relative shadow-baseShadow">
          <IconComponent />
          <div className="absolute w-full h-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Spinner.Loading />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Typography.Text bold size="xl">
            Processing transaction
          </Typography.Text>
          <Typography.Text variant="primary">
            Please wait, your transaction is being processed securely on the
            blockchain
          </Typography.Text>
        </div>
      </Interaction.Content>
    </Interaction>
  );
};
