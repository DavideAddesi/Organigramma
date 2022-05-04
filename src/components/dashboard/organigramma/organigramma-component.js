import { useEffect, useState } from 'react';
import _ from "lodash";
import clsx from "clsx"
import { Avatar, Grid, Switch, Box, IconButton, Button, Card, CardContent, CardHeader,Menu, MenuItem,ListItemIcon, ListItemText, Badge, Tooltip,CardActions, Divider, Typography, TextField } from '@mui/material';
// import { Tree, TreeNode } from "react-organizational-chart";
import Tree from "./Tree.tsx"
import TreeNode from "./TreeNode.tsx"
import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { useDrag, useDrop } from "react-dnd";

import makeStyles from '@mui/styles/makeStyles';

// import BusinessIcon from "@mui/icons-material/Business";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
// import { InvoicePDF } from '../invoice/invoice-pdf';
// import { jsPDF } from "jspdf";
// import html2canvas from "html2canvas"; 




  

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
      minWidth: "90px",
      // width:"110px",
      // maxWidth:"200px",
      margin:"auto",
      minHeight: "90px",
      maxHeight:"160px", 
      paddingLeft:"2px",
      paddingRight:"2px",
    },
    area:{
      // width:"100%",
      minWidth: "150px  ",
      padding:"5px 2px"
    },
    others:{
      maxWidth:"190px",
      height:"110px", 
      paddingLeft:"2px",
      paddingRight:"2px",
      margin:"auto", 
    },
    setMaxWidth:{
      maxWidth:"190px"
    },
    expand: {
      padding:0,
      marginLeft:"auto",
      marginRight:"auto",
      transform: "rotate(0deg)",
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

  function Organization({ org, onCollapse, collapsed, size, fix, displayTitolo }) {
   
    
    const classes = useStyles();
    const backgroundColor = () =>{

      if(org.type=="presidenza") return "#D66666" //presidenza
      if(org.type=="cda") return "#f8873b" //cda
      if(org.type=="area" || org.type=="area-unit") return "#F5F5F5" //area (staff, business unit, ecc...)
      if(org.type=="dirGenerale") return "#ffd27f" //direzione generale
      if(org.type=="direzione") return "#ddffd2" //direzione
      if(org.type=="struttura") return "#A7C7E7" //struttura
      if(org.type=="unita") return "#fff"  //unità operativa
    }

    const codeSize = size == "small" ? "9px": size== "medium" ? "11px":"10px" 
    const roleSize = size == "small" ? "8px": size== "medium" ? "10px":"18px" 
    const nameSize = size == "small" ? "9px": size== "medium" ? "12px":"13px" 


    return (
      <Card
        variant="outlined"
        // className={classes.root}
        // onClick={org.type == "area" ? onCollapse : null}
        className={clsx(classes.root,{
          [classes.area]: org.type == "area",
          [classes.unit] : org.type!= "area" && org.type!= "cda" && org.type!= "presidenza",
          [classes.others] :  org.type == "cda" || org.type== "presidenza",
          [classes.setMaxWidth] : org.type=="dirGenerale" || org.fatherType=="presidenza" || org.fatherType=="cda"
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
                <Typography  sx={{fontSize:roleSize, fontWeight: 600,}}>{org.name}</Typography>
                <Box display="flex" sx={{gap:"7px", alignItems: "center", justifyContent: "center"}}>
                <Typography variant="subtitle2" sx={{fontSize:nameSize}}>{org.responsabile}</Typography>
                </Box>
              
            </Box>
          </Box>      
        </div>
        {org.children  && org.type!="cda" &&org.type!="presidenza" && !displayTitolo.label && <IconButton 
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



  function Node({ o, parent, size, fix, displayTitolo }) {
    const [collapsed, setCollapsed] = useState(o.collapsed);
    const handleCollapse = () => {
      setCollapsed(!collapsed);
    };
    useEffect(() => {
      o.collapsed = collapsed;
    });

    if(o.direction){
      console.log(o.direction)
    }
    
    const T = parent
      ? TreeNode
      : (props) => (
          <Tree
            {...props}
            lineWidth={"2px"}
            lineColor={"#bbc"}
            lineBorderRadius={"12px"}
            
            // direction="column"
          >
            {props.children}
          </Tree>
        );
    return collapsed ? (
      <T
      direction={o.direction ? o.direction : "unset"}
      childrendirection={o.childrendirection ? o.childrendirection : "unset"}
        label={
          <Organization
            org={o}
            onCollapse={handleCollapse}
            collapsed={collapsed}
            size={size}
            fix={fix}
            displayTitolo={displayTitolo}
          />
        }
      />
    ) : (
      <T
      direction={o.direction ? o.direction : "unset"}
      childrendirection={o.childrendirection ? o.childrendirection : "unset"}
        label={
          <Organization
            org={o}
            onCollapse={handleCollapse}
            collapsed={collapsed}
            size={size}
            fix={fix}
            displayTitolo={displayTitolo}
          />
        }
      >
        {/* {_.map(o.struttura, (a) => (
          <TreeNode label={<Struttura a={a} />}>
            <TreeNode label={<Unity p={a.unity} />} />
          </TreeNode>
        ))} */}
        {_.map(o.children, (c) => (
          <Node o={c} parent={o} size={size} displayTitolo={displayTitolo} />
        ))}
      </T>
    );
  }
  export default function Organigramma(props) {
    const {org, size, cda, presidenza, childRef, displayMore, displayTitolo} = props


    return ( 
        <Grid
          container
          mt={3}
          spacing={4}
          p={displayMore ? "3px"  : 1}
        > 
          <Grid item md={2}><Node o={cda} size={size} fix={true} /></Grid>
           <Grid item md={2}><Node o={presidenza} size={size} fix={true} /></Grid>
          <Grid style={{marginTop:"-132px"}} item md={12}><Node o={org} size={size} displayTitolo={displayTitolo}  /> </Grid>
        </Grid>    
    );
  }