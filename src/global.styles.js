import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body {
        font-family: 'Lato', sans-serif;
        background-color: #ffffff;

        @media screen and (max-width: 800px) {
            padding: 10px;
        }
    }

    a {
        text-decoration: none;
    }

    * {
        box-sizing: border-box;
    }
`;