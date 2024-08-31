import getFetchClient from "@/utils";
import { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface Responsive extends Response {
  data: Match[];
}

export async function GET() {
  const fetchClient = getFetchClient();

  const apiEndpoint = `/articles?pageIndex=0&pageSize=4`;

  const { data } = (await fetchClient.get(apiEndpoint)) as AxiosResponse<Responsive>;

  return NextResponse.json(data, { status: data.code });
}

export async function POST(req: NextRequest) {
  const fetchClient = getFetchClient();

  const apiEndpoint = `/articles`;

  const token = req.cookies.get("f-token")?.value;
  const body = await req.json();

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { data } = (await fetchClient.post(apiEndpoint, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })) as AxiosResponse<Responsive>;

  return NextResponse.json(data, { status: data.code });
}
