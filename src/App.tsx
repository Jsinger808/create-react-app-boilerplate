
import React, { useState, useEffect } from "react";
import './App.css';
import { CurrentBuyerInfo } from "./components/currentBuyerInfo";
import { DateBuyDataService } from "./services/datebuyService";

function App() {

  //True is blue. False is red.
  const [currButtonColor, setbuttonColor] = useState<boolean>(false);

  const [currAddress, setCurrAddress] = useState<string>();
  const [currPosition, setCurrPosition] = useState<GeolocationPosition | undefined>();
  const [currTime, setCurrTime] = useState<string>();
  const [status, setStatus] = useState<string>();
  var address: string;
  var time : string;
  var buttonColor : boolean = currButtonColor;

  useEffect(() => {
    setStatus("Loading...");
    initializePreviousPosition();
    console.log("initializing finished")
  }, [])

//   function delay(milliseconds:any){
//     return new Promise(resolve => {
//         setTimeout(resolve, milliseconds);
//     });
// }

 async function switchBuyer() {
  setStatus("Loading...");
  getPosition().then(async (position:any) => {
    await updatePreviousPosition(position)
    setStatus("");
    putCurrentPosition()
  })
  .catch((err) => {
    console.error(err.message);
  });;
 }

 var getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
    console.log("Updating Current Position")
  });
}


  async function putCurrentPosition() {
    //Inserts the opposite of the current color in DB'
    console.log("color: " + buttonColor)
    console.log("address: " + address)
    console.log("time: " + time)
    const request = {
      color: buttonColor,
      address: address,
      time: time
    }
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
    };
    await fetch(`http://localhost:${process.env.REACT_APP_PORT}/api/v1/datebuy`, requestOptions)
  }

  async function initializePreviousPosition() { 
    const response = await fetch(`http://localhost:${process.env.REACT_APP_PORT}/api/v1/datebuy`)
    const responseData = await response.json()

    address = responseData["buyer"][0]["address"]
    buttonColor = responseData["buyer"][0]["color"]
    time = responseData["buyer"][0]["time"]

    setCurrAddress(address)
    setbuttonColor(buttonColor)
    setCurrTime(time)
    setStatus("");
   }

   async function updatePreviousPosition(position: any) { 
    buttonColor = !buttonColor
    setbuttonColor(buttonColor);

    time = Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(position.timestamp)
    setCurrTime(Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(position.timestamp))
    
    const resp = await fetch(`http://dev.virtualearth.net/REST/v1/Locations/${position.coords.latitude},${position.coords.longitude}?includeEntityTypes=Address&key=${process.env.REACT_APP_BING_KEY}`)
    const respdata = await resp.json();
    address = respdata["resourceSets"][0]["resources"][0]["name"]
    setCurrAddress(respdata["resourceSets"][0]["resources"][0]["name"]);
   }


  return (
    <div className="center">

    <button className="pushable" onClick={switchBuyer}>
          <span className="shadow"></span>
          <span className={"edge" + (currButtonColor ? '1' : '2')}></span>
          <span className={"front" + (currButtonColor ? '1' : '2')}>
            Switch
          </span>
      </button>

    <div className="info">
      {status}
      <CurrentBuyerInfo color={currButtonColor} address={currAddress} time={currTime}/> 
    </div>

    </div>
  );
}

export default App;
