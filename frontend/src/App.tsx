import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/auth/Login";
import Register from './pages/auth/Register';
import Logout from './pages/auth/Logout';
import Profile from './pages/profile/Profile';
import ProfileEdit from './pages/profile/ProfileEdit';
import PrivateRoute from './components/PrivateRoute';
import PostsList from './pages/posts/PostsList';
import PostDetails from './pages/posts/PostDetails';
import CreatePost from './pages/posts/CreatePost';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route 
          path="/profile/edit" 
          element={
            <PrivateRoute>
              <ProfileEdit />
            </PrivateRoute>
          }
        />
        <Route 
          path="/posts" 
          element={
            <PrivateRoute>
              <PostsList />
            </PrivateRoute>
          }
        />
        <Route 
          path="/posts/:id" 
          element={
            <PrivateRoute>
              <PostDetails />
            </PrivateRoute>
          }
        />
        <Route 
          path="/posts/create" 
          element={
            <PrivateRoute>
              <CreatePost />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
