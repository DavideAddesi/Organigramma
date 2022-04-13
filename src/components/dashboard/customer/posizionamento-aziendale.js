import { useEffect, useState } from 'react';
import _ from "lodash";
import clsx from "clsx"
import { Avatar, Box, IconButton, Button, Card, CardContent, CardHeader,Menu, MenuItem,ListItemIcon, ListItemText, Badge, Tooltip,CardActions, Divider, Typography, TextField } from '@mui/material';
import { Tree, TreeNode } from "react-organizational-chart";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag, useDrop } from "react-dnd";
import makeStyles from '@mui/styles/makeStyles';

import BusinessIcon from "@mui/icons-material/Business";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const useStyles = makeStyles((theme) => ({
    root: {
      background: "white",
      borderRadius: "16px  !important",
      border:"1px solid #bbc   ",
      // minWidth:"120px",
      // maxWidth:"140  px",
      minHeight:"100px",
      maxHeight:"200px",
      display:"flex", 
      flexDirection:"column",
      alignItems: "center", 
      justifyContent: "center",
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

  function Organization({ org, onCollapse, collapsed, size }) {
    
    const classes = useStyles();
    const backgroundColor = () =>{

      if(org.type=="presidenza") return "#D66666" //presidenza
      if(org.type=="cda") return "#f8873b" //cda
      if(org.type=="area") return "#F5F5F5" //area (staff, business unit, ecc...)
      if(org.type=="dirGenerale") return "#ffd27f" //direzione generale
      if(org.type=="direzione") return "#ddffd2" //direzione
      if(org.type=="struttura") return "#A7C7E7" //struttura
      if(org.type=="unita") return "#fff"  //unità operativa
    }


    const codeSize = "7px"
    const roleSize = "12px"
    const nameSize = size == "10px"

    return (
      <div style={{ border:org.owned && "3px solid #2196F3", borderRadius: org.owned &&"20px",}}>
      <Card
        variant="outlined"
        className={classes.root}
        style={{ backgroundColor: backgroundColor() }}
      >
     

        <CardContent sx={{padding:"10px 5px"}}>
            <Typography variant="caption" sx={{fontSize:codeSize}}>{org.code}</Typography>
            <Box display="flex" sx={{flexDirection:"column"}}>
                <Typography  sx={{fontSize:roleSize, fontWeight: 600,}}>{org.name}</Typography>
                <Box display="flex" sx={{gap:"7px", alignItems: "center", justifyContent: "center"}}>
                {/* <Avatar className={classes.avatar} sx={{ width: 24, height: 24 }}>
                  <BusinessIcon color="primary" />
                </Avatar> */}
                <Typography variant="subtitle2" sx={{fontSize:nameSize}}>{org.responsabile}</Typography>
                </Box>
              
            </Box>
        </CardContent>
        {org.children &&   <IconButton 
          size="small"
          onClick={onCollapse}
          className={clsx(classes.expand, {
            [classes.expandOpen]: !collapsed,
          })}
          >
          <ExpandMoreIcon />
        </IconButton>}
      
      </Card>
          </div>
    );
  }



  function Node({ o, parent, size }) {
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
          />
        }
      >
        {_.map(o.children, (c) => (
          <Node o={c} parent={o} size={size} />
        ))}
      </T>
    );
  }
  export default function PosizionamentoAziendale({organization}) {
    const [size, setsize] = useState("medium")
    return <Node o={organization} size={size} />

  }