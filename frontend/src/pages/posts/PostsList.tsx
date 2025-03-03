import axiosClient from "../../api/axiosClient";
import { useState, useEffect } from "react";
import Post from "../../components/posts/Post";

interface Product {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
};

interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}

const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<Product[]>([])

  useEffect(() => {
    axiosClient.get<PaginatedResponse>("posts/")
      .then(response => setPosts(response.data.results))
      .catch(error => console.error("Error fetching posts:", error));
  }, []);

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Posts</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Post 
              key={post.id}
              id={post.id}
              description={post.description}
              image={post.image}
              price={post.price}
              title={post.title}
            />
          ))}
        </div>
      </div>
    </>
  )
};

export default PostsList;