import { Inter } from 'next/font/google'
import './globals.css'
import SessionProvider from '@/components/session-provider'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Chào mừng giáng sinh 2023!',
  description: 'Giáng sinh vui vẻ!',
  
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
