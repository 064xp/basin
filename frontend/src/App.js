import "./App.css";
import Header from "./components/Header/Header";
import TopSection from "./components/TopSection/TopSection";
import Transactions from "./components/Transactions/Transactions";

function App() {
  return (
    <div className="App">
      <Header />
      <TopSection />
      <Transactions />
    </div>
  );
}

export default App;
