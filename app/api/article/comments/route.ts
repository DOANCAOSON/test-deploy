import getFetchClient from "@/utils";
import { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface Responsive extends Response {
  data: Article;
}

export async function GET(req: NextRequest) {
  const fetchClient = getFetchClient();

  const url = new URL(req.url);
  const articleId = url.searchParams.get("articleId") || "";
  const apiEndpoint = `/articles/${articleId}/comments`;

  const { data } = (await fetchClient.get(
    apiEndpoint
  )) as AxiosResponse<Responsive>;

  return NextResponse.json(data, { status: data.code });
}

interface CommentRequestBody {
  articleId: string;
  comment: string;
  parentCommentId: string;
}

export async function POST(req: NextRequest) {
  const fetchClient = getFetchClient();

  const token = req.cookies.get("f-token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const articleId = url.searchParams.get("articleId") || "";
  const apiEndpoint = `/articles/${articleId}/comments`;

  const body: CommentRequestBody = await req.json();
  const res = (await fetchClient.post(apiEndpoint, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })) as AxiosResponse<Response>;

  return NextResponse.json(res.data, { status: res.data.code });
}
