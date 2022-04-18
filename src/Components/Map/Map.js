    import { useState, useRef, useCallback } from "react"
    import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder"
    //import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
    import ReactMapGl,{
      Source,
      Layer,
      Marker,
      Popup,
      GeolocateControl,
      AttributionControl,
      ScaleControl,
    } from 'react-map-gl'
    import {Room} from '@mui/icons-material'
    import './Map.css'
    import Cities from '../../cities';
    import randomColor from "randomcolor";
  //  import Geocoder from 'react-map-gl-geocoder'
    import mapboxgl from "mapbox-gl";
    

    function Mapro(){
      const MAPBOX_TOKEN = 'pk.eyJ1IjoiaGFzbmF0dWxoYXEiLCJhIjoiY2wwdzBjb3JrMTc3ajNkbjUyaDljbG8zcyJ9.zR9o-L0WGPt1JKTHd0oUFg'
      const geojson = {
    type: 'FeatureCollection',
    features: [
      {type: 'Feature', geometry: {type: 'Polygon', coordinates:
      [
        [
          [
            68.3349609375,
            24.086589258228027
          ],
          [
            70.927734375,
            24.607069137709683
          ],
          [
            69.521484375,
            27.176469131898898
          ],
          [
            71.1474609375,
            28.168875180063345
          ],
          [
            73.23486328124999,
            29.554345125748267
          ],
          [
            74.99267578125,
            32.565333160841035
          ],
          [
            75.1904296875,
            33.22949814144951
          ],
          [
            73.47656249999999,
            34.288991865037524
          ],
          [
            73.63037109375,
            35.53222622770337
          ],
          [
            75.498046875,
            35.746512259918504
          ],
          [
            76.44287109375,
            35.99578538642032
          ],
          [
            72.26806640624999,
            36.58024660149866
          ],
          [
            71.05957031249999,
            35.62158189955968
          ],
          [
            70.81787109374999,
            34.07086232376631
          ],
          [
            69.58740234375,
            33.02708758002874
          ],
          [
            66.09375,
            30.29701788337205
          ],
          [
            65.0390625,
            29.152161283318915
          ],
          [
            63.06152343750001,
            29.094577077511826
          ],
          [
            61.50146484374999,
            29.458731185355344
          ],
          [
            61.06201171875,
            29.84064389983441
          ],
          [
            61.23779296875,
            29.036960648558267
          ],
          [
            62.68798828125,
            26.70635985763354
          ],
          [
            62.75390625,
            26.2145910237943
          ],
          [
            61.50146484374999,
            25.760319754713887
          ],
          [
            63.03955078125,
            25.304303764403617
          ],
          [
            66.68701171875,
            24.70691524106633
          ],
          [
            68.3349609375,
            24.086589258228027
          ]
        ]
      ]
    }
    }
    ]
    }
      const layerStylegeo = {
        id: 'Polygon',
        type: 'fill',
        paint: {
          "fill-color": "green",
          "fill-opacity": 0.8,
        },
      };
        const [viewport , setviewport] = useState({
            longitude: -74.005974,
            latitude: 40.712776,
            zoom: 12,
            width: window.innerWidth,
            height: window.innerHeight,
            isDragging: false,
        }); 
        const [seletedcity, setSelectedCity] = useState(null); 

        
const datacode = [
{ 'code': 'BPC'},  
{ 'code': 'C1-6'},
{ 'code': 'C1-6A'},
{ 'code': 'C1-7'},
{ 'code': 'C1-7A'},
{ 'code': 'C1-8'},
{ 'code': 'C1-8A'},
{ 'code': 'C1-8X'},
{ 'code': 'C1-9'},
{ 'code': 'C1-9A'},
{ 'code': 'C2-6'},
{ 'code': 'C2-6A'},
{ 'code': 'C2-7'},
{ 'code': 'C2-7A'},
{ 'code': 'C2-8'},
{ 'code': 'C2-8A'},
{ 'code': 'C3'},
{ 'code': 'C3A'},
{ 'code': 'C4-1'},
{ 'code': 'C4-2'},
{ 'code': 'C4-2A'},
{ 'code': 'C4-2F'},
{ 'code': 'C4-3'},
{ 'code': 'C4-3A'},
{ 'code': 'C4-4'},
{ 'code': 'C4-4A'},
{ 'code': 'C4-4D'},
{ 'code': 'C4-4L'},
{ 'code': 'C4-5'},
{ 'code': 'C4-5A'},
{ 'code': 'C4-5D'},
{ 'code': 'C4-5X'},
{ 'code': 'C4-6'},
{ 'code': 'C4-6A'},
{ 'code': 'C4-7'},
{ 'code': 'C5-1'},
{ 'code': 'C5-1A'},
{ 'code': 'C5-2'},
{ 'code': 'C5-2.5'},
{ 'code': 'C5-2A'},
{ 'code': 'C5-3'},
{ 'code': 'C5-4'},
{ 'code': 'C5-5'},
{ 'code': 'C5-P'},
{ 'code': 'C6-1'},
{ 'code': 'C6-1A'},
{ 'code': 'C6-1G'},
{ 'code': 'C6-2'},
{ 'code': 'C6-2A'},
{ 'code': 'C6-2G'},
{ 'code': 'C6-2M'},
{ 'code': 'C6-3'},
{ 'code': 'C6-3A'},
{ 'code': 'C6-3D'},
{ 'code': 'C6-3X'},
{ 'code': 'C6-4'},
{ 'code': 'C6-4.5'},
{ 'code': 'C6-4A'},
{ 'code': 'C6-4M'},
{ 'code': 'C6-4X'},
{ 'code': 'C6-5'},
{ 'code': 'C6-5.5'},
{ 'code': 'C6-6'},
{ 'code': 'C6-6.5'},
{ 'code': 'C6-7'},
{ 'code': 'C6-7T'},
{ 'code': 'C6-9'},
{ 'code': 'C7'},
{ 'code': 'C8-1'},
{ 'code': 'C8-2'},
{ 'code': 'C8-3'},
{ 'code': 'C8-4'},
{ 'code': 'M1-1'},
{ 'code': 'M1-1/R5'},
{ 'code': 'M1-1/R6A'},
{ 'code': 'M1-1/R7-2'},
{ 'code': 'M1-1/R7D'},
{ 'code': 'M1-1D'},
{ 'code': 'M1-2'},
{ 'code': 'M1-2/R5B'},
{ 'code': 'M1-2/R5D'},
{ 'code': 'M1-2/R6'},
{ 'code': 'M1-2/R6A'},
{ 'code': 'M1-2/R6B'},
{ 'code': 'M1-2/R7-2'},
{ 'code': 'M1-2/R7A'},
{ 'code': 'M1-2/R8'},
{ 'code': 'M1-2/R8A'},
{ 'code': 'M1-2D'},
{ 'code': 'M1-3'},
{ 'code': 'M1-3/R7X'},
{ 'code': 'M1-3/R8'},
{ 'code': 'M1-4'},
{ 'code': 'M1-4/R6A'},
{ 'code': 'M1-4/R6B'},
{ 'code': 'M1-4/R7-2'},
{ 'code': 'M1-4/R7A'},
{ 'code': 'M1-4/R7D'},
{ 'code': 'M1-4/R7X'},
{ 'code': 'M1-4/R8A'},
{ 'code': 'M1-4/R9A'},
{ 'code': 'M1-4D'},
{ 'code': 'M1-5'},
{ 'code': 'M1-5/R10'},
{ 'code': 'M1-5/R7-2'},
{ 'code': 'M1-5/R7-3'},
{ 'code': 'M1-5/R7X'},
{ 'code': 'M1-5/R8A'},
{ 'code': 'M1-5/R9'},
{ 'code': 'M1-5/R9-1'},
{ 'code': 'M1-5A'},
{ 'code': 'M1-5B'},
{ 'code': 'M1-5M'},
{ 'code': 'M1-6'},
{ 'code': 'M1-6/R10'},
{ 'code': 'M1-6/R9'},
{ 'code': 'M1-6D'},
{ 'code': 'M2-1'},
{ 'code': 'M2-2'},
{ 'code': 'M2-3'},
{ 'code': 'M2-4'},
{ 'code': 'M3-1'},
{ 'code': 'M3-2'},
{ 'code': 'PARK'},
{ 'code': 'R1-1'},
{ 'code': 'R1-2'},
{ 'code': 'R1-2A'},
{ 'code': 'R10'},
{ 'code': 'R10A'},
{ 'code': 'R10H'},
{ 'code': 'R2'},
{ 'code': 'R2A'},
{ 'code': 'R2X'},
{ 'code': 'R3-1'},
{ 'code': 'R3-2'},
{ 'code': 'R3A'},
{ 'code': 'R3X'},
{ 'code': 'R4'},
{ 'code': 'R4-1'},
{ 'code': 'R4A'},
{ 'code': 'R4B'},
{ 'code': 'R5'},
{ 'code': 'R5A'},
{ 'code': 'R5B'},
{ 'code': 'R5D'},
{ 'code': 'R6'},
{ 'code': 'R6A'},
{ 'code': 'R6B'},
{ 'code': 'R7-1'},
{ 'code': 'R7-2'},
{ 'code': 'R7-3'},
{ 'code': 'R7A'},
{ 'code': 'R7B'},
{ 'code': 'R7D'},
{ 'code': 'R7X'},
{ 'code': 'R8'},
{ 'code': 'R8A'},
{ 'code': 'R8B'},
{ 'code': 'R8X'},
{ 'code': 'R9'},
{ 'code': 'R9A'},
{ 'code': 'R9X'},
  ];


       
     const matchExpression = ['match', ['get','z']];  //get the property 
     for (const row of datacode) {
       const color = randomColor();
       matchExpression.push(row['code'], color);
       }
      matchExpression.push('white');
    
const layerStyle={
            id:'zoneomics', 
            type: 'fill',
            source : 'zoneomics',
          'source-layer': 'zones',
          'paint': {
                'fill-color' : matchExpression,
               'fill-outline-color': 'lightgray',
            },
          }
          
          const geocoder = new MapboxGeocoder({
            // Initialize the geocoder
            accessToken: mapboxgl.MAPBOX_TOKEN, // Set the access token
            mapboxgl: mapboxgl, // Set the mapbox-gl instance
            marker: false, // Do not use the default marker style
            placeholder: 'Search for places in Berkeley', // Placeholder text for the search bar
            bbox: [-122.30937, 37.84214, -122.23715, 37.89838], // Boundary for Berkeley
            proximity: {
            longitude: -122.25948,
            latitude: 37.87221
            } // Coordinates of UC Berkeley
            });

            
           // geocoder.addTo('#geocoder');
            // Add the geocoder to the map
           //map.addControl(geocoder);
             

         // const url="https://api.mapbox.com/geocoding/v5/{endpoint}/{search_text}.json";
         
            const handlecolor=()=>{
                  let arr=[]
                  for(let i=0; i<matchExpression.length-2; i++)
                  {
                    if(i>1){
                       if(i%2===0){
                           arr.push( <div><span style={{backgroundColor: matchExpression[i+1]}}></span>{matchExpression[i]}</div> )
                       }    
                    }
                  }
                  return arr
            }
         

            
        return(
       <>
        <div id="state-legend" className="legend">
        <h4>zones legend</h4>
        {handlecolor()}       
        </div>
            <div>
            <input 
          className="searchp"
          type = "search" 
          placeholder = "Search Places" 
          //onChange = {handleChange}
        />
            </div>
        <ReactMapGl  
            width="100vw" height="100vh"
            style={{borderTop: '5px solid #245c7c'}}
            mapStyle={'mapbox://styles/hasnatulhaq/cl1kc4e5o00my14o3kuifx4vp'}
            mapboxAccessToken={MAPBOX_TOKEN}
            {...viewport} 
            onMove={evt => setviewport(evt.viewport)}
            > 
            <GeolocateControl/>
               <ScaleControl {...geocoder}/>
              {/* <MapboxGeocoder {...geocoder}/> */}
              {/* <AttributionControl  {...geocoder}/> */}
             <Source id="zoneomics"  type="vector"  tiles={["https://testing-api.zoneomics.com/tiles/zones?x={x}&y={y}&z={z}&city_id=265"]}
             addsource="zoneomics"  
             >
                 <Layer {...layerStyle}> 
                   </Layer>    
             </Source>
             <Source id="my-data" type="geojson" data={geojson}>
        <Layer {...layerStylegeo} /> 
        </Source>
              {Cities.features.map((data)=>(
                  <Marker key={data.properties.id}  longitude={data.geometry.coordinates[0]} latitude={data.geometry.coordinates[1]} > 
                    <button className="marker-btn" onClick={(e)=>{
                      console.log("Hello world")
                      e.preventDefault();
                      setSelectedCity(data);
                    }}>
                          <Room/>
                    </button>
                  </Marker>
            ))} 
               {seletedcity ? (
                  <Popup latitude={seletedcity.geometry.coordinates[1]} longitude={seletedcity.geometry.coordinates[0]}>
                     <div>
                        <h1>{seletedcity.properties.Name}</h1>
                     </div>
                  </Popup>
               ): null}
              </ReactMapGl>
              {/* <Geocoder
         // mapRef={mapRef}
         // onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={"pk.eyJ1IjoiaGFzbmF0dWxoYXEiLCJhIjoiY2wwdzBjb3JrMTc3ajNkbjUyaDljbG8zcyJ9.zR9o-L0WGPt1JKTHd0oUFg"}
          position="top-left"
        />  */}
              </>
            )
    }
    export default Mapro


  //{...viewport}
  //onMove={evt => setviewport(evt.viewport)}
  //onViewportChange={(viewport)=>setviewport(viewport)}

  //<GeolocateControl/>
  // initialViewState={{
  //   longitude: 73.047882,
  //   latitude: 33.684422,
  //   zoom: 3.5
  // }}

  // {/* <Popup longitude={73.047882} latitude={33.684422}
  // closeOnClick={false}
  // anchor="bottom">
  // You are here
  // </Popup> */}



  // <Marker 
  // longitude={73.047882} 
  // latitude={33.684422}>
  // <Room/>
  // </Marker>



  // <Popup longitude={73.047882} latitude={33.684422}
  // closeOnClick={false}
  //   anchor="bottom">
  //    You are here
  // </Popup>




  // const geojson = {
  //   type: 'FeatureCollection',
  //   features: [
  //     {type: 'Feature', geometry: {type: 'LineString', coordinates:
  //     [
  //       [-67.13734351262877, 45.137451890638886],
  //       [-66.96466, 44.8097],
  //       [-68.03252, 44.3252],
  //       [-69.06, 43.98],
  //       [-70.11617, 43.68405],
  //       [-70.64573401557249, 43.090083319667144],
  //       [-70.75102474636725, 43.08003225358635],
  //       [-70.79761105007827, 43.21973948828747],
  //       [-70.98176001655037, 43.36789581966826],
  //       [-70.94416541205806, 43.46633942318431],
  //       [-71.08482, 45.3052400000002],
  //       [-70.6600225491012, 45.46022288673396],
  //       [-70.30495378282376, 45.914794623389355],
  //       [-70.00014034695016, 46.69317088478567],
  //       [-69.23708614772835, 47.44777598732787],
  //       [-68.90478084987546, 47.184794623394396],
  //       [-68.23430497910454, 47.35462921812177],
  //       [-67.79035274928509, 47.066248887716995],
  //       [-67.79141211614706, 45.702585354182816],
  //       [-67.13734351262877, 45.137451890638886]
  //     ]
  //   }
  //   }
  //   ]
  //   }
  //     const layerStyle = {
  //       id: 'LineString',
  //      // type: 'fill',
  //      type: 'line',
  //       paint: {
  //         "line-color": "red",
  //         "line-width": 5,
  //       },
  //     };
    



  /* <Source id="my-data" type="geojson" data={geojson}>
        <Layer {...layerStyle} /> 
        </Source> */





  // const geolocateStyle = {
        //   float: 'left',
        //   margin: '50px',
        //   padding: '10px',
        // };
        // const NavigationStyle = {
        //   float: 'left',
        //   margin: '50px',
        //   padding: '10px',
        // };
            

    
            /* <Popup longitude={73.047882} latitude={33.684422}
    closeOnClick={false}
    anchor="bottom">
    You are here
    </Popup>
            <NavigationControl
              style={NavigationStyle}
            />
            <FullscreenControl/>
            <GeolocateControl 
              style={geolocateStyle}
            positionOptions={{enableHighAccuracy: true}}
            trackUserLocation={true}
            /> */


            



            // <>
            // <ReactMapGl  
            //     width="100vw" height="100vh"
            //     style={{borderTop: '8px solid indigo'}}
            //     mapStyle={'mapbox://styles/hasnatulhaq/cl1kc4e5o00my14o3kuifx4vp'}
            //     mapboxAccessToken={"pk.eyJ1IjoiaGFzbmF0dWxoYXEiLCJhIjoiY2wwdzBjb3JrMTc3ajNkbjUyaDljbG8zcyJ9.zR9o-L0WGPt1JKTHd0oUFg"}
            //     {...viewport} 
            //     onMove={evt => setviewport(evt.viewport)}
            //     > 
            //      <Source id="mapillary"  type="vector"  tiles={["https://tiles.mapillary.com/maps/vtp/mly1_public/2/{z}/{x}/{y}?access_token=MLY|4142433049200173|72206abe5035850d6743b23a49c41333"]}
            //      addsource='mapillary' minzoom={6} maxzoom={14}>
            //          <Layer {...layerStyle}> closeOnClick={onMove}
            //            </Layer>    
            //      </Source>
            //      <Source id="my-data" type="geojson" data={geojson}>
            // <Layer {...layerStylegeo} /> 
            // </Source>
            //       {Cities.features.map((data)=>(
            //           <Marker key={data.properties.id}  longitude={data.geometry.coordinates[0]} latitude={data.geometry.coordinates[1]} > 
            //             <button className="marker-btn" onClick={(e)=>{
            //               console.log("Hello world")
            //               e.preventDefault();
            //               setSelectedCity(data);
            //             }}>
            //                   <Room/>
            //             </button>
            //           </Marker>
            //     ))} 
    
            //        {seletedcity ? (
            //           <Popup latitude={seletedcity.geometry.coordinates[1]} longitude={seletedcity.geometry.coordinates[0]}>
            //              <div>
            //                 <h1>{seletedcity.properties.Name}</h1>
            //              </div>
            //           </Popup>
            //        ): null}
            //       </ReactMapGl>
            // </>



               //  const [layer , setlayer] = useState({
      //       longitude : 73.047882,
      //       latitude :  33.684422,
      //       zoom : 2.0,
      //       width : window.innerWidth,
      //       height : window.innerHeight,
      //       isDragging : false,
      //  })


      //  const onMove = (e) => {
      //     console.log("hello world")
      // };


