import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { supabase, fetchBlogGroups, BlogGroup } from "../lib/supabaseClient";
import { Upload, X } from "react-feather";

interface BlogEditorProps {
  initialData?: {
    id?: number;
    title: string;
    subtitle: string;
    content: string;
    tags: string[];
    slug: string;
    banner_url: string;
    group_id: number | null;
  };
  isEdit?: boolean;
}

const BlogEditor = ({ initialData, isEdit = false }: BlogEditorProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [tags, setTags] = useState(initialData?.tags?.join(", ") || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [bannerUrl, setBannerUrl] = useState(initialData?.banner_url || "");
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [groupId, setGroupId] = useState<number | null>(initialData?.group_id || null);
  const [groups, setGroups] = useState<BlogGroup[]>([]);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Create a ref for the hidden file input
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Load blog groups
  useEffect(() => {
    const loadGroups = async () => {
      const blogGroups = await fetchBlogGroups();
      setGroups(blogGroups);
    };
    
    loadGroups();
  }, []);

  // Memoize the handleChange function
  const handleContentChange = useCallback((value: string) => {
    setContent(value);
  }, []);

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBannerFile(file);
      const previewUrl = URL.createObjectURL(file);
      setBannerUrl(previewUrl);
    }
  };

  const removeBanner = () => {
    setBannerFile(null);
    setBannerUrl("");
  };

  const uploadBanner = async (): Promise<string> => {
    if (!bannerFile) return bannerUrl;

    try {
      setUploading(true);

      // Create a unique file name
      const fileExt = bannerFile.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;

      // Upload the file to Supabase Storage
      const { data, error } = await supabase.storage
        .from("portfolio-images")
        .upload(fileName, bannerFile);

      if (error) throw error;

      // Get the public URL for the uploaded file
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("portfolio-images")
        .getPublicUrl(data?.path || "");

      return publicUrl;
    } catch (error) {
      console.error("Error uploading banner:", error);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const uploadImageFromMarkdownEditor = async (file: File): Promise<string> => {
    try {
      // Create a unique file name
      const fileExt = file.name.split(".").pop();
      const fileName = `md-${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;

      // Upload the file to Supabase Storage
      const { data, error } = await supabase.storage
        .from("portfolio-images")
        .upload(fileName, file);

      if (error) throw error;

      // Get the public URL for the uploaded file
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("portfolio-images")
        .getPublicUrl(data?.path || "");

      return publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      return "";
    }
  };

  // Handle manual image upload when clicking the image button
  const handleImageButtonClick = () => {
    // Trigger the hidden file input
    if (imageInputRef.current) {
      imageInputRef.current.click();
    }
  };

  // Process the selected image file
  const handleImageInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const url = await uploadImageFromMarkdownEditor(file);
      if (url) {
        // Get the SimpleMDE instance
        const editorElement = document
          .querySelector(".EasyMDEContainer")
          ?.querySelector(".CodeMirror");
        // Use type assertion with 'any' to safely access the CodeMirror property
        const editor = editorElement ? (editorElement as any).CodeMirror : null;

        if (editor) {
          // Insert the markdown for the image at the cursor position
          const imageMarkdown = `![${file.name}](${url})`;
          const doc = editor.getDoc();
          const cursor = doc.getCursor();
          doc.replaceRange(imageMarkdown, cursor);
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }

    // Reset the file input
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      if (!title || !content || !slug) {
        setError("Title, content, and slug are required");
        return;
      }

      // Process tags from comma-separated string to array
      const tagsArray = tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      // Upload banner if there's a new one
      let finalBannerUrl = bannerUrl;
      if (bannerFile) {
        finalBannerUrl = await uploadBanner();
      }

      const postData = {
        title,
        subtitle,
        content,
        tags: tagsArray,
        slug,
        banner_url: finalBannerUrl,
        group_id: groupId,
        created_at: new Date().toISOString(),
      };

      if (isEdit && initialData?.id) {
        // Update existing post
        const { error } = await supabase
          .from("blog_posts")
          .update(postData)
          .eq("id", initialData.id);

        if (error) throw error;
      } else {
        // Create new post
        const { error } = await supabase.from("blog_posts").insert([postData]);

        if (error) throw error;
      }

      // Redirect to admin dashboard
      navigate("/admin/dashboard");
    } catch (error: any) {
      console.error("Error saving post:", error);
      setError(error.message || "Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  // Configure SimpleMDE options - memoize to prevent re-renders
  const mdeOptions = useMemo(() => {
    return {
      spellChecker: false,
      autofocus: true,
      status: ["lines", "words"],
      toolbar: [
        "bold",
        "italic",
        "heading",
        "|",
        "quote",
        "unordered-list",
        "ordered-list",
        "|",
        "link",
        {
          name: "image",
          action: handleImageButtonClick,
          className: "fa fa-picture-o",
          title: "Insert Image",
        },
        "code",
        "table",
        "|",
        "preview",
        "side-by-side",
        "fullscreen",
        "|",
        "guide",
      ],
      previewImagesInEditor: true,
      uploadImage: true,
      imageUploadFunction: async (
        file: File,
        onSuccess: (url: string) => void,
        onError: (error: string) => void,
      ) => {
        try {
          const url = await uploadImageFromMarkdownEditor(file);
          if (url) {
            onSuccess(url);
          } else {
            onError("Failed to upload image");
          }
        } catch (error) {
          onError("Failed to upload image");
        }
      },
      previewRender: (plainText: string) => {
        // Custom preview rendering if needed
        return plainText; // Replace with custom rendering if needed
      },
      initialValue: content,
    };
  }, []); // Empty dependency array means this is only created once

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSave} className="flex flex-col gap-6">
        {error && (
          <div className="bg-red-500 text-white p-4 rounded">{error}</div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-yellow-400 font-semibold">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-gray-700 rounded p-2 text-white"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="slug" className="text-yellow-400 font-semibold">
              Slug
              <span className="text-gray-400 text-sm ml-2">
                (Used in URL: /blog/your-slug)
              </span>
            </label>
            <input
              type="text"
              id="slug"
              value={slug}
              onChange={(e) =>
                setSlug(
                  e.target.value
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-+|-+$/g, ""),
                )
              }
              className="bg-gray-700 rounded p-2 text-white"
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="subtitle" className="text-yellow-400 font-semibold">
            Subtitle
          </label>
          <input
            type="text"
            id="subtitle"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="bg-gray-700 rounded p-2 text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="tags" className="text-yellow-400 font-semibold">
              Tags
              <span className="text-gray-400 text-sm ml-2">
                (Comma separated)
              </span>
            </label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="bg-gray-700 rounded p-2 text-white"
              placeholder="React, Framer Motion, Web Development"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="group" className="text-yellow-400 font-semibold">
              Blog Group
            </label>
            <select
              id="group"
              value={groupId || ''}
              onChange={(e) => setGroupId(e.target.value ? Number(e.target.value) : null)}
              className="bg-gray-700 rounded p-2 text-white"
            >
              <option value="">No Group</option>
              {groups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-yellow-400 font-semibold">Banner Image</label>
          <div className="flex items-center gap-4">
            <label className="bg-gray-700 rounded p-2 text-white cursor-pointer hover:bg-gray-600 flex items-center gap-2">
              <Upload size={18} />
              <span>{bannerFile ? "Change Image" : "Upload Image"}</span>
              <input
                type="file"
                onChange={handleBannerChange}
                className="hidden"
                accept="image/*"
              />
            </label>

            {bannerUrl && (
              <button
                type="button"
                onClick={removeBanner}
                className="bg-red-500 rounded p-2 text-white hover:bg-red-600"
              >
                <X size={18} />
              </button>
            )}
          </div>

          {bannerUrl && (
            <div className="mt-2 relative">
              <img
                src={bannerUrl}
                alt="Banner preview"
                className="max-h-48 rounded object-contain bg-gray-900 p-2"
              />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="content" className="text-yellow-400 font-semibold">
            Content (Markdown)
          </label>
          <div className="prose-editor bg-gray-700 rounded">
            <SimpleMDE
              value={content}
              onChange={handleContentChange}
              options={mdeOptions as any}
              className="min-h-[400px]"
            />
            {/* Hidden file input for image upload */}
            <input
              type="file"
              ref={imageInputRef}
              onChange={handleImageInputChange}
              className="hidden"
              accept="image/*"
            />
          </div>
        </div>

        <div className="flex gap-4 justify-end mt-4">
          <button
            type="button"
            onClick={() => navigate("/admin/dashboard")}
            className="bg-gray-600 text-white py-2 px-6 rounded hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving || uploading}
            className="bg-yellow-400 text-black py-2 px-6 rounded hover:bg-yellow-500 transition-colors disabled:opacity-50"
          >
            {saving || uploading
              ? "Saving..."
              : isEdit
                ? "Update Post"
                : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;
