import {  Card, Typography, Box } from '@mui/material';

export const Mission = (props) => {
  const { mission } = props;

  return (
    <Card>
      <Box p={3}>
        <Typography>
          {mission}
        </Typography>
      </Box>
    </Card>
  );
};


