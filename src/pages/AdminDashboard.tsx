import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BlogPost, BlogGroup, supabase, logoutAdmin, fetchBlogGroups } from '../lib/supabaseClient';
import Navbar from '../components/Navbar';
import MobileNav from '../components/MobileNav';
import pageTransition from '../components/pageTransition';
import ProtectedRoute from '../components/ProtectedRoute';
import { Plus, Edit, Trash2, LogOut, Folder, FileText } from 'react-feather';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'posts' | 'groups'>('posts');
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogGroups, setBlogGroups] = useState<BlogGroup[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogPosts();
    fetchAllBlogGroups();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      setLoadingPosts(true);
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*, blog_groups(name)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBlogPosts(data || []);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoadingPosts(false);
    }
  };

  const fetchAllBlogGroups = async () => {
    try {
      setLoadingGroups(true);
      const groups = await fetchBlogGroups();
      setBlogGroups(groups);
    } catch (error) {
      console.error('Error fetching blog groups:', error);
    } finally {
      setLoadingGroups(false);
    }
  };

  const handleDeletePost = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      // Get the post to find banner URL
      const { data: post } = await supabase
        .from('blog_posts')
        .select('banner_url')
        .eq('id', id)
        .single();

      // Delete the post from the database
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // If there's a banner image, delete it from storage
      if (post?.banner_url) {
        const path = post.banner_url.split('/').pop();
        if (path) {
          await supabase.storage.from('portfolio-images').remove([path]);
        }
      }

      // Refresh the posts list
      fetchBlogPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleDeleteGroup = async (id: number) => {
    if (!confirm('Are you sure you want to delete this group? Posts in this group will be ungrouped.')) return;

    try {
      // First, ungroup all posts in this group
      await supabase
        .from('blog_posts')
        .update({ group_id: null })
        .eq('group_id', id);

      // Then delete the group
      const { error } = await supabase
        .from('blog_groups')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Refresh the groups list
      fetchAllBlogGroups();
      fetchBlogPosts();
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen w-screen flex flex-col items-center gap-8 relative py-24 px-8 overflow-x-hidden">
        <Navbar />
        <MobileNav />
        <div className="w-full max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl text-yellow-400 uppercase font-semibold">Admin Dashboard</h1>
            <div className="flex gap-4">
              {activeTab === 'posts' ? (
                <Link 
                  to="/admin/blog/new" 
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  <Plus size={18} /> New Post
                </Link>
              ) : (
                <Link 
                  to="/admin/group/new" 
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors flex items-center gap-2"
                >
                  <Plus size={18} /> New Group
                </Link>
              )}
              <button 
                onClick={handleLogout}
                className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors flex items-center gap-2"
              >
                <LogOut size={18} /> Logout
              </button>
            </div>
          </div>

          <div className="flex border-b border-gray-700 mb-6">
            <button
              onClick={() => setActiveTab('posts')}
              className={`py-2 px-4 flex items-center gap-2 ${activeTab === 'posts' ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-gray-400'}`}
            >
              <FileText size={16} /> Blog Posts
            </button>
            <button
              onClick={() => setActiveTab('groups')}
              className={`py-2 px-4 flex items-center gap-2 ${activeTab === 'groups' ? 'border-b-2 border-yellow-400 text-yellow-400' : 'text-gray-400'}`}
            >
              <Folder size={16} /> Blog Groups
            </button>
          </div>

          {activeTab === 'posts' ? (
            // Blog Posts Tab
            loadingPosts ? (
              <div className="text-center py-8">Loading...</div>
            ) : blogPosts.length === 0 ? (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-lg mb-4">No blog posts found</p>
                <Link 
                  to="/admin/blog/new" 
                  className="bg-yellow-400 text-black py-2 px-4 rounded hover:bg-yellow-500 transition-colors inline-flex items-center gap-2"
                >
                  <Plus size={18} /> Create your first post
                </Link>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="py-3 px-4 text-left">Title</th>
                      <th className="py-3 px-4 text-left">Date</th>
                      <th className="py-3 px-4 text-left">Group</th>
                      <th className="py-3 px-4 text-left">Tags</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogPosts.map((post) => (
                      <tr key={post.id} className="border-t border-gray-700">
                        <td className="py-3 px-4">{post.title}</td>
                        <td className="py-3 px-4">{new Date(post.created_at).toLocaleDateString()}</td>
                        <td className="py-3 px-4">
                          {post.group_id ? (
                            <span className="bg-blue-500 text-xs rounded-full px-2 py-1">
                              {(post as any).blog_groups?.name || 'Group'}
                            </span>
                          ) : (
                            <span className="text-gray-400">None</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1">
                            {post.tags.map((tag) => (
                              <span key={tag} className="bg-gray-700 text-xs rounded-full px-2 py-1">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex gap-2 justify-end">
                            <Link 
                              to={`/admin/blog/edit/${post.id}`}
                              className="bg-blue-500 p-1.5 rounded hover:bg-blue-600 transition-colors"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </Link>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="bg-red-500 p-1.5 rounded hover:bg-red-600 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          ) : (
            // Blog Groups Tab
            loadingGroups ? (
              <div className="text-center py-8">Loading...</div>
            ) : blogGroups.length === 0 ? (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <p className="text-lg mb-4">No blog groups found</p>
                <Link 
                  to="/admin/group/new" 
                  className="bg-yellow-400 text-black py-2 px-4 rounded hover:bg-yellow-500 transition-colors inline-flex items-center gap-2"
                >
                  <Plus size={18} /> Create your first group
                </Link>
              </div>
            ) : (
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="py-3 px-4 text-left">Name</th>
                      <th className="py-3 px-4 text-left">Description</th>
                      <th className="py-3 px-4 text-left">Slug</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogGroups.map((group) => (
                      <tr key={group.id} className="border-t border-gray-700">
                        <td className="py-3 px-4">{group.name}</td>
                        <td className="py-3 px-4">{group.description || '—'}</td>
                        <td className="py-3 px-4">{group.slug}</td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex gap-2 justify-end">
                            <Link 
                              to={`/admin/group/edit/${group.id}`}
                              className="bg-blue-500 p-1.5 rounded hover:bg-blue-600 transition-colors"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </Link>
                            <button
                              onClick={() => handleDeleteGroup(group.id)}
                              className="bg-red-500 p-1.5 rounded hover:bg-red-600 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default pageTransition(AdminDashboard); 