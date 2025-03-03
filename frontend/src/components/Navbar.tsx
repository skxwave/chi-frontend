import { useNavigate } from "react-router-dom";
import { logout } from "../redux/reducers/authSlice";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { AppBar, Toolbar, Typography, Box, Button, Container } from '@mui/material';

function Navbar() {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              React
            </Typography>
            { isAuthenticated ? (
              <>
                <Button color="inherit" onClick={() => navigate("/posts")}>Posts</Button>
                <Button color="inherit" onClick={() => navigate("/profile")}>Profile</Button>
                <Button color="inherit" onClick={handleLogout}>Logout</Button>
              </>
            ) : (
              <Button color="inherit">Login</Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Navbar;
