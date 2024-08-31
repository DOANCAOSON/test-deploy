import getFetchClient from "@/utils";
import { AxiosResponse } from "axios";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface Responsive extends Response {
  data: Match[];
}

export async function GET() {
  const fetchClient = getFetchClient();

  const apiEndpoint = `/articles?PageIndex=0&PageSize=10`;

  const { data } = (await fetchClient.get(apiEndpoint)) as AxiosResponse<Responsive>;

  return NextResponse.json(data, { status: data.code });
}
