import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), '/app/posts');

export interface PostData {
    id: string;
    title: string;
    date: string;
    image: string;
    contentHtml?: string;
}

export const getSortedPostsData = (): PostData[] => {
    const fileNames = fs.readdirSync(postsDirectory);

    const allPostsData: PostData[] = fileNames
        .filter(fileName => path.extname(fileName) === '.md') // Фильтруем только Markdown файлы
        .map(fileName => {
            const id = fileName.replace(/\.md$/, '');
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const matterResult = matter(fileContents);

            return {
                id,
                ...(matterResult.data as { title: string; date: string, image: string }),
            };
        });

    return allPostsData.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
};

export const getPostData = async (id: string): Promise<PostData> => {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    return {
        id,
        contentHtml: matterResult.content,
        ...(matterResult.data as { title: string; date: string, image: string }),
    };
};
