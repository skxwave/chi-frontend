import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/auth/Login";
import Register from './pages/auth/Register';
import Profile from './pages/profile/Profile';
import ProfileEdit from './pages/profile/ProfileEdit';
import PrivateRoute from './components/PrivateRoute';
import PostsList from './pages/posts/PostsList';
import PostDetails from './pages/posts/PostDetails';
import CreatePost from './pages/posts/CreatePost';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/profile/edit" element={<ProfileEdit />}/>
            <Route path="/posts" element={<PostsList />}/>
            <Route path="/posts/:id" element={<PostDetails />}/>
            <Route path="/posts/create" element={<CreatePost />}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
