import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import BlogLoadingPage from './pages/Blog/components/BlogLoadingPage'
import BlogPostView from './pages/Blog/components/BlogPostView'
import PostBytags from './pages/Blog/components/PostBytags'
import SearchPosts from './pages/Blog/components/SearchPosts'
import AdminLogin from './pages/Admin/components/AdminLogin'
import PrivateRoutes from './routes/PrivateRoutes'
import Dashboard from './pages/Admin/components/Dashboard'
import BlogPost from './pages/Admin/components/BlogPost'
import BlogPostEditor from './pages/Admin/components/BlogPostEditor'
import UserProvider from './context/userContext'
import Comment from './pages/Admin/components/Comment'

const App = () => {
 return (
  <UserProvider>
   <div>
    <Router>
     <Routes>
      {/* 1. Static Public Routes */}
      <Route path='/' element={<BlogLoadingPage />} />
      <Route path='/admin-login' element={<AdminLogin />} />
      <Route path='/search' element={<SearchPosts />} />
      <Route path='/tag/:tagName' element={<PostBytags />} />

      {/* 2. Admin Protected Routes */}
      <Route element={<PrivateRoutes allowedRoute={["admin"]} />}>
       <Route path='/admin/dashboard' element={<Dashboard />} />
       <Route path='/admin/posts' element={<BlogPost />} />
       <Route path='/admin/create' element={<BlogPostEditor />} />
       <Route path='/admin/edit/:postSlug' element={<BlogPostEditor isEdit={true} />} />
       <Route path='/admin/comments' element={<Comment />} />
      </Route>

      {/* 3. Dynamic / Wildcard Route ko sabse last me rakhein */}
      <Route path='/:slug' element={<BlogPostView />} />
     </Routes>
    </Router>

    <Toaster
     toastOptions={{
      className: "",
      style: {
       fontSize: "13px",
      },
     }}
    />
   </div>
  </UserProvider>
 )
}

export default App