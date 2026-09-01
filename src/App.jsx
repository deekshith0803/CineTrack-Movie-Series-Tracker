import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import Sidebar from "./components/layout/Sidebar/Sidebar";
import Footer from "./components/layout/Footer/Footer";
import Login from "./pages/auth/Login/Login";
import Register from "./pages/auth/Register/Register";
import Home from "./pages/user/Home/Home";
import Watchlist from "./pages/user/Watchlist/Watchlist";
import Favorites from "./pages/user/Favorites/Favorites";
import Profile from "./pages/user/Profile/Profile";
import MovieList from "./components/movie/MovieList/MovieList";
import MovieDetails from "./components/movie/MovieDetails/MovieDetails";
import ProtectedRoute from "./routes/ProtectedRoute";

const Layout = ({ children }) => {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  // Login and Register don't show Navbar/Sidebar/Footer
  if (isAuthPage) {
    return children;
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      <div className="flex min-h-[calc(100vh-80px)]">
        <Sidebar />

        <main className="flex-1 min-w-0">{children}</main>
      </div>

      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Authentication */}
          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          {/* Home */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <MovieList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/movie/:id"
            element={
              <ProtectedRoute>
                <MovieDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/watchlist"
            element={
              <ProtectedRoute>
                <Watchlist />
              </ProtectedRoute>
            }
          />

          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
                <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
              </div>
            }
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
