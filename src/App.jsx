import { lazy, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container, CssBaseline, Box, createTheme, ThemeProvider, FormControlLabel, Switch } from "@mui/material";
import "./App.css";
import SearchBar from "./components/SearchBar";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const UserDetails = lazy(() => import("./pages/UserDetails"));

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const theme = darkMode ? darkTheme : lightTheme;
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Container maxWidth="md" className="app-container">
          <Box>
            <SearchBar />
          </Box>
          <Routes>
            <Route path="/user/:id" element={<UserDetails />} />
          </Routes>
        </Container>
        <Footer />
      </ThemeProvider >
    </Router>
  );
}

export default App;