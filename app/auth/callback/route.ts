import {
  OAUTH_COOKIE_STATE,
  WIX_LOGIN_REDIRECT,
  WIX_REFRESH_TOKEN,
} from '@app/model/auth/auth.const';
import { getServerWixClient } from '@app/model/auth/wix-client.server';
import { getRequestUrl } from '@app/model/server-utils';
import { OauthData } from '@wix/sdk';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const wixClient = getServerWixClient({
    cookieStore: request.cookies,
  });
  const requestCookies = cookies();
  const oauthData: OauthData = JSON.parse(
    requestCookies.get(OAUTH_COOKIE_STATE)?.value ?? '{}'
  );
  const requestUrl = getRequestUrl(request);
  const originalUrl =
    // use home by default
    oauthData.originalUri || new URL('/', requestUrl).toString();

  if (requestUrl.includes('error=')) {
    return NextResponse.redirect(originalUrl);
  }

  const { state, code } = wixClient!.auth.parseFromUrl(requestUrl, 'query');

  const memberTokens = await wixClient!.auth.getMemberTokens(
    code,
    state,
    oauthData
  );

  const response = NextResponse.redirect(originalUrl);

  response.cookies.delete(OAUTH_COOKIE_STATE);
  response.cookies.delete(WIX_LOGIN_REDIRECT);
  response.cookies.set({
    name: WIX_REFRESH_TOKEN,
    value: JSON.stringify(memberTokens.refreshToken),
    maxAge: 60 * 60 * 24 * 2, // 2 days
  });

  return response;
}
