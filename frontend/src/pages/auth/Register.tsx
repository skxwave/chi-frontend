import { useState, ChangeEvent, FormEvent } from 'react';
import axiosClient from '../../api/axiosClient';
import axios from 'axios';
import { Paper, Typography, TextField, Button, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface FormData {
  username: string,
  email: string,
  password: string,
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axiosClient.post('auth/register/', formData);
      navigate("/login")

    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data;

        if (typeof errorData === 'object' && errorData !== null) {
          const errorMessages = Object.entries(errorData)
            .map(([field, messages]) => {
              const messageText = Array.isArray(messages)
                ? messages.join(', ')
                : String(messages);
              return `${field}: ${messageText}`;
            })
            .join(' | ');

          setMessage(errorMessages);
          return;
        }
      }
      setMessage('Something went wrong...');
    }
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
          Register
        </Typography>
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            type="text"
            onChange={handleChange}
            value={formData.username}
            required
            margin="normal"
            variant="outlined"
            sx={{ label: { color: 'text.primary' } }} 
          />
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
            Register
          </Button>
          {message && <p style={{ color: "red" }}>{message}</p>}
        </Box>
      </Paper>
    </Container>
  );
};

export default Register;