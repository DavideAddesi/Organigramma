import React, { useState, useCallback, useRef } from 'react';
import { styled } from '@mui/material/styles';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  DialogTitle,
  IconButton,
} from '@mui/material';

import LinkIcon from '@mui/icons-material/Link'
import Skeleton from '@mui/material/Skeleton';
import Badge from '@mui/material/Badge';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SchoolIcon from '@mui/icons-material/School';


const color = (stato) =>{
  if(stato==1) return "#44b700"
  if(stato==2) return "#EFB700"
  if(stato==3) return "#B81D13"
}



const ProfileDetails = ({ className, user, ...rest }) => {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      width: '15px',
      height: '15px',
      backgroundColor: color(user?.stato),
      color: color(user?.stato),
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  })); 

  return (
      <Card style={{height:"100%"}} >
        <CardContent>
          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            textAlign="center"
          >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar sx={{ height: 150, width: 150}} src={user.avatar} />
            </StyledBadge>
            <Typography color="primary" variant="h5">{user.nome} </Typography>
            <div style={{display: 'flex', flexDirection: 'column', gap: 5}}>
              <Typography
              color="textSecondary"
              variant="overline"
              >
                {user.ruolo}, {user.sede} 
              </Typography>
              <Button variant='outlined' sx={{color:"#0e76a8", borderColor:"#0e76a8"}} >
                Linkedin <LinkedInIcon sx={{color:"#0e76a8"}} />
              </Button>
            </div>
          </Box>
        </CardContent>
     
      </Card>
  )
};



export default ProfileDetails;
