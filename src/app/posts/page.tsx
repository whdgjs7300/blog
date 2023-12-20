import FilterablePosts from '@/components/FilterablePosts';
import { getAllPosts } from '@/service/posts'
import React from 'react'

export default async function PostsPage() {
    const posts = await getAllPosts();
    // Set 함수를 이용해 새롭게 posts 데이터 맵핑 필터(서버 컴포넌트 문법)
    const categories = [...new Set(posts.map(post => post.category))]


    return (
        <FilterablePosts posts={posts} categories={categories} />
    )
}
