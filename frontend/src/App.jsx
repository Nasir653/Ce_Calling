import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import VideoCall from "./componants/VideoCall";
import VoiceCall from "./componants/VoiceCall";
import Otp from "./componants/otp";
import RazorPay from "./componants/RazorPay";
function App() {


  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route path="/VideoCall" element={<VideoCall />} />
          <Route path="/VoiceCall" element={<VoiceCall />} />
          <Route path="/Razorpay" element={<RazorPay />} />
          <Route path="/otp" element={<Otp />} />



        </Routes>




      </BrowserRouter>



    </>
  );
}

export default App;
