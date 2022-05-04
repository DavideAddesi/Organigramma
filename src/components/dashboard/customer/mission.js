import {  Card, Typography, Box } from '@mui/material';

export const Mission = (props) => {
  const { mission, bgColor } = props;

  return (
    <Card sx={{backgroundColor:bgColor}}>
      <Box p={3}>
        <Typography>
          {mission}
        </Typography>
      </Box>
    </Card>
  );
};


