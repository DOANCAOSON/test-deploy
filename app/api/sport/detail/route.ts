import getFetchClient from "@/utils";
import { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface Responsive extends Response {
  data: Match[];
}

export async function GET(req: NextRequest) {
  const fetchClient = getFetchClient();
  const url = new URL(req.url);
  const matchId = url.searchParams.get("matchId");

  const apiEndpoint = `/sports/${matchId}/detail`;

  const { data } = (await fetchClient.get(
    apiEndpoint
  )) as AxiosResponse<Responsive>;

  return NextResponse.json(data, { status: data.code });
}
