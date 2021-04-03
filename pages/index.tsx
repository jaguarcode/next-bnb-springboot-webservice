import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import Home from "../components/home/Home";

const index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Airbnb Cloned - Next.js & SpringBoot</title>
      </Head>
      <Home />
    </>
  );
};

export default index;
