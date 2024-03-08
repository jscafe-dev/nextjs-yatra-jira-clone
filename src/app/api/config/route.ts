import { get } from "@vercel/edge-config";
import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  try {
    const navData = await get("navData");

    return Response.json(
      {
        data: {
          navData,
        },
      },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return Response.json(
      { error: { message: "Something went wrong!" } },
      { status: 500 }
    );
  }
}
