import { Container } from '@mui/material';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Outlet />
      </Container>
    </>
  )
};

export default Layout;