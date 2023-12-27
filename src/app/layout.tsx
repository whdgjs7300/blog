import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const sans = Open_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default : "종헌이의 블로그",
    template : '종헌이의 블로그 | %s'
  },
  description: '풀스택 개발자 종헌이의 블로그',
  icons : {
    // 페비콘 ico 바꿔주는 사이트 : 구글에 png to ico 치면 나옴
    icon : '/favicon.ico'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={sans.className}>
      
      <body className='flex flex-col w-full max-w-screen-2xl mx-auto'>
        <Header/>
        <main className='grow '>{children}</main>
        <Footer/>
        </body>
    </html>
  )
}
