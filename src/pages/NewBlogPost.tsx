import Navbar from '../components/Navbar';
import MobileNav from '../components/MobileNav';
import pageTransition from '../components/pageTransition';
import BlogEditor from '../components/BlogEditor';
import ProtectedRoute from '../components/ProtectedRoute';

const NewBlogPost = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen w-screen flex flex-col items-center gap-8 relative py-24 px-8 overflow-x-hidden">
        <Navbar />
        <MobileNav />
        <div className="w-full max-w-6xl">
          <h1 className="text-4xl text-yellow-400 uppercase font-semibold mb-8">Create New Blog Post</h1>
          <BlogEditor />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default pageTransition(NewBlogPost); 