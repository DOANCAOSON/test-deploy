import getFetchClient from "@/utils";
import { AxiosResponse } from "axios";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface Responsive extends Response {
  data: Country[];
}

export async function GET() {
  const fetchClient = getFetchClient();

  const apiEndpoint = `/sports/countries`;

  const { data } = (await fetchClient.get(
    apiEndpoint
  )) as AxiosResponse<Responsive>;
  return NextResponse.json(data, { status: data.code });
}
