import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { AuthProvider } from './context/auth-context';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PostAddPage from './pages/PostAddPage';
import PostUpdatePage from './pages/PostUpdatePage';
import ProfilePage from './pages/ProfilePage';
import UserDetailPage from './pages/UserDetailPage';
import RegisterPage from './pages/RegisterPage';
import SearchPage from './pages/SearchPage';
import DetailPost from './components/post/DetailPost';

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/post-add" element={<PostAddPage />}></Route>
            <Route path="/post-update/:id" element={<PostUpdatePage />}></Route>
            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route path="/user/:id" element={<UserDetailPage />}></Route>
            <Route path="/search" element={<SearchPage />}></Route>
            <Route path="/post/:id" element={<DetailPost />}></Route>
          </Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
