import { useState } from "react"
import ReactMapGl from 'react-map-gl'

function Map(){
    const [viewport , setviewport] = useState({
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
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
          <h1>hello world</h1>
          </ReactMapGl>
    </>
        )
}

export default Map


//{...viewport}
//onMove={evt => setviewport(evt.viewport)}
//onViewportChange={(viewport)=>setviewport(viewport)}


