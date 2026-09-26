import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import BlogLoadingPage from './pages/Blog/components/BlogLoadingPage'
import BlogPostView from './pages/Blog/components/BlogPostView'
import PostBytags from './pages/Blog/components/PostBytags'
import SearchPosts from './pages/Blog/components/SearchPosts'
import AdminLogin from './pages/Admin/components/adminLogin'
import PrivateRoutes from './routes/PrivateRoutes'
import Dashboard from './pages/Admin/components/Dashboard'
import BlogPost from './pages/Admin/components/BlogPost'
import BlogPostEditor from './pages/Admin/components/BlogPostEditor'

const App = () => {
 return (
  <div>
   <Router>
    <Routes>
     {/* Default Routes */}
     <Route path='/' element={<BlogLoadingPage />} />
     <Route path='/:slug' element={<BlogPostView />} />
     <Route path='/tag/:tagName' element={<PostBytags />} />
     <Route path='/search' element={<SearchPosts />} />

     {/* Admin Routes */}
     <Route element={<PrivateRoutes allowedRoute={["admin"]} />}>
      <Route path='/admin/dashboard' element={<Dashboard />} />
      <Route path='/admin/posts' element={<BlogPost />} />
      <Route path='/admin/create' element={<BlogPostEditor />} />
      <Route path='/admin/edit/:postSlug' element={<BlogPostEditor isEdit={true} />} />
      <Route path='/admin/comments' element={<AdminLogin />} />
     </Route>

     <Route path='/admin-login' element={<AdminLogin />} />

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
 )
}

export default App