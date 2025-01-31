import { ImageResponse } from "next/og";
import { PROJECT_TITLE, PROJECT_DESCRIPTION } from "~/lib/constants";

export const alt = "yobuttonframe";
export const size = {
  width: 600,
  height: 400,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div tw="h-full w-full flex flex-col justify-center items-center relative bg-purple-100" style={{ display: "flex" }}>
        <div tw="bg-white rounded-lg p-8 shadow-lg" style={{ display: "flex", flexDirection: "column" }}>
          <h1 tw="text-6xl font-bold text-purple-600">{PROJECT_TITLE}</h1>
          <h3 tw="text-2xl mt-4 text-gray-600">{PROJECT_DESCRIPTION}</h3>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
