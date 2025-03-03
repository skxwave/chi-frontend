import { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../../redux/store';
import { loginUser } from '../../redux/reducers/authSlice';
import { Paper, Typography, TextField, Button, Box, Container } from '@mui/material';

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: '',
  });
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/profile');
      }
    });
  };

  return (
    <Container maxWidth="xs">
      <Paper 
        elevation={3} 
        sx={{ 
          p: 5, 
          mt: 16,
          borderRadius: 3,
          bgcolor: 'primary.main',
          color: 'text.primary',
        }}
      >
        <Typography 
          variant="h4" 
          align="center" 
          gutterBottom
          sx={{ color: 'text.primary' }}
        >
          Sing In
        </Typography>
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            onChange={handleChange}
            value={formData.email}
            required
            margin="normal"
            variant="outlined"
            sx={{ label: { color: 'text.primary' } }} 
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            onChange={handleChange}
            value={formData.password}
            required
            margin="normal"
            variant="outlined"
            sx={{ label: { color: 'text.primary' } }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ 
              mt: 3, 
              mb: 2,
              bgcolor: 'secondary.main',
            }}
            onClick={handleSubmit}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;