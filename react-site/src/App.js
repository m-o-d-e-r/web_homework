import { Routes, Route } from 'react-router-dom';

import IndexPage from "./pages/IndexPage";
import CatalogPage from "./pages/CatalogPage";
import DetailViewPage from "./pages/DetailViewPage";
import AboutPage from "./pages/AboutPage";
import Loginpage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BasketPage from './pages/BasketPage';
import AdminPage from './pages/AdminPage';
import Logout from './components/Logout';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<DetailViewPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/registration" element={<SignupPage />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;
