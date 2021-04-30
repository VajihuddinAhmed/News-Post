import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Lato', sans-serif;
        background-color: #ffffff;

        @media screen and (max-width: 640px) {
            padding: 0;
        }
    }

    a {
        text-decoration: none;
    }

    * {
        box-sizing: border-box;
    }
`;