import React, { useEffect, useState } from 'react';

const IframeComponent = ({ src }) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoad = () => {
        setIsLoading(false);
    };

    return (
        <div style={{ height: '100vh' }}>
            {isLoading && (
                <div>Loading...</div>
            )}
            <center><a href={src}>{src}</a></center>
            <iframe
                src={src}
                title="Sales Mafia Online - Add Shop"
                width="100%"
                height="100%"
                frameBorder="0"
                onLoad={handleLoad}
            ></iframe>

        </div>)
};

export default IframeComponent;