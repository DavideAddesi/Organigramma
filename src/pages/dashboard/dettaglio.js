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
          Dettaglio
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
                  {userDetail.area}
                </Typography>
                {chip(userDetail.codice)}
              </Grid>
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
                {/* <Box
                 sx={{
                  alignItems: 'center',
                  display: 'flex',
                  overflow: 'hidden'
                 }}>
                    <Avatar
                      // src={userDetail.avatar}
                      src={"https://randomuser.me/api/portraits/women/"+3+".jpg"}
                      sx={{
                        height: 64,
                        mr: 2,
                        width: 64
                      }}
                    />
                    <div>
                      <Typography
                      color="textSecondary"
                      variant="overline"
                      >
                        {userDetail.ruolo}, {userDetail.sede}
                      </Typography>
                      <Typography variant="subtitle2" sx={{mt:"-4px"}}>
                        {userDetail.nome}
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                        }}
                      >              
                        <Typography variant="subtitle2">
                          {userDetail.email}
                        </Typography>               
                      </Box>
                    </div>
                </Box> */}
                <Box sx={{ mt: 3 }}>
                  <Box > 
                    <Typography variant="h5" >Responsabile</Typography>
                  </Box> 
                  <NextLink
                  href="/dashboard/utente"
                  passHref
                >
                 
                
                  <Box 
                    sx={{
                      flexGrow: 1, 
                      backgroundColor:"#fff", 
                      p:2, 
                      width: 950, 
                      borderRadius:"8px",
                      cursor: 'pointer',
                      '&:hover': {
                        background: "#F8F8F8",
                      },  
                    }}>
                      <Box sx={{display:"flex"}}>
                        <Avatar
                            // src={userDetail.avatar}
                            src={"https://randomuser.me/api/portraits/men/"+9+".jpg"}
                            sx={{
                              height: 64,
                              mr: 2,
                              width: 64
                            }}
                          />
                          <div>
                            <Typography
                            color="textSecondary"
                            variant="overline"
                            > 
                            {userDetail.nome}
                            </Typography>
                            <Typography variant="subtitle2" sx={{mt:"-4px"}}>
                            Sede: {userDetail.sede}
                            </Typography>
                            <Box
                              sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                              }}
                            >              
                              <Typography variant="subtitle2">
                                Email: {userDetail.email}
                              </Typography>               
                            </Box>
                          </div>                   
                      </Box>
                    </Box> 
                    </NextLink>
                </Box>
                
              </Grid>
         
            </Grid>
            {/* <Tabs
              indicatorColor="primary"
              onChange={handleTabsChange}
              scrollButtons="auto"
              sx={{ mt: 3 }}
              textColor="primary"
              value={currentTab}
              variant="scrollable"
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  value={tab.value}
                />
              ))}
            </Tabs> */}
          </div>
          <Divider />
          <Box sx={{ mt: 3 }}>
              <Grid
                container
                spacing={3}
                >
                <Grid
                  item
                  xs={12}
                  >
                    <Box > 
                    <Typography variant="h5" >Mission</Typography>
                  </Box> 
                  <Mission mission={userDetail.mission}/>
                  {/* {currentTab === 'mission' && <Mission mission={userDetail.mission}/>} */}
                  {/* {currentTab === 'documenti' && <Mission />}
                  {currentTab === 'gdp' && <Mission />}
                  {currentTab === 'processi' && <Mission />} */}
                  <Box sx={{display: 'flex', gap:"15px", mt:"10px"}}>
                  <Button variant="outlined" endIcon={<LinkIcon />}> Documenti</Button>
                  <Button variant="outlined" endIcon={<LinkIcon />}> Gruppi di appartenenza</Button>
                  <Button variant="outlined" endIcon={<LinkIcon />}> Processi</Button>
                    
                    
                    
                  </Box>
                </Grid>
               
              </Grid>
      
          </Box>
          <Box sx={{ mt: 4 }}>
            <Box sx={{display: 'flex', justifyContent:"space-between"}}> 
              <Typography variant="h5" >Posizionamento Aziendale</Typography>
              <NextLink
                href="/dashboard/organigramma"
                passHref
                
              >
                <Link
                  color="secondary"
                  variant="subtitle2"
                >
                  {"Torna all'organigramma"}
                </Link>
              </NextLink>
            </Box>
            <Card>
              <Box>
                <Box p={1} display="flex" sx={{flexDirection:"row-reverse"}}>
                  <Box style={{display: "flex", flexDirection:"column", alignItems: "center"}}>
                    <Switch 
                      checked={displayTreeview}
                      onChange={()=>setDisplayTreeview(!displayTreeview)}            
                      edge="start"
                      name="isTreeView"
                    />
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                    >
                      Visualizzazione ad albero
                    </Typography>
                  </Box>  
                </Box>
                
                <Box p={3}>
                  {!displayTreeview && <PosizionamentoAziendale organization={userDetail.posizionamentoAziendale}/>}
                  { displayTreeview && <TreeviewComponent org={userDetail.posizionamentoAziendale} h={300} dettaglio={true} />}
                </Box>
              </Box>
            </Card>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" sx={{ mb : 1 }}>Personale Assegnato</Typography>
            <Card>
              <PersonaleAssegnato personale={userDetail.personaleAssegnato}/>
            </Card>
          </Box>
            
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

