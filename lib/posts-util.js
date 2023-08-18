import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostsFiles () {
    return fs.readdirSync(postsDirectory);
}

export function getPostData (postIdentifier) {
    const slug = postIdentifier.replace(/\.md$/, '');
    const filePath = path.join(postsDirectory, `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);

    const postData = {
        ...data,
        slug,
        content
    };

    return postData;
}

export function getAllPosts () {
    const postFiles = getPostsFiles();
    const allPosts = postFiles.map(postFile => {
        return getPostData(postFile);
    });
    const sortedPosts = allPosts.sort((postA, postB) => postA.date > postB.Data ? -1 : 1);
    return sortedPosts;
}

export function getFeaturedPosts () {
    const allPosts = getAllPosts();
    const featuredPosts = allPosts.filter(post => post.isFeatured);
    return featuredPosts;
}