import getFetchClient from "@/utils";
import { AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface Responsive extends Response {
  data: Article;
}

interface ArticleRequestBody {
  slug: string;
}

export async function POST(req: NextRequest) {
  const fetchClient = getFetchClient();

  const apiEndpoint = `/articles/detail`;
  const body: ArticleRequestBody = await req.json();
  const { data } = (await fetchClient.post(
    apiEndpoint,
    body
  )) as AxiosResponse<Responsive>;
  
  return NextResponse.json(data, { status: data.code });
}
