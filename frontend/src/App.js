import "./App.css";
import Header from "./components/Header/Header";
import TopSection from "./components/TopSection/TopSection";
import Transactions from "./components/Transactions/Transactions";
import axios from "axios";

function App() {
  axios
    .get("/transactions")
    .then((e) => {
      console.log(e);
    })
    .catch(function (error) {
      console.log(error);
    });
  return (
    <div className="App">
      <Header />
      <TopSection />
      <Transactions />
    </div>
  );
}

export default App;
