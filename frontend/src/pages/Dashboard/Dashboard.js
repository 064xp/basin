import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header/Header";
import TopSection from "../../components/TopSection/TopSection";
import Transactions from "../../components/Transactions/Transactions";

const Dashboard = (props) => {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const history = useHistory();
  useEffect(() => {
    if (!loggedIn) {
      history.push("/login");
    }
    //eslint-disable-next-line
  }, []);
  return (
    <div>
      <Header />
      <TopSection />
      <Transactions />
    </div>
  );
};

export default Dashboard;
