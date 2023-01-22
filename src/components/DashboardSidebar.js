import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  Book,
  CreditCard,
  Scissors,
  AlignCenter,
  Link,
  Image
} from 'react-feather';
import NavItem from './NavItem';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Admin',
  name: 'Katarina Smith'
};

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/customers',
    icon: UsersIcon,
    title: 'Customers'
  },
  {
    href: '/app/products',
    icon: ShoppingBagIcon,
    title: 'Manage Products'
  },
  {
    href: '/app/quiz',
    icon: Book,
    title: 'Hair Profile Quiz'
  },
  {
    href: '/app/weekquiz',
    icon: Book,
    title: 'Week Quiz'
  },
  {
    href: '/app/monthquiz',
    icon: Book,
    title: 'Month Quiz'
  },
  {
    href: '/app/highscore',
    icon: Book,
    title: 'High Score products'
  },
  {
    href: '/app/midscore',
    icon: Book,
    title: 'Mid Score products'
  },
  {
    href: '/app/lowscore',
    icon: Book,
    title: 'Low Score products'
  },
  {
    href: '/app/quotes',
    icon: AlignCenter,
    title: 'Quotes'
  },
  {
    href: '/app/community',
    icon: UserIcon,
    title: 'Community'
  },
  // {
  //   href: '/app/payment',
  //   icon: CreditCard,
  //   title: 'Payment Details'
  // },

  {
    href: '/app/productssuggestion',
    icon: ShoppingBagIcon,
    title: 'Products Recommendations'
  },
  {
    href: '/app/salons',
    icon: Scissors,
    title: 'Salons Recommendation'
  },
  {
    href: '/app/styles',
    icon: Link,
    title: 'Styles Recommendations'
  },
  {
    href: '/app/appimages',
    icon: Image,
    title: 'App Images'
  },
  {
    href: '/app/suggestions',
    icon: AlignCenter,
    title: 'Suggestions'
  }
  // {
  //   href: '/404',
  //   icon: AlertCircleIcon,
  //   title: 'Error'
  // }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={window.localStorage.getItem('image')}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/account"
        />
        <Typography className="mt-2" color="textPrimary" variant="h5">
          {window.localStorage.getItem('username').toUpperCase()}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {window.localStorage.getItem('role').toUpperCase()}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map(item => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default DashboardSidebar;
