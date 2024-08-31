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
  const Time = url.searchParams.get("Time") || "2024-06-11T15:30:00Z";
  const TimeZone = url.searchParams.get("TimeZone") || "7";
  const apiEndpoint = `/sports/schedule/date?Time=${encodeURIComponent(
    Time
  )}&TimeZone=${encodeURIComponent(TimeZone)}`;

  const { data } = (await fetchClient.get(
    apiEndpoint
  )) as AxiosResponse<Responsive>;

  return NextResponse.json(data, { status: data.code });
}
