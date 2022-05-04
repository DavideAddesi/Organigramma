import { useEffect, useState, useCallback } from 'react';
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
// import org from './json-strutture/org.json'
// import cda from './json-strutture/cda.json'
// import presidenza from './json-strutture/presidenza.json'
// import outsourcing from './json-strutture/outsourcing.json'
// import ecocerved from './json-strutture/ecocerved.json'
// import iconto from './json-strutture/iconto.json'
import { useMounted } from '../../hooks/use-mounted';
import { infoCamereAPI } from '../../__fake-api__/infocamere-api';


const Treeview = () => {
  const [organization, setOrganization] = useState(null)
  const [icoutsourcing, seticoutsourcing] = useState(null)
  const [iconto, seticonto] = useState(null)
  const [ecocerved, setecocerved] = useState(null)

  const isMounted = useMounted();


  const getOrg = useCallback(async () => {
    try {
      const response = await infoCamereAPI.getOrgInfocamere();
      if (isMounted()) {
        setOrganization(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  const getOrgicoutsourcing = useCallback(async () => {
    try {
      const response = await infoCamereAPI.getOrgicoutsourcing();
      if (isMounted()) {
        seticoutsourcing(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  const getOrgiconto = useCallback(async () => {
    try {
      const response = await infoCamereAPI.getOrgiconto();
      if (isMounted()) {
        seticonto(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  const getOrgecocerved = useCallback(async () => {
    try {
      const response = await infoCamereAPI.getOrgecocerved();
      if (isMounted()) {
        setecocerved(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    getOrg();
    getOrgicoutsourcing()
    getOrgiconto()
    getOrgecocerved()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

    if(!organization) return null
    if(!icoutsourcing) return null
    if(!iconto) return null
    if(!ecocerved) return null

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
        <Container style={{backgroundColor: "#fff"}} >
          <Grid container>
              <Grid item md={12} sx={12}>
                   <TreeviewComponent 
                      org={organization.organigramma}
                      cda={organization.cda} 
                      pres={organization.presidenza} 
                      outsourcing={icoutsourcing} 
                      ecocer  ved={ecocerved} 
                      iconto={iconto} 
                    />
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
