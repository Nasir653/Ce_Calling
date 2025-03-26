import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import VideoCall from "./componants/VideoCall";
import VoiceCall from "./componants/VoiceCall";
function App() {


  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route path="/VideoCall" element={<VideoCall />} />
          <Route path="/VoiceCall" element={<VoiceCall />} />
          <Route path="/Razorpay" element={<VoiceCall />} />



        </Routes>




      </BrowserRouter>



    </>
  );
}

export default App;
