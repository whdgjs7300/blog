import ContactForm from '@/components/ContactForm'
import React from 'react'
import {AiFillGithub, AiFillLinkedin, AiFillYoutube } from 'react-icons/ai'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contact Me',
    description: '나에게 메일 보내기', 
}

const LINKS = [
    {icon : <AiFillGithub /> , url :''},
    {icon : <AiFillLinkedin /> , url :''},
    {icon : <AiFillYoutube /> , url :''},
]

export default function ContactPage() {
    return (
        <section className='flex flex-col items-center'>
            <h2 className='text-3xl font-bold my-2'>Contact Me</h2>
            <p>whdgjs7300@naver.com</p>
            <ul className='flex gap-4 my-2'>
                {LINKS.map((link,index) => <a 
                key={index} href={link.url} target='_blank' rel='noreferrel'
                className='text-5xl hover:text-yellow-400'
                >
                    {link.icon}
                </a>)}
                
            </ul>
            <h2 className='text-3xl font-bold my-8'>Or Send me an Email</h2>
            <ContactForm />
        </section>
    )
}
