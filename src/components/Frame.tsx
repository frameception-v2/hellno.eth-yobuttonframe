"use client";

import { useEffect, useCallback, useState } from "react";
import sdk, {
  AddFrame,
  type Context,
} from "@farcaster/frame-sdk";
import { useAccount, useContractWrite, useWalletClient } from "wagmi";
import { Card, CardContent } from "~/components/ui/card";
import { PurpleButton } from "~/components/ui/PurpleButton";
import { 
  PROJECT_TITLE, 
  YO_CONTRACT_ADDRESS, 
  YO_CONTRACT_ABI,
  RECIPIENT_ADDRESS,
  RECIPIENT_ENS
} from "~/lib/constants";

function YoButton() {
  const { address } = useAccount();
  const { writeContract, isPending, isSuccess, isError } = useContractWrite();

  const handleYo = async () => {
    try {
      await writeContract({
        address: YO_CONTRACT_ADDRESS,
        abi: YO_CONTRACT_ABI,
        functionName: 'yo',
        args: [RECIPIENT_ADDRESS, '0x' as `0x${string}`]
      });
    } catch (error) {
      console.error('Error sending YO:', error);
    }
  };

  return (
    <Card className="border-neutral-200 bg-white">
      <CardContent className="p-4">
        <PurpleButton 
          className="w-full h-16 text-xl font-bold"
          onClick={handleYo}
          isLoading={isPending}
          disabled={isLoading || isSuccess}
        >
          {isPending ? 'Sending YO...' : 
           isSuccess ? 'YO Sent!' :
           isError ? 'Error Sending YO' : 
           'Send YO!'}
        </PurpleButton>
      </CardContent>
    </Card>
  );
}

export default function Frame(
  { title }: { title?: string } = { title: PROJECT_TITLE }
) {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<Context.FrameContext>();

  const [added, setAdded] = useState(false);

  const [addFrameResult, setAddFrameResult] = useState("");

  const addFrame = useCallback(async () => {
    try {
      await sdk.actions.addFrame();
    } catch (error) {
      if (error instanceof AddFrame.RejectedByUser) {
        setAddFrameResult(`Not added: ${error.message}`);
      }

      if (error instanceof AddFrame.InvalidDomainManifest) {
        setAddFrameResult(`Not added: ${error.message}`);
      }

      setAddFrameResult(`Error: ${error}`);
    }
  }, []);

  useEffect(() => {
    const load = async () => {
      const context = await sdk.context;
      if (!context) {
        return;
      }

      setContext(context);
      setAdded(context.client.added);

      // If frame isn't already added, prompt user to add it
      if (!context.client.added) {
        addFrame();
      }

      sdk.on("frameAdded", ({ notificationDetails }) => {
        setAdded(true);
      });

      sdk.on("frameAddRejected", ({ reason }) => {
        console.log("frameAddRejected", reason);
      });

      sdk.on("frameRemoved", () => {
        console.log("frameRemoved");
        setAdded(false);
      });

      sdk.on("notificationsEnabled", ({ notificationDetails }) => {
        console.log("notificationsEnabled", notificationDetails);
      });
      sdk.on("notificationsDisabled", () => {
        console.log("notificationsDisabled");
      });

      sdk.on("primaryButtonClicked", () => {
        console.log("primaryButtonClicked");
      });

      console.log("Calling ready");
      sdk.actions.ready({});

      // Set up a MIPD Store, and request Providers.
      const store = createStore();

      // Subscribe to the MIPD Store.
      store.subscribe((providerDetails) => {
        console.log("PROVIDER DETAILS", providerDetails);
        // => [EIP6963ProviderDetail, EIP6963ProviderDetail, ...]
      });
    };
    if (sdk && !isSDKLoaded) {
      console.log("Calling load");
      setIsSDKLoaded(true);
      load();
      return () => {
        sdk.removeAllListeners();
      };
    }
  }, [isSDKLoaded, addFrame]);

  if (!isSDKLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div
      style={{
        paddingTop: context?.client.safeAreaInsets?.top ?? 0,
        paddingBottom: context?.client.safeAreaInsets?.bottom ?? 0,
        paddingLeft: context?.client.safeAreaInsets?.left ?? 0,
        paddingRight: context?.client.safeAreaInsets?.right ?? 0,
      }}
    >
      <div className="w-[300px] mx-auto py-2 px-2">
        <h1 className="text-2xl font-bold text-center mb-4 text-neutral-900">{title}</h1>
        <div className="space-y-4">
          <p className="text-sm text-center text-neutral-600">
            Send YO to {RECIPIENT_ENS}
          </p>
          <YoButton />
          {address && (
            <p className="text-xs text-center text-neutral-500">
              Sending from: {address}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
