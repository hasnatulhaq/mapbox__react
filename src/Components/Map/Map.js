import { useState } from "react"
import ReactMapGl,{Marker,Popup,GeolocateControl} from 'react-map-gl'
import {Room} from '@mui/icons-material'
import './Map.css'



function Mapro(){
    const [viewport , setviewport] = useState({
        longitude: 73.047882,
        latitude: 33.684422,
        zoom: 20,
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
           <Marker 
           longitude={73.047882} 
           latitude={33.684422}>
           <Room/>
    </Marker>
<Popup longitude={73.047882} latitude={33.684422}
closeOnClick={false}
anchor="bottom">
You are here
</Popup>
<GeolocateControl/>
          </ReactMapGl>
    </>
        )
}

export default Mapro


//{...viewport}
//onMove={evt => setviewport(evt.viewport)}
//onViewportChange={(viewport)=>setviewport(viewport)}


// initialViewState={{
//   longitude: 73.047882,
//   latitude: 33.684422,
//   zoom: 3.5
// }}


