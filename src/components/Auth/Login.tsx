import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import styles from './Authentication.module.css';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      setSnackbarMessage('Login realizado com sucesso!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      setSnackbarMessage('Falha no login. Verifique seu nome de usuário e senha.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <div className={styles.authenticationBox}>
      <Box
        component="main"
        sx={{
          maxWidth: '510px',
          ml: 'auto',
          mr: 'auto',
          padding: '30px 0 50px'
        }}
      >
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <Box>
            <Typography
              component="h1"
              fontSize="28px"
              fontWeight="700"
              mb="5px"
            >
              Entrar{' '}
            </Typography>

            <Typography fontSize="15px" mb="30px">
              Não tem uma conta?{' '}
              <Link
                to="/register"
                className={`${styles.primaryColor} ${styles['text-decoration-none']}`}
              >
                Cadastre-se
              </Link>
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit}>
              <Box
                sx={{
                  background: '#fff',
                  padding: '30px 20px',
                  borderRadius: '10px',
                  mb: '20px'
                }}
              >
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={12}>
                    <Typography
                      component="label"
                      sx={{
                        fontWeight: '500',
                        fontSize: '14px',
                        mb: '10px',
                        display: 'block'
                      }}
                    >
                      Nome de usuário
                    </Typography>

                    <TextField
                      required
                      fullWidth
                      id="userName"
                      label="Nome de usuário"
                      name="userName"
                      autoComplete="userName"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      InputProps={{
                        style: { borderRadius: 8 }
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      component="label"
                      sx={{
                        fontWeight: '500',
                        fontSize: '14px',
                        mb: '10px',
                        display: 'block'
                      }}
                    >
                      Senha
                    </Typography>

                    <TextField
                      required
                      fullWidth
                      name="password"
                      label="Senha"
                      type="password"
                      id="password"
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      InputProps={{
                        style: { borderRadius: 8 }
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  textTransform: 'capitalize',
                  borderRadius: '8px',
                  fontWeight: '500',
                  fontSize: '16px',
                  padding: '12px 10px',
                  color: '#fff !important'
                }}
              >
                Entrar
              </Button>
            </Box>
          </Box>
        </Grid>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </div>
  );
};

export default Login;
