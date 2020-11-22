import React from "react";
import Header from "../components/Header/Header";
import TopSection from "../components/TopSection/TopSection";
import Transactions from "../components/Transactions/Transactions";

const Dashboard = (props) => {
  return (
    <div>
      <Header />
      <TopSection />
      <Transactions />
    </div>
  );
};

export default Dashboard;
