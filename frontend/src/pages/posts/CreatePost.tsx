import { ChangeEvent, FormEvent, useState } from "react";
import axiosClient from "../../api/axiosClient";
import { useNavigate } from "react-router-dom";

interface FormData {
  title: string;
  description: string;
  price: string;
}

const CreatePost: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    price: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    if (image) {
      data.append("image", image);
    }

    try {
      await axiosClient.post("posts/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/posts/");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Create Product</h1>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              className="w-full mt-1 p-2 border rounded-md"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              className="w-full mt-1 p-2 border rounded-md"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Price</label>
            <input
              name="price"
              className="w-full mt-1 p-2 border rounded-md"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Upload Image</label>
            <input
              type="file"
              name="image"
              className="w-full mt-1 p-2 border rounded-md"
              onChange={handleImageChange}
              required
            />
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
