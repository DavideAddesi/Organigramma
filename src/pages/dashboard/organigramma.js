import { useCallback, useEffect, useState, useRef, createRef } from 'react';
import Head from 'next/head';
import {
  Box,
  Container,
  Grid,
  Typography,
  MenuItem,
  Button ,
  Switch ,
  Tooltip
} from '@mui/material';
import { AuthGuard } from '../../components/authentication/auth-guard';
import { DashboardLayout } from '../../components/dashboard/dashboard-layout';

// import org from "./json-strutture/org.json";
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
import { useMounted } from '../../hooks/use-mounted';
import { infoCamereAPI } from '../../__fake-api__/infocamere-api';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab'
import Albero from '../../components/dashboard/organigramma/Albero'
import { useMediaQuery } from 'react-responsive'
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import ReorderIcon from '@mui/icons-material/Reorder';

const options = [
  {value:"small", label:"Piccolo"},
  {value:"medium", label:"Medio"},
  {value:"large", label:"Grande"}
 ];

const Organigramma = () => {
  const [size, setsize] = useState("small")
  const [displayMore, setDisplayMore] = useState(true)
  const [organization, setOrganization] = useState(null) 
  const [openMenu, setOpenMenu] = useState(false);
  const [displayTitolo, setDisplayTitolo] = useState({label:null, resolve: undefined});
  const [valueTab, setValueTab] = useState("org");
  const [isTabletorMobile, setIsTabletorMobile] = useState(false);



  const isTabletOrMobile = useMediaQuery({ maxWidth: 767 })
  useEffect(() => {
    if(isTabletOrMobile){
      setIsTabletorMobile(true)
      setValueTab("albero")
    } 
  }, [])
  

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };
  
  const componentRef = createRef(null)
  const anchorRef = useRef(null);
  
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

  useEffect(() => {
    getOrg();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  useEffect(() => {
    const {resolve} = displayTitolo;
    if (resolve) {
        resolve();
        setTimeout(() => {
          // console.log('Hello, World!')
          setDisplayTitolo({ label:null, resolve: undefined });
        }, 3000);
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
    if(organization){
      const newChildren = organization.organigramma.children.map(child =>{
        return {...child, 
          collapsed: child.collapsed && displayMore ? false: child.collapsed,
          children: child.children.map(c=>({
            ...c, collapsed: displayMore ? false : true,
            children: c.children?.map(child2=>({...child2, collapsed: !displayMore}))
          }))
        }
      })
      setOrganization({...organization, organigramma:{...organization.organigramma, children:newChildren}})
    }
      
  }, [displayMore])

//   useEffect(() => {
//     const newChildren = organization.children.map(child =>({...child, collapsed:   ? false : true}))
//     setOrganization({...organization, children:newChildren})
// }, [displayMore])

if(!organization){
  return null
}

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
           <Box style={{display: "flex", flexDirection: "column",alignItems: "center", marginBottom:"40px"}}>
                    <Tabs  value={valueTab} onChange={handleChangeTab}>
                      {!isTabletorMobile  &&<Tab icon={<Tooltip title="Visualizzazione organigramma"><AccountTreeIcon/></Tooltip>} label="Organigramma"  value="org" iconPosition="end" /> }  
                      <Tab  icon={<Tooltip title="Visualizzazione ad albero"><ReorderIcon/></Tooltip>} label="Albero"  value="albero" iconPosition="end" disabled={isTabletorMobile}  />
                    </Tabs>
                  </Box> 

           {valueTab == "org" ? (
             <Container maxWidth="4000px" style={{paddingLeft:"3px"}} >
             <Box sx={{ mb: 4 }}>
               <Grid
                 container
                 justifyContent="space-between"
                 spacing={3}
                 sx={{marginLeft: 0 }}
                 
               >
                   <Box display="flex" sx={{width:"100%", flexDirection:"row-reverse"}}>
                    
                     <Box 
                       sx={{
                         display:"flex", 
                         flexDirection:"column", 
                         gap:"10px", 
                         // position:"fixed", 
                         right:"0", 
                         marginRight:"20px",
                         marginBottom:"50px",
                         // zIndex:1000
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
               style={{marginTop: '-200px'}}
               // spacing={4}
             >
                 <Grid item md={12} ref={componentRef} >
                             <OrganigrammaComponent 
                               size={size} 
                               displayMore={displayMore} 
                               org={organization.organigramma}  
                               cda={organization.cda} 
                               presidenza={organization.presidenza} 
                               displayTitolo={displayTitolo}
                               // childRef={componentRef} 
                           /> 
                 </Grid>
                 
               
             </Grid>
           </Container>
           ):(
             <Albero />
           )}        
        
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
