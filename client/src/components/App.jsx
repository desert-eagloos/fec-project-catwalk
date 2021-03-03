import React, { useState, useEffect } from 'react';
import axios from 'axios';

/* --- Import CSS files --- */
import '../css/app.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import QARoot from './QA/QARoot';
import Overview from './Overview/Overview';


/* --- Import Module Components --- */
import RandR from './RandR/RandR';

function App() {
  const [product, setProduct] = useState({
    id: 18201,
    campus: 'hr-bld',
    name: 'Ernesto Sweatpants',
    slogan: 'Odit dolorem nemo id tempora qui.',
    description: 'A sapiente hic. Facilis et sit voluptatem. Ex sunt reiciendis qui ut perferendis qui soluta quod.',
    category: 'Sweatpants',
    default_price: '56.00',
    created_at: '2021-02-23T05:08:00.520Z',
    updated_at: '2021-02-23T05:08:00.520Z',
    features: [
      {
        feature: 'Cut',
        value: '"Skinny"',
      },
      {
        feature: 'Cut',
        value: '"Loose"',
      },
    ],
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios.get('/products/18201')
  //       .catch();
  //     setProduct(result.data);
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className="app-container">
      <Overview product={product} />
      <QARoot />
      <RandR id="18201" />
    </div>
  );
}

export default App;
