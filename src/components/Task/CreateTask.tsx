import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  TextField,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
    Clear as ClearIcon,
    Add as AddIcon,
  } from '@mui/icons-material';
import PropTypes from 'prop-types';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

function BootstrapDialogTitle(props: {
  [x: string]: any;
  children: any;
  onClose: any;
}) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
          }}
        >
          <ClearIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired
};

interface CreateTaskProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({ open, onClose, onSubmit }) => {
  return (
    <BootstrapDialog onClose={onClose} aria-labelledby="customized-dialog-title" open={open}>
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#EDEFF5',
            borderRadius: '8px',
            padding: '20px 20px'
          }}
        >
          <Typography variant="h6" component="h2" sx={{ fontWeight: '500', fontSize: '20px' }}>
            Adicionar tarefa
          </Typography>

          <IconButton aria-label="remove" size="small" onClick={onClose}>
            <ClearIcon />
          </IconButton>
        </Box>

        <Box component="form" noValidate onSubmit={onSubmit}>
          <Box
            sx={{
              background: '#fff',
              padding: '20px 20px',
              borderRadius: '8px'
            }}
          >
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={12}>
                <Typography component="h5" sx={{ fontWeight: '500', fontSize: '14px', mb: '12px' }}>
                  Título
                </Typography>

                <TextField
                  autoComplete="title"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  autoFocus
                  InputProps={{ style: { borderRadius: 8 } }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography component="h5" sx={{ fontWeight: '500', fontSize: '14px', mb: '12px' }}>
                  Descrição
                </Typography>

                <TextField
                  autoComplete="description"
                  name="description"
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  InputProps={{ style: { borderRadius: 8 } }}
                />
              </Grid>

              <Grid item xs={12} textAlign="end">
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    mt: 1,
                    textTransform: 'capitalize',
                    borderRadius: '8px',
                    fontWeight: '500',
                    fontSize: '13px',
                    padding: '12px 20px',
                    color: '#fff !important'
                  }}
                  onClick={onClose}
                  className="mr-15px"
                >
                  <ClearIcon sx={{ position: 'relative', top: '-1px' }} />{' '}
                  Cancelar
                </Button>

                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 1,
                    textTransform: 'capitalize',
                    borderRadius: '8px',
                    fontWeight: '500',
                    fontSize: '13px',
                    padding: '12px 20px',
                    color: '#fff !important'
                  }}
                >
                  <AddIcon sx={{ position: 'relative', top: '-1px' }} /> Criar
                  Tarefa
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </BootstrapDialog>
  );
};

CreateTask.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default CreateTask;
