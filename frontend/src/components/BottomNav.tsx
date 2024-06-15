"use client"
import * as React from 'react';
import { useState } from 'react';
import {Paper, Dialog, DialogContent } from '@mui/material';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import ForumIcon from '@mui/icons-material/Forum';
import QuizIcon from '@mui/icons-material/Quiz';
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { usePathname } from 'next/navigation'
import MapIcon from '@mui/icons-material/Map';
import MapContainer from '../components/Map';

export default function NavBar() {
  const [value, setValue] = useState('home');
  const pathname = usePathname()
  const canRender = pathname !=='/login' && pathname !=='/register' ? true : false
  const [openMap, setOpenMap] = useState(false);

  const handleMapClick = () => {
    setOpenMap(true);
  };

  const handleCloseMap = () => {
    setOpenMap(false);
  };


  return (
    <>
      {canRender && (
        <>
          <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
              showLabels
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            >
              <BottomNavigationAction href='/' label="Pocetna" value="home" icon={<HomeIcon />} />
              <BottomNavigationAction href='/quiz' label="Kviz" value="quiz" icon={<QuizIcon />} />
              <BottomNavigationAction href='/forum' label="Forum" value="forum" icon={<ForumIcon />} />
              <BottomNavigationAction label="Racun" value="account" icon={<AccountCircleIcon />} />
              <BottomNavigationAction label="Map" value="map" icon={<MapIcon />} onClick={handleMapClick} />
            </BottomNavigation>
          </Paper>
          <Dialog open={openMap} onClose={handleCloseMap}>
            <DialogContent>
              <MapContainer />
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
    

}
