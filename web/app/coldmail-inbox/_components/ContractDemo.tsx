import { useState } from 'react';
import { clsx } from 'clsx';
import useOnchainCoffeeMemos from '../_hooks/useOnchainCoffeeMemos';
import Memos from './Memos';
import { InboxMail } from './types';
import { ethers } from 'ethers';

export default function ColdMailInboxDemo() {
  // const { memos, refetchMemos} = useOnchainCoffeeMemos();
  // const { memos2, refetchMemos2} = useOnchainCoffeeMemos()
  const [isClaiming, setIsClaiming] = useState(false);  // State to manage button disabled/enabled

  const sampleInboxMail1: InboxMail = {
    emailId: 1,
    tipAmount: 0.002,  // Assuming this is the tip amount in wei (for example)
    sender: '0x14f152D84c71C2CE7Ba60eB2cf117B7C9A0a8B90',  // Example Ethereum address
    recipient: '0xCd582...RecipientAddress',  // Example Ethereum address
    message: 'Subject: Congratulations!!! You have won $1,000,000!!!\n' +
      'Dear Lucky Winner,\n' +
      'We are delighted to inform you that your email address has been selected as the winner of our Mega Million Sweepstakes! You have won an exclusive prize of $1,000,000 USD!\n' +
      'To claim your prize, simply confirm your details by replying to this email with your full name, address, and telephone number as soon as possible. Time is running out, and we wouldn\'t want you to miss out on this once-in-a-lifetime opportunity!\n' +
      'Additionally, for your security, please keep this winning notification confidential until your claim has been processed and your money remitted to you. This is part of our security protocol to avoid double claiming and unwarranted abuse of this program.\n' +
      'Do not miss out on this exclusive chance of a lifetime. Act now!\n' +
      'Best Regards,\n' +
      'John Doe\n' +
      'Mega Million Sweepstakes Coordinator',
    time: BigInt(Date.now())  // Using current timestamp for example
  };

  const sampleInboxMail2: InboxMail = {
    emailId: 1,
    tipAmount: 0.001,  // Assuming this is the tip amount in wei (for example)
    sender: '0x14f152D84c71C2CE7Ba60eB2cf117B7C9A0a8B90',  // Example Ethereum address
    recipient: '0xCd582...RecipientAddress',  // Example Ethereum address
    message: 'Hi John,\n' +
      'I hope this message finds you well! I\'m excited to let you know that I\'m throwing a party and it wouldn\'t be the same without you there. Mark your calendar!\n' +
      'Details of the Party:\n' +
      'Date: Saturday, May 20th\n' +
      'Time: 7:00 PM\n' +
      'Place: 123 Party Lane, Funville\n' +
      'Theme: Tropical Luau\n' +
      'Dress Code: Beach Attire\n' +
      'It\'ll be a great chance to unwind, enjoy some good food, and catch up with each other. There will be music, games, and plenty of fun, so come ready to enjoy a fantastic evening!\n' +
      'Please let me know by May 13th if you can make it, so I can make sure we have enough refreshments for everyone.\n' +
      'Looking forward to seeing you and having a blast together!\n' +
      'Cheers,\n' +
      'Doe',
    time: BigInt(Date.now())  // Using current timestamp for example
  };

  const sampleInboxMail3: InboxMail = {
    emailId: 1,
    tipAmount: 0.003,  // Assuming this is the tip amount in wei (for example)
    sender: '0x14f152D84c71C2CE7Ba60eB2cf117B7C9A0a8B90',  // Example Ethereum address
    recipient: '0xCd582...RecipientAddress',  // Example Ethereum address
    message: 'Subject: Hello from Sunny Los Angeles!\n' +
      'Hi MV Coinbase,\n' +
      'Greetings from Los Angeles! I hope you\'re doing wonderfully. I\'ve been soaking up the vibrant culture and endless sunshine here and couldn\'t resist sharing a bit of this joy with you.\n' +
      'Los Angeles is as lively as ever, with bustling streets, scenic hikes, and of course, the iconic beach sunsets. It\'s a constant adventure exploring all that this city has to offer, from its innovative culinary scenes to the diverse neighborhoods each with their unique charm.\n' +
      'How have you been? I\'d love to hear about what\'s new with you and perhaps plan a visit if you\'re up for a little California sunshine.\n' +
      'Take care and hoping to catch up soon!\n' +
      'Best wishes,\n' +
      'Team Coldmail.',
    time: BigInt(Date.now())  // Using current timestamp for example
  };

  const sampleInboxMails: InboxMail[] = [
    sampleInboxMail3,
    sampleInboxMail2,
    sampleInboxMail1,
  ];

  const handleClaimTip = async () => {
    if (!sampleInboxMails) {
      console.error('No memo selected');
      return;
    }
    setIsClaiming(true)
  };
  const formatDate = (timeBigInt: bigint) => {
    return new Date(Number(timeBigInt)).toLocaleDateString();
  };

  const [selectedMemo, setSelectedMemo] = useState(null);

  console.log('Memos from ColdmailInboxDemo:', sampleInboxMails);
  console.log('Memos from ColdmailInbox Sender:', sampleInboxMail1.sender);
  console.log('Memos message:', sampleInboxMail1.message);

  // Handle the case where memos have not yet loaded
  if (!sampleInboxMails) return <div>Loading...</div>;

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-initial w-full md:w-1/3 bg-white border-r">
        <h2 className="text-xl font-semibold p-5 border-b">Inbox</h2>
        {/* List of memos */}
        <div className="overflow-auto">
          {sampleInboxMails.map((memo, index) => (
            <div
              key={index}  // Assuming each memo has a unique index, adjust if you have a unique ID
              className="p-4 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
              onClick={() => setSelectedMemo(memo)}
            >
              <div>
                <span className="font-semibold">From: {memo.sender}</span>
                <div className="text-gray-600">
                  Tip: {memo.tipAmount} ETH
                </div>
                <div className="text-gray-600">
                  Date: {formatDate(memo.time)} {/* Converting UNIX timestamp to readable date */}
                </div>
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
            {/* Optionally, show more details */}
            <p className="mt-2">Tip: {selectedMemo.tipAmount} ETH</p>
            <p className="mt-2">Date: {formatDate(selectedMemo.time)}</p>
            <button
              onClick={handleClaimTip}
              disabled={isClaiming}
              className={`mt-4 px-4 py-2 font-bold rounded ${isClaiming ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'} text-white`}
            >
              Claim
            </button>
          </section>
        ) : (
          <div>Select a message to read</div>
        )}
      </div>
    </div>
  );
}
