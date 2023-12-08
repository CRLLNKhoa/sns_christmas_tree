import { Inter } from 'next/font/google'
import './globals.css'
import SessionProvider from '@/components/session-provider'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getMeta } from '@/actions/api';

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata() {
  let title = "Giáng sinh vui vẻ!"
  return {
    title: title,
    openGraph: {
      images: ["/assets/item/item12.webp"],
    },
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <SessionProvider />
        <ToastContainer />
      </body>
    </html>
  )
}
