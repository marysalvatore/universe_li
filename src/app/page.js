"use client"
import Image from "next/image";
import Universal from "@/components/Universal/Universal";
import { useEffect, useState } from "react";
export default function Home() {

  const [geoInfo, setGeoInfo] = useState(null)

  useEffect(() => {
    async function getGeoInfo() {
      const response = await fetch('/api/getInfo')
      const data = await response.json()
      setGeoInfo(data)
    }

    getGeoInfo()
  } , [])


  // getGeoInfo = () => {
  //   axios.get('https://ipapi.co/json/').then((response) => {
  //       let data = response.data;
  //       this.setState({
  //           countryName: data.country_name,
  //           countryCode: data.country_calling_code
  //       });
  //   }).catch((error) => {
  //       console.log(error);
  //   });
  // };

  return (
    <div className="App">
     <Universal  data={geoInfo} />
    </div>
  );
}
