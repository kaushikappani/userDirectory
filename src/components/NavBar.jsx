import React, { use, useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Snackbar, Alert, CircularProgress } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "../../config";

const NavBar = ({ darkMode, setDarkMode }) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");
    const [loading, setLoading] = useState(false);


    const handleLoadData = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${config.API_BASE_URL}/load`);
            if (response.status === 200) {
                setSnackbarMessage("Users loaded successfully");
                setSnackbarSeverity("success");
            } else {
                setSnackbarMessage("Failed to load users");
                setSnackbarSeverity("error");
            }
        } catch (error) {
            setSnackbarMessage("Error loading users");
            setSnackbarSeverity("error");
        } finally {
            setOpenSnackbar(true);
            setLoading(false);
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === "clickaway") return;
        setOpenSnackbar(false);
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                            textDecoration: "none",
                            color: "inherit",
                        }}
                        component={Link}
                        to="/"
                    >
                        User Directory
                    </Typography>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        User Directory
                    </Typography>
                    {loading && <CircularProgress color="inherit" size="30px" sx={{mr:2}} /> }
                    {!loading && <Typography
                        component="button"
                        onClick={handleLoadData}
                        sx={{
                            background: "none",
                            border: "none",
                            color: "inherit",
                            cursor: "pointer",
                            font: "inherit",
                            padding: 0,
                            marginRight: 2
                        }}
                    >
                        Load Data
                    </Typography>}
                    <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
                        {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default NavBar;
