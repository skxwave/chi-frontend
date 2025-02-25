import axiosClient from "../../api/axiosClient";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";

interface Product {
    id: number;
    title: string;
    description: string;
    image: string;
    price: number;
};

const PostsList: React.FC = () => {
    const [posts, setPosts] = useState<Product[]>([])

    useEffect(() => {
        axiosClient.get<Product[]>("posts/")
            .then(response => setPosts(response.data))
            .catch(error => console.error("Error fetching posts:", error));
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold text-center mb-6">Product List</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                    <div key={post.id} className="bg-white rounded-lg shadow-lg p-4">
                        <img src={post.image} alt={post.title} className="w-full h-48 object-cover rounded-md" />
                        <h2 className="text-xl font-semibold mt-2">{post.title}</h2>
                        <p className="text-gray-600 text-sm mt-1">{post.description}</p>
                        <p className="text-gray-600 text-sm mt-1">{post.price}</p>
                        <div className="mt-4 flex justify-between">
                            <a href={post.id ? `/posts/${post.id}` : "#"} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">View Details</a>
                            <a className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Add to cart</a>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </>
    )
};

export default PostsList;