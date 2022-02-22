import App from "next/app";
import '../styles/globals.css'
import useAutenticacion from "../hooks/useAutenticacion";
import UserContext from "../context/UserContext";
import jsCookie from "js-cookie";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

// import "react-table/react-table.css";
// import "react-confirm-alert/src/react-confirm-alert.css";
// import 'react-big-calendar/lib/css/react-big-calendar.css';

const MyApp = (props) => {
  const { Component, pageProps } = props;

  let usuario = useAutenticacion();
  let token = jsCookie.get("token")

  return (
    <UserContext.Provider
      value={{
        usuario,
        token
      }}
    >
      <Component {...pageProps} />
    </UserContext.Provider>



  );
};

export default MyApp;