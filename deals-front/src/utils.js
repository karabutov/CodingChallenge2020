export const environment = {
    url: "http://localhost:8090"
};

export const isLoggedIn = () => {
    var isLogged = localStorage.getItem("isLogged");
    return  isLogged != null && isLogged === 'true';
};