import getFetchClient from "@/utils";
import { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface RegisterRequestBody {
  email: string;
  password: string;
  fullname: string;
  username: string;
  phoneCode: string;
  phoneNumber: string;
}

export async function POST(req: NextRequest) {
  const fetchClient = getFetchClient();

  const body: RegisterRequestBody = await req.json();
  const res = (await fetchClient.post(
    "/accounts/register",
    body
  )) as AxiosResponse<Response>;

  return NextResponse.json(res.data, { status: res.data.code });
}
