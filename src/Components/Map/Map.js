import { useState, useEffect } from "react";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import ReactMapGl, { Source, Layer } from "react-map-gl";
import "./Map.css";
import Geocoder from "../Geocoder/Geocoder";
import axios from "../../Api/axios";
import { staticColor } from "../../color.js";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiaGFzbmF0dWxoYXEiLCJhIjoiY2wwdzBjb3JrMTc3ajNkbjUyaDljbG8zcyJ9.zR9o-L0WGPt1JKTHd0oUFg";

function Mapro({ setIsLoggedIn, token ,userstatus,setMembershipstatus}) {
  const [showResults, setShowResults] = useState(false);
  //const [address , setAddress] =useState()
  const [data, setData] = useState([]);
  let lat = data[1],
    lng = data[0];
  const [id, setId] = useState();
  const [zone, SetZone] = useState([]);
  const [zonedetail, setZonedetail] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [latlng, setlatlng] = useState([]);
  let lats = latlng.lat,
    lngs = latlng.lng;
  const [index, setIndex] = useState(0);
  const [colors, setColors] = useState();
  const [Localaddress, setLocaladdress] = useState();
  const [apiData, setApiData] = useState({});
  const [membershipstatus, setMembershipstatus] = useState();
  const [zoneonlycode, setZoneonlycode] = useState();
  const [zoneonlyname, setZoneonlyname] = useState();

  const zoneCode = Object.entries(apiData)
    .filter(([key, val]) => ["zone_code"].includes(key))
    .map((e) => e.pop())[0];
  const zonename = Object.entries(apiData)
    .filter(([key, val]) => ["zone_name"].includes(key))
    .map((e) => e.pop())[0];
  const zonetype = Object.entries(apiData)
    .filter(([key, val]) => ["zone_type"].includes(key))
    .map((e) => e.pop())[0];
  const zoneguide = Object.entries(apiData)
    .filter(([key, val]) => ["zone_guide"].includes(key))
    .map((e) => e.pop())[0];
  // const zonesubtype = Object.entries(apiData).filter(([key,val])=>  ['zone_sub_type'].includes(key)).map(e=>e.pop())[0]

  // const plus = Object.entries(apiData).filter(([key,val])=>  ['plu','single_family_permitted','two_family_permitted'].includes(key))
  const Sfp = Object.entries(apiData)
    .filter(([key, val]) => ["single_family_permitted"].includes(key))
    .map((e) => e.pop())[0];
  const tfp = Object.entries(apiData)
    .filter(([key, val]) => ["two_family_permitted"].includes(key))
    .map((e) => e.pop())[0];
  const cup = Object.entries(apiData)
    .filter(([key, val]) => ["commercial_uses_permitted"].includes(key))
    .map((e) => e.pop())[0];
  const mfp = Object.entries(apiData)
    .filter(([key, val]) => ["multi_family_permitted"].includes(key))
    .map((e) => e.pop())[0];
  // const only = Object.entries(apiData).filter(([key,val])=>  ['plu',].includes(key))
  // console.log(apiData, "DATA")
  //console.log(only, "plu data only showing")
  // const {plus,other_ctrls,boundary,city_id} = apiData

  const maxbuldheight = Object.entries(apiData)
    .filter(([key, val]) => ["max_building_height_ft"].includes(key))
    .map((e) => e.pop())[0];
  const maxfar = Object.entries(apiData)
    .filter(([key, val]) => ["max_far"].includes(key))
    .map((e) => e.pop())[0];
  const minlotarea = Object.entries(apiData)
    .filter(([key, val]) => ["min_lot_area_sq_ft"].includes(key))
    .map((e) => e.pop())[0];
  const minlotwidth = Object.entries(apiData)
    .filter(([key, val]) => ["min_lot_width_ft"].includes(key))
    .map((e) => e.pop())[0];

  const tokena = localStorage.getItem("usetoken");

  // console.log(plus, "PLUS")
  // console.log(zoneCode, "zoneData")
  // console.log(zonename, "zonename")
  const [viewport, setviewport] = useState({
    longitude: -95.712891,
    latitude: 37.09024,
    zoom: 4,
    width: window.innerWidth,
    height: window.innerHeight,
    isDragging: false,
  });

  useEffect(() => {
    async function getData() {
      try {
        if (data[1] !== "") {
          const res = await axios.get(
            "/cities/findByLatLng?lat=" + lat + "&lng=" + lng
          );
          SetZone(res.data.data[0].zoneCode);
          setId(res.data.data[0].id);
          setShowResults(true);
          setIsOpen(true);
        }
      } catch (e) {
        console.log("NOT FOUND ANY RESULT", e);
      }
    }
    getData();
  }, [data, lat, lng]);

  useEffect(() => {
    axios
      .get(`/user/status`, { isAuth: true })
      .then(({ data }) => {
        console.log("userstatus", data);
        if (data?.data) 
        setMembershipstatus(data.data.membershipstatus);
        console.log(data.data.membershipstatus);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [data, tokena,setMembershipstatus]);

  useEffect(() => {
    if (lats && lngs) {
      axios
        .get(`/zoneDetail/findByLatLng?lat=${lats}&lng=${lngs}`,{ isAuth: true })
        .then(({ data }) => {
          if (data?.data) {
            //console.log(data.data)
            if (userstatus === "premium") {
              setApiData(data.data);
            } else if (userstatus === "zoning_only") {
              setZoneonlycode(data.data.zoneCode);
              setZoneonlyname(data.data.zoneName);
              //setZoneonly(data.data)
            } else if (userstatus === "unpaid") {
              setZonedetail(data.data.properties);
              console.log(data.data.properties, "unpaid user data");
            } else {
              console.log("Not Authorized");
            }
          }
          setIsOpen(data.data);
        })
        .catch((err) => {
          setZonedetail({});
        });
    }
  }, [data, lats, lngs, tokena, userstatus]);

  //  useEffect(()=>{
  //        async function getData(){
  //          try{
  //           const res=await axios.get('https://testing-api.zoneomics.com/zoneDetail/findByLatLng?lat='+lats+'&lng='+lngs, {

  //           headers:{
  //                      'Authorization': `'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTc0NCwidXNlcklkIjo2LCJlbWFpbCI6ImFzaW0ubWFnbWFAZ21haWwuY29tIiwiZmlyc3ROYW1lIjoiYXNpbSIsImxhc3ROYW1lIjoibWFnbWEiLCJpYXQiOjE2NTQyMzg2OTMsImV4cCI6MTY1NDIzOTU5M30.ndotFugmZb9uSiAU78JYD4fv5QHECVXiipIdneyECm4`
  //                    }

  //           })
  //         if(res?.data?.data)
  //                 console.log(res.data)
  //                 setZonedetail(res.data.data.properties)
  //                 setIsOpen(res.data.data.properties)
  //          } catch(error){

  //               console.log("Not found any zone data",error);
  //          }
  //        }
  //        getData()
  //  },[data,lats,lngs]);

  useEffect(() => {
    async function getData() {
      try {
        const res = await axios.get(
          "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
            lngs +
            "," +
            lats +
            ".json?access_token=" +
            MAPBOX_TOKEN
        );
        setLocaladdress(res.data.features[0].place_name);
      } catch (error) {
        console.log("not found any", error);
      }
    }
    getData();
  }, [data, lats, lngs]);

  useEffect(() => {
    setColors(staticColor);
  }, []);

  const matchExpression = ["match", ["get", "z"]];
  for (let row = 0; row < zone.length; row++) {
    const color = colors[row];
    matchExpression.push(zone[row], color);
  }
  matchExpression.push("white");

  const matchlabel = ["match", ["get", "z"]];
  for (let row = 0; row < zone.length; row++) {
    const zonelabel = zone[row];
    matchlabel.push(zone[row], zonelabel);
  }
  matchlabel.push("Not defined");

  const layerStyle = {
    id: "zoneomics",
    type: "fill",
    source: "zoneomics",
    "source-layer": "zones",
    paint: {
      "fill-color": matchExpression,
      "fill-outline-color": "gray",
      "fill-opacity": 0.5,
    },
  };

  const layerlabel = {
    id: "zonelabel",
    type: "symbol",
    source: "zoneomics",
    "source-layer": "zones",
    layout: {
      "text-field": matchlabel,
      //  'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
      "text-radial-offset": 0.3,
      "text-justify": "auto",
    },
  };

  // const layerlabel={
  //        id: 'zonelabel',
  //        type: 'symbol',
  //        source: 'zoneomics',
  //        'source-layer': 'zones',
  //         'layout': {
  //           'text-field': ['get', 'description'],
  //           'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
  //           'text-radial-offset': 0.5,
  //           'text-justify': 'auto',
  //           'icon-image': ['get', 'icon']
  //       }
  // }
  const handlecolor = () => {
    let arr = [];
    for (let i = 0; i < matchExpression.length - 2; i++) {
      if (i > 1) {
        if (i % 2 === 0) {
          arr.push(
            <div>
              <span style={{ backgroundColor: matchExpression[i + 1] }}></span>
              {matchExpression[i]}
            </div>
          );
        }
      }
    }
    return arr;
  };
  const Results = () => (
    <div id="state-legend" className="legend">
      <div className="legend_heading">
        <h4>zones legend</h4>
      </div>
      <div className="zonecode_list">{handlecolor()}</div>
    </div>
  );

  const Popups = () => (
    <div className="zonedetailpopup">
      <div className="zonedetailpopup_closediv">
        <span className="close" onClick={() => setIsOpen(null)}>
          &times;
        </span>
      </div>
      <div>
        {/* <hr className="linepopup"></hr> */}
        <h3 className="top_address">{Localaddress}</h3>
        <hr className="linepopup"></hr>
      </div>
      <div className="tabscontainer">
        <button
          className="tabbtn"
          onClick={() => {
            setIndex(0);
          }}
        >
          Zones Data
        </button>
        <button
          className="tabbtn"
          onClick={() => {
            setIndex(1);
          }}
        >
          Permitted uses
        </button>
        <button
          className="tabbtn"
          onClick={() => {
            setIndex(2);
          }}
        >
          Controls
        </button>
        <button
          className="tabbtn"
          onClick={() => {
            setIndex(3);
          }}
        >
          Land use
        </button>
      </div>
      <div>{/* <hr className="linepopup"></hr> */}</div>
      <div className="statusdiv">
        {userstatus === "premium" ? (
          <p className="statusdiv">Pro</p>
        ) : userstatus === "zoning_only" ? (
          <p className="statusdiv">Zoning Data</p>
        ) : (
          <p className="statusdiv">Please subscribe to view data</p>
        )}
      </div>
      <div className="zonesdetial_list">
        {userstatus === "premium" ? (
          <div>
            <ul className="zoneslist" hidden={index !== 0}>
              <li>Zone Code</li>
              <ul>
                <li className="sublist">{zoneCode}</li>
              </ul>
              <li>Zone name</li>
              <ul>
                <li className="sublist">{zonename}</li>
              </ul>
              <li>Zone type</li>
              <ul>
                <li className="sublist">{zonetype}</li>
              </ul>
              <li>Zone Guide</li>
              <ul>
                <li className="sublist">{zoneguide}</li>
              </ul>
            </ul>
            <ul className="zoneslist" hidden={index !== 1}>
              <li>Single family permitted</li>
              <ul>
                <li className="sublist">{Sfp}</li>
              </ul>
              <li>Two family permitted</li>
              <ul>
                <li className="sublist">{tfp}</li>
              </ul>
              <li>Commercial uses permitted</li>
              <ul>
                <li className="sublist">{cup}</li>
              </ul>
              <li>Multi family permitted</li>
              <ul>
                <li className="sublist">{mfp}</li>
              </ul>
            </ul>
            <ul className="zoneslist" hidden={index !== 2}>
              <li>Max building height (ft)</li>
              <ul>
                <li className="sublist">{maxbuldheight}</li>
              </ul>
              <li>Max far</li>
              <ul>
                <li className="sublist">{maxfar}</li>
              </ul>
              <li>Min lot area sqft</li>
              <ul>
                <li className="sublist">{minlotarea}</li>
              </ul>
              <li>Min lot width ft</li>
              <ul>
                <li className="sublist">{minlotwidth}</li>
              </ul>
            </ul>
            <ul className="zoneslist" hidden={index !== 3}>
              <li>land use</li>
            </ul>
          </div>
        ) : userstatus === "zoning_only" ? (
          <div className="">
            <ul className="zoneslist">
              <li>Zone Code</li>
              <ul>
                <li className="sublist">{zoneonlycode}</li>
              </ul>
              <li>Zone name</li>
              <ul>
                <li className="sublist">{zoneonlyname}</li>
              </ul>
            </ul>
          </div>
        ) : (
          <div>Please subscribe to view all zoning data</div>
        )}
        {/* {zonedetail.length > 0 && } */}
        {console.log(zonedetail, "zonedetail data")}
        {/* <ul className="zoneslist" hidden={index !== (0)}>{zonedetail?.map(zone => <li>{zone}</li>)}</ul>  */}
      </div>

      <div className="">
        {/* <hr className="linepopup"></hr> */}
        <div className="bottombtn">
          <button className="bottom_tabbtn" onClick="openCity(event, 'London')">
            Unlock Address
          </button>
          <button className="bottom_tabbtn">Order Report</button>
          <button className="bottom_tabbtn">CSV Download</button>
        </div>
      </div>
    </div>
  );
  const displaydata = (event) => {
    setlatlng(event.lngLat);
  };

  return (
    <>
      {/* <button className="logoutbtn" onClick={() => setIsLoggedIn(false)}>
        Signout
      </button> */}
      {isOpen ? <Popups /> : null}
      {showResults ? <Results /> : null}
      <ReactMapGl
        width="100vw"
        height="100vh"
        style={{ borderTop: "5px solid #245c7c" }}
        mapStyle={"mapbox://styles/hasnatulhaq/cl1kc4e5o00my14o3kuifx4vp"}
        mapboxAccessToken={MAPBOX_TOKEN}
        {...viewport}
        onMove={(evt) => setviewport(evt.viewport)}
        onClick={displaydata}
      >
        <Geocoder
          mapboxAccessToken={MAPBOX_TOKEN}
          position="top-left"
          setdata={setData}
          zoom={17}
          countries="us,ca"
          placeholder="Search e.g New york"
          width="100%"
          height="100%"
        />
        <Source
          id="zoneomics"
          type="vector"
          tiles={[
            "https://testing-api.zoneomics.com/tiles/zones?x={x}&y={y}&z={z}&city_id=" +
              id,
          ]}
          addsource="zoneomics"
        >
          <Layer {...layerlabel}></Layer>
          <Layer {...layerStyle}></Layer>
        </Source>
      </ReactMapGl>
    </>
  );
}
export default Mapro;

/* <Geocoder mapboxAccessToken={MAPBOX_TOKEN} position="top-left" setdata={setData} setaddress={setAddress} zoom={17} countries="us,ca"  width="100%"
             height="100%" /> */
