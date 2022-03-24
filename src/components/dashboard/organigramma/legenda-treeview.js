
import {
  Box,
  Typography
} from '@mui/material';
import DirezioneIcon from '@mui/icons-material/CorporateFare';
import StrutturaIcon from '@mui/icons-material/Store';
import UnitaIcon from '@mui/icons-material/Work';
import makeStyles from '@mui/styles/makeStyles';
import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLandmark, faBuilding, faBriefcase } from "@fortawesome/free-solid-svg-icons";

fontawesome.library.add(faLandmark, faBuilding, faBriefcase);
const useStyles = makeStyles((theme) => ({
  iconContainer: {
    display: "flex",
    gap:"5px", 
    alignItems:"center"
  },
  text: {
    fontSize:"12px", 
    fontWeight:"bold"
  },
}));

 const Legenda = ({color}) =>{
  const classes = useStyles();
  return (
    <Box display='flex' sx={{gap:"12px"}}>
      <Box className={classes.iconContainer}>
      <Typography variant="body2">Direzione</Typography> 
      <FontAwesomeIcon icon={faLandmark} />   
      </Box>
      <Box className={classes.iconContainer}>
        <Typography variant="body2">Struttura</Typography> 
        <FontAwesomeIcon icon={faBuilding} />
      </Box>
      <Box className={classes.iconContainer}>
      <Typography variant="body2">Unità di coordinamento</Typography> 
      <FontAwesomeIcon icon={faBriefcase} />
      </Box>    
    </Box>
  
  )
 
}

export default Legenda