import getFetchClient from "@/utils";
import { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface SignInRequestBody {
  username: string;
  password: string;
}

export async function POST(req: NextRequest) {
  const fetchClient = getFetchClient();

  const body: SignInRequestBody = await req.json();
  const res = (await fetchClient.post(
    "/auth/login",
    body
  )) as AxiosResponse<Response>;

  return NextResponse.json(res.data, { status: res.data.code });
}
