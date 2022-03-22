import { useState } from "react"
import ReactMapGl from 'react-map-gl'
import {Marker} from 'react-map-gl';
import Locater from "../marker/Locater";

function Mapro(){
    const [viewport , setviewport] = useState({
        longitude: 69.345116,
        latitude: 30.375320,
        zoom: 5,
        width: '90%',
        height : '100%', 
    });    
    return(
    <>
         <ReactMapGl  
         style={{borderTop: '8px solid indigo'}}
         mapStyle={'mapbox://styles/hasnatulhaq/cl0w2hiyf000714o0izsshvwh'}
         mapboxAccessToken={"pk.eyJ1IjoiaGFzbmF0dWxoYXEiLCJhIjoiY2wwdzBjb3JrMTc3ajNkbjUyaDljbG8zcyJ9.zR9o-L0WGPt1JKTHd0oUFg"}
          {...viewport} onMove={evt => setviewport(evt.viewport)}> 
           <Marker longitude={69.345116} latitude={30.375320} 
           offsetLeft={-20}
           offsetTop={-10} >
           <Locater/>
    </Marker>
          </ReactMapGl>
    </>
        )
}

export default Mapro


//{...viewport}
//onMove={evt => setviewport(evt.viewport)}
//onViewportChange={(viewport)=>setviewport(viewport)}


