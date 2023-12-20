import { readFile } from "fs/promises";
import path from "path";

export type Post = {
    title : string,
    description : string,
    date : Date;
    category : string,
    path : string,
    featured : boolean,
};

export async function getNonFeaturedPosts(): Promise<Post[]> {
    return getAllPosts() // featured가 true인 것만 필터
    .then(posts => posts.filter(post => !post.featured));
}

export async function getFeaturedPosts(): Promise<Post[]> {
    return getAllPosts() // featured가 true인 것만 필터
    .then(posts => posts.filter(post => post.featured));
}

export async function getAllPosts(): Promise<Post[]> {
    const filePath = path.join(process.cwd(), 'data', 'posts.json');
    return readFile(filePath, 'utf-8')
    .then<Post[]>(data => JSON.parse(data))
    // 데이터의 날짜가 최신순으로 정렬
    .then((posts) => posts.sort((a,b)=> (a.date > b.date ? -1 : 1))) 
    
}
