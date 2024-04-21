import { useMemo } from 'react';
import { useReadContract } from 'wagmi';
import { markStep } from '@/utils/analytics';
import { useColdmailContract } from '../_contracts/useBuyMeACoffeeContract';
import type { InboxMail } from '../_components/types';

function useOnchainCoffeeMemos() {
  const contract = useColdmailContract();
  const emailId = 5;  // This is hardcoded, ensure it dynamically matches your use case.

  console.log('Contract Status:', contract.status);
  console.log('Contract Address:', contract.address);

  // Logging the start of the operation
  markStep('useReadContract.refetchMemos - start');
  const contractReadResult = useReadContract({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi,
    functionName: 'emails',
    args: [emailId],  // Ensure args is always an array
    enabled: Boolean(contract?.status === 'ready' && emailId != null),
  });
  // Logging after attempting to read contract
  markStep('useReadContract.refetchMemos - after read');

  console.log('Read Contract Result:', contractReadResult);

  // Using useMemo to memoize the computed values
  return useMemo(() => {
    const memos = contractReadResult.status === 'success' ? (contractReadResult.data as InboxMail[]) : [];
    console.log('Memos:', memos);

    return {
      memos: memos,
      refetchMemos: contractReadResult.refetch,
    };
  }, [contractReadResult]);
}

export default useOnchainCoffeeMemos;
