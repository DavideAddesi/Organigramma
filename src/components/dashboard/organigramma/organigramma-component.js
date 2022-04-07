import { useEffect, useState } from 'react';
import _ from "lodash";
import clsx from "clsx"
import { Avatar, Grid, Switch, Box, IconButton, Button, Card, CardContent, CardHeader,Menu, MenuItem,ListItemIcon, ListItemText, Badge, Tooltip,CardActions, Divider, Typography, TextField } from '@mui/material';
import { Tree, TreeNode } from "react-organizational-chart";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag, useDrop } from "react-dnd";

import makeStyles from '@mui/styles/makeStyles';

import BusinessIcon from "@mui/icons-material/Business";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { InvoicePDF } from '../invoice/invoice-pdf';
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";




  const invoice = {
    id: '5ecb86785312dcc69b5799ad',
    currency: '$',
    customer: {
      address: '271 Richmond Rd, Grey Lynn, Auckland 1022, New Zealand',
      company: 'Countdown Grey Lynn',
      email: 'contact@acme.com',
      name: 'ACME SRL',
      taxId: '6934656584231'
    },
    dueDate: 222,
    issueDate: 222,
    items: [
      {
        id: '5ecb8694db1760a701dfbf74',
        currency: '$',
        description: 'Freelancer Subscription (12/05/2019 - 11/06/2019)',
        unitAmount: 55.50
      }
    ],
    number: 'INV-0019',
    status: 'paid',
    subtotalAmount: 50.00,
    taxAmount: 5.50,
    totalAmount: 55.50
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display:"flex", 
      flexDirection:"column",
      alignItems: "center", 
      justifyContent: "center",
      borderRadius: "16px  !important",
      border:"1px solid #bbc !important",
    },
    unit:{
      minWidth: "100px",
      minHeight: "130px",
      maxHeight:"160px", 
      paddingLeft:"10px",
      paddingRight:"10px",
    },
    area:{
      width:"100%",
      padding:"5px 10px"
    },
    others:{
      width:"110px",
      height:"110px", 
      paddingLeft:"10px",
      paddingRight:"10px", 
    },
    expand: {
      marginLeft:"auto",
      marginRight:"auto",
      transform: "rotate(0deg)",
      marginTop: -10,
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.short,
      }),
    },
    expandOpen: {
      marginLeft:"auto",
      marginRight:"auto",
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: "#ECECF4",
      

    },
  }));

  function Organization({ org, onCollapse, collapsed, size, fix }) {
   
    
    const classes = useStyles();
    const backgroundColor = () =>{

      if(org.type=="presidenza") return "#D66666"
      if(org.type=="cda") return "#f8873b"
      if(org.type=="area") return "#F5F5F5"

      if(org.type==0) return "#ffd27f"
      if(org.type==1) return "#ddffd2"
      if(org.type==2) return "#A7C7E7"
      if(org.type==3) return "#fff"
    }

    const codeSize = size == "small" ? "10px": size== "medium" ? "11px":"10px" 
    const roleSize = size == "small" ? "10px": size== "medium" ? "13px":"18px" 
    const nameSize = size == "small" ? "10px": size== "medium" ? "12px":"13px" 


    return (
      <Card
        variant="outlined"
        // className={classes.root}
        // onClick={org.type == "area" ? onCollapse : null}
        className={clsx(classes.root,{
          [classes.area]: org.type == "area",
          [classes.unit] : org.type!= "area" && org.type!= "cda" && org.type!= "presidenza",
          [classes.others] :  org.type == "cda" || org.type== "presidenza",
        })}
        style={{ backgroundColor: backgroundColor()}}
      >
        <div style={{
          flexGrow: 1, display:"flex", 
          flexDirection:"column",
          alignItems: "center", 
          justifyContent: "center"
          }}
        >
          <Box sx={{
            display:"flex", 
            alignItems: "center", 
            justifyContent: "center", 
            flexDirection: "column"
          }}>
            <Typography variant="caption" sx={{fontSize:codeSize}}>{org.code}</Typography>
            <Box display="flex" sx={{flexDirection:"column"}}>
                <Typography  sx={{fontSize:roleSize, fontWeight: 600,}}>{org.role}</Typography>
                <Box display="flex" sx={{gap:"7px", alignItems: "center", justifyContent: "center"}}>
                <Typography variant="subtitle2" sx={{fontSize:nameSize}}>{org.name}</Typography>
                </Box>
              
            </Box>
          </Box>      
        </div>
        {org.children  &&   <IconButton 
          size="small"
          onClick={onCollapse}
          className={clsx(classes.expand, {
            [classes.expandOpen]: !collapsed,
          })}
        >
          <ExpandMoreIcon />
        </IconButton>}
       
      
      </Card>
    );
  }



  function Node({ o, parent, size, fix }) {
    const [collapsed, setCollapsed] = useState(o.collapsed);
    const handleCollapse = () => {
      setCollapsed(!collapsed);
    };
    useEffect(() => {
      o.collapsed = collapsed;
    });
    
    const T = parent
      ? TreeNode
      : (props) => (
          <Tree
            {...props}
            lineWidth={"2px"}
            lineColor={"#bbc"}
            lineBorderRadius={"12px"}
          >
            {props.children}
          </Tree>
        );
    return collapsed ? (
      <T
        label={
          <Organization
            org={o}
            onCollapse={handleCollapse}
            collapsed={collapsed}
            size={size}
            fix={fix}
          />
        }
      />
    ) : (
      <T
        label={
          <Organization
            org={o}
            onCollapse={handleCollapse}
            collapsed={collapsed}
            size={size}
            fix={fix}
          />
        }
      >
        {/* {_.map(o.struttura, (a) => (
          <TreeNode label={<Struttura a={a} />}>
            <TreeNode label={<Unity p={a.unity} />} />
          </TreeNode>
        ))} */}
        {_.map(o.children, (c) => (
          <Node o={c} parent={o} size={size} />
        ))}
      </T>
    );
  }
  export default function Organigramma(props) {
    const {org, size, cda, presidenza, childRef} = props

    const printDocument= () => {
      const input = document.getElementById('divToPrint');
      html2canvas(input)
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          pdf.addImage(imgData, 'JPEG', 0, 0);
          // pdf.output('dataurlnewwindow');
          pdf.save("download.pdf");
        })
      ;
    }

    return ( 
        <Grid
          container
          mt={3}
          spacing={4}
          p={2}
          ref={childRef}
        > 
          <Grid item md={2}><Node o={cda} size={size} fix={true} /></Grid>
           <Grid item md={2}><Node o={presidenza} size={size} fix={true} /></Grid>
          <Grid item md={12}><Node o={org} size={size}  /> </Grid>
        </Grid>    
    );
  }