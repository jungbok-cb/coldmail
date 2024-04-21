import type { Address } from 'viem';

export type InboxMail = {
  emailId: number;
  tipAmount: number;
  sender: Address;
  recipent: Address;
  message: string;
  time: bigint;
};
