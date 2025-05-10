import useSWR from 'swr';
import { useSession } from 'next-auth/react';
import PostCard from '../components/PostCard';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function FeedPage() {
  const { data: session } = useSession();
  const { data: posts, error } = useSWR(
    session ? '/api/posts' : null,
    fetcher
  );

  if (!session) return <p>Please sign in to view the feed.</p>;
  if (error) return <p>Failed to load posts.</p>;
  if (!posts) return <p>Loading...</p>;

  return (
    <div>
      {posts.map((post: any) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
