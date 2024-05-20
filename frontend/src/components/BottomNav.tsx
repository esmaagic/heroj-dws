"use client"
import * as React from 'react';
import { useState } from 'react';
import {Paper} from '@mui/material';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ForumIcon from '@mui/icons-material/Forum';
import QuizIcon from '@mui/icons-material/Quiz';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { usePathname } from 'next/navigation'

export default function NavBar() {
  const [value, setValue] = useState(0);
  const pathname = usePathname()
  const canRender = pathname !=='/login' && pathname !=='/register' ? true : false



  return (
    <>
    {canRender && 
    <Paper  sx={{ position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    >
      <BottomNavigationAction href='/' label="Pocetna" icon={<HomeIcon />} />
      <BottomNavigationAction label="Kviz" icon={<QuizIcon />} />
      <BottomNavigationAction label="Forum" icon={<ForumIcon />} />
      <BottomNavigationAction label="Racun" icon={<AccountCircleIcon />} />
      
    </BottomNavigation>
  </Paper>
    
    }
    
    </>

    

    
  );
}
