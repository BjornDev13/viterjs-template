import React from 'react';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { keyframes } from '@emotion/react';

interface LoadingProps {
  msg?: string;
}

const Loading: React.FC<LoadingProps> = ({ msg = '' }) => {
  const spin = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  `;

  const fadeIn = keyframes`
    0% {
      opacity: 0.5;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.5;
    }
  `;

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: '0',
        left: '0',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999999,
      }}
    >
      <Box
        sx={{
          height: '40px',
          width: '40px',
          borderRadius: '50%',
          borderBottom: '6px solid #FFF',
          borderLeft: '6px solid #FFF',
          borderTop: '6px solid #FFF',
          borderRight: '6px solid transparent',
          animation: `${spin} 1s infinite linear`,
        }}
      />
      {msg && (
        <Typography
          component="p"
          sx={{
            fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
            color: '#FFF',
            marginTop: '12px',
            animation: `${fadeIn} 2s infinite linear`,
          }}
        >
          {msg}
        </Typography>
      )}
    </Box>
  );
};

export default Loading;
