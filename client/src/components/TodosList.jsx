import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
  Divider,
  ButtonGroup,
  Stack,
} from '@mui/material';
import {
  useGetTodosQuery,
  useDeleteTodoMutation,
  useEditTodoStatusMutation,
} from '../features/todos/todosApi';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskIcon from '@mui/icons-material/Task';
import SendIcon from '@mui/icons-material/Send';
import Loading from './Loading';

const TodosList = () => {
  const navigate = useNavigate();
  const {
    data = [],
    isError,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetTodosQuery();
  const [deleteTodo, { IsLoading: deleteIsLoading }] = useDeleteTodoMutation();

  const [editStatus] = useEditTodoStatusMutation();

  const contentCondition = isSuccess && data.length > 0;
  return (
    <Box
      my={10}
      sx={{
        width: {
          xs: '100%',
          sm: '600px',
          md: '960px',
        },
      }}
      display='flex'
      flexDirection='column'
    >
      <Typography
        mb={5}
        align='center'
        variant='h4'
        fontWeight='bold'
        textTransform='uppercase'
      >
        Task List
      </Typography>
      <List
        sx={{
          width: '100%',
          bgcolor: (theme) => theme.palette.background.alt,
          boxShadow: '2px 3px 15px 2px rgba(0,0,0,0.2)',
          borderRadius: 3,
        }}
      >
        {data.length === 0 && (
          <Typography textAlign='center'>No todos </Typography>
        )}
        {isError && <Box>ERROR</Box>}
       
        {contentCondition &&
          data.map((item) => (
            <Box key={item._id}>
              <ListItem
                sx={{
                  display: 'flex',
                  gap: 5,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  p: 5,
                  flexDirection: {
                    xs: 'column',
                    md: 'row',
                  },
                }}
              >
                <ListItemText
                  sx={{
                    textDecoration: item.status ? 'line-through' : 'unset',
                  }}
                  primary={<Typography variant='h6'>{item.title}</Typography>}
                  secondary={
                    <Typography
                      sx={{ display: 'inline' }}
                      component='span'
                      variant='body2'
                      color='secondary.dark'
                    >
                      {item.description}
                    </Typography>
                  }
                ></ListItemText>
                <ButtonGroup variant=''>
                  <Button
                    size='small'
                    variant='contained'
                    sx={{ mr: 1 }}
                    onClick={() => navigate(`/editTodo/${item._id}`)}
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                  <Button
                    size='small'
                    variant='contained'
                    color='warning'
                    sx={{ mr: 1 }}
                    onClick={() =>
                      editStatus({ id: item._id, status: !item.status })
                    }
                    startIcon={<TaskIcon />}
                  >
                    Done?
                  </Button>
                  <Button
                    size='small'
                    variant='contained'
                    color='error'
                    disabled={deleteIsLoading}
                    onClick={() => deleteTodo(item._id)}
                    startIcon={<DeleteIcon />}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </ListItem>
              {<Divider />}
            </Box>
          ))}
        <Stack
          justifyContent='center'
          alignItems='center'
          m='50px 0'
        >
          <Button
            variant='contained'
            color='success'
            onClick={() => navigate('/addTodo')}
            endIcon={<SendIcon sx={{ ml: 1 }} />}
          >
            Add Task
          </Button>
        </Stack>
      </List>
      {(isLoading || isFetching) && <Loading />}
    </Box>
  );
};

export default TodosList;
