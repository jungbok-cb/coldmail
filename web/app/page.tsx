import { generateMetadata } from '@/utils/generateMetadata';
import EmailUI from './home/EmailUI';
import HomePage from "./home/HomePage"; // Assuming EmailUI is your new email-like interface component

export const metadata = generateMetadata({
  title: 'Coldmail.onchain',
  description: 'Send and Receive Email using Blockchain encryption. Add tips to be on the top of read priority',
  images:'',
  pathname: '',
});

/**
 * Server component, which imports the Home component (client component that has 'use client' in it)
 */
export default function Page() {
  return <HomePage />; // Changed from HomePage to EmailUI
}
