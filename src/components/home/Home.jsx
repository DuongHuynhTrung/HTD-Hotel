/* eslint-disable no-unused-vars */
import React from "react";
import MainHeader from "../layout/MainHeader";
import HotelServices from "../common/HotelServices";
import Parallax from "../common/Parallax";
import RoomCarousel from "../common/RoomCarousel";
import RoomSearch from "../common/RoomSearch";

const Home = () => {
  return (
    <section>
      <MainHeader />
      <section className="container">
        <RoomSearch />
        <RoomCarousel />
        <Parallax />
        <RoomCarousel />
        <HotelServices />
        <Parallax />
        <RoomCarousel />
      </section>
    </section>
  );
};

export default Home;
