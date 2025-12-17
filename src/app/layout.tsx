import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { GlobalProvider } from '@/providers/GlobalProvider';
import SmoothScrolling from '@/components/shared/SmoothScrolling';
import AuthModal from '@/features/auth/components/AuthModal';
import ScrollToTop from '@/components/shared/ScrollToTop';


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'MegaShop - Refresh Your Wardrobe',
  description: 'Your one-stop destination for everything you need.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <SmoothScrolling>
          <GlobalProvider>
            <AuthModal />
            <ScrollToTop />
            {children}
          </GlobalProvider>
        </SmoothScrolling>
      </body>
    </html>
  );
}
