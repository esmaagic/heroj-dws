"use client"
import * as React from 'react';
import TopNav from '../components/TopNav'
import BottomNav from '../components/BottomNav'

export default function NavBar() {
  

  return (
    <>
    

    </>
  /*   <>
   

<AppBar position="static" >
  <Container maxWidth="xl"   >
    <Toolbar disableGutters sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <LocalHospitalTwoToneIcon sx={{ display: {  md: 'flex' }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="#app-bar-with-responsive-menu"
          sx={{
            mr: 2,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          HERO
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        
          <Button
            key="quick-search"
            sx={{ my: 2, color: 'white', display: 'flex', marginRight: '10px', backgroundColor: 'secondary.main' }}
          >
            Pretraga
            <SearchIcon sx={{ ml: 1, fontSize: 18}} />
          </Button>
        

        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <AccountCircleIcon  sx={{ fontSize: 45, color:'white' }} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Toolbar>
  </Container>
</AppBar>


    <Paper  sx={{ position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Pocetna" icon={<HomeIcon />} />
        <BottomNavigationAction label="Kviz" icon={<QuizIcon />} />
        <BottomNavigationAction label="Forum" icon={<ForumIcon />} />
        <BottomNavigationAction label="Racun" icon={<AccountCircleIcon />} />
        
      </BottomNavigation>
    </Paper>
    </> */
    
  );
}
