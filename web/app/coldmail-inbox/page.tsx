'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/layout/header/Header';
import Main from '@/components/layout/Main';
import BuyMeCoffeeContractDemo from './_components/ContractDemo';
import Guide from './_components/Guide';
import ColdMailInboxDemo from "./_components/ContractDemo";

/**
 * Use the page component to wrap the components
 * that you want to render on the page.
 */
export default function ColdmailMainPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  //  Fix hydration issues
  if (!isMounted) {
    return null;
  }

  return (
      <Main style={{ padding: '20px', fontFamily: '"Arial", sans-serif', backgroundColor: '#f9f9f9', maxWidth: '600px', margin: 'auto' }}>
          <h1 style={{ borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>Welcome to Coldmail.onchain!</h1>
            <article>
                <ColdMailInboxDemo />
            </article>
          <footer style={{ borderTop: '1px solid #ddd', paddingTop: '10px', fontSize: '12px', textAlign: 'center' }}>
              © 2024 Coldmail.onchain Web3 Email Service. All rights reserved.
            </footer>
        </Main>
  );
}
