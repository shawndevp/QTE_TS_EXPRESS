import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../frontend/Home';


function Approute() {
    return (
        <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route exact path="/Content" element={<ListData />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>

        </>
    )
}

export default Approute
