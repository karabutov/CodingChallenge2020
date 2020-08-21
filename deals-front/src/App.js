import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import AllDeals from './Components/AllDeals';

function App() {
  const [deals, setDeals] = useState([]);

  const ALL_DEALS_URL = "http://localhost:8090/client/testservice";

  useEffect(() => {
    //getDBConection();
    getDeals();
  }, []);

  const getDeals = async () => {
    try {
      const res = await axios.get(ALL_DEALS_URL);
      const deals = [];
      let newDeal = await res.data;
      deals.push(newDeal);
      setDeals(deals);
    } catch (e) {
      //setDeals(e.message);
    }
  };

  const getDBConection = async () => {
    try {
      //const res = await axios.get(ALL_DEALS_URL);
      //await res.data;

    } catch (e) {
    }
  };

  /*<Snackbar open={open} autoHideDuration={2000} >
        <Alert severity="success">
          This is a success message!
        </Alert>
      </Snackbar>*/
  return (
    <>
    <div className="container">
        <AllDeals deals={deals}/>
      </div>
    </>
  );
}

export default App;
