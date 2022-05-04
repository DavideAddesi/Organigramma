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
    if(type=="direzione") return   <Chip label={withNoCDR} color="direzione" />

    // <FontAwesomeIcon icon={faBuilding} />
    if(type=="struttura") return  <Chip label={withNoCDR} color="struttura" />

    // <FontAwesomeIcon icon={faBriefcase} />
    if(type=="unita") return <Chip label={withNoCDR || "******"} variant="outlined"  />
  }

  const cap = (value) =>{
    const capValue = value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : ""
    return capValue
  }

  const treeItemLabel = node =>{
      return(
          <Box display="flex" sx={{justifyContent:"space-between", p:"7px"}} >
            <Box sx={{display:"flex", alignItems: "center", gap:"7px"}}>
                {node.type!== 0 ? dettaglio ? null: chip(node.type, node.code): null}
                <Typography variant="body2" style={{fontSize: "0.975rem"}}>{cap(node.name)}</Typography> 
            </Box>
            {/* <Typography variant="caption" sx={{fontSize:"10px"}} >{node.code}</Typography>  */}
            <Typography variant="caption" sx={{fontSize:"10px", fontWeight:"600"}} >{node.responsabile}</Typography> 
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
    <Box sx={{margin:"auto"}}>
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