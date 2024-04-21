import { useCallback } from 'react';
import clsx from 'clsx';
import styles from './home.module.css'; // Ensure the path is correct
import { parseEther } from 'viem'; // Ensure 'viem' is correctly imported
import Button from '@/components/Button/Button';
import { useBuyMeACoffeeContract } from '../_contracts/useBuyMeACoffeeContract';
import useFields from '../_hooks/useFields';
import useOnchainCoffeeMemos from '../_hooks/useOnchainCoffeeMemos';
import InputText from './InputText';
import Label from './Label';
import TextArea from './TextArea';
import useSmartContractForms from './useSmartContractForms';

const TIP_AMOUNTS = Array.from({ length: 10 }, (_, i) => 0.01 * (i + 1));

const initFields = {
    name: '',
    receiveAddress: '',
    message: '',
    tip_amount: 0.01, // Default tip amount
};

type Fields = {
    name: string;
    receiveAddress: string;
    tip_amount: number;
    message: string;
};

type FormBuyCoffeeProps = {
    refetchMemos: ReturnType<typeof useOnchainCoffeeMemos>['refetchMemos'];
    onClose: () => void;
};

function ComposeModal({ refetchMemos, onClose }: FormBuyCoffeeProps) {
    const contract = useBuyMeACoffeeContract();
    const { fields, setField, resetFields } = useFields<Fields>(initFields);
    const { disabled, onSubmitTransaction } = useSmartContractForms({
        gasFee: parseEther(String(fields.tip_amount)),
        contract,
        name: 'sendTip',
        arguments: [fields.tip_amount, fields.name, fields.receiveAddress, fields.message],
        enableSubmit: fields.name !== '' && fields.message !== '',
    });

    return (
        <div className={styles.modalContainer}> {/* Use CSS module for styling */}
            <h2 className="mb-5 text-center text-2xl font-semibold text-white">
                Send Coldmail
            </h2>
            <form onSubmit={onSubmitTransaction} className="flex flex-col space-y-4">
                <Label htmlFor="name">Your Name</Label>
                <InputText id="name" placeholder="Enter your name" onChange={(e) => setField('name', e.target.value)} disabled={disabled} required />

                <Label htmlFor="receiveAddress">Receiver's Address</Label>
                <InputText id="receiveAddress" placeholder="Enter receiver's address" onChange={(e) => setField('receiveAddress', e.target.value)} disabled={disabled} required />

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
                    disabled={disabled}
                />
            </form>
            <button onClick={onClose} className="mt-4 self-end px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700">
                Close
            </button>
        </div>
    );
}

export default ComposeModal;
