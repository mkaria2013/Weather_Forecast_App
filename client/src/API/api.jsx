const BASEURL = "http://localhost:3001/api/v1/";

export const API = {
    SIGNIN: BASEURL + "login",
    REGISTER: BASEURL + "register",
    LOGOUTUSER: BASEURL + "logout",

    // https://countrystatecity.in/docs/api/cities-by-country/
    COUNTRY: "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json",
    STATUS: "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json",
    CITYS: "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json",
};
