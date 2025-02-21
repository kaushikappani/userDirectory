import React from 'react'
import placeHolderImage from '../assets/ebe6eb.png'
import { Card, CardContent, Typography, CardMedia, Container, Box } from "@mui/material";


export const UserDetailsPlaceHolder = () => {
    return (
        <Container style={{ width: "95vw", maxWidth: "600px" }}>
            <Card sx={{ mt: 3 }}>
                <CardMedia
                    component="img"
                    height="200"
                    image={placeHolderImage}
                    alt="Loading"
                />
                <CardContent>
                    <Typography variant="h5" gutterBottom>Loading...</Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>SSN:</Typography>
                        <Typography variant="body1">Loading...</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Email:</Typography>
                        <Typography variant="body1">Loading...</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>BirthDate:</Typography>
                        <Typography variant="body1">Loading...</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Phone:</Typography>
                        <Typography variant="body1">Loading...</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>University:</Typography>
                        <Typography variant="body1">Loading...</Typography>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    )
}
