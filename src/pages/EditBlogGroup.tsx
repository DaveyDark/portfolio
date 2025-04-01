import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MobileNav from '../components/MobileNav';
import pageTransition from '../components/pageTransition';
import ProtectedRoute from '../components/ProtectedRoute';
import { supabase, BlogGroup } from '../lib/supabaseClient';

const EditBlogGroup = () => {
  const { id } = useParams<{ id: string }>();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [originalSlug, setOriginalSlug] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchGroup(Number(id));
    } else {
      navigate('/admin/dashboard');
    }
  }, [id, navigate]);

  const fetchGroup = async (groupId: number) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('blog_groups')
        .select('*')
        .eq('id', groupId)
        .single();
      
      if (error) throw error;
      
      if (!data) {
        navigate('/admin/dashboard');
        return;
      }
      
      setName(data.name);
      setDescription(data.description || '');
      setSlug(data.slug);
      setOriginalSlug(data.slug);
    } catch (error: any) {
      console.error('Error fetching blog group:', error);
      setError(error.message || 'Failed to fetch blog group');
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (text: string): string => {
    return text.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    
    // Only auto-generate if slug is empty or was auto-generated from the previous name
    if (!slug || slug === generateSlug(name)) {
      setSlug(generateSlug(newName));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !slug) {
      setError('Name and slug are required');
      return;
    }
    
    try {
      setSaving(true);
      setError('');
      
      const groupData = {
        name,
        description,
        slug
      };
      
      const { error: supabaseError } = await supabase
        .from('blog_groups')
        .update(groupData)
        .eq('id', id);
      
      if (supabaseError) throw supabaseError;
      
      navigate('/admin/dashboard');
    } catch (err: any) {
      console.error('Error updating blog group:', err);
      setError(err.message || 'Failed to update blog group');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen w-screen flex flex-col items-center gap-8 relative py-24 px-8 overflow-x-hidden">
          <Navbar />
          <MobileNav />
          <div className="text-center py-8">Loading...</div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen w-screen flex flex-col items-center gap-8 relative py-24 px-8 overflow-x-hidden">
        <Navbar />
        <MobileNav />
        <div className="w-full max-w-6xl">
          <h1 className="text-4xl text-yellow-400 uppercase font-semibold mb-8">Edit Blog Group</h1>
          
          <div className="bg-gray-800 rounded-lg p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {error && (
                <div className="bg-red-500 text-white p-4 rounded">
                  {error}
                </div>
              )}
              
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-yellow-400 font-semibold">
                  Group Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  className="bg-gray-700 rounded p-2 text-white"
                  required
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="slug" className="text-yellow-400 font-semibold">
                  Slug
                  <span className="text-gray-400 text-sm ml-2">
                    (Used in URL: /blog/group/your-slug)
                  </span>
                </label>
                <input
                  type="text"
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(generateSlug(e.target.value))}
                  className="bg-gray-700 rounded p-2 text-white"
                  required
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-yellow-400 font-semibold">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-gray-700 rounded p-2 text-white min-h-[100px]"
                  rows={4}
                />
              </div>
              
              <div className="flex gap-4 justify-end mt-4">
                <button
                  type="button"
                  onClick={() => navigate('/admin/dashboard')}
                  className="bg-gray-600 text-white py-2 px-6 rounded hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-yellow-400 text-black py-2 px-6 rounded hover:bg-yellow-500 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Update Group'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default pageTransition(EditBlogGroup); 