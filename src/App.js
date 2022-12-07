import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { AuthProvider } from './context/auth-context';

import LoginPage from './pages/LoginPage';
import PostAddPage from './pages/PostAddPage';
import PostUpdatePage from './pages/PostUpdatePage';
import ProfilePage from './pages/ProfilePage';
import UserDetailPage from './pages/UserDetailPage';
import RegisterPage from './pages/RegisterPage';
import SearchPage from './pages/SearchPage';
import DetailPost from './components/post/DetailPost';
import PrivateRoot from './components/privateRoute/PrivateRoot';
import HomePageObs from './pages/HomePageObs';

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              path="/"
              element={<PrivateRoot component={<HomePageObs />} />}
            ></Route>

            <Route
              path="/post-add"
              element={<PrivateRoot component={<PostAddPage />} />}
            ></Route>
            <Route
              path="/post-update/:id"
              element={<PrivateRoot component={<PostUpdatePage />} />}
            ></Route>
            <Route
              path="/profile"
              element={<PrivateRoot component={<ProfilePage />} />}
            ></Route>
            <Route
              path="/user/:id"
              element={<PrivateRoot component={<UserDetailPage />} />}
            ></Route>
            <Route
              path="/search"
              element={<PrivateRoot component={<SearchPage />} />}
            ></Route>
            <Route
              path="/post/:id"
              element={<PrivateRoot component={<DetailPost />} />}
            ></Route>
          </Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
