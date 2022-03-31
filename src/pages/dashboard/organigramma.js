import { useEffect, useState } from 'react';
import Head from 'next/head';
import {
  Box,
  Container,
  Grid,
  Typography,
  Switch,
  MenuItem,
  TextField,
  Button  
} from '@mui/material';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';

import org from "./org.json";
import OrganigrammaComponent from '../../components/dashboard/organigramma/organigramma-component'
import Legenda from '../../components/dashboard/organigramma/Legenda'

const Organigramma = () => {
  const [size, setsize] = useState("small")
  const [displayMore, setDisplayMore] = useState(false)
  const [organization, setOrganization] = useState(org) 

  useEffect(() => {
      const newChildren = organization.children.map(child =>{
        return {...child, collapsed: displayMore ? false : true}
      })
      setOrganization({...organization, children:newChildren})
  }, [displayMore])


  

  return (
    <>
      <Head>
        <title>
          Esempio Organigramma
        </title>
      </Head>
      <Box
        // component="main"
        sx={{
          flexGrow: 2,
          py: 8
        }}
      >
        <Container maxWidth="3000px" >
          <Box maxWidth="3000px"sx={{ mb: 4 }}>
            <Grid
              container
              justifyContent="space-between"
              spacing={3}
              // width={"3000px"}
              // maxWidth="3000px"
            >
                <Box display="flex" sx={{width:"100%", justifyContent:"space-between"}}>
                  <Typography variant="h4" >
                  Esempio Organigramma
                  </Typography>
                  <Box 
                    sx={{
                      display:"flex", 
                      flexDirection:"column", 
                      gap:"10px", 
                      position:"fixed", 
                      right:"0", 
                      marginRight:"20px",
                      // height:"100px"  
                    }}>
                    <Legenda />
               
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

                    <Button
                      color="primary"
                      variant="contained"
                      onClick={()=>setDisplayMore(!displayMore)}
                    >
                        {displayMore ? "Riduci":"Espandi"}
                    </Button>
                    

                   

                  </Box>
                
                </Box>
                
             
            </Grid>
          </Box>
          <Grid
            container
            spacing={4}
          >
              <Grid item md={12}>
                    {/* <div style={{overflowY: "scroll"}}> */}
                      {organization && <OrganigrammaComponent size={size} displayMore={displayMore} org={organization} /> } 
                      {/* </div>  */}
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
