import { useEffect, useState } from "react";

import AirQCard from "./components/AirQCard";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import RefreshButton from "./components/RefreshButton";
import AirAlert from "./components/AirAlert";
import Chart from "./components/Chart";


function App() {

  const [stations, setStations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshBtn, setRefreshBtn] = useState(false);
  const [openId, setOpenId] = useState(null);
  const [openLocation, setOpenLocation] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const response = await fetch(`https://aeroguard-backend.vercel.app/`);
        const data = await response.json();
        setStations(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [refreshBtn, openId]);

  function handleRefreshBtn() {
    setRefreshBtn(!refreshBtn);
  }

  function handleOpenId(id) {
    setOpenId(id);
  }

  function handleOpenLocation(station) {
    setOpenLocation(station);
  }

  return (
    <div onClick={() => openId ? handleOpenId(null) : null} className={`App flex flex-col h-screen`}>
      <NavBar />
      {openId !== null && openLocation !== null &&
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10">
          <div className="flex justify-center items-center h-full">
            <h2 className="text-color-white">{openLocation.strada}</h2>
            <Chart station={openLocation} />
          </div>
        </div>}
      <div className="flex justify-between px-5 py-5">
        <RefreshButton onClick={handleRefreshBtn} />
        <div className="grid grid-cols-1 gap-1">
          {stations.map((station) => (
            station.concentratie >= 10 && <AirAlert key={station.id} strada={station.strada.replace("_", " ")} />
          ))}
        </div>
      </div>
      {
        isLoading ? <Loader /> :
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 justify-items-center content-center px-3 py-3 h-auto flex-grow`}>
            {stations.map((station) => (
              <AirQCard key={station.id} station={station} id={station.id + 1} onOpenId={handleOpenId} onOpenLocation={handleOpenLocation} />
            ))}
          </div>
      }
      <Footer />
    </div>
  );
}

export default App;
