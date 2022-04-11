    import { useState } from "react"
    //import ReactMapGl,{Source,Layer,Marker} from 'react-map-gl'
    import ReactMapGl,{
      Source,
      Layer,
      Marker,
      Popup,
    } from 'react-map-gl'
    import {Room} from '@mui/icons-material'
    import './Map.css'
    import Cities from '../../cities';
    import randomColor from "randomcolor";
import { yellow } from "@mui/material/colors";


 
    function Mapro(){

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
const datacode = [
  { 'code': 'red', },
  { 'code': 'C1-6',},
  { 'code': 'C1-6A',},
  { 'code': 'C1-7',},
  { 'code': 'C1-7A',},
  { 'code': 'C1-8',},
  { 'code': 'C1-8A',},
  { 'code': 'C1-8X',},
  { 'code': 'C1-9' ,},
  { 'code': 'C1-9A',},
  { 'code': 'C2-6' ,},
  { 'code': 'C2-6A',},
  { 'code': 'C2-7',},
  { 'code': 'C2-7A',},
  { 'code': 'C2-8' ,},
  { 'code': 'C2-8A',},
  { 'code': 'C3',},
  { 'code': 'C3A',}
  ];
// const data = [
//   { 'code': 'ROU', 'hdi': 0.811 },
//   { 'code': 'RUS', 'hdi': 0.816 },
//   { 'code': 'SRB', 'hdi': 0.787 },
//   { 'code': 'SVK', 'hdi': 0.855 },
//   { 'code': 'SVN', 'hdi': 0.896 },
//   { 'code': 'ESP', 'hdi': 0.891 },
//   { 'code': 'SWE', 'hdi': 0.933 },
//   { 'code': 'CHE', 'hdi': 0.944 },
//   { 'code': 'HRV', 'hdi': 0.831 },
//   { 'code': 'CZE', 'hdi': 0.888 },
//   { 'code': 'DNK', 'hdi': 0.929 },
//   { 'code': 'EST', 'hdi': 0.871 },
//   { 'code': 'FIN', 'hdi': 0.92 },
//   { 'code': 'FRA', 'hdi': 0.901 },
//   { 'code': 'DEU', 'hdi': 0.936 },
//   { 'code': 'GRC', 'hdi': 0.87 },
//   { 'code': 'ALB', 'hdi': 0.785 },
//   { 'code': 'AND', 'hdi': 0.858 },
//   { 'code': 'AUT', 'hdi': 0.908 },
//   { 'code': 'BLR', 'hdi': 0.808 },
//   { 'code': 'BEL', 'hdi': 0.916 },
//   { 'code': 'BIH', 'hdi': 0.768 },
//   { 'code': 'BGR', 'hdi': 0.813 },
//   { 'code': 'MKD', 'hdi': 0.757 },
//   { 'code': 'MLT', 'hdi': 0.878 },
//   { 'code': 'MDA', 'hdi': 0.7 },
//   { 'code': 'MNE', 'hdi': 0.814 },
//   { 'code': 'NLD', 'hdi': 0.931 },
//   { 'code': 'NOR', 'hdi': 0.953 },
//   { 'code': 'POL', 'hdi': 0.865 },
//   { 'code': 'PRT', 'hdi': 0.847 },
//   { 'code': 'HUN', 'hdi': 0.838 },
//   { 'code': 'ISL', 'hdi': 0.935 },
//   { 'code': 'IRL', 'hdi': 0.938 },
//   { 'code': 'ITA', 'hdi': 0.88 },
//   { 'code': 'LVA', 'hdi': 0.847 },
//   { 'code': 'LIE', 'hdi': 0.916 },
//   { 'code': 'LTU', 'hdi': 0.858 },
//   { 'code': 'LUX', 'hdi': 0.904 },
//   { 'code': 'UKR', 'hdi': 0.751 },
//   { 'code': 'GBR', 'hdi': 0.922 }
//   ];   
            const zonecolor= randomColor();
    //   const matchExpression = ['match', ['get','color']];
 
    //  for (const row of datacode) {

    //   const color = randomColor();
    //   console.log(color);
    //   matchExpression.push(row['code'], color);
    //   }
    //  matchExpression.push('rgba(0, 0, 0, 0)');

const layerStyle={
            id:'zoneomics', 
            type: 'fill',
            source : 'zoneomics',
          'source-layer': 'zones',
          'paint': {
            'fill-color': ['match', ['get', 'id'], // get the property
                           'BPC', 'yellow',              // if 'GP' then yellow
                           'C1-6', 'black', 
                           'C1-6A' , 'red',              // if 'XX' then black 
                           'orange'] ,
                           'fill-outline-color': 'red',                    // white otherwise
            },
          }
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
          
            
        return(
        <>
        <ReactMapGl  
            width="100vw" height="100vh"
            style={{borderTop: '8px solid indigo'}}
            mapStyle={'mapbox://styles/hasnatulhaq/cl1kc4e5o00my14o3kuifx4vp'}
            mapboxAccessToken={"pk.eyJ1IjoiaGFzbmF0dWxoYXEiLCJhIjoiY2wwdzBjb3JrMTc3ajNkbjUyaDljbG8zcyJ9.zR9o-L0WGPt1JKTHd0oUFg"}
            {...viewport} 
            onMove={evt => setviewport(evt.viewport)}
            > 
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