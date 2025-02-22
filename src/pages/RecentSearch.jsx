import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Card,
    CardContent,
    Typography,
    Stack,
    useMediaQuery,
    useTheme,
    Avatar,
} from "@mui/material";

const RecentSearch = () => {
    const [recentSearches, setRecentSearches] = useState([]);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    useEffect(() => {
        const storedSearches = JSON.parse(localStorage.getItem("recentSearches")) || [];
        setRecentSearches(storedSearches.slice(0, 3));
    }, []);

    const handleClick = (user) => {
        navigate(`/user/${user.id}`);
    };

    return (
        <Container maxWidth="md" sx={{pb:5}}>
            <Typography sx={{pt:5}} variant="h6" component="h1" gutterBottom>
                Recent Searches
            </Typography>
            <Stack
                direction={isMobile ? "column" : "row"}
                spacing={2}
                justifyContent="center"
            >
                {recentSearches.map((user) => (
                    <Card
                        key={user.id}
                        onClick={() => handleClick(user)}
                        sx={{ cursor: "pointer", flex: 1 }}
                    >
                        <CardContent>
                            <Avatar
                                src={user.image}
                                alt={user.firstName}
                                sx={{ width: 40, height: 40 }}
                            />
                            <Typography variant="h6">
                                {user.firstName} {user.lastName}
                            </Typography>
                            <Typography variant="body2">{user.email}</Typography>
                            <Typography variant="body2">{user.ssn}</Typography>
                        </CardContent>
                    </Card>
                ))}
            </Stack>
        </Container>
    );
};

export default RecentSearch;
