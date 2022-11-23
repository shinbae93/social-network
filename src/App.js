import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { AuthProvider } from './context/auth-context';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PostAddPage from './pages/PostAddPage';

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/post-add" element={<PostAddPage />}></Route>
          </Route>
          <Route path="/login" element={<LoginPage />}></Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
