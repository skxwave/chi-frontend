
interface PostProps {
  id: number;
  image: string;
  title: string;
  description: string;
  price: number;
}

const Post: React.FC<PostProps> = ({ id, image, title, description, price }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-md" />
      <h2 className="text-xl font-semibold mt-2">{title}</h2>
      <p className="text-gray-600 text-sm mt-1">{description}</p>
      <p className="text-gray-600 text-sm mt-1">{price}</p>
      <div className="mt-4 flex justify-between">
        <a href={id ? `/posts/${id}` : "#"} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">View Details</a>
        <a className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">Add to cart</a>
      </div>
    </div>
  )
};

export default Post;