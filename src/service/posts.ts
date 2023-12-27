import { readFile } from "fs/promises";
import path from "path";
import { cache } from "react";

export type Post = {
    title : string,
    description : string,
    date : Date;
    category : string,
    path : string,
    featured : boolean,
};

export type PostData = Post & 
{
    content : string, 
    next : Post | null, 
    prev : Post | null 
};

export async function getNonFeaturedPosts(): Promise<Post[]> {
    return getAllPosts() // featured가 true인 것만 필터
    .then(posts => posts.filter(post => !post.featured));
}

export async function getFeaturedPosts(): Promise<Post[]> {
    return getAllPosts() // featured가 true인 것만 필터
    .then(posts => posts.filter(post => post.featured));
}

// 한번 렌더링 하는 사이클에 있는 함수는 중복제거해서 딱 한번만 호출하게 함 !!!!!
// 호출 하는 인자가 동일한 id의 인자라면(상세페이지) 한번 캐시된 데이터를 그냥 바로불러옴
// 성능 향상에 크게 영향을 줌 !!
export const getAllPosts = cache(async()=> {
    const filePath = path.join(process.cwd(), 'data','posts.json');
    return readFile(filePath, 'utf-8')
    .then<Post[]>(data => JSON.parse(data))
    // 데이터의 날짜가 최신순으로 정렬
    .then((posts) => posts.sort((a,b)=> (a.date > b.date ? -1 : 1))) 
    
})

// url fileName과 같은 데이터 필터 및 url과 같은 .md 파일 데이터도 함께 가져옴
export async function getPostData(fileName:string): Promise<PostData> {
    const filePath = path.join(process.cwd(), 'data', 'posts', `${fileName}.md`);

    const posts = await getAllPosts();
    const post = posts.find(post => post.path === fileName);

    if(!post) throw new Error(`${fileName}에 해당하는 포스트를 찾을 수 없음`);

    // 인덱스 값으로 배열의 첫번 째를 제외한 데이터의 이전, 다음을 가져옴
    const index = posts.indexOf(post);
    const next = index > 0 ? posts[index-1] : null;
    const prev = index < posts.length-1 ? posts[index + 1] : null

    const content = await readFile(filePath, 'utf-8');
    return {...post, content, next, prev };
}