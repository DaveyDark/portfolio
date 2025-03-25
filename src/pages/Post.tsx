import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import MobileNav from "../components/MobileNav";
import { useRemark } from "react-remark";
import pageTransition from "../components/pageTransition";
import { supabase, BlogPost } from "../lib/supabaseClient";

const Post = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [markdown, setMarkdown] = useRemark();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      fetchPost(slug);
    }
  }, [slug]);

  const fetchPost = async (postSlug: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', postSlug)
        .single();
      
      if (error) throw error;
      
      if (!data) {
        navigate('/blog');
        return;
      }
      
      setPost(data);
      setMarkdown(data.content);
    } catch (error: any) {
      console.error('Error fetching post:', error);
      setError(error.message || 'Failed to fetch post');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-screen flex flex-col justify-center items-center gap-8 relative py-24 px-8">
        <Navbar />
        <MobileNav />
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen w-screen flex flex-col justify-center items-center gap-8 relative py-24 px-8">
        <Navbar />
        <MobileNav />
        <div className="bg-red-500 text-white p-4 rounded">
          {error || 'Post not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen flex flex-col justify-around items-center gap-8 relative py-24 md:px-8 px-4 overflow-x-hidden">
      <Navbar />
      <MobileNav />
      <div className="bg-gray-800 flex flex-col justify-center gap-4 max-w-4xl pt-4 md:p-12 p-4 rounded-lg">
        <span className="flex flex-col w-full justify-between my-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-mono">
            {post.title}
          </h1>
          <p className="font-mono text-gray-400">{new Date(post.created_at).toLocaleDateString()}</p>
          <div className="flex gap-2 flex-wrap my-2">
            {post.tags.map((tag) => (
              <span
                className="bg-gray-700 rounded-full px-2 py-0.5 text-sm"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        </span>
        {post.banner_url && (
          <img src={post.banner_url} className="max-h-72 object-contain mb-4" alt={post.title} />
        )}
        <p className="text-lg text-gray-400 mb-4">{post.subtitle}</p>
        <span className="prose prose-sm sm:prose-md md:prose-lg lg:prose-xl prose-invert prose-img:max-h-72 prose-img:mx-auto">
          {markdown}
        </span>
      </div>
    </div>
  );
};

export default pageTransition(Post);
