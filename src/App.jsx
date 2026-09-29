import React, { useEffect } from "react";
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
import SeriesList from "./components/series/SeriesList/SeriesList";
import SeriesDetails from "./components/series/SeriesDetails/SeriesDetails";
import CurrentlyWatching from "./pages/user/CurrentlyWatching/CurrentlyWatching";
import Completed from "./pages/user/Completed/Completed";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./utils/authStorage";
import { finishLoading, login } from "./redux/slices/authSlice";
import UserLayout from "./layouts/UserLayout/UserLayout";
import NotFound from "./pages/NotFound/NotFound";
import AdminLayout from "./layouts/AdminLayout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard/Dashboard";
import AdminRoute from "./routes/AdminRoute";
import AdminProfile from "./pages/admin/AdminProfile/AdminProfile";


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      dispatch(login(currentUser));
    } else {
      dispatch(finishLoading());
    }
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* user routes */}
        <Route
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />

          <Route path="/movies" element={<MovieList />} />

          <Route path="/movie/:id" element={<MovieDetails />} />

          <Route path="/series" element={<SeriesList />} />

          <Route path="/series/:id" element={<SeriesDetails />} />

          <Route path="/watchlist" element={<Watchlist />} />

          <Route path="/favorites" element={<Favorites />} />

          <Route
            path="/currently-watching"
            element={<CurrentlyWatching />}
          />

          <Route path="/completed" element={<Completed />} />

          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={
            <NotFound />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
