import { PROJECT_TITLE } from "~/lib/constants";

export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL || `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;

  const config = {
    accountAssociation: {
      message: {
        domain: "yobuttonframe.vercel.app",
        timestamp: 1738322852,
        expirationTime: 1746098852
      },
      signature: "891e88e223be28ffdb5a4970ed41de2533b5d8c724d4ff27e5d8d2aa1a114efb34cd976dd71f6963b38a6770ca0d731ae1e7c56f1451f3ccc62106ccbc5be8a01c",
      signingKey: "046ee6b15451a39e9fd4d3b98cc80decfb0f17dda90ac8a07ef4064449a5a443"
    },
    frame: {
      version: "1",
      name: PROJECT_TITLE,
      iconUrl: `${appUrl}/icon.png`,
      homeUrl: appUrl,
      imageUrl: `${appUrl}/frames/hello/opengraph-image`,
      buttonTitle: "Launch Frame",
      splashImageUrl: `${appUrl}/splash.png`,
      splashBackgroundColor: "#f7f7f7",
      webhookUrl: `${appUrl}/api/webhook`,
    },
  };

  return Response.json(config);
}