//         const layerStyle={
//           id:'zoneomicstiles', 
//           type:"line" ,
//           source:'zoneomics',
//           'source-layer': 'sequence',
//          layout:{
//            "line-cap" : "round",
//             "line-join" : "round",
//        },
//           paint:{
//            "line-color" : "red",
//            "line-width": 5,
// }
//         }



 // paint: {
          //   "fill-color": zonecolor,
          //   'fill-outline-color': 'red',
          //   "fill-opacity": 0.5,
          // },

            //  "fill-color": {
            //   property: 'percentile',
            //   stops: [
            //     ['BPC', 'red'],
            //     ['C1-6', 'green'],
            //     ['C1-6A', 'yellow'],
            //     ['C1-7', 'black'],
            //     ['C1-7A', 'orange'],
            //     ['C1-8', 'pink'],
            //     ['C1-8A', 'indigo'],
            //     ['C1-8X', 'purple'],
            //     ['C1-9', 'green'],
            //   ]
            //  },
             
            // 'fill-color': ['match', ['get', 'zones'], // get the property
            // '0', 'yellow',             
            // 'C1-6', 'black', 
            // 'C1-6A' , 'red',              
            // 'orange'] ,



      //   const zonedata=[
//     "match",
//     [
//         "get",
//         "z"
//     ],
//     "BPC",
//     "black",
//     "C1-6",
//     "rgb(0, 208.07999999999998, 0)",
//     "C1-6A",
//     "rgb(0, 200.685, 0)",
//     "white"
// ]
  
     // const zonecolor= randomColor();