import React from 'react';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import NextLink from 'next/link';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SchoolIcon from '@mui/icons-material/School';




const GeneralSettings = ({  user }) => {

  return (
          <Card >
            <CardHeader title={<Typography  color="primary" variant="h6">Ultimi corsi di Formazione</Typography>}  />
            <Divider />
            <CardContent>
            <Box p={3}>
              {user.corsi.map((corso, i)=>(
                  <Box key={i} sx={{display: 'flex', flexDirection:"column", mb: user.corsi.length == i+1 ? 0 : 3}}>
                    <div style={{display: 'flex', alignItems: 'center', gap:"5px"}}>
                    <AccessTimeIcon fontSize="small" />
                    <Typography variant="overline"  sx={{lineHeight:"0.5"}}>{corso.data}</Typography>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap:"5px"}}>
                    <SchoolIcon fontSize="small" />
                    <Typography variant="subtitle2" >{corso.nome}</Typography>
                    </div>
                    
                  </Box>
                ))}
            </Box>
            </CardContent>
            <Divider />
          </Card>
  );
};



export default GeneralSettings;
