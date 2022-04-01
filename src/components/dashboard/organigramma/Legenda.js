
import {Box, Typography, Card} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  root: {
    width:"20px",
    height:"20px",
    display: "inline-block",
    border:"1px solid #bbc",
  },
  container:{
    display:'flex', 
    gap:"5px"
  }
}));

 const Legenda = () =>{
    
  const classes = useStyles();
  return (
    <Box display='flex' sx={{gap:"10px"}}>

      <div className={classes.container}>
        <Card
          className={classes.root}
          style={{ backgroundColor: "#ddffd2"}}
        /> 
        <Typography variant="body2">Direzione</Typography>         
      </div>

      <div className={classes.container}>
        <Card
          className={classes.root}
          style={{ backgroundColor: "#A7C7E7" }}
        />    
        <Typography variant="body2">Struttura</Typography>         
      </div>

      <div className={classes.container}>
        <Card
          className={classes.root}
          style={{ backgroundColor: "#fff" }}
        /> 
        <Typography variant="body2">Unità operativa</Typography>         
      </div>  
  </Box>

  )
 
}

export default Legenda