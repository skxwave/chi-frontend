import axiosClient from "../../api/axiosClient";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
};

const PostDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axiosClient.get<Product>(`/posts/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) return <div className="text-center mt-10">Loading...</div>;

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
        <img src={product.image} alt={product.title} className="w-full h-64 object-cover rounded-md" />
        <p className="text-gray-700 mt-4">{product.description}</p>
        <p className="text-gray-700 mt-4">{product.price}</p>
      </div>
    </>
  );
};

export default PostDetails;