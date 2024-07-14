import PocketBase from 'pocketbase';
import Link from 'next/link';
import styles from './Posts.module.css';
import CreatePost from './CreatePost';
import { establishConnection } from '@/pb';

// export const dynamic = 'auto',
//   dynamicParams = true,
//   revalidate = 0,
//   fetchCache = 'auto',
//   runtime = 'nodejs',
//   preferredRegion = 'auto'

async function getPosts() {
   const pb = await establishConnection();

    // fetch a paginated records list
    // const resultList = await pb.collection('posts').getList(1, 50, {
    //     filter: 'created >= "2022-01-01 00:00:00" && someField1 != someField2',
    // });

    // you can also fetch all records at once via getFullList
    const records = await pb.collection('posts').getFullList({
        sort: '-created', cache: 'no-store'
    });

    // or fetch only the first record that matches the specified filter
    // const record = await pb.collection('posts').getFirstListItem('someField="test"', {
    //     expand: 'relField1,relField2.subRelField',
    // });

    //   const res = await fetch('http://127.0.0.1:8090/api/collections/posts/records', { cache: 'no-store' });
    //   const data = await res.json();
    //   return data?.items as any[];

    return records;
}

export default async function PostsPage() {
  const posts = await getPosts();

  return(
    <div>
      <h1>Posts</h1>
      
      <CreatePost />

      <div className={styles.grid}>
        {posts?.map((post) => {
          return <Post key={post.id} post={post} />;
        })}
      </div>

      
    </div>
  );
}

function Post({ post }: any) {
  const { id, title, content, created, user } = post || {};

  return (
    <Link href={`/posts/${id}`}>
      <div className={styles.post}>
        <h2>{title}</h2>
        <h5>{content}</h5>
        <h5>{user}</h5>
        <p>{created}</p>
      </div>
    </Link>
  );
}