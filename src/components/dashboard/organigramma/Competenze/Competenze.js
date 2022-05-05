import React from 'react';

import {
  Avatar,
  Box,
  Button,
  CardHeader,
  Card,
  CardActions,
  CardContent,
  Typography,
  DialogTitle,
  IconButton,
  Divider
} from '@mui/material';


const Competenze = ({ user }) => {

  return (
      <Card style={{height: "350px"}} >
        <CardHeader title={<Typography  color="primary" variant="h6">Competenze</Typography>}  />
            <Divider />
        <CardContent>
        <Box p={3}>
          {user.competenze.map(competenza=>(
            <Box key={competenza} sx={{display: 'flex', justifyContent:"space-between", mb:"10px"}}>
              <Typography variant="overline">{competenza.nome}</Typography>
              <Typography variant="overline">{competenza.percentuale}%</Typography>
              {/* <CircularProgressWithLabel value={competenza.percentuale} /> */}
            </Box>
          ))}
        </Box>
        </CardContent>
     
      </Card>
  )
};



export default Competenze;
