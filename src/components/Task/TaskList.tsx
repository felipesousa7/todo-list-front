import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import {
  Box,
  Typography,
  Card,
  IconButton,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  Tooltip,
  Button
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import {
  FirstPage as FirstPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage as LastPageIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  DriveFileRenameOutline as DriveFileRenameOutlineIcon
} from '@mui/icons-material';
import CreateTask from './CreateTask';
import EditTask from './EditTask';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const theme = useTheme();

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await api.get('/tasks');
      setTasks(response.data);
    };

    fetchTasks();
  }, []);

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setPage(0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(tasks.length / rowsPerPage) - 1)
    );
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setPage(Math.max(0, Math.ceil(tasks.length / rowsPerPage) - 1));
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleClickOpenEdit = (task: Task) => {
    setSelectedTask(task);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedTask(null);
  };

  const handleSubmitCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      title: data.get('title'),
      description: data.get('description')
    });
  };

  const handleSubmitEdit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      id: selectedTask?.id,
      title: data.get('title'),
      description: data.get('description')
    });
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tasks.length) : 0;

  return (
    <Box sx={{ height: '90vh', padding: '16px' }}>
    <Card
      sx={{
        height:'100%',
        boxShadow: 'none',
        borderRadius: '10px',
        p: '25px 20px 15px',
        mb: '15px'
      }}
    >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #EEF0F7',
            paddingBottom: '10px',
            mb: '20px'
          }}
        >
          <Typography
            component="h3"
            sx={{
              fontSize: 18,
              fontWeight: 500
            }}
          >
            Minhas tarefas
          </Typography>
        </Box>
        <Button
          onClick={handleClickOpenCreate}
          variant="contained"
          sx={{
            textTransform: 'capitalize',
            borderRadius: '8px',
            fontWeight: '500',
            fontSize: '13px',
            padding: '12px 20px',
            color: '#fff !important'
          }}
        >
          <AddIcon sx={{ position: 'relative', top: '-1px' }} /> Adicionar tarefa
        </Button>

        <TableContainer component={Paper} sx={{ boxShadow: 'none'}}>
          <Table sx={{ minWidth: 730 }} aria-label="custom pagination table">
            <TableHead sx={{ background: '#F7FAFF' }}>
              <TableRow>
                <TableCell
                  sx={{ borderBottom: '1px solid #F7FAFF', fontSize: '13.5px' }}
                >
                  Titulo
                </TableCell>
                <TableCell
                  sx={{ borderBottom: '1px solid #F7FAFF', fontSize: '13.5px' }}
                >
                  Descrição
                </TableCell>
                <TableCell
                  sx={{ borderBottom: '1px solid #F7FAFF', fontSize: '13.5px' }}
                >
                  Status
                </TableCell>
                <TableCell
                  align="right"
                  sx={{ borderBottom: '1px solid #F7FAFF', fontSize: '13.5px' }}
                >
                  Ações
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(rowsPerPage > 0
                ? tasks.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : tasks
              ).map((task) => (
                <TableRow key={task.id}>
                  <TableCell
                    sx={{
                      fontWeight: '500',
                      fontSize: '13px',
                      borderBottom: '1px solid #F7FAFF'
                    }}
                  >
                    <Checkbox size="small" checked={task.completed} />
                    {task.title}
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: '1px solid #F7FAFF', fontSize: '13px' }}
                  >
                    {task.description}
                  </TableCell>
                  <TableCell
                    sx={{ borderBottom: '1px solid #F7FAFF', fontSize: '13px' }}
                  >
                    {task.completed ? 'Completed' : 'Pending'}
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ borderBottom: '1px solid #F7FAFF' }}
                  >
                    <Box sx={{ display: 'inline-block' }}>
                      <Tooltip title="Remove" placement="top">
                        <IconButton
                          aria-label="remove"
                          size="small"
                          color="error"
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Rename" placement="top">
                        <IconButton
                          aria-label="rename"
                          size="small"
                          color="primary"
                          onClick={() => handleClickOpenEdit(task)}
                        >
                          <DriveFileRenameOutlineIcon fontSize="inherit" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell
                    colSpan={4}
                    style={{ borderBottom: '1px solid #F7FAFF' }}
                  />
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={4}
                  count={tasks.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'Tarefas por página'
                    },
                    native: true
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={(props) => (
                    <Box sx={{  display: 'flex' }}>
                      <IconButton
                        onClick={handleFirstPageButtonClick}
                        disabled={props.page === 0}
                        aria-label="first page"
                      >
                        {theme.direction === 'rtl' ? (
                          <LastPageIcon />
                        ) : (
                          <FirstPageIcon />
                        )}
                      </IconButton>
                      <IconButton
                        onClick={handleBackButtonClick}
                        disabled={props.page === 0}
                        aria-label="previous page"
                      >
                        {theme.direction === 'rtl' ? (
                          <KeyboardArrowRight />
                        ) : (
                          <KeyboardArrowLeft />
                        )}
                      </IconButton>
                      <IconButton
                        onClick={handleNextButtonClick}
                        disabled={
                          props.page >=
                          Math.ceil(props.count / props.rowsPerPage) - 1
                        }
                        aria-label="next page"
                      >
                        {theme.direction === 'rtl' ? (
                          <KeyboardArrowLeft />
                        ) : (
                          <KeyboardArrowRight />
                        )}
                      </IconButton>
                      <IconButton
                        onClick={handleLastPageButtonClick}
                        disabled={
                          props.page >=
                          Math.ceil(props.count / props.rowsPerPage) - 1
                        }
                        aria-label="last page"
                      >
                        {theme.direction === 'rtl' ? (
                          <FirstPageIcon />
                        ) : (
                          <LastPageIcon />
                        )}
                      </IconButton>
                    </Box>
                  )}
                  style={{ borderBottom: 'none' }}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Card>

      <CreateTask open={openCreate} onClose={handleCloseCreate} onSubmit={handleSubmitCreate} />
      {selectedTask && (
        <EditTask open={openEdit} onClose={handleCloseEdit} onSubmit={handleSubmitEdit} task={selectedTask} />
      )}
    </Box>
  );
};

export default TaskList;
