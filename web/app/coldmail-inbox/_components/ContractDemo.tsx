import { useState } from 'react';
import { clsx } from 'clsx';
import useOnchainCoffeeMemos from '../_hooks/useOnchainCoffeeMemos';
import FormBuyCoffee from './FormBuyCoffee';
import Memos from './Memos';

export default function ColdMailInboxDemo() {
  const { memos, refetchMemos } = useOnchainCoffeeMemos();
  const [selectedMemo, setSelectedMemo] = useState(null);

    if (!memos) return <div>Loading...</div>;  // Add a loading or checking mechanism

    return (
        <div className="flex flex-col md:flex-row">
            <div className="flex-initial w-full md:w-1/3 bg-white border-r">
                <h2 className="text-xl font-semibold p-5 border-b">Inbox</h2>
                {/* List of memos */}
                <div className="overflow-auto">
                    {memos.map((memo, index) => (
                        <div
                            key={index}
                            className="p-4 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                            onClick={() => setSelectedMemo(memo)}
                        >
                            <div>
                                <span className="font-semibold">From: {memo.sender}</span>
                                <div className="text-gray-600">{memo.message.substring(0, 50)}...</div>
                            </div>
                            <div className="text-gray-900 font-semibold">{index + 1}</div>  {/* Integer placeholder */}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-grow p-5">
                {selectedMemo ? (
                    <section>
                        <h3 className="font-bold text-lg">From: {selectedMemo.sender}</h3>
                        <p className="mt-2">{selectedMemo.message}</p>
                    </section>
                ) : (
                    <div>Select a message to read</div>
                )}
            </div>
        </div>
    );
}
