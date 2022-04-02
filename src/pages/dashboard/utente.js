import { useCallback, useState, useEffect } from 'react';
import NextLink from 'next/link';
import Head from 'next/head';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Link,
  Tab,
  Tabs,
  Typography,
  Card,
  Switch
} from '@mui/material';
import { customerApi } from '../../__fake-api__/customer-api';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import { Mission } from '../../components/dashboard/customer/mission';
import  PosizionamentoAziendale  from '../../components/dashboard/customer/posizionamento-aziendale';
import  Treeview  from '../../components/dashboard/customer/treeview';
import { PersonaleAssegnato } from '../../components/dashboard/customer/personale-assegnato';
import TreeviewComponent from '../../components/dashboard/organigramma/treeview-component';
import { useMounted } from '../../hooks/use-mounted';
import LinkIcon from '@mui/icons-material/Link'

const tabs = [
  { label: 'Mission', value: 'mission' },
  { label: 'Documenti', value: 'documenti' },
  { label: 'Gruppi di competenza', value: 'gdp' },
  { label: 'Processi', value: 'processi' }
];


const CustomerDetails = () => {
  const isMounted = useMounted();
  const [userDetail, setUserDetail] = useState(null);
  const [currentTab, setCurrentTab] = useState('mission');
  const [displayTreeview, setDisplayTreeview] = useState(false);


  

  const getUser = useCallback(async () => {
    try {
      const data = await customerApi.getUserDetail();
      if (isMounted()) {
        setUserDetail(data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      getUser();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const chip = ( code) =>{ 
     return <Chip label={code} variant="outlined" color="primary"  />
  }




  if (!userDetail) {
    return null;
  }

  return (
    <>
      <Head>
        <title>
          Utente
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="md">
          <div>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
            >
              {/* <Grid item  md={12}><Divider  orientation="horizontal" /></Grid> */}
              <Grid
                item
                  md={12}
                  sx={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    display: 'flex',
                  }}
                >
                  <Typography
                  color="primary"
                  variant="h4"
                >
                  Utente (work in progress...)
                </Typography>
              </Grid>
            
         
            </Grid>
          </div>
         
            
        </Container>
      </Box>
    </>
  );
};

CustomerDetails.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default CustomerDetails;

