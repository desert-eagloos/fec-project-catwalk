/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

/* --- Import CSS files --- */
import '../css/app.css';
import QARoot from './QA/QARoot';
import Overview from './Overview';

/* --- Import Module Components --- */
import RandR from './RandR/RandR';

function App() {
  const [product, setProduct] = useState({});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('/products/18201');
      setProduct(result.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div> Still Loading data...</div>;
  }

  return (
    <div className="app-container">
      <Overview product={product} />
      <QARoot />
      <RandR id="18201" />
    </div>
  );
}

export default App;
