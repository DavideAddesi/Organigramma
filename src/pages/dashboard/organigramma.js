import { useEffect, useState, useRef, createRef } from 'react';
import Head from 'next/head';
import {
  Box,
  Container,
  Grid,
  Typography,
  MenuItem,
  Button  
} from '@mui/material';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';

import org from "./json-strutture/org.json";
import cda from "./json-strutture/cda.json";
import presidenza from "./json-strutture/presidenza.json";
import OrganigrammaComponent from '../../components/dashboard/organigramma/organigramma-component'
import Legenda from '../../components/dashboard/organigramma/Legenda'

import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PrintIcon from '@mui/icons-material/Print';
import {useReactToPrint} from "react-to-print";
import  ReactToPrint from "react-to-print"

const options = [
  {value:"small", label:"Piccolo"},
  {value:"medium", label:"Medio"},
  {value:"large", label:"Grande"}
 ];

const Organigramma = () => {
  const [size, setsize] = useState("small")
  const [displayMore, setDisplayMore] = useState(false)
  const [organization, setOrganization] = useState(org) 
  const [openMenu, setOpenMenu] = useState(false);
  const [displayTitolo, setDisplayTitolo] = useState({label:null, resolve: undefined});

  const anchorRef = useRef(null);

  const componentRef = createRef(null)

  useEffect(() => {
    const {resolve} = displayTitolo;
    if (resolve) {
        resolve();
        setDisplayTitolo({ label:null, resolve: undefined });
    }
  }, [displayTitolo]);
  const handlePrint = useReactToPrint({
    // onBeforeGetContent: () => {
    //   return new Promise((resolve) => {
    //     setDisplayTitolo(() => ({ label: "titolo" + 1, resolve }));
    //   });
    // },
    content: ()=> componentRef.current
  })

  const handleClick = () => {
    setOpenMenu(true);
  };
  const handleClose = () => {
    setOpenMenu(false);
  };

  const handleSize = (newSize) => {
    setsize(newSize)
    setOpenMenu(false);
  };

  useEffect(() => {
      const newChildren = organization.children.map(child =>{
        return {...child, 
          children: child.children.map(c=>({...c, collapsed: displayMore ? false : true}))
        }
      })
      setOrganization({...organization, children:newChildren})
  }, [displayMore])

//   useEffect(() => {
//     const newChildren = organization.children.map(child =>({...child, collapsed:   ? false : true}))
//     setOrganization({...organization, children:newChildren})
// }, [displayMore])



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
                  Organigramma suddiviso in funzioni
                  </Typography>
                  <Box 
                    sx={{
                      display:"flex", 
                      flexDirection:"column", 
                      gap:"10px", 
                      position:"fixed", 
                      right:"0", 
                      marginRight:"20px",
                      marginBottom:"50px",
                      zIndex:1000
                      // height:"100px"  
                    }}>
                    <Legenda />
                    <div style={{display:"flex", alignItems: "center", gap:"7px"}}>
                      <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        onClick={()=>setDisplayMore(!displayMore)}
                        fullWidth
                      >
                          {displayMore ? "Riduci":"Espandi"} Organigramma
                      </Button>
                      {/* <Button
                        color="primary"
                        variant="contained"
                        size="small"
                        // onClick={downloadScreenshot}
                        onClick={handlePrint}
                        
                      >
                       
                          <PrintIcon/>
                      </Button> */}
                      <ReactToPrint
                          trigger={() => (
                            <Button size="small" type="primary" variant="contained">
                               <PrintIcon/>
                            </Button>
                          )}
                          content={() => componentRef.current}
                          onBeforeGetContent={() =>{
                            return new Promise((resolve) => {
                              setDisplayTitolo(() => ({ label:"titolo", resolve }));
                            });
                          }}
                        />
                      <div>
                        <IconButton onClick={handleClick} ref={anchorRef}>
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          anchorEl={anchorRef.current}
                          open={openMenu}
                          onClose={handleClose}                    
                        >
                          {options.map((option) => (
                            <MenuItem key={option.value} selected={option.value == size} onClick={()=>handleSize(option.value)}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Menu>
                      </div>
                    </div>
                    

                   

                  </Box>
                
                </Box>
                
             
            </Grid>
          </Box>
          <Grid
            container
            spacing={4}
          >
              <Grid item md={12} ref={componentRef} >
                          {displayTitolo.label}
                          <OrganigrammaComponent 
                            size={size} 
                            displayMore={displayMore} 
                            org={organization}  
                            cda={cda} 
                            presidenza={presidenza} 
                            // childRef={componentRef} 
                        /> 
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
