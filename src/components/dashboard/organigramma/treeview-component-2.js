import * as React from 'react';
import {Box, Typography, Button} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import org from './org.json'

import DirezioneIcon from '@mui/icons-material/CorporateFare';
import StrutturaIcon from '@mui/icons-material/Store';
import UnitaIcon from '@mui/icons-material/Work';
import { noCase } from 'change-case';
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLandmark, faBuilding, faBriefcase } from "@fortawesome/free-solid-svg-icons";

fontawesome.library.add(faLandmark, faBuilding, faBriefcase);

export default function ControlledTreeView() {
  const [expanded, setExpanded] = React.useState([]);
  const [selected, setSelected] = React.useState([]);
  const [ids, setIds] = React.useState([])

  React.useEffect(() => {
    const firstCode= org.id
    recursiveIds(org.children, [firstCode])
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

  const icon = type =>{
    if(type==1) return <FontAwesomeIcon icon={faLandmark} />  
    if(type==2) return <FontAwesomeIcon icon={faBuilding} />
    if(type==3) return <FontAwesomeIcon icon={faBriefcase} />
  }

  const cap = (value) =>{
    const capValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() 
    return capValue
  }

  const treeItemLabel = node =>{
      return(
          <Box display="flex" sx={{justifyContent:"space-between"}} >
            <Box sx={{display:"flex", alignItems: "center", gap:"7px"}}>
                {node.type!== 0 ? icon(node.type): null}
                <Typography variant="body2">{cap(node.role)}</Typography> 
            </Box>
            <Typography variant="caption" sx={{fontSize:"10px"}} >({node.name})</Typography> 
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
    <Box sx={{ height: 600, flexGrow: 1, width: 700, overflowY: 'auto' }}>
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
        {renderTree(org)}
      </TreeView>
    </Box>
  );
}