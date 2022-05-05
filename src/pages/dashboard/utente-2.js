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
import makeStyles from '@mui/styles/makeStyles';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// import user from "./json-strutture/user.json"
import LinkIcon from '@mui/icons-material/Link'
import Skeleton from '@mui/material/Skeleton';
import CalendarUser from './calendarUser';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { useMounted } from '../../hooks/use-mounted';
import { infoCamereAPI } from '../../__fake-api__/infocamere-api';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SchoolIcon from '@mui/icons-material/School';

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
    </Box>
    <Divider />
    <Box mt={3}>
      {currentTabUser == 'general' && <General user={user} />}
      {currentTabUser == 'competenze' && <Competenze user={user} />}
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

