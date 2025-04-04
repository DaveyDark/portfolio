import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MobileNav from "../components/MobileNav";
import Navbar from "../components/Navbar";
import pageTransition from "../components/pageTransition";
import Card from "../components/Card";
import { ChevronLeft, ChevronRight, ArrowLeft } from "react-feather";
import { supabase, BlogPost, BlogGroup, fetchBlogGroup } from "../lib/supabaseClient";

const BlogGroupPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [group, setGroup] = useState<BlogGroup | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    if (slug) {
      loadGroupAndPosts(slug);
    }
  }, [slug]);

  const loadGroupAndPosts = async (groupSlug: string) => {
    try {
      setLoading(true);
      
      // Fetch the group
      const groupData = await fetchBlogGroup(groupSlug);
      
      if (!groupData) {
        navigate('/blog');
        return;
      }
      
      setGroup(groupData);
      
      // Fetch posts in this group
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('group_id', groupData.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setBlogPosts(data || []);
    } catch (error: any) {
      console.error('Error fetching group posts:', error);
      setError(error.message || 'Failed to fetch blog group');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center gap-8 relative py-24 px-8 overflow-x-hidden">
      <Navbar />
      <MobileNav />
      
      <div className="flex items-center justify-between w-full max-w-6xl">
        <button
          onClick={() => navigate('/blog')}
          className="text-yellow-400 flex items-center gap-2 hover:underline"
        >
          <ArrowLeft size={18} /> Back to All Blogs
        </button>
      </div>
      
      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : error ? (
        <div className="bg-red-500 text-white p-4 rounded">
          {error}
        </div>
      ) : group ? (
        <>
          <div className="w-full max-w-6xl">
            <h1 className="text-4xl text-yellow-400 uppercase font-semibold">{group.name}</h1>
            {group.description && (
              <p className="text-gray-300 mt-2 mb-8">{group.description}</p>
            )}
          </div>
          
          {blogPosts.length === 0 ? (
            <div className="text-center py-8">No blog posts available in this group.</div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-4">
                {blogPosts.slice((page - 1) * pageSize, page * pageSize).map((post) => (
                  <Card
                    title={post.title}
                    img={post.banner_url}
                    subtitle={post.subtitle}
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    orientation="h"
                  />
                ))}
              </div>
              
              <div className={`flex gap-2 ${blogPosts.length <= pageSize && "hidden"}`}>
                <button
                  onClick={() => setPage(page - 1)}
                  className={`bg-yellow-400 rounded-md p-1 flex-1 ${page <= 1 && "opacity-0 pointer-events-none"}`}
                >
                  <ChevronLeft color="black" size={32} />
                </button>
                <span className="bg-gray-700 aspect-square h-full flex-1 px-5 rounded-md py-1 text-xl grid place-items-center font-mono">
                  {page}
                </span>
                <button
                  onClick={() => setPage(page + 1)}
                  className={`bg-yellow-400 rounded-md p-1 flex-1 ${
                    page >= Math.ceil(blogPosts.length / pageSize) && "opacity-0 pointer-events-none"
                  }`}
                >
                  <ChevronRight color="black" size={32} />
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <div className="text-center py-8">Blog group not found.</div>
      )}
    </div>
  );
};

export default pageTransition(BlogGroupPage); 