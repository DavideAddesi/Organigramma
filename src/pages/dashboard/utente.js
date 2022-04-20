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
import { AuthGuard } from '../../components/authentication/auth-guard';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
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





const tabs = [
  { label: 'Attività', value: 'attivita' },
  { label: 'Abilitazioni', value: 'abilitazioni' }
];

const color = (stato) =>{
  if(stato==1) return "#44b700"
  if(stato==2) return "#EFB700"
  if(stato==3) return "#B81D13"
}


const useStyles = makeStyles((theme) => ({
  
  info: {
    display: 'flex',
    gap:"20px"
  },
  label: {
    display: 'flex',
    gap:"7px", alignItems: "center"
  },
}));




const CustomerDetails = () => {
  const classes = useStyles();
  const [user, setUser] = useState(null);
  const [currentTab, setCurrentTab] = useState('attivita');
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      width: '15px',
      height: '15px',
      backgroundColor: color(user?.stato),
      color: color(user?.stato),
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  })); 

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

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  const handleClick = () => {
    console.info('You clicked the Chip.');
  };

  if(!user){
    return null
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
                  md={8}
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
                  <Box
                 sx={{
                  alignItems: 'center',
                  display: 'flex',
                  overflow: 'hidden'
                 }}>
                   <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                    >
                        <Avatar
                      // src={userDetail.avatar}
                      src={"https://randomuser.me/api/portraits/men/"+9+".jpg"}
                      sx={{
                        height: 120,
                        // mr: 2,
                        width: 120
                      }}
                    />

                    </StyledBadge>
                   
                    
                    <div style={{marginLeft:20}}>
                    <Typography variant="h4" >
                        {user.nome}
                      </Typography>
                      <div style={{display: 'flex', flexDirection: 'column', gap: 5}}>
                        <Typography
                        color="textSecondary"
                        variant="overline"
                        >
                           {user.ruolo}, {user.sede}
                        </Typography>
                     

                      <NextLink 
                          href="/dashboard/dettaglio"
                          passHref
                        >
                          <Typography
                            sx={{cursor:"pointer", fontSize:"15px", lineHeight:0}}
                            color="secondary"
                            variant="overline"
                          >
                            {user.area}
                          </Typography> 
                        </NextLink>
                      </div>
                      
                      
                   
                    </div>
                   
                </Box>
                </Typography>
              
              </Grid>
              <Grid item md={4}>
                      <CalendarUser />
                </Grid>
            
         
            </Grid>
          </div>

          {/* CALENDAR */}
          {/* <Box sx={{ mt: 3 }}>
              <Grid container spacing={3} >
                <Grid item md={4}>
                      <CalendarUser />
                </Grid>        
              </Grid>
          </Box> */}

          

             {/* Informazioni */}
             <Box sx={{ mt: 3 }}>
              <Grid container spacing={3} >
                <Grid item xs={12}>
                    <Box > 
                      <Typography variant="h5" >Informazioni</Typography>
                    </Box> 
                    <Card>
                      <Box p={3}>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                        }}
                      >      
                      <div className={classes.info}>
                        <div className={classes.label}>
                        <Typography variant="overline" >
                          EMAIL: 
                        </Typography> 
                        <Typography variant="subtitle2" sx={{marginBottom:"3px"}} >
                           {user.email}
                        </Typography> 
                        </div>
                        <div className={classes.label}>
                        <Typography variant="overline" >
                        TEL/CELL: 
                        </Typography> 
                        <Typography variant="subtitle2" sx={{marginBottom:"3px"}} >
                        {user.tel}
                        </Typography> 
                        </div>
                         </div>
                         <div className={classes.info}>
                        <div className={classes.label}>
                        <Typography variant="overline" >
                        MATRICOLA: 
                        </Typography> 
                        <Typography variant="subtitle2" sx={{marginBottom:"3px"}} >
                        {user.matricola}
                        </Typography> 
                        </div>

                        <div className={classes.label}>
                        <Typography variant="overline" >
                        UFFICIO: 
                        </Typography> 
                        <Typography variant="subtitle2" sx={{marginBottom:"3px"}} >
                        {user.ufficio}
                        </Typography> 
                        </div>
                   
                       
                      </div>   
                        
                                      
                      </Box>
                      </Box>
                    </Card>              
                </Grid>        
              </Grid>
          </Box>
          

          {/* SU DI ME */}
          <Box sx={{ mt: 3 }}>
              <Grid container spacing={3} >
                <Grid item xs={12}>
                    <Box > 
                      <Typography variant="h5" >Su di me</Typography>
                    </Box> 
                    <Card>
                      <Box p={3}>
                        <Typography>
                          {user.descrizione}
                        </Typography>
                      </Box>
                    </Card>              
                </Grid>        
              </Grid>
          </Box>

           {/* COMPETENZE, CORSI E BADGE */}
           <Box sx={{ mt: 3 }}>
              <Grid container spacing={3} >
                <Grid item xs={4}>
                    <Box > 
                      <Typography variant="h6" >Competenze</Typography>
                    </Box> 
                    <Card>
                      <Box p={3}>
                       {user.competenze.map(competenza=>(
                         <Box key={competenza} sx={{display: 'flex', justifyContent:"space-between"}}>
                           <Typography variant="overline">{competenza.nome}</Typography>
                           <Typography variant="overline">{competenza.percentuale}</Typography>
                         </Box>
                       ))}
                      </Box>
                    </Card>              
                </Grid>   
                <Grid item xs={4}>
                    <Box > 
                      <Typography variant="h6" >Ultimi corsi di Formazione</Typography>
                    </Box>
                    <Card>
                      <Box p={3}>
                      {user.corsi.map((corso, i)=>(
                         <Box key={i} sx={{display: 'flex', flexDirection:"column", mb: user.corsi.length == i+1 ? 0 : 3}}>
                           <Typography variant="overline"  sx={{lineHeight:"0.5"}}>{corso.data}</Typography>
                           <Typography variant="subtitle2" >{corso.nome}</Typography>
                         </Box>
                       ))}
                      </Box>
                    </Card>              
                </Grid> 
                <Grid item xs={4}>
                    <Box > 
                      <Typography variant="h6" >Certificazioni/Open badge</Typography>
                    </Box>
                    <Card>
                      <Box p={3}>
                       <Box sx={{display: 'flex', flexDirection:"column", gap:"17px"}}>
                          <Box sx={{display: 'flex', justifyContent:"center", gap:"30px"}}>
                              <img src="/static/badges/badge1.png" style={{width:50, height:50}} />
                              <img src="/static/badges/badge2.png" style={{width:50, height:50}} />
                              <img src="/static/badges/badge3.png" style={{width:50, height:50}} />

                          </Box>
                          <Box sx={{display: 'flex', justifyContent:"center", gap:"30px"}}>
                              <img src="/static/badges/badge4.png" style={{width:50, height:50}} />
                             <Skeleton variant="rectangular" width={50} height={50} />
                             <Skeleton variant="rectangular" width={50} height={50} />
                          </Box>
                          <Box sx={{display: 'flex', justifyContent:"center", gap:"30px"}}>
                              {/* <img src="/static/badges/google.png" style={{width:70, height:70}} /> */}
                             <Skeleton variant="rectangular" width={50} height={50} />
                             <Skeleton variant="rectangular" width={50} height={50} />
                             <Skeleton variant="rectangular" width={50} height={50} />
                          </Box>
                       </Box>
                      </Box>
                    </Card>              
                </Grid>      
              </Grid>
          </Box>

           {/* Gruppi di lavoro */}
           <Box sx={{ mt: 3 }}>
              <Grid container spacing={3} >
                <Grid item xs={12}>
                    <Box > 
                      <Typography variant="h5" >Gruppi di lavoro</Typography>
                    </Box> 
                    <Card>
                      <Box sx={{display: 'flex', gap:"15px", p:3}}>
                        <Button variant="outlined" endIcon={<LinkIcon />}> Sostenibilità</Button>
                        <Button variant="outlined" endIcon={<LinkIcon />}> Spid</Button>
                        <Button variant="outlined" endIcon={<LinkIcon />}> Certificati</Button>   
                      </Box>
                    </Card>              
                </Grid>        
              </Grid>
          </Box>


          
          {/* Attività e abilitazioni */}
          <Box sx={{ mt: 3 }}>
              <Grid container spacing={3} >
                <Grid item xs={12}>
                <Tabs
                          indicatorColor="primary"
                          onChange={handleTabsChange}
                          scrollButtons="auto"
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
                        </Tabs>
                    <Card sx={{ mt: 2 }}>
                      <Box p={3}>
                        {currentTab == "attivita" ? (
                           user.attività.map(att=>(
                            <Box key={att} sx={{display: 'flex'}}>
                              <Typography variant="overline">{att}</Typography>
                            </Box>
                          ))
                        ):null}

                      </Box>
                    </Card>              
                </Grid>        
              </Grid>
          </Box>

            {/* INTERESSI */}
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={3} >
                <Grid item xs={12}>
                    <Box > 
                      <Typography variant="h5" >Interessi</Typography>
                    </Box> 
                    <Card>
                      <Box p={3} sx={{ display: 'flex', gap:"7px"}}>
                        {user.interessi.map(interesse=>(
                          <Chip key={interesse} label={interesse} variant="outlined" onClick={handleClick} color="primary" />
                        ))}
                      </Box>
                    </Card>              
                </Grid>        
              </Grid>
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

