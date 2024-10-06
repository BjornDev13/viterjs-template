import { useEffect, useState } from 'react';
import { loadGapiInsideDOM } from 'gapi-script';

interface GapiConfig {
    apiKey: string;
    clientId: string;
    discoveryDocs: string[];
    scope: string;
}

declare global {
    interface Window {
        gapi: any;
    }
}

const config: GapiConfig = {
    clientId: "648269783310-61q63e89kveflqcapdr6be16n5ls0jat.apps.googleusercontent.com",
    apiKey: "AIzaSyDV3MNRfR29S9K-8zZndV8j_bgKmufPhQo",
    discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
    scope: "https://www.googleapis.com/auth/calendar",
};

const useGapi = () => {
    const [gapiLoaded, setGapiLoaded] = useState(false);

    useEffect(() => {
        const initializeGapi = async () => {
            await loadGapiInsideDOM();
            await window.gapi.load('client:auth2', () => {
                window.gapi.client.init({
                    apiKey: config.apiKey,
                    clientId: config.clientId,
                    discoveryDocs: config.discoveryDocs,
                    scope: config.scope,
                }).then(() => {
                    setGapiLoaded(true);
                    console.log('GAPI initialized');
                });
            });
        };

        if (typeof window !== 'undefined') {
            initializeGapi();
        }
    }, [config]);

    return gapiLoaded;
};

export default useGapi;
