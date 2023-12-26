'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import Banner, { BannerData } from './Banner';
import { sendContactEmail } from '@/service/contact';

type Form = {
    from : string,
    subject : string,
    message : string,
}

const DEFAULT_DATA = {
    from : '',
    subject : '',
    message : '',
};

export default function ContactForm() {
    const [form, setForm] = useState<Form>(DEFAULT_DATA);
    const [banner, setBanner] = useState<BannerData | null>(null);

    const onChange = (e : ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name] : value}))
    }
    const onSubmit = (e : FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        sendContactEmail(form)
        .then(()=>{
            setBanner({message : '메일을 성공적으로 보냈습니다', state : 'success'});
            setForm(DEFAULT_DATA);
        })
        .catch(()=> {
            setBanner({message : '메일 전송을 실패했습니다', state : 'error'});
        })
        .finally(()=>{
            setTimeout(()=> {
                setBanner(null);
            }, 3000)
        });
        
        
    }

    return (
        <section className='w-full max-w-md'>
        {banner && <Banner banner={banner} />}
            <form onSubmit={onSubmit}
            className='w-full flex flex-col gap-2 my-4 p-4 bg-slate-700 rounded-xl text-white'
            >
                <label
                className='font-semibold'
                htmlFor='from'>Your Email</label>
                <input 
                type="email" 
                id='from' 
                name='from' 
                required autoFocus 
                value={form.from} 
                onChange={onChange}
                className='text-black'
                />
                
                <label
                className='font-semibold'
                htmlFor='subject'>Subject</label>
                <input 
                type="text" 
                id='subject' 
                name='subject' 
                required 
                value={form.subject} 
                onChange={onChange}
                className='text-black'
                />
                
            <label 
            className='font-semibold'
            htmlFor='message'>Message</label>
                <textarea 
                rows={10}
                id='message' 
                name='message' 
                required 
                value={form.message} 
                onChange={onChange}
                className='text-black'
                />
                <button className='bg-yellow-300 text-black font-bold hover:bg-yellow-400'>Submit</button>
            </form>
        </section>
    )
}
