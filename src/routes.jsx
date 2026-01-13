import App from "./App.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import AboutPage from "./pages/AboutPage/AboutPage.jsx";
import LoginPage from "./pages/LoginPage/LoginPage.jsx";
import SignupPage from "./pages/SignupPage/SignupPage.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import PostPage from "./pages/PostPage/PostPage.jsx";
import CategoryPosts from "./pages/CategoryPosts/CategoryPosts.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/about", element: <AboutPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/post/:postId", element: <PostPage /> },
      { path: "/category/:categoryId", element: <CategoryPosts /> },
    ],
  },
];

export default routes;
