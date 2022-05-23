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

const PREFIX = 'GeneralSettings';

const classes = {
  root: `${PREFIX}-root`
};


const GeneralSettings = ({ className, user, ...rest }) => {

  return (
          <Card style={{height:"100%"}} className={clsx(classes.root, className)} {...rest}>
            <CardHeader title={<Typography  color="primary" variant="h6">Informazioni</Typography>}  />
            <Divider />
            <CardContent>
            <Grid container spacing={4}>
                <Grid item md={6} xs={12}>
                {/* <Typography>Area operativa  :</Typography> */}
                <Button variant="outlined" color="secondary"  fullWidth>
                <NextLink 
                          href="/dashboard/dettaglio"
                          passHref
                        >
                          <Typography
                            sx={{cursor:"pointer", fontSize:"15px"}}
                            color="secondary"
                            variant="overline"
                          >
                            {user.area}
                          </Typography> 
                        </NextLink>
                </Button>
              
                 
                </Grid>
              </Grid>
              <Grid container spacing={4} mt={1} >
                <Grid item md={6} xs={12}>
                  <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant="overline" >Email:</Typography>
                    <Typography sx={{fontWeight: 'bold'}}>{user.email}</Typography>
                  </Box>
                </Grid>
                <Grid item md={6} xs={12}>
                  <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography variant="overline" >Tel/cell:</Typography>
                    <Typography sx={{fontWeight: 'bold'}}>{user.tel}</Typography>
                  </Box>
                </Grid>
              </Grid>
              {/* <Divider /> */}
              <Grid container spacing={4} >
                <Grid item md={6} xs={12}>
                 
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                      <Typography variant="overline" >Ufficio:</Typography>
                      <Typography sx={{fontWeight: 'bold'}}>{user.ufficio}</Typography>
                    </Box>
                 
                </Grid>
                <Grid item md={6} xs={12}>
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                      <Typography variant="overline" >Matricola:</Typography>
                      <Typography sx={{fontWeight: 'bold'}}>{user.matricola}</Typography>
                    </Box>
                </Grid>
           
              </Grid>
            </CardContent>
          </Card>
  );
};



export default GeneralSettings;
