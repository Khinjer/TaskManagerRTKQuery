import { useState } from 'react';
import { Box, Typography, Button, InputBase } from '@mui/material';
import { useAddTodoMutation } from '../features/todos/todosApi';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import Loading from './Loading';

const AddTodo = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [addTask, result] = useAddTodoMutation();
  const navigate = useNavigate();

  const handleAddTask = () => {
    const newTask = {
      title,
      description,
    };
    addTask(newTask);
    navigate('/');
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
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
          boxShadow: '2px 3px 15px 2px rgba(0,0,0,0.2)',
          alignItems: 'center',
          p: 5,
          '& .MuiOutlinedInput-root': {
            color: (theme) => theme.palette.text.primary,
          },
        }}
      >
        <Typography
          mb={2}
          align='center'
          variant='h4'
        >
          Add Task Form
        </Typography>
        <InputBase
          fullWidth
          label='Title'
          type='text'
          name='title'
          id='title'
          placeholder='title'
          sx={{
            color: 'text.primary',
            border: '2px solid',
            borderColor: 'text.primary',
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
          name='description'
          id='description'
          sx={{
            color: 'text.primary',
            border: '2px solid',
            borderColor: 'text.primary',
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
            onClick={handleAddTask}
            variant='contained'
            endIcon={<SendIcon />}
          >
            Save
          </Button>
        </Box>
      </Box>
      {result.isLoading && <Loading />}
    </Box>
  );
};

export default AddTodo;
