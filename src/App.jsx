import React from "react";
import { IoSearch } from "react-icons/io5";
import cloud from "../src/assets/cloud.png";
import humid from "../src/assets/humidity.png";
import wind from "../src/assets/wind.png";
import clear from "../src/assets/clear.png";
import drizzle from "../src/assets/drizzle.png";
import rain from "../src/assets/rain.png";
import snow from "../src/assets/snow.png";
import { useState } from "react";
const App = () => {
  const [place, setplace] = useState("");
  const [humidity, sethumidity] = useState(0)
  const [temp, settemp] = useState(0)
  const [windspeed, setwindspeed] = useState(0)
  const [name, setname] = useState("")
  const [icon, seticon] = useState(clear)
  const handlechange = (e) => {
    setplace(e.target.value);
   };
  const search = async () => {
    try {
      const city = document.getElementById("city");
      if (city === "") {
        return 0;
      }
      // console.log(city.value);
      const key = "063c2b2a6fc23fdefbdae97c661e44e9";
      const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.value},&appid=${key}&units=metric`)
      const data=await response.json()
      // console.log(data.weather[0].icon)
      sethumidity(data.main.humidity)
      settemp(data.main.temp)
      setwindspeed(data.wind.speed)
      setname(data.name)
      if(data.weather[0].icon=="02d"||data.weather[0].icon=="03d"||data.weather[0].icon=="04d"||data.weather[0].icon=="02n"||data.weather[0].icon=="03n"||data.weather[0].icon=="04n"){
      seticon(cloud)
    }
      else if(data.weather[0].icon=="09d"||data.weather[0].icon=="09n"||data.weather[0].icon=="50n"||data.weather[0].icon=="50d"){
      seticon(drizzle)
    }
      else if(data.weather[0].icon=="10d"||data.weather[0].icon=="10n"||data.weather[0].icon=="11d"||data.weather[0].icon=="11n"){
      seticon(rain)
    }
      else if(data.weather[0].icon=="01d"||data.weather[0].icon=="01n"){
      seticon(clear)
    }
      else{
      seticon(snow)
    }
    } catch (error) {
      console.log(error)
    }
  };
  
  return (
    <div className="">
      <div className="bg-gradient-to-b from-[#130754] to-[#3b2f80] h-[35rem] w-[29rem] rounded-3xl border-2 left-[50%] -translate-x-[50%] absolute top-[50%] -translate-y-[50%]">
        <div className="grid grid-flow-col  items-center gap-2 mt-6 justify-center">
          <input
            type="text"
            id="city"
            onChange={handlechange}
            value={place}
            placeholder="search..."
            className="p-4 text-center font-pop  text-lg outline-none  rounded-3xl"
          />
          <IoSearch
            color="grey"
            className="border-2 rounded-full p-2 cursor-pointer hover:scale-110 transition-all ease-in-out duration-300 bg-white"
            fontSize={"35px"}
            onClick={search}
          />
        </div>
        <div>
          {<img src={icon} className="h-32 w-32 m-auto mt-5 text-white" alt="image" />}
        </div>
        <p className="text-center font-pop text-white text-6xl mt-8">{Math.floor(temp)}℃</p>
        <p className="text-center text-white text-4xl font-mono mt-3">{name}</p>
        <div className="flex justify-around mt-16">
          <div>
            <div className="flex gap-2 items-center">
              <img className=" h-5 w-6 " src={humid} alt="" />
              <span className=" text-white text-xl ">{humidity}%</span>
            </div>
            <p className="ml-11 text-white text-xs font-extralight font-pop">
              Humidity
            </p>
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <img className=" h-6 w-7" src={wind} alt="" />
              <span className="text-white text-xl">{Math.floor(windspeed)}km/hr</span>
            </div>
            <p className="ml-11 text-white text-xs font-extralight font-pop">
              Wind speed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
