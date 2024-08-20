import { getPostData } from '@/lib/posts';
import Image from 'next/image';

import styles from './styles.module.css'

const Post = async ({ params }: { params: { id: string } }) => {
    const data = await getPostData(params.id)

    return (
        <div className={styles.post}>
            <Image
                src={data.image}
                width={500}
                height={500}
                alt="Picture of the author"
                className={styles.image}
            />
            <div className={styles.titleContainer}>
                <h1 className={styles.title}>{data.title}</h1>
                <small>{data.date}</small>
            </div>
            <div dangerouslySetInnerHTML={{__html: data.contentHtml || '' }} />
        </div>
    );
};

export default Post;
