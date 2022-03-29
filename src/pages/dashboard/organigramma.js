import { useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Container,
  Grid,
  Typography,
  Switch,
  MenuItem,
  TextField
} from '@mui/material';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';
import OrganigrammaComponent from '../../components/dashboard/organigramma/organigramma-component'
import Legenda from '../../components/dashboard/organigramma/Legenda'

const Organigramma = () => {
  const [size, setsize] = useState("small")
  const [displayMore, setDisplayMore] = useState(false)

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
                  <Typography variant="h4" >
                  Esempio Organigramma
                  </Typography>
                  <Box sx={{display:"flex", flexDirection:"column", gap:"30px"}}>
                    <Legenda />
                    <Box sx={{display:"flex", gap:"15px"}}>
                    
                    
                   <TextField
                   fullWidth 
                      defaultValue={size}
                      label="Carattere"
                      select
                      size="small"
                      onChange={event=>setsize(event.target.value)}
                    >
                      <MenuItem value="small">piccolo</MenuItem>
                      <MenuItem value="medium">medio</MenuItem>
                      <MenuItem value="large">grande</MenuItem>
                    </TextField>
                    <Box style={{display: "flex", alignItems: "center", gap:"7px"}}>
                      <Typography
                          gutterBottom
                          variant="subtitle2"
                        >
                          Espandi
                      </Typography>
                      <Switch 
                        checked={displayMore}
                        onChange={()=>setDisplayMore(!displayMore)}            
                        edge="start"
                        name="displayMore"
                      />       
                   </Box>
                    </Box>
                    

                   

                  </Box>
                
                </Box>
               
              </Grid>
                
             
            </Grid>
          </Box>
          <Grid
            container
            spacing={4}
          >
              <Grid item md={12}>
                    <OrganigrammaComponent size={size} displayMore={displayMore} />
              </Grid>
              
            
          </Grid>
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
