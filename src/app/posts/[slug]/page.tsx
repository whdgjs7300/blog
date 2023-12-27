
import AdjacentPostCard from '@/components/AdjacentPostCard';
import PostContent from '@/components/PostContent';
import { getFeaturedPosts, getPostData } from '@/service/posts'
import { Metadata } from 'next';
import Image from 'next/image';
import React from 'react'




type Props = {
    params : {
        slug : string,
    }
}

// 동적인 메타데이타 문법 !!! (Next 제공)
export async function generateMetadata({params : {slug}} : Props) :Promise<Metadata> {
    const {title, description} = await getPostData(slug);
    return {
        title: title,
        description
    }
}

export default async function Postpage({ params : {slug}} :Props) {
    const post = await getPostData(slug);
    const {title, path, next, prev} = post;

    return (
        <article className='rounded-2xl overflow-hidden bg-gray-100 shadow-lg m-4'>
            <Image 
            className='w-full h-1/5 max-h-[500px]'
            src={`/images/posts/${path}.png`}
            alt={title} 
            width={760} 
            height={420} />
            
        <PostContent post={post} />
            <section className='flex shadow-md'>
                {prev && <AdjacentPostCard post={prev} type='prev' />}
                {next && <AdjacentPostCard post={next} type='next' />}
            </section>
        </article>
    )
}

// 개발자가 원하는 param의 데이터가 미리 프리렌더링 하고 싶게 하면 아래의 함수 사용 !!
// 데이터가 많아질수록 빌드시간이 증가하여 오히려 단점이 될 수 있음
export async function generateStaticParams() {
    const posts = await getFeaturedPosts();
    return posts.map((post) => ({
        slug : post.path,
    }))
}