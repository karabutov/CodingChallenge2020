export const environment = {
    url: "http://localhost:8090",
    url2: "http://localhost:8080"
};

export const isLoggedIn = () => {
    var isLogged = localStorage.getItem("isLogged");
    return  isLogged != null && isLogged === 'true';
};