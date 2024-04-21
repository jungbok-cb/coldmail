import { useCallback } from 'react';
import clsx from 'clsx';
import styles from './home.module.css'; // Ensure the path is correct
import { parseEther } from 'viem'; // Ensure 'viem' is correctly imported
import Button from '@/components/Button/Button';
import { useBuyMeACoffeeContract } from '../_contracts/useBuyMeACoffeeContract';
import useFields from '../_hooks/useFields';
import InputText from './InputText';
import Label from './Label';
import TextArea from './TextArea';
import TransactionSteps from './TransactionSteps'
import useSmartContractForms from './useSmartContractForms';

const TIP_AMOUNTS = Array.from({ length: 10 }, (_, i) => 0.001 * (i + 1));

const initFields = {
    receiveAddress: '',
    message: '',
    tip_amount: 0.001, // Default tip amount
};

type Fields = {
    receiveAddress: string;
    tip_amount: number;
    message: string;
};

type FormBuyCoffeeProps = {
    onClose: () => void;
};

function ComposeModal({ onClose }: FormBuyCoffeeProps) {

    const contract = useBuyMeACoffeeContract();
    const { fields, setField, resetFields } = useFields<Fields>(initFields);

    const reset = useCallback(() => {
        resetFields();
    }, [resetFields]);

    const { disabled, transactionState, resetContractForms, onSubmitTransaction } = useSmartContractForms({
        gasFee: parseEther(String(fields.tip_amount)),
        contract,
        name: 'sendEmailWithTip',
        arguments: [fields.receiveAddress, fields.message],
        enableSubmit: fields.message !== '',
        reset: reset,
    });


    if (transactionState !== null) {
        return (
          <TransactionSteps
            transactionStep={transactionState}
            resetContractForms={resetContractForms}
            tipAmount={0.001}
            gasCost={0.0001}/>
        );
    }

    return (
      <div className={styles.modalContainer}>
          <h2 className="mb-5 text-center text-2xl font-semibold text-white">
              Send Coldmail
          </h2>
          <form onSubmit={onSubmitTransaction} className="flex flex-col space-y-4"> {/* Update this line */}

              <Label htmlFor="receiveAddress">Receiver's Address</Label>
              <InputText id="receiveAddress" placeholder="Enter receiver's address: 0x..." onChange={(e) => setField('receiveAddress', e.target.value)} disabled={disabled} required />

              <Label htmlFor="message">Message</Label>
              <TextArea id="message" placeholder="Write your message" onChange={(e) => setField('message', e.target.value)} disabled={disabled} required />

              <div className="flex items-center gap-2 overflow-x-auto">
                  {TIP_AMOUNTS.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      className={clsx(
                        "min-w-[40px] h-10 rounded-md px-2 py-1",
                        fields.tip_amount === amount ? "bg-blue-600 text-white" : "bg-blue-100 text-black"
                      )}
                      onClick={() => setField('tip_amount', amount)}
                    >
                        {amount.toFixed(2)}
                    </button>
                  ))}
                  <span className="text-white font-medium">ETH</span>
              </div>

              <Button
                buttonContent={`Send ${fields.tip_amount.toFixed(2)} ETH with the mail`}
                type="submit"
                disabled={false}
              />
          </form>
          <button onClick={onClose} className="mt-4 self-end px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
              Close
          </button>
      </div>
    );
}

export default ComposeModal;
