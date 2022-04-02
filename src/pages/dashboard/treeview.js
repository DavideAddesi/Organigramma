import { useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Container,
  Grid,
  Typography
} from '@mui/material';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import TreeviewComponent from '../../components/dashboard/organigramma/treeview-component'
import Legenda from '../../components/dashboard/organigramma/legenda-treeview'
import org from './json-strutture/org.json'
import cda from './json-strutture/cda.json'
import presidenza from './json-strutture/presidenza.json'
import outsourcing from './json-strutture/outsourcing.json'
import ecocerved from './json-strutture/ecocerved.json'
import iconto from './json-strutture/iconto.json'

const Treeview = () => {

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
        <Container maxWidth="xl">
          <Box sx={{ mb: 4 }}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              <Grid item md={12}>
              <Box display="flex" sx={{width:"auto", justifyContent:"space-between"}}>
                <Typography variant="h4">
                Esempio Treeview
                </Typography>
                {/* <Legenda color={false} /> */}
                </Box>
              </Grid>
                
             
            </Grid>
          </Box>
          <Grid
            container
            spacing={4}
          >
              <Grid item>
                    <TreeviewComponent org={org} h={600} cda={cda} pres={presidenza} outsourcing={outsourcing} ecocerved={ecocerved} iconto={iconto} />
              </Grid>
              
            
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Treeview.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default Treeview;
