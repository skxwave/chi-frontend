import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { useNavigate } from 'react-router-dom';

interface FormData {
  age: string,
  bio: string,
  website: string,
  location: string,
  interests: string,
  birth_date: string,
}

const ProfileEdit: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    bio: '',
    website: '',
    location: '',
    interests: '',
    birth_date: '',
  });
  const [userImage, setUserImage] = useState<File | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosClient.get('profile/me/');
        setFormData({
          age: response.data.age,
          bio: response.data.bio,
          website: response.data.website,
          location: response.data.location,
          interests: response.data.interests,
          birth_date: response.data.birth_date,
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUserImage(e.target.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key as keyof FormData]) {
        data.append(key, formData[key as keyof FormData]);
      }
    });

    if (userImage) {
      data.append('avatar', userImage);
    }

    try {
      await axiosClient.put('profile/me/', data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate('/profile/');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-lg p-6 bg-white shadow-lg rounded-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Edit Profile</h1>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Upload avatar:</label>
            <input 
              type="file"
              name="avatar"
              onChange={handleImageChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700 mb-4"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Age:</label>
            <input
              type="number"
              name="age"
              value={formData.age || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Bio:</label>
            <textarea
              name="bio"
              value={formData.bio || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Website:</label>
            <input
              type="url"
              name="website"
              value={formData.website || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Interests:</label>
            <input
              type="text"
              name="interests"
              value={formData.interests || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Birth Date:</label>
            <input
              type="date"
              name="birth_date"
              value={formData.birth_date || ""}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfileEdit;
