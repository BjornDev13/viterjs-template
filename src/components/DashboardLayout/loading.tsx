import React from 'react';

const Loading: React.FC = () => {
    return (
        <div style={styles.container}>
            <img src={'images/logos/ICONO-UrgentCare.png'} alt="App Logo" style={styles.logo} />
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#ffffff',
    },
    logo: {
        width: '500px',
        height: 'auto',
    },
};

export default Loading;