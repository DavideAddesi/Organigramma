import { useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent
} from '@mui/material';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import OrganigrammaComponent from '../../components/dashboard/organigramma/organigramma-component-2'
import Legenda from '../../components/dashboard/organigramma/Legenda'


const Organigramma = () => {
  return (
    <>
      <Head>
        <title>
          Esempio Organigramma
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl" height="100%">
          <Box sx={{ mb: 4 }}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item md={12}>
                <Box display="flex" sx={{width:"auto", justifyContent:"space-between"}}>
                <Typography variant="h4" >
                Esempio Organigramma
                </Typography>
                <Legenda border={true}/>
                
                </Box>
               
              </Grid>
                
             
            </Grid>
          </Box>
          <Grid
            container
            spacing={4}
          >
            <Grid item> <OrganigrammaComponent classic={true}/></Grid>
          
          </Grid>
          {/* <div style={{position: 'absolute', bottom: 20, width: '100%'}}> */}
          
          {/* </div> */}
          
        </Container>
      </Box>
    </>
  );
};

Organigramma.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default Organigramma;
