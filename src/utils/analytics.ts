import ReactGA from "react-ga4";

export const initGA = () => {
    ReactGA.initialize("G-EJ51HS15KF"); 
};

export const logPageView = () => {
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};
