import axios from "axios";

const API_URL = "https://eu-api.backendless.com/FD203853-9C74-AAF6-FF8E-121ACE300400/4D9C57D7-5389-40E5-AB49-744270229B82/users/";
const headers =  {
    'Content-Type': 'application/json',
    'REST-API-Key': '4D9C57D7-5389-40E5-AB49-744270229B82'
}

export const LoggedIn = (login, password) => {
  return axios
    .post(API_URL + "login", {
      login,
      password,
    },
     {
        headers: headers
      }
    )
    .then((response) => {
      if (response.data.userStatus === "ENABLED") {
        localStorage.setItem("user", JSON.stringify(response));
      }

      return response;
    });
};

