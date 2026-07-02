import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Journal from './pages/Journal';
import BlogPost from './pages/BlogPost';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/journal/:slug" element={<BlogPost />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
}
