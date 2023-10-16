import { WixSession } from '@app/model/auth/auth';
import { members } from '@wix/members';

export const getCurrentMember = (wixSession: WixSession) =>
  wixSession.wixClient!.members.getCurrentMember({
    fieldSet: members.Set.FULL,
  });
