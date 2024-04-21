
import { clsx } from 'clsx';
import Header from '@/components/layout/header/Header';
import styles from './Home.module.css';

export default function HomeHeader() {
    return (
        <div className={clsx(styles.HomeHeader, 'bg-light-blue-100')}>
            <div className={styles.HomeHeaderGradient}></div>
            <Header />
            <div className="flex flex-col items-center justify-center py-4">
                <h1 className={clsx(styles.HomeHeaderHeadline, 'font-robotoMono')}>
                    Send
                    <br />
                    E-MAILS
                    <br />
                    Onchain
                </h1>
            </div>
        </div>
    );
}
