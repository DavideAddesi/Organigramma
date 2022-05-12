import * as React from 'react';
import {Box, Typography, Button} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
// import org from './org.json'

// import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DirezioneIcon from '@mui/icons-material/AccountBalance';
import StrutturaIcon from '@mui/icons-material/Store';
import UnitaIcon from '@mui/icons-material/Work';

import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLandmark, faBuilding, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import Chip from '@mui/material/Chip';

fontawesome.library.add(faLandmark, faBuilding, faBriefcase);

export default function ControlledTreeView({org, h, cda, pres, outsourcing, ecocerved, iconto, dettaglio}) {
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [ids, setIds] = React.useState([])

  React.useEffect(() => {
    const firstCodes= ["infoRoot", org?.id, cda?.id, pres?.id, outsourcing?.id, ecocerved?.id, iconto?.id]
    recursiveIds(org.children, firstCodes)
  }, [])
  

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    setSelected(nodeIds);
  };
  const recursiveIds = (nodes, actualIds) =>{
    nodes.map(item => {
        item.id && actualIds.push(item.id);
        if(item.children)(
            recursiveIds(item.children, actualIds)
        )
    })
    setIds(actualIds)
  }

  const handleExpandClick = () => {
    setExpanded((oldExpanded) =>
      oldExpanded.length === 0 ? ids : [],
    );
  };

  // <FontAwesomeIcon icon="fa-solid fa-landmark" />
  // <FontAwesomeIcon icon="fa-solid fa-buildings" />

  //<FontAwesomeIcon icon="fa-solid fa-briefcase" />


  const chip = (type, code) =>{ 
    const withNoCDR = code ? code.split("CDR").pop(): ""
    if(type!="unita"){
      let color="unita"
      if(type=="direzione") color="direzione" 
      if(type=="struttura") color="struttura"
      if(type=="presidenza") color= "presidenza" 
      return <Chip label={withNoCDR} style={{marginBottom:"7px"}}color={color} size="small" sx={{width:"66px", fontSize:"10px"}}  />
    }else{
      return <Chip label={withNoCDR} style={{marginBottom:"7px"}} variant="outlined" size="small" sx={{width:"66px", fontSize:"10px"}}  />
    }

  }

  const cap = (value) =>{
    const capValue = value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : ""
    return capValue
  }

  const backgroundColor = (type) =>{

    if(type=="presidenza") return "#D66666" //presidenza
    if(type=="cda") return "#f8873b" //cda
    if(type=="area" || type=="area-unit") return "#F5F5F5" //area (staff, business unit, ecc...)
    if(type=="dirGenerale") return "#ffd27f" //direzione generale
    if(type=="direzione") return "#ddffd2" //direzione
    if(type=="struttura") return "#A7C7E7" //struttura
    if(type=="unita") return "#fff"  //unità operativa
  }

  const treeItemLabel = node =>{
      return(
          <Box sx={{display:"flex",  flexDirection:"column", /*borderLeft:`4px solid ${node.type ? backgroundColor(node.type) :"black"}`, borderRadius:"10px"*/ paddingLeft:"10px",/*backgroundColor:backgroundColor(node.type), borderRadius:"8px"*/ }} >
                <Typography variant="body2" style={{fontSize: "0.975rem", fontWeight:"500"}}>{cap(node.name)}</Typography> 
                {node.code && node.type!= "dirGenerale"&& node.type!= "area"&& node.type!= "cda" ? dettaglio ? null: chip(node.type, node.code): null}
                <Typography variant="caption" sx={{fontSize:"12px", fontWeight:"300"}} >{node.responsabile}</Typography> 
                {/* <Typography variant="caption" sx={{fontSize:"12px", fontWeight:"300"}} >{node.code?.split("CDR").pop()}</Typography>  */}
                
          </Box>
      )
  }

   const renderTree = (nodes) => (
    <TreeItem key={nodes.id} nodeId={nodes.id} label={treeItemLabel(nodes)} sx={{my:"10px"}}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  



  return (
    <Box sx={{ my:"1px"}}>
      <Box sx={{ mb: 1 }}>
        <Button onClick={handleExpandClick}>
          {expanded.length === 0 ? 'Espandi tutto' : 'Riduci tutto'}
        </Button>
      </Box>
      <TreeView
        aria-label="controlled"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        expanded={expanded}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
        multiSelect
      >
        {!dettaglio ? (
          <>
             <TreeItem key={"infoRoot"} nodeId={"infoRoot"} label={treeItemLabel({name:"InfoCamere"})} sx={{my:"10px"}}>
              {renderTree(cda)}
              {renderTree(pres)}
              {renderTree(org)}
            </TreeItem>
            {renderTree(outsourcing)}
            {renderTree(ecocerved)}
            {renderTree(iconto)}
          </>        
        ) : (
          renderTree(org)
        )}
        
       
      </TreeView>
    </Box>
  );
}