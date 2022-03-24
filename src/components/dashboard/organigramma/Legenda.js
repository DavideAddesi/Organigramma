
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

 const Legenda = ({border}) =>{
    const useStyles = makeStyles((theme) => ({
        root: {
          background: "white",
          display: "inline-block",
          borderRadius: 16,
          display: "flex", 
          flexDirection: "column", 
          justifyContent: "center",
          border:`1px solid ${border && "black"}`
        },
        content: {
          padding: "0 5px"
        },
        text: {
          fontSize:"3px", 
          fontWeight:"bold"
        },
      }));
  const classes = useStyles();
  return (
    <Box display='flex' sx={{gap:"10px"}}>
      <Card
        variant="outlined"
        className={classes.root}
        style={{ backgroundColor: "#ddffd2"}}
      >   
        <div className={classes.content}>
            <Typography variant="body2">Direzione</Typography>         
        </div> 
      </Card>

      <Card
        variant="outlined"
        className={classes.root}
        style={{ backgroundColor: "#A7C7E7" }}
      >
       <div className={classes.content}>
            <Typography variant="body2">Struttura</Typography>         
        </div>  
      </Card>

      <Card
        variant="outlined"
        className={classes.root}
        style={{ backgroundColor: "#fff" }}
      >
       <div className={classes.content}>
            <Typography variant="body2">Unità di coordinamento</Typography>         
        </div>  
      </Card>
    </Box>
  
  )
 
}

export default Legenda