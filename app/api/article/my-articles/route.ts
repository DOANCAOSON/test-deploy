import getFetchClient from "@/utils";
import { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface Responsive extends Response {
  data: AccountBody;
}

export async function GET(req: NextRequest) {
  const fetchClient = getFetchClient();
  const token = req.cookies.get("f-token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { data } = (await fetchClient.get("/articles/my-articles?PageIndex=0&PageSize=100", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })) as AxiosResponse<Responsive>;

  return NextResponse.json(data, { status: data.code });
}
