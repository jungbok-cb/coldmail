import { baseSepolia } from 'viem/chains';
import { generateContractHook } from '@/hooks/contracts';
import BuyMeACoffeeABI from './BuyMeACoffeeABI';

/**
 * Returns contract data for the BuyMeACoffee contract.
 */
export const useColdmailContract = generateContractHook({
  abi: BuyMeACoffeeABI,
  [baseSepolia.id]: {
    chain: baseSepolia,
    address: '0x776a54E730F9bFBB45d29c7ae3712f8Eb52eAF15',
  },

  // ... more chains for this contract go here
});
