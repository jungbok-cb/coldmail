'use client';
import { useState } from 'react';
import Link from 'next/link';
import HomeHeader from './_components/HomeHeader';
import ComposeModal from './_components/ComposeModal'; // Assume you have a ComposeModal component

export default function HomePage() {
    const [showCompose, setShowCompose] = useState(false);

    const openComposeModal = () => setShowCompose(true);
    const closeComposeModal = () => setShowCompose(false);

    return (
        <div className="min-h-screen text-white flex flex-col"> {/* Main container with flex column */}
            <HomeHeader />
            <div className="flex flex-1 bg-gray-900"> {/* Set dark background color starting from here */}
                <aside className="w-1/4 bg-gray-700 p-4"> {/* Slightly lighter gray for the sidebar */}
                    <button onClick={openComposeModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
                        Compose
                    </button>
                    <ul>
                        <li className="py-2 hover:bg-gray-600 cursor-pointer">
                            <Link href="/coldmail-inbox">Inbox</Link>
                        </li>
                        <li className="py-2 hover:bg-gray-600 cursor-pointer">Sent Messages</li>
                        <li className="py-2 hover:bg-gray-600 cursor-pointer">Spam</li>
                    </ul>
                </aside>
                {showCompose ? (
                    <ComposeModal onClose={closeComposeModal} className="flex-1" />
                ) : (
                    <main className="flex-1 p-8 bg-gray-900"> {/* Ensure main content area also has the dark theme */}
                        {/* Main content would go here */}
                    </main>
                )}
            </div>
        </div>
    );
}
