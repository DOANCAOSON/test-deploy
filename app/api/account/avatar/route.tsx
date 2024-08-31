import { NextRequest, NextResponse } from "next/server";
import { AxiosResponse } from "axios";
import getFetchClient from "@/utils";

export async function POST(req: NextRequest) {
  const fetchClient = getFetchClient();
  const token = req.cookies.get("f-token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const { data } = (await fetchClient.post(
    `/accounts/me/avatar`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
      },
    }
  )) as AxiosResponse<Response>;

  return NextResponse.json(data, { status: data.code });
}
