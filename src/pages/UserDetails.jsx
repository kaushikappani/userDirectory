import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import { Typography } from "@mui/material";
import '../css/UserDetails.css';
import { UserDetailsPlaceHolder } from "../components/UserDetailsPlaceHolder";
import UserDetailsComponent from "../components/UserDetailsComponent";

function UserDetails() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        setLoading(true);
        axios.get(`${config.API_BASE_URL}/${id}`)
            .then((response) => setUser(response.data))
            .catch((error) => {
                console.error("Error fetching user details:", error);
                setError(error.response.data.message || "Error Fetching Client Details");
                
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <UserDetailsPlaceHolder />
        );
    }

    if (!user) return <Typography color='error' variant="h6" textAlign="center" mt={3}>{error}</Typography>;

    return (
        <UserDetailsComponent user={user} />
    );
}

export default UserDetails;