import { useState, useEffect } from 'react';
import { Box, Typography, Button, InputBase } from '@mui/material';
import {
  useGetTodoByIdQuery,
  useEditTodoMutation,
} from '../features/todos/todosApi';
import { useNavigate, useParams } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import Loading from './Loading';

const EditTodo = () => {
  const { id } = useParams();
  const {
    data: todo = {},
    isLoading,
    isSuccess,
    isFetching,
  } = useGetTodoByIdQuery(id);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editTask, result] = useEditTodoMutation();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle(todo.title);
    setDescription(todo.description);
  }, [todo]);

  const handleCancel = () => {
    setTitle(todo.title);
    setDescription(todo.description);
  };

  const handleEditTask = () => {
    editTask({ id, title, description });
    navigate('/');
  };

  return (
    <Box
      height='90vh'
      sx={{
        width: {
          xs: '80%',
          sm: '600px',
          md: '960px',
        },
      }}
      display='flex'
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
    >
      <Box
        sx={{
          width: '100%',
          bgcolor: (theme) => theme.palette.background.alt,
          borderRadius: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '2px 3px 15px 2px rgba(0,0,0,0.2)',
          p: 5,
        }}
      >
        <Typography
          mb={2}
          align='center'
          variant='h4'
        >
          Edit Task Form
        </Typography>
        {isLoading && <Typography>Loading...</Typography>}
        {isSuccess && (
          <>
            <InputBase
              fullWidth
              label='Title'
              type='text'
              placeholder='title'
              sx={{
                color: (theme) => theme.palette.text.primary,
                border: '2px solid',
                borderColor: (theme) => theme.palette.text.primary,
                p: 2,
                borderRadius: 3,
              }}
              value={title || ''}
              onChange={(e) => setTitle(e.target.value)}
            />
            <InputBase
              fullWidth
              label='Description'
              type='text'
              sx={{
                color: (theme) => theme.palette.text.primary,
                border: '2px solid',
                borderColor: (theme) => theme.palette.text.primary,
                p: 2,
                borderRadius: 3,
              }}
              placeholder='description'
              variant='outlined'
              value={description || ''}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Box
              display='flex'
              justifyContent='flex-end'
              width='100%'
              gap={2}
            >
              <Button
                onClick={handleCancel}
                variant='contained'
                color='secondary'
              >
                Cancel
              </Button>
              <Button
                disabled={result.isLoading}
                onClick={handleEditTask}
                variant='contained'
                endIcon={<SendIcon />}
              >
                Save
              </Button>
            </Box>
          </>
        )}
      </Box>
      {result.isLoading || isFetching || (isLoading && <Loading />)}
    </Box>
  );
};

export default EditTodo;
