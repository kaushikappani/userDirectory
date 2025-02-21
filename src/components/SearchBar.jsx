import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";

import { TextField, Autocomplete, Typography, Container } from "@mui/material";


function SearchBar() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSearch = async (event, value) => {
        console.log(value);
        setQuery(value);
        if (value.length >= 3 && event.type=='change') {
            setLoading(true);
            try {
                const response = await axios.get(
                    `${config.API_BASE_URL}?search=${value}`
                );
                setResults(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setLoading(false);
            }
        } else {
            setResults([]);
        }
    };

    const handleSelect = (event, user) => {
        console.log(user);
        if (user) {
            navigate(`/user/${user.id}`);
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                User Search
            </Typography>
            <Autocomplete
                freeSolo
                options={results}
                getOptionLabel={(option) =>
                    `${option.firstName} ${option.lastName} - ${option.email} - ${option.ssn}`
                }
                onInputChange={handleSearch}
                onChange={handleSelect}
                loading={loading}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search users..."
                        placeholder="Search By name or ssn"
                        fullWidth
                    />
                )}
            />
        </Container>
    );
}

export default SearchBar;