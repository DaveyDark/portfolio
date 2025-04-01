import { useState, useEffect } from "react";
import MobileNav from "../components/MobileNav";
import Navbar from "../components/Navbar";
import pageTransition from "../components/pageTransition";
import Card from "../components/Card";
import { ChevronLeft, ChevronRight, Folder } from "react-feather";
import { supabase, BlogPost, BlogGroup, fetchBlogGroups } from "../lib/supabaseClient";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogGroups, setBlogGroups] = useState<BlogGroup[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    fetchUngroupedBlogPosts();
    loadBlogGroups();
  }, []);

  const fetchUngroupedBlogPosts = async () => {
    try {
      setLoadingPosts(true);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .is('group_id', null)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setBlogPosts(data || []);
    } catch (error: any) {
      console.error('Error fetching blog posts:', error);
      setError(error.message || 'Failed to fetch blog posts');
    } finally {
      setLoadingPosts(false);
    }
  };

  const loadBlogGroups = async () => {
    try {
      setLoadingGroups(true);
      const groups = await fetchBlogGroups();
      setBlogGroups(groups);
    } catch (error: any) {
      console.error('Error fetching blog groups:', error);
      setError(error.message || 'Failed to fetch blog groups');
    } finally {
      setLoadingGroups(false);
    }
  };

  return (
    <div className="min-h-screen w-screen flex flex-col items-center gap-8 relative py-24 px-8 overflow-x-hidden">
      <Navbar />
      <MobileNav />
      <h1 className="text-4xl text-yellow-400 uppercase font-semibold">Blog</h1>
      
      {/* Show error if any */}
      {error && (
        <div className="bg-red-500 text-white p-4 rounded w-full max-w-6xl">
          {error}
        </div>
      )}
      
      {/* Display Blog Groups */}
      {loadingGroups ? (
        <div className="text-center py-4">Loading groups...</div>
      ) : blogGroups.length > 0 && (
        <div className="w-full max-w-6xl">
          <h2 className="text-2xl text-yellow-300 font-semibold mb-4">Blog Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {blogGroups.map(group => (
              <Link 
                key={group.id} 
                to={`/blog/group/${group.slug}`}
                className="bg-gray-800 rounded-lg p-6 flex items-start hover:bg-gray-700 transition-colors"
              >
                <Folder size={24} className="text-yellow-400 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold">{group.name}</h3>
                  {group.description && (
                    <p className="text-gray-400 mt-1 line-clamp-2">{group.description}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* Display Ungrouped Posts */}
      <div className="w-full max-w-6xl">
        <h2 className="text-2xl text-yellow-300 font-semibold mb-4">Latest Posts</h2>
        
        {loadingPosts ? (
          <div className="text-center py-8">Loading posts...</div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center py-8 bg-gray-800 rounded-lg">No ungrouped blog posts available.</div>
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
            
            <div className={`flex gap-2 mt-6 ${blogPosts.length <= pageSize && "hidden"}`}>
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
      </div>
    </div>
  );
};

export default pageTransition(Blog);
