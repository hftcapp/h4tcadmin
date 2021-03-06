import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import CustomerList from 'src/pages/CustomerList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';
import Quiz from 'src/pages/Quiz';
import Weekquiz from 'src/pages/Weekquiz';
import Monthquiz from 'src/pages/Monthquiz';
import Community from 'src/pages/Community';
import Paymentdetails from 'src/pages/Paymentdetails';
import Quotes from 'src/pages/Quotes';
import Productrecommendation from 'src/pages/Productrecommendation';
import Salonsrecommendation from 'src/pages/Salonsrecommendation';
import Stylerecommendation from 'src/pages/Stylerecommendation';
import Highscore from 'src/pages/Highscore';
import Midscore from 'src/pages/Midscore';
import Lowscore from 'src/pages/Lowscore';
import Appimages from 'src/pages/Appimages';
import Suggestions from 'src/pages/Suggestions';

export const Authroutes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <Settings /> },
      { path: 'quiz', element: <Quiz /> },
      { path: 'weekquiz', element: <Weekquiz /> },
      { path: 'monthquiz', element: <Monthquiz /> },
      { path: 'highscore', element: <Highscore /> },
      { path: 'midscore', element: <Midscore /> },
      { path: 'lowscore', element: <Lowscore /> },

      { path: 'community', element: <Community /> },
      { path: 'appimages', element: <Appimages /> },
      { path: 'quotes', element: <Quotes /> },
      { path: 'productssuggestion', element: <Productrecommendation /> },
      { path: 'salons', element: <Salonsrecommendation /> },
      { path: 'styles', element: <Stylerecommendation /> },
      { path: 'suggestions', element: <Suggestions /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export const UnAuthroutes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/login" /> }
    ]
  }
];

// export default routes;
