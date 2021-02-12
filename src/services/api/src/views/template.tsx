import React, { FunctionComponent, ReactElement } from 'react';

const Template: FunctionComponent = ({ children }): ReactElement => {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Project</title>
            </head>
            <body>
                {children}
            </body>
        </html>
    );
}

export default Template;