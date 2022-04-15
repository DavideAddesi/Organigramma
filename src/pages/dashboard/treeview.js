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
      const data = await infoCamereAPI.getOrgInfocamere({restPrefix:"https://9b74b1e5-e4c2-495b-8a66-8a4395e737ff.mock.pstmn.io"});
      if (isMounted()) {
        setOrganization(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  const getOrgicoutsourcing = useCallback(async () => {
    try {
      const data = await infoCamereAPI.getOrgicoutsourcing({restPrefix:"https://9b74b1e5-e4c2-495b-8a66-8a4395e737ff.mock.pstmn.io"});
      if (isMounted()) {
        seticoutsourcing(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  const getOrgiconto = useCallback(async () => {
    try {
      const data = await infoCamereAPI.getOrgiconto({restPrefix:"https://9b74b1e5-e4c2-495b-8a66-8a4395e737ff.mock.pstmn.io"});
      if (isMounted()) {
        seticonto(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  const getOrgecocerved = useCallback(async () => {
    try {
      const data = await infoCamereAPI.getOrgecocerved({restPrefix:"https://9b74b1e5-e4c2-495b-8a66-8a4395e737ff.mock.pstmn.io"});
      if (isMounted()) {
        setecocerved(data);
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
                    <TreeviewComponent org={organization.organigramma} h={600} cda={organization.cda} pres={organization.presidenza} outsourcing={icoutsourcing} ecocerved={ecocerved} iconto={iconto} />
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
