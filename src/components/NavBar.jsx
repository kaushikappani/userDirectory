import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


const NavBar = ({ darkMode, setDarkMode }) => {

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
                >
                    User Directory
                </Typography>

                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                >
                    User Directory
                </Typography>
                <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
                    {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>

            </Toolbar>
        </AppBar>
    );
};

export default NavBar;