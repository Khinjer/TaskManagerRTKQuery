import Appbar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Routes, Route, Navigate } from 'react-router-dom';
import AddTodo from './components/AddTodo';
import TodosList from './components/TodosList';
import Todo from './components/Todo';
import EditTodo from './components/EditTodo';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { themeSettings } from './theme';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { IconButton } from '@mui/material';
import { toggleMode } from './state/themeSlice';

function App() {
  const navigate = useNavigate();
  const mode = useSelector((state) => state.theme.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const dispatch = useDispatch();

  return (
    <ThemeProvider theme={theme}>
      <Box
        className='app'
        sx={{
          height: '100%',
          backgroundColor: (theme) => theme.palette.background.default,

        }}
      >
        <Appbar
          position='sticky'
          sx={{
            color: theme.palette.primary.contrastText,
          }}
        >
          <Toolbar sx={{ width: '100%' }}>
            <Box
              display='flex'
              justifyContent='space-between'
              alignItems='center'
              width='100%'
            >
              <Box
                sx={{ cursor: 'pointer', color: theme.palette.secondary.main }}
                display='flex'
                alignItems='center'
                onClick={() => navigate('/')}
              >
                <ListAltIcon sx={{ mr: 2 }} />
                <Typography
                  textAlign='center'
                  variant='h5'
                  fontWeight='bold'
                  sx={{color: theme.palette.secondary.main}}
                >
                  TASK MANAGER
                </Typography>
              </Box>
              <Box
                display='flex'
                alignItems='center'
              >
                <IconButton
                  onClick={() => dispatch(toggleMode())}
                  sx={{ color: theme.palette.secondary.light }}
                >
                  {mode === 'dark' ? <DarkModeIcon /> : <LightModeIcon />}
                </IconButton>
              </Box>
            </Box>
          </Toolbar>
        </Appbar>
        <Box
          width='100%'
          display='flex'
          justifyContent='center'
          alignItems='center'
          flexDirection='column'
          sx={{ bgcolor: (theme) => theme.palette.background.default }}
        >
          <Routes>
            <Route
              path='/'
              element={<Navigate to='/todos' />}
            />
            <Route
              path='/todos'
              element={<TodosList />}
            />
            <Route
              path='/todos/:id'
              element={<Todo />}
            />
            <Route
              path='/addtodo'
              element={<AddTodo />}
            />
            <Route
              path='/edittodo/:id'
              element={<EditTodo />}
            />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
