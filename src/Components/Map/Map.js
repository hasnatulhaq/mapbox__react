    import { useState, useEffect } from "react"
    import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
    import ReactMapGl,{Source, Layer,} from 'react-map-gl'
    import './Map.css'
    import randomColor from "randomcolor";
    import Geocoder from "../Geocoder/Geocoder"
    import axios from "axios";
  
     const MAPBOX_TOKEN = 'pk.eyJ1IjoiaGFzbmF0dWxoYXEiLCJhIjoiY2wwdzBjb3JrMTc3ajNkbjUyaDljbG8zcyJ9.zR9o-L0WGPt1JKTHd0oUFg'

  function Mapro(){

        const [viewport , setviewport] = useState({
            longitude: -95.712891,
            latitude: 37.090240,   
            zoom: 4,
            width: window.innerWidth,
            height: window.innerHeight,
            isDragging: false,
        }); 

    const [showResults, setShowResults] = useState(false)
    const [data , setData] = useState([]);
    let lat=data[1] , lng=data[0]
    const [id ,setId] = useState()
    const [zone , SetZone] = useState([]);

    useEffect(()=>{
      async function getData(){
        if(data[1] !== ''){
          const res=await axios.get('https://testing-api.zoneomics.com/cities/findByLatLng?lat='+lat+'&lng='+lng)
          SetZone(res.data.data[0].zoneCode)
          setId(res.data.data[0].id);
          setShowResults(true)
        }
        }
      getData()
  },[data,lat ,lng]);

       
     const matchExpression = ['match', ['get','z']];
     for (const row of zone) {
       const color = randomColor();
       matchExpression.push(row, color);
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
      
            const handlecolor=()=>{
                  let arr=[]
                  for(let i=0; i<matchExpression.length-2; i++)
                  {
                    if(i>1){
                       if(i%2===0){
                           arr.push( <div><span style={{backgroundColor: matchExpression[i+1]}}></span>{matchExpression[i]}</div>)
                       }    
                    }
                  }
                  return arr
            }


            const Results = () => (
              <div id="state-legend" className="legend">
              <h4>zones legend</h4>
              {handlecolor()}       
              </div>
            )

        return(
       <>
         { showResults ? <Results /> : null }
           
        <ReactMapGl 
        
            width="100vw" height="100vh"
            style={{borderTop: '5px solid #245c7c'}}
            mapStyle={'mapbox://styles/hasnatulhaq/cl1kc4e5o00my14o3kuifx4vp'}
            mapboxAccessToken={MAPBOX_TOKEN}
            {...viewport} 
            onMove={evt => setviewport(evt.viewport)}> 
           
              <Geocoder mapboxAccessToken={MAPBOX_TOKEN} position="top-left" setdata={setData} zoom={17} countries="us,ca"  width="100%"
        height="100%"/>
          
             <Source id="zoneomics"  type="vector"  tiles={["https://testing-api.zoneomics.com/tiles/zones?x={x}&y={y}&z={z}&city_id="+id]}
             addsource="zoneomics"  
             >
                 <Layer {...layerStyle}> 
                   </Layer>    
             </Source>
              </ReactMapGl>
              </>
            )
    }
export default Mapro