import { useCallback, useEffect, useMemo, useState } from 'react';
import { Abi, TransactionExecutionError } from 'viem';
import { useSimulateContract, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { UseContractReturn } from '@/hooks/contracts';
import { useLoggedInUserCanAfford } from '@/hooks/useUserCanAfford';

export enum TransactionStates {
  START,
  COMPLETE,
  OUT_OF_GAS,
}

export default function useSmartContractForms({
                                                gasFee,
                                                contract,
                                                name: functionName,
                                                arguments: args,
                                                enableSubmit: isValid,
                                                reset,
                                              }: {
  gasFee: bigint;
  contract: UseContractReturn<Abi>;
  name: string;
  arguments: (number | string)[];
  enableSubmit: boolean;
  reset: AsyncFunction<unknown[], unknown>;
}) {
  const [transactionState, setTransactionState] = useState<TransactionStates | null>(null);

  const canAfford = true
  console.log('Contract status:', contract.status, 'Can afford:',useLoggedInUserCanAfford(gasFee) );

  //const canAfford = useLoggedInUserCanAfford(gasFee);
  console.log('Simulation enabled condition:', isValid && contract.status === 'ready');
  console.log('Simulation arguments:', args);

  const { data: contractRequest, error: simulationError} = useSimulateContract({
    address: contract.status === 'ready' ? contract.address : undefined,
    abi: contract.abi,
    functionName: functionName,
    args: args,
    query: {
      enabled: isValid && contract.status === 'ready',
    },
    value: gasFee,
  });

  console.log('Simulation data:', contractRequest);
  if (simulationError) {
    console.error('Simulation error:', simulationError);
  }

  const {
    writeContract,
    data: dataHash,
    status: writeContractStatus,
    error: writeContractError,
  } = useWriteContract();

  console.log('Write contract status:', writeContractStatus, 'Data hash:', dataHash, 'Error:', writeContractError);

  const { status: transactionReceiptStatus } = useWaitForTransactionReceipt({
    hash: dataHash,
    query: {
      enabled: !!dataHash,
    },
  });

  console.log('Transaction receipt status:', transactionReceiptStatus);

  const disabled = contract.status !== 'ready' || writeContractStatus === 'pending' || !canAfford;

  console.log('Form disabled status:', disabled);

  const onSubmitTransaction = useCallback(
    (event: { preventDefault: () => void }) => {
      event.preventDefault();
      console.log('Attempting to submit transaction:', contractRequest?.request);

      const request = contractRequest?.request;

      if (request) {
        writeContract(request);
        setTransactionState(TransactionStates.START);
        console.log('Transaction initiated:', request);
      } else {
        setTransactionState(null);
        console.log('Transaction request not available:', request);
      }
    },
    [contractRequest, writeContract],
  );

  const resetContractForms = useCallback(() => {
    setTransactionState(null);
    console.log('Contract forms reset');
  }, []);

  useEffect(() => {
    async function onTransactionReceiptStatus() {
      console.log('Transaction receipt update:', transactionReceiptStatus);

      if ((dataHash as string) === '') return;

      if (transactionReceiptStatus === 'error') {
        if (
          writeContractError instanceof TransactionExecutionError &&
          writeContractError.message.toLowerCase().includes('out of gas')
        ) {
          setTransactionState(TransactionStates.OUT_OF_GAS);
          console.log('Transaction failed - Out of Gas');
        } else {
          setTransactionState(null);
          console.log('Transaction failed:', writeContractError);
        }
      }

      if (transactionReceiptStatus === 'success') {
        setTransactionState(TransactionStates.COMPLETE);
        console.log('Transaction successful');
      }

      await reset();
    }

    void onTransactionReceiptStatus();
  }, [dataHash, reset, setTransactionState, transactionReceiptStatus, writeContractError]);

  return useMemo(
    () => ({
      disabled,
      transactionState,
      resetContractForms,
      onSubmitTransaction,
    }),
    [onSubmitTransaction, transactionState, disabled, resetContractForms],
  );
}
