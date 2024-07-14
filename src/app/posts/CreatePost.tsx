'use client';

import PocketBase from 'pocketbase';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authenticate } from '@/pb';

export default function CreatePost() {
  const [title, setTitle] = useState('test');
  const [content, setContent] = useState('test');
  const [userId, setUserId] = useState('483l4k3llwumvod');

  const router = useRouter();

  const create = async(e: any) => {
    e.preventDefault()

    const pb = await authenticate();    
    const record = await pb.collection('posts').create({
      title,
      content,
      user: userId,
    })

    router.refresh();
    return record
  }

  return (
    <form onSubmit={create}>
      <h3>Create a new Post</h3>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">
        Create post
      </button>
    </form>
  );
}