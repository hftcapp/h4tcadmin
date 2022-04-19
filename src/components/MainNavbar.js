import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
// import Logo from './Logo';
import Logo from '../assets/logo.png';

const MainNavbar = props => (
  <AppBar style={{ backgroundColor: '#99CE85' }} elevation={0} {...props}>
    <Toolbar sx={{ height: 64 }}>
      <RouterLink to="/login">
        <img src={Logo} />
      </RouterLink>
    </Toolbar>
  </AppBar>
);

export default MainNavbar;
