import { getWixClient } from '@app/model/auth/wix-client.base';
import Cookies from 'js-cookie';

export const getBrowserWixClient = () => getWixClient({ cookieStore: Cookies });
