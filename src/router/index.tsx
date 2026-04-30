import { createBrowserRouter } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import ConsumerLayout from '../layouts/ConsumerLayout'
import HomePage from '../pages/HomePage'
import OrdersPage from '../pages/OrdersPage'
import ConsumerProductListPage from '../pages/ConsumerProductListPage'
import ConsumerOrderListPage from '../pages/ConsumerOrderListPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import NotFoundPage from '../pages/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/admin',
    element: <AdminLayout />,
    children: [
      {
        path: 'products',
        element: <HomePage />,
      },
      {
        path: 'orders',
        element: <OrdersPage />,
      },
    ],
  },
  {
    element: <ConsumerLayout />,
    children: [
      {
        path: '/',
        element: <ConsumerProductListPage />,
      },
      {
        path: '/my-orders',
        element: <ConsumerOrderListPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])

export default router
