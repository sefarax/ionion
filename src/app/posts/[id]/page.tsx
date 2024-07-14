import { establishConnection } from '@/pb';
import styles from '../Posts.module.css';

async function getPost(postId: string) {
  const pb = await establishConnection();

  return await pb.collection('posts').getOne(postId, {
    expand: 'relField1,relField2.subRelField',
  });
}

export default async function PostPage({ params }: any) {
  const post = await getPost(params.id);

  return (
    <div>
      <h1>posts/{post.id}</h1>
      <div className={styles.post}>
        <h3>{post.title}</h3>
        <h5>{post.content}</h5>
        <p>{post.created}</p>
      </div>
    </div>
  );
}