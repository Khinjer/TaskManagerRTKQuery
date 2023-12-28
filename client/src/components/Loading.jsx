/*import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loading() {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
      }}
    >
      <CircularProgress color='secondary' />
    </Box>
  );
}*/
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function Loading() {
  return (
    <Box sx={{ width: '100%', m:'20px 0' }}>
      <LinearProgress color='primary' />
    </Box>
  );
}
