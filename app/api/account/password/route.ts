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

  const token = req.cookies.get("f-token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body: SignInRequestBody = await req.json();
  const res = (await fetchClient.patch("/accounts/reset-password", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })) as AxiosResponse<Response>;

  return NextResponse.json(res.data, { status: res.data.code });
}
