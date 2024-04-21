import InboxMessages from './MemoCard';
import type { InboxMail } from './types';

type MemosProps = {
  memos: InboxMail[];
};

/**
 * Memos received from coffee purchases in BuyMeACoffee smart contract.
 *
 * @param memos List of memos.
 */
function Memos({ memos }: MemosProps) {
  if (!memos) {
    return null;
  }
  return (
    <ul className="flex w-full flex-col items-center gap-10">
      {memos
        .map((memo) => {
          return (
            <InboxMessages
              key={memo.emailId}
              tipAmount={memo.tipAmount}
              message={memo.message}
              userAddress={memo.sender}
              time={memo.time}
            />
          );
        })
        .reverse()
        .slice(0, 8)}
    </ul>
  );
}

export default Memos;
