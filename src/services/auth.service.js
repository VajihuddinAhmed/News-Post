import axios from "axios";

const API_URL = "https://eu-api.backendless.com/2F91D088-EB50-B7B7-FFFC-8439A97CF700/B69C0E45-5D57-4B34-B301-B4DE62FDB203/users/";
const headers =  {
    'Content-Type': 'application/json',
    'REST-API-Key': 'B69C0E45-5D57-4B34-B301-B4DE62FDB203'
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

export const SignUp = (email, name,  password) => {
  return axios.post(API_URL + "register", {
    email,
    name,
    password,
  }, 
  {
    headers: headers
  }
  )
  .then((response) => {
    console.log(response)
    return response
  })
};

