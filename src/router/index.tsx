import { createBrowserRouter } from 'react-router-dom'
import AdminLayout from '../layouts/AdminLayout'
import ConsumerLayout from '../layouts/ConsumerLayout'
import HomePage from '../pages/HomePage'
import OrdersPage from '../pages/OrdersPage'
import ConsumerProductListPage from '../pages/ConsumerProductListPage'
import ConsumerProductDetailPage from '../pages/ConsumerProductDetailPage'
import ConsumerCartPage from '../pages/ConsumerCartPage'
import ConsumerOrderListPage from '../pages/ConsumerOrderListPage'
import ConsumerFavoritesPage from '../pages/ConsumerFavoritesPage'
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
        path: '/products/:id',
        element: <ConsumerProductDetailPage />,
      },
      {
        path: '/cart',
        element: <ConsumerCartPage />,
      },
      {
        path: '/my-orders',
        element: <ConsumerOrderListPage />,
      },
      {
        path: '/favorites',
        element: <ConsumerFavoritesPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])

export default router
