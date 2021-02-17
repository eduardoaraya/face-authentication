import React, { FunctionComponent, ReactElement } from 'react';

const Template = ({ children }): ReactElement => {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{process.env.APP_NAME}</title>
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />
                <link rel="stylesheet" href="default.css" />
            </head>
            <body>
                {...children}
            </body>
        </html>
    );
}

export default Template;