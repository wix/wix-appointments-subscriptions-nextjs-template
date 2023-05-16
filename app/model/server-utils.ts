import { NextRequest } from 'next/server';

export const getRequestUrl = (request: NextRequest) =>
  request.headers.get('x-middleware-request-url') || request.url;
