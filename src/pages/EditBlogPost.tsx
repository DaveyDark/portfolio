import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MobileNav from '../components/MobileNav';
import pageTransition from '../components/pageTransition';
import BlogEditor from '../components/BlogEditor';
import ProtectedRoute from '../components/ProtectedRoute';
import { supabase, BlogPost } from '../lib/supabaseClient';

const EditBlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    if (!id) return navigate('/admin/dashboard');

    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      if (!data) {
        navigate('/admin/dashboard');
        return;
      }

      setPost(data);
    } catch (error: any) {
      console.error('Error fetching post:', error);
      setError(error.message || 'Failed to fetch post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen w-screen flex flex-col items-center gap-8 relative py-24 px-8 overflow-x-hidden">
        <Navbar />
        <MobileNav />
        <div className="w-full max-w-6xl">
          <h1 className="text-4xl text-yellow-400 uppercase font-semibold mb-8">Edit Blog Post</h1>
          
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : error ? (
            <div className="bg-red-500 text-white p-4 rounded">
              {error}
            </div>
          ) : post ? (
            <BlogEditor 
              initialData={post} 
              isEdit={true} 
            />
          ) : (
            <div className="text-center py-8">Post not found</div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default pageTransition(EditBlogPost); 