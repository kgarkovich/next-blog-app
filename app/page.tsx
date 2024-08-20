import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';
import Image from 'next/image'
import styles from './styles.module.css'

const getPosts = () => {
    return getSortedPostsData();
};

const Home = () => {
    const allPostsData =  getPosts();

    return (
        <div className={styles.content}>
            <h1 className={styles.title}>Blog</h1>
            <div className={styles.posts}>
                {allPostsData.map(({ id, title, date, image }) => (
                    <div key={id} className={styles.post}>
                        <Image
                            src={image}
                            width={500}
                            height={500}
                            alt="Picture of the author"
                            className={styles.image}
                        />
                        <Link href={`/posts/${id}`} className={styles.link}>
                            {title}
                        </Link>
                        <br />
                        <small>{date}</small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
