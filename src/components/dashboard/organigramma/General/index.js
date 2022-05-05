import React from 'react';
import clsx from 'clsx';
import { Grid, Box, Typography, Card,   CardHeader, Divider } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ProfileDetails from './ProfileDetails';
import GeneralSettings from './GeneralSettings';
import CalendarUser from '../../../../pages/dashboard/calendarUser';



const General = ({ className, user, ...rest }) => {



  return (
    <Grid
      container
      spacing={3}
      style={{marginBottom:"30px"}}
      {...rest}
    >
      <Grid
        item
        lg={4}
        md={6}
        xl={3}
        xs={12}
      >
        <ProfileDetails user={user} />
      </Grid>
      <Grid
        item
        lg={8}
        md={6}
        xl={9}
        xs={12}
      >
        <GeneralSettings user={user} />
      </Grid>
      <Grid
        item
        lg={7}
        md={7}
        xl={7}
        xs={12}
      > 
        <Card>
        <CardHeader title={<Typography  color="primary" variant="h6">Su di me</Typography>}  />
        <Divider />
          <Box p={3}>
            <Typography>
              {user.descrizione}
            </Typography>
          </Box>
        </Card>               
      </Grid>
      <Grid item md={5}>
        <Card>
          <CardHeader title={<Typography  color="primary" variant="h6">Calendar</Typography>}  />
          <Divider />
          <CalendarUser />
        </Card>        
      </Grid>
    </Grid>
  );
}



export default General;
