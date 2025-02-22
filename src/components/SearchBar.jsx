import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import debounce from "lodash.debounce";

import {
    TextField,
    Autocomplete,
    Typography,
    Container,
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Alert,
} from "@mui/material";

function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [recentSearches, setRecentSearches] = useState(() => {
        return JSON.parse(localStorage.getItem("recentSearches")) || [];
    });
    const navigate = useNavigate();

    const fetchUsers = useCallback(
        debounce(async (searchValue) => {
            if (searchValue.length < 3) {
                setResults([]);
                return;
            }
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(
                    `${config.API_BASE_URL}?search=${searchValue}`
                );
                setResults(response.data);
            } catch (err) {
                console.error("Error fetching users:", err);
                setError("Failed to load users. Please try again.");
            } finally {
                setLoading(false);
            }
        }, 300),
        [recentSearches]
    );

    const handleInputChange = (event, value, reason) => {
        setQuery(value);
        if (reason === "input") {
            fetchUsers(value);
        }
    };

    const handleSelect = (event, user) => {
        if (user) {
            navigate(`/user/${user.id}`);
            setRecentSearches((prev) => {
                const updatedSearches = [
                    user,
                    ...prev.filter((u) => u.id !== user.id),
                ].slice(0, 3);
                localStorage.setItem(
                    "recentSearches",
                    JSON.stringify(updatedSearches)
                );
                return updatedSearches;
            });
        }
        
    };

    useEffect(() => {
        return () => {
            fetchUsers.cancel();
        };
    }, [fetchUsers]);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                User Search
            </Typography>
            {error && <Alert severity="error">{error}</Alert>}
            <Autocomplete
                freeSolo
                options={results}
                getOptionLabel={(option) =>
                    `${option.firstName} ${option.lastName} - ${option.email} - ${option.ssn}`
                }
                onInputChange={handleInputChange}
                onChange={handleSelect}
                loading={loading}
                renderOption={(props, option) => (
                    <ListItem {...props} key={option.id} alignItems="center">
                        <ListItemAvatar>
                            <Avatar
                                src={option.image}
                                alt={option.firstName}
                                sx={{ width: 40, height: 40 }}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={`${option.firstName} ${option.lastName}`}
                            secondary={`${option.email} - ${option.ssn}`}
                        />
                    </ListItem>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search users..."
                        placeholder="Search by name or SSN"
                        fullWidth
                    />
                )}
            />
        </Container>
    );
}

export default SearchBar;
