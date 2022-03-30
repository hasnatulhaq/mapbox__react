import { useState } from "react"
//import ReactMapGl,{Source,Layer,Marker} from 'react-map-gl'
import ReactMapGl,{Marker} from 'react-map-gl'
import {Room} from '@mui/icons-material'
import './Map.css'
import * as Cities from '../../station.json';




function Mapro(){
    const [viewport , setviewport] = useState({
        longitude: 73.047882,
        latitude: 33.684422,
        zoom: 2.0,
        width: window.innerWidth,
        height: window.innerHeight,
        isDragging: false,
    });    
    return(
    <>
    <ReactMapGl  
         width="100vw" height="100vh"
         style={{borderTop: '8px solid indigo'}}
         mapStyle={'mapbox://styles/hasnatulhaq/cl0w2hiyf000714o0izsshvwh'}
         mapboxAccessToken={"pk.eyJ1IjoiaGFzbmF0dWxoYXEiLCJhIjoiY2wwdzBjb3JrMTc3ajNkbjUyaDljbG8zcyJ9.zR9o-L0WGPt1JKTHd0oUFg"}
         {...viewport} 
         onMove={evt => setviewport(evt.viewport)}
         > 
         {Cities.features.Map((city)=>(
               <Marker key={city.properties.id}>
                 <Room/>
               </Marker>
         ))}
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
  



{/* <Source id="my-data" type="geojson" data={geojson}>
       <Layer {...layerStyle} /> 
      </Source> */}