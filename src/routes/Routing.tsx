import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/Home';
import Login from '@/pages/Auth/login/index';
import Register from '@/pages/Auth/register/';
import Schedule from '@/pages/Schedule/Schedule';
import Calendars from '@/pages/Calendars/Calendars';

function Routing() {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/calendars" element={<Calendars />} />
      <Route path="/login/*" element={<Login />} />
      <Route path="/register/*" element={<Register />} />
      <Route path="/schedule/*" element={<Schedule />} />
    </Routes>
  );
}

export default Routing;
