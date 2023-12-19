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

export async function getAllPosts(): Promise<Post[]> {
    const filePath = path.join(process.cwd(), 'data', 'posts.json');
    return readFile(filePath, 'utf-8')
    .then<Post[]>(data => JSON.parse(data))
    // 데이터의 날짜가 최신순으로 정렬
    .then((posts) => posts.sort((a,b)=> (a.date > b.date ? -1 : 1))) 
}