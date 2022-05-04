import { useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import {
  Box,
  Container,
  Grid,
  Typography
} from '@mui/material';
import TreeviewComponent from './treeview-component'
import { useMounted } from '../../../hooks/use-mounted';
import { infoCamereAPI } from '../../../__fake-api__/infocamere-api';


const Albero = () => {
  const [organization, setOrganization] = useState(null)
  const [icoutsourcing, seticoutsourcing] = useState(null)
  const [iconto, seticonto] = useState(null)
  const [ecocerved, setecocerved] = useState(null)

  const isMounted = useMounted();


  const getOrg = useCallback(async () => {
    try {
      const data = await infoCamereAPI.getOrgInfocamere({restPrefix:"https://9b74b1e5-e4c2-495b-8a66-8a4395e737ff.mock.pstmn.io"});
      if (isMounted()) {
        setOrganization(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  const getOrgicoutsourcing = useCallback(async () => {
    try {
      const data = await infoCamereAPI.getOrgicoutsourcing({restPrefix:"https://9b74b1e5-e4c2-495b-8a66-8a4395e737ff.mock.pstmn.io"});
      if (isMounted()) {
        seticoutsourcing(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  const getOrgiconto = useCallback(async () => {
    try {
      const data = await infoCamereAPI.getOrgiconto({restPrefix:"https://9b74b1e5-e4c2-495b-8a66-8a4395e737ff.mock.pstmn.io"});
      if (isMounted()) {
        seticonto(data.data);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  const getOrgecocerved = useCallback(async () => {
    try {
      const data = await infoCamereAPI.getOrgecocerved({restPrefix:"https://9b74b1e5-e4c2-495b-8a66-8a4395e737ff.mock.pstmn.io"});
      if (isMounted()) {
        setecocerved(data.data);
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
        <Container style={{backgroundColor: "#fff"}} >
          <Grid container>
              <Grid item md={12} sx={12}>
                   <TreeviewComponent 
                      org={organization.organigramma}
                      cda={organization.cda} 
                      pres={organization.presidenza} 
                      outsourcing={icoutsourcing} 
                      ecocerved={ecocerved} 
                      iconto={iconto} 
                    />
              </Grid>
          </Grid>
        </Container>
     
  );
};



export default Albero;
