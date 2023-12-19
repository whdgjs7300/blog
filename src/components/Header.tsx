import Link from 'next/link'
import React from 'react'

export default function Header() {
    return (
        <header className='flex justify-between items-center p-4'>
            <Link href='/'>
                <h1 className='text-3xl font-bold'>{"JongHeon's Blog"}</h1>
            </Link>
            <nav className='flex gap-4'>
                <Link href='/'>Home</Link>
                <Link href='/about'>about</Link>
                <Link href='/posts'>posts</Link>
                <Link href='/contact'>contact</Link>
            </nav>
        </header>
    )
}
