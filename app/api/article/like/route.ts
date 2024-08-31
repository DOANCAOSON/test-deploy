import { NextRequest, NextResponse } from "next/server";
import { AxiosResponse } from "axios";
import getFetchClient from "@/utils";

interface SignInRequestBody {
  articleId: string;
  commentId: string;
}

export async function POST(req: NextRequest) {
  const fetchClient = getFetchClient();
  const token = req.cookies.get("f-token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const articleId = url.searchParams.get("articleId") || "";
  const body: SignInRequestBody = await req.json();

  const { data } = (await fetchClient.post(
    `/articles/${articleId}/like`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )) as AxiosResponse<Response>;

  return NextResponse.json(data, { status: data.code || 400 });
}
