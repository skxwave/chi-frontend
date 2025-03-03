import { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { logout } from '../../redux/reducers/authSlice';
import { Container, Paper } from '@mui/material';

interface ProfileData {
  age: string;
  bio: string;
  website: string;
  location: string;
  interests: string;
  birth_date: string;
  avatar?: string;
}

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosClient.get<ProfileData>('profile/me/');
        setProfileData(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <Container maxWidth="xl">
      <Paper
        elevation={3} 
        sx={{ 
          p: 5, 
          mt: 16,
          borderRadius: 3,
          bgcolor: 'primary.main',
          color: 'text.primary',
        }}
      >
          
      </Paper>
    </Container>
  );

    return (
        <>
            <div className="mx-auto max-w-lg p-6 bg-white shadow-lg rounded-2xl">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Profile</h1>
                {profileData ? (
                    <div className="space-y-4">
                        {profileData.avatar && (
                            <div className="flex justify-center">
                                <img
                                    src={profileData.avatar}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                                />
                            </div>
                        )}
                        <p className="text-lg">
                            <span className="font-semibold text-gray-700">Age: </span>
                            <span className="text-gray-700">{profileData.age}</span>
                        </p>
                        <p className="text-lg">
                            <span className="font-semibold text-gray-700">Bio: </span>
                            <span className="text-gray-700">{profileData.bio}</span>
                        </p>
                        <p className="text-lg">
                            <span className="font-semibold text-gray-700">Website: </span>{" "}
                            <a href={profileData.website} className="text-blue-600 hover:underline">
                            {profileData.website}
                            </a>
                        </p>
                        <p className="text-lg">
                            <span className="font-semibold text-gray-700">Location: </span>
                            <span className="text-gray-700">{profileData.location}</span>
                        </p>
                        <p className="text-lg">
                            <span className="font-semibold text-gray-700">Interests: </span>
                            <span className="text-gray-700">{profileData.interests}</span>
                        </p>
                        <p className="text-lg">
                            <span className="font-semibold text-gray-700">Birth Date: </span>
                            <span className="text-gray-700">{profileData.birth_date}</span>
                        </p>

                        <div className="flex justify-between mt-6">
                            <Link
                            to="/profile/edit/"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                            >
                                Edit Profile
                            </Link>
                            <a onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
                                Logout
                            </a>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">Loading...</p>
                )}
            </div>
        </>
    );
};

export default Profile;