import React, { useEffect, useState } from 'react';
<link href="https://fonts.googleapis.com/css2?family=Doto:wght@100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Permanent+Marker&family=Shadows+Into+Light&family=Sour+Gummy:ital,wght@0,100..900;1,100..900&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&display=swap" rel="stylesheet"></link>
import TelaLogin from "./telas/Login"; 
import { Outlet } from 'react-router-dom'


function App() {
  return (
    <>
      <Outlet/>
    </>
    
  );
}

export default App;