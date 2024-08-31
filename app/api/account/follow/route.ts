import { NextRequest, NextResponse } from "next/server";
import { AxiosResponse } from "axios";
import getFetchClient from "@/utils";

export async function POST(req: NextRequest) {
  const fetchClient = getFetchClient();
  const token = req.cookies.get("f-token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const userId = url.searchParams.get("userId") || "";

  const { data } = (await fetchClient.post(
    `/accounts/follow/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )) as AxiosResponse<Response>;

  return NextResponse.json(data, { status: data.code });
}
