import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import About from './components/about/About'
import { Route } from 'react-router-dom'
import Layout from './Layout.jsx';
import  Home  from './components/home/Home.jsx'
import ProductOverview from './components/product overview/ProductOverview.jsx'
import ProductCart from './components/cart/ProductCart.jsx'
import CreatProductForm from './components/creat product form/CreatProductFrom'
import LoginForm from './components/loginform/LoginForm.jsx'
import Logins from './components/creat account/Creat Account.jsx'
import Admin from './components/admin/Admin.jsx'
import Notification from './components/notification/Notification.jsx'
import { CartProvider } from './components/contexts/CartContext.jsx';
import { ToastContainer } from 'react-toastify'
import CheckOut from './components/checkout/CheckOut.jsx'
import PackageManagmen from './components/package managment/PackageManagmen.jsx'
import CostomerDashboard from './components/Costomer/CostomerDashboard.jsx'
import ManageProduct from './components/manage product/ManageProduct.jsx'
import EditProduct from './components/editproducts/EditProduct.jsx'
import Neworder from './components/order/Neworder.jsx'
import Totalorder from './components/order/Totalorder.jsx'


import ReturnPolicy from './components/footerbutton/ReturnPolicy.jsx'
import Contactus from './components/footerbutton/Contactus.jsx'
import Aboutus from './components/footerbutton/Aboutus.jsx'
import TrackOrder from './components/footerbutton/TrackOrder.jsx'
import CertificateGenerator from './components/Certificate/CertificateGenerator.jsx'
import CertificateDataUploader from './components/Certificate/Certificatedatauplolader.jsx'
import CertificateVerifier from './components/Certificate/CertificateVerifier.jsx'
import TransferCertificate from './components/Certificate/TransferCertificate.jsx'
const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
     
      <Route path="about" element={<About/>}/>
      <Route path="" element={<Home/>}/>
      <Route path="/api/product/product-over-view/:id" element={<ProductOverview/>}/>
      <Route path="/product/cart" element={<ProductCart/>}/>
      <Route path="/product/cart" element={<Notification/>}/>
      <Route path="/checkout/:cartTotal" element={<CheckOut/>}/>
      <Route path="/package" element={<PackageManagmen/>}/>
      <Route path="/package-tracking" element={<CostomerDashboard/>}/>
      <Route path="login" element={<Logins/>}/>
      <Route path="create-account" element={<Logins/>}/>


      <Route path="admin/create-product" element={<CreatProductForm/>}/>
      <Route path="admin/manage-product" element={<ManageProduct/>}/>
      <Route path="/edit-product/:productId" element={<EditProduct/>}/>
      <Route path="admin/new-order" element={<Neworder/>}/>
      <Route path="admin/total-order" element={<Totalorder/>}/>
      <Route path="admin" element={<Admin/>}/>

      <Route path="track-order" element={<TrackOrder/>}/>
      <Route path="about-us" element={<Aboutus/>}/>
      <Route path="return-policy" element={<ReturnPolicy/>}/>
      <Route path="contact-us" element={<Contactus/>}/>
      
      <Route path="/generate-certificate" element={<CertificateGenerator/>}/>
     
      <Route path="save_certitificate-data" element={<CertificateDataUploader/>}/>
      <Route path="/verify-certificate" element={<CertificateVerifier/>}/>
      <Route path="/transfer-certificate" element={<TransferCertificate />} />

      
    
    
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>
      <CartProvider>
        {/* Move ToastContainer to the top level */}
        <ToastContainer />
        <Layout />
      </CartProvider>
    </RouterProvider>
  </React.StrictMode>
);