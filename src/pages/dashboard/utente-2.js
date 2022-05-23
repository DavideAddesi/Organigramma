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
  Switch,
  IconButton,
  CircularProgress 
} from '@mui/material';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import General from '../../components/dashboard/organigramma/General';
import Competenze from '../../components/dashboard/organigramma/Competenze';
import Altro from '../../components/dashboard/organigramma/Altro';
import { useMounted } from '../../hooks/use-mounted';
import { infoCamereAPI } from '../../__fake-api__/infocamere-api';
import ProfileDetails from '../../components/dashboard/organigramma/General/ProfileDetails';
import GeneralSettings from '../../components/dashboard/organigramma/General/GeneralSettings';

const tabsUser = [
  { label: 'Generale', value: 'general' },
  { label: 'Competenze/Corsi', value: 'competenze' },
  { label: 'Altro', value: 'altro' }
];







const Utente2 = () => {
  const [user, setUser] = useState(null);
  const [currentTabUser, setCurrentTabUser] = useState('general');
  const handleTabsUserChange = (event, value) => {
    setCurrentTabUser(value);
  };  

  const isMounted = useMounted();

  const getUtente = useCallback(async () => {
    try {
      const response = await infoCamereAPI.getUtente();
      if (isMounted()) {
        setUser(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
    getUtente();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
    
  if(!user) return null

  return(
    <Container maxWidth="lg">
    <Box mt={3}>
     
    </Box>
    <Divider />
    <Box mt={3}>
    <Grid
      container
      spacing={3}
      style={{marginBottom:"30px"}}
    >
      <Grid
        item
        md={4}
        xs={12}
        
      >
        <ProfileDetails user={user} />
      </Grid>
      <Grid
        item
        md={8}
        xs={12}
        
      >
        <GeneralSettings user={user} />
      </Grid>
    </Grid>
    <Tabs
        onChange={handleTabsUserChange}
        scrollButtons="auto"
        value={currentTabUser}
        variant="scrollable"
        textColor="secondary"
      >
        {tabsUser.map(tab => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>
      {currentTabUser == 'general' && <General user={user} />}
      {currentTabUser == 'competenze' && <Competenze user={user} />}
      {currentTabUser == 'altro' && <Altro user={user} />}
    </Box>
  </Container>
  )
};

Utente2.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>
      {page}
    </DashboardLayout>
  </AuthGuard>
);

export default Utente2;

