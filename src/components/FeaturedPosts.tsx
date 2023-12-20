import React from 'react'
import PostsGrid from './PostsGrid'
import { getFeaturedPosts } from '@/service/posts'

export default async function FeaturedPosts() {
    const posts = await getFeaturedPosts();

    return (
        <section>
            <h2 className='text-2xl font-bold my-2'>Featured Posts</h2>
            <PostsGrid posts={posts}/>
        </section>
    )
}
