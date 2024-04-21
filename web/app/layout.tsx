import './global.css';
import GoogleAnalytics from '@/components/GoogleAnalytics/GoogleAnalytics';
import OnchainProviders from '@/OnchainProviders';
import { initAnalytics } from '@/utils/analytics';
import { inter } from './fonts';
import type { Metadata } from 'next';

export const viewport = {
    width: 'device-width',
    initialScale: 1.0,
};

export const metadata: Metadata = {
    manifest: '/manifest.json',
    other: {
        boat: '0.17.0',
    },
};

// Start analytics before the App renders,
// so we can track page views and early events
initAnalytics();

/** Root layout to define the structure of every page */
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" className={`${inter.className}`}>
        <body className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
        <OnchainProviders>
            <div className="max-w-4xl mx-auto p-4">
                {children}
            </div>
        </OnchainProviders>
        <GoogleAnalytics />
        </body>
        </html>
    );
}