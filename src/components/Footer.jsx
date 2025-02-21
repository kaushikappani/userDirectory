import React from 'react';
import { Box, Typography, Container } from '@mui/material';

import { GitHub } from '@mui/icons-material';

const Footer = () => {
    return (
        <Box
            component="footer"
            className='page-footer'
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                textAlign: 'center',
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="body2" color="text.secondary">
                    Made with ❤️ by Appani Kaushik
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <a target='_blank' href='https://github.com/kaushikappani/users-api'> <GitHub /> </a>
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;