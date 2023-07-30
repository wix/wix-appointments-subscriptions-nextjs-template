import { NextRequest, NextResponse } from 'next/server';
import {
  AUTH_CALLBACK_PATHNAME,
  AUTH_LOGIN_CALLBACK_PARAM,
  OAUTH_COOKIE_STATE,
  PROMPT_QUERY_PARAM,
} from '@app/model/auth/auth.const';
import { getServerWixClient } from '@app/model/auth/wix-client.server';
import { getRequestUrl } from '@app/model/server-utils';

export const fetchCache = 'force-no-store';
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const wixClient = getServerWixClient({
    cookieStore: request.cookies,
  });
  const requestUrl = getRequestUrl(request);
  const { searchParams } = new URL(requestUrl);
  const originalUrl = searchParams.get(AUTH_LOGIN_CALLBACK_PARAM);
  const prompt =
    (searchParams.get(PROMPT_QUERY_PARAM) as 'login' | 'none') ?? 'login';
  if (!originalUrl) {
    throw new Error(
      `${AUTH_LOGIN_CALLBACK_PARAM} is required for login redirect`
    );
  }
  const redirectUrl = new URL(AUTH_CALLBACK_PATHNAME, requestUrl).toString();
  const oauthData = wixClient!.auth.generateOAuthData(redirectUrl, originalUrl);
  const { authUrl } = await wixClient!.auth.getAuthUrl(oauthData, {
    prompt,
    responseMode: 'query',
  });
  const response = NextResponse.redirect(authUrl);
  response.cookies.set({
    name: OAUTH_COOKIE_STATE,
    value: JSON.stringify(oauthData),
    maxAge: 1800, // 30 minutes
  });
  return response;
}
