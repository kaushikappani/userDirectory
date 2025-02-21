import React from 'react';
import { Card, CardContent, Typography, CardMedia, Container, Box, IconButton, Tooltip } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import placeHolderImage from '../assets/ebe6eb.png';

const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
};

const UserDetailsComponent = ({ user }) => {
    return (
        <Container style={{ width: "95vw", maxWidth: "600px" }}>
            <Card sx={{ mt: 1 }}>
                <CardMedia
                    loading="lazy"
                    component="img"
                    height="200"
                    image={user.image || placeHolderImage}
                    alt="User"
                    sx={{ objectFit: 'contain' }}
                />
                <CardContent>
                    <Typography variant="h5" gutterBottom>{user.firstName} {user.lastName}</Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 1, alignItems: 'center' }}>
                        {[
                            { label: "SSN", value: user.ssn },
                            { label: "Email", value: user.email },
                            { label: "BirthDate", value: user.birthDate },
                            { label: "Phone", value: user.phone },
                            { label: "University", value: user.university }
                        ].map((item, index) => (
                            <React.Fragment key={index}>
                                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{item.label}:</Typography>
                                <Typography
                                    variant="body1"
                                    sx={{ wordBreak: "break-word", overflowWrap: "break-word" }}
                                >
                                    {item.value}
                                </Typography>
                                {item.label !== "BirthDate" && item.label !== "University" && (
                                    <Tooltip title={`Copy ${item.label}`}>
                                        <IconButton onClick={() => copyToClipboard(item.value)}>
                                            <ContentCopyIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                )}
                                {item.label === "BirthDate" || item.label === "University" ? <Box /> : null}
                            </React.Fragment>
                        ))}
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default UserDetailsComponent;
