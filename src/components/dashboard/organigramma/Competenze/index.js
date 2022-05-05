import React from 'react';
import clsx from 'clsx';
import { Grid, Box, Typography, Card,   CardHeader, Divider } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import CompetenzeComponent from './Competenze';
import Corsi from './Corsi';
import Skeleton from '@mui/material/Skeleton';



const Competenze = ({ className, user, ...rest }) => {



  return (
    <Grid
      container
      spacing={3}
      style={{marginBottom:"30px"}}
      {...rest}
    >
      <Grid
        item
        lg={6}
        md={6}
        xl={6}
        xs={12}
      >
        <CompetenzeComponent user={user} />
      </Grid>
      <Grid
        item
        lg={6}
        md={6}
        xl={6}
        xs={12}
      >
        <Corsi user={user} />
      </Grid>
      <Grid
        item
        lg={12}
        md={12}
        xl={12}
        xs={12}
      > 
        <Card>
        <CardHeader title={<Typography  color="primary" variant="h6">Certificazioni/Open badge</Typography>}  />
        <Divider />
        <Box p={3}>
          <Box sx={{display: 'flex',  gap:"30px"}}>
                <img src="/static/badges/badge1.png" style={{width:50, height:50}} />
                <img src="/static/badges/badge2.png" style={{width:50, height:50}} />
                <img src="/static/badges/badge3.png" style={{width:50, height:50}} />
                <img src="/static/badges/badge4.png" style={{width:50, height:50}} />
                <Skeleton variant="rectangular" width={50} height={50} />
                <Skeleton variant="rectangular" width={50} height={50} />
                {/* <img src="/static/badges/google.png" style={{width:70, height:70}} /> */}
                <Skeleton variant="rectangular" width={50} height={50} />
                <Skeleton variant="rectangular" width={50} height={50} />
                <Skeleton variant="rectangular" width={50} height={50} />
          </Box>
        </Box>
        </Card>               
      </Grid>
      
    </Grid>
  );
}



export default Competenze;
