import { useEffect, useState } from 'react';
import _ from "lodash";
import clsx from "clsx"
import { Avatar, Grid, Switch, Box, IconButton, Button, Card, CardContent, CardHeader,Menu, MenuItem,ListItemIcon, ListItemText, Badge, Tooltip,CardActions, Divider, Typography, TextField } from '@mui/material';
import { Tree, TreeNode } from "react-organizational-chart";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useDrag, useDrop } from "react-dnd";
import organization from "./org.json";
import cda from "./cda.json";
import presidenza from "./presidenza.json";
import makeStyles from '@mui/styles/makeStyles';

import BusinessIcon from "@mui/icons-material/Business";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const useStyles = makeStyles((theme) => ({
    root: {
      background: "white",
      display: "inline-block",
      // maxwWdth:"200px",
      borderRadius: 16,
    },
    expand: {
      transform: "rotate(0deg)",
      marginTop: -10,
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.short,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: "#ECECF4",
      

    },
  }));

  function Organization({ org, onCollapse, collapsed, size }) {
    
    const classes = useStyles();
    const backgroundColor = () =>{
        if(org.type==0) return "#ffd27f"
        if(org.type==1) return "#ddffd2"
        if(org.type==2) return "#A7C7E7"
        if(org.type==3) return "#fff"
        if(org.type==8) return "#D66666"
        if(org.type==9) return "#f8873b"

         return "#000"
    }


    const codeSize = size == "small" ? "5px": size== "medium" ? "7px":"10px" 
    const roleSize = size == "small" ? "10px": size== "medium" ? "12px":"18px" 
    const nameSize = size == "small" ? "7px": size== "medium" ? "10px":"13px" 

    return (
      <Card
        variant="outlined"
        className={classes.root}
        style={{ backgroundColor: backgroundColor() }}
      >
     
     {/* code role name: 10, 18, 13 /   */}
        <CardContent sx={{padding:"10px 5px"}}>
            <Typography variant="caption" sx={{fontSize:codeSize}}>{org.code}</Typography>
            <Box display="flex" sx={{flexDirection:"column"}}>
                <Typography  sx={{fontSize:roleSize, fontWeight: 600,}}>{org.role}</Typography>
                <Box display="flex" sx={{gap:"7px", alignItems: "center", justifyContent: "center"}}>
                {/* <Avatar className={classes.avatar} sx={{ width: 24, height: 24 }}>
                  <BusinessIcon color="primary" />
                </Avatar> */}
                <Typography variant="subtitle2" sx={{fontSize:nameSize}}>{org.name}</Typography>
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
    const [size, setsize] = useState("medium")
    const [displayMore, setDisplayMore] = useState(false)

    return (
        <>
          <Box style={{display: "flex", alignItems: "center"}}>
        
            <Box style={{display: "flex", alignItems: "center", gap:"7px"}}>
            <Typography
                gutterBottom
                variant="subtitle2"
              >
                Organigramma completo
              </Typography>
              <Switch 
                checked={displayMore}
                onChange={()=>setDisplayMore(!displayMore)}            
                edge="start"
                name="displayMore"
              />
              
              </Box>
              <TextField
                defaultValue={size}
                label="Carattere"
                select
                size="small"
                sx={{ m: 1 }}
                onChange={event=>setsize(event.target.value)}
            >
                <MenuItem value="small">piccolo</MenuItem>
                <MenuItem value="medium">medio</MenuItem>
                <MenuItem value="large">grande</MenuItem>
            </TextField>
          </Box>
           
          <Grid
            container
            mt={3}
            spacing={4}
          > 
            {displayMore && <Grid item md={2}><Node o={cda} size={size} /></Grid>} 
            {displayMore && <Grid item md={2}><Node o={presidenza} size={size} /></Grid>}
            <Grid item md={displayMore ? 8: 12}><Node o={organization} size={size} /></Grid>
          </Grid>
           
        </>
    );
  }