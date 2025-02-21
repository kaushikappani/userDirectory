import React from 'react'
import { Card, CardContent, Typography, CardMedia, Container, Box } from "@mui/material";


const UserDetailsComponent = ({ user }) => {
    return (
        <Container maxWidth="sm">
            <Card sx={{ mt: 3 }}>
                <CardMedia
                    loading="lazy"
                    component="img"
                    height="200"
                    image={user.image || "https://via.placeholder.com/150"}
                    alt="User"
                />
                <CardContent>
                    <Typography variant="h5" gutterBottom>{user.firstName} {user.lastName}</Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 1 }}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>SSN:</Typography>
                        <Typography variant="body1">{user.ssn}</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Email:</Typography>
                        <Typography variant="body1">{user.email}</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>BirthDate:</Typography>
                        <Typography variant="body1">{user.birthDate}</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Phone:</Typography>
                        <Typography variant="body1">{user.phone}</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>University:</Typography>
                        <Typography variant="body1">{user.university}</Typography>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    )
}

export default UserDetailsComponent