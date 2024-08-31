import getFetchClient from "@/utils";
import { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface Responsive extends Response {
  data: AccountBody;
}

export async function POST(req: NextRequest) {
  const fetchClient = getFetchClient();
  const token = req.cookies.get("f-token")?.value;

  const url = new URL(req.url);
  const userId = url.searchParams.get("userId") || "";

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { data } = (await fetchClient.post(
    `/accounts/unfollow/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )) as AxiosResponse<Responsive>;

  return NextResponse.json(data, { status: data.code });
}
