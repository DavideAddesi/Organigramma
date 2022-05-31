import React from 'react';
import clsx from 'clsx';
import { Grid, Box, Typography, Card,   CardHeader, Divider, Chip, Button } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link'
import ProfileDetails from '../General/ProfileDetails';



const Competenze = ({ className, user, ...rest }) => {
  const handleClick = () => {
    console.info('You clicked the Chip.');
  };


  return (
    <Grid
      container
      spacing={3}
      style={{marginBottom:"30px"}}
      {...rest}
    >
      {/* <Grid
        item
        // lg={4}
        md={4}
        // xl={3}
        xs={12}
      >
        <ProfileDetails user={user} />
      </Grid> */}
      <Grid
        item
        // lg={6}
        md={6}
        // xl={6}
        xs={12}
      > 
        <Card sx={{minHeight:"350px"}}>
        <CardHeader title={<Typography  color="primary" variant="h6">Attività</Typography>}  />
        <Divider />
        <Box p={3} >
          {user.attività?.map(att=>(
            <Box key={att} sx={{display: 'flex'}}>
            <Typography variant="overline">{att}</Typography>
          </Box>
            ))}
        </Box>
        </Card>               
      </Grid>
      <Grid
        item
        // lg={6}
        md={6}
        // xl={6}
        xs={12}
      > 
        <Card sx={{minHeight:"350px"}}>
        <CardHeader title={<Typography  color="primary" variant="h6">Abilitazioni</Typography>}  />
        <Divider />
        <Box p={3} >
          { user.abilitazioni?.map(abil=>(
            <Box key={abil} sx={{display: 'flex'}}>
              <Typography variant="overline">{abil}</Typography>
            </Box>
          ))}
        </Box>
        </Card>               
      </Grid>
      <Grid
        item
        lg={6}
        md={6}
        xl={6}
        xs={12}
      > 
        <Card sx={{minHeight:"200px"}}>
        <CardHeader title={<Typography  color="primary" variant="h6">Gruppi di lavoro</Typography>}  />
        <Divider />
        <Box sx={{display: 'flex', gap:"15px", p:3}}>
          <Button variant="outlined" color="secondary" endIcon={<LinkIcon />}> Sostenibilità</Button>
          <Button variant="outlined" color="secondary" endIcon={<LinkIcon />}> Spid</Button>
          <Button variant="outlined" color="secondary" endIcon={<LinkIcon />}> Certificati</Button>   
        </Box>
        </Card>               
      </Grid>
      <Grid
        item
        lg={6}
        md={6}
        xl={6}
        xs={12}
      > 
         <Card sx={{minHeight:"200px"}}>
        <CardHeader title={<Typography  color="primary" variant="h6">Interessi</Typography>}  />
        <Divider />
        <Box p={3} sx={{ display: 'flex', gap:"7px"}}>
          {user.interessi.map(interesse=>(
            <Chip key={interesse} label={interesse} variant="outlined" onClick={handleClick} color="secondary" />
          ))}
        </Box>
        </Card>               
      </Grid>
      
    </Grid>
  );
}



export default Competenze;
