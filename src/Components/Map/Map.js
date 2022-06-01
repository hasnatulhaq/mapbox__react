    import { useState, useEffect } from "react"
    import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
    import ReactMapGl,{Source, Layer} from 'react-map-gl'
    import './Map.css'
    import Geocoder from "../Geocoder/Geocoder"
    import axios from "axios";
    import {staticColor} from "../../color.js"
  
    const MAPBOX_TOKEN = 'pk.eyJ1IjoiaGFzbmF0dWxoYXEiLCJhIjoiY2wwdzBjb3JrMTc3ajNkbjUyaDljbG8zcyJ9.zR9o-L0WGPt1JKTHd0oUFg'

    function Mapro({setIsLoggedIn}){

    const [showResults, setShowResults] = useState(false)
    //const [address , setAddress] =useState()
    const [data , setData] = useState([]);
    let lat=data[1] , lng=data[0]
    const [id ,setId] = useState()
    const [zone , SetZone] = useState([]);
    const [zonedetail , setZonedetail] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [latlng , setlatlng] = useState([]);
    let lats=latlng.lat , lngs=latlng.lng
    const [index, setIndex ] = useState(0);
    const [ colors , setColors] = useState();
    const [Localaddress, setLocaladdress] =useState();


        const [viewport , setviewport] = useState({
            longitude: -95.712891,
            latitude: 37.090240,   
            zoom: 4,
            width: window.innerWidth,
            height: window.innerHeight,
            isDragging: false,
        }); 


        
   
    useEffect(()=>{
      async function getData(){
        try{
          if(data[1] !== ''){
            const res=await axios.get('https://testing-api.zoneomics.com/cities/findByLatLng?lat='+lat+'&lng='+lng)
            SetZone(res.data.data[0].zoneCode)
            setId(res.data.data[0].id);
            setShowResults(true)
           setIsOpen(true)
          }
        }catch(e){
         console.log('NOT FOUND ANY RESULT',e);
        }
        }
      getData()
  },[data,lat,lng]);


     useEffect(()=>{
           async function getData(){
             try{
              const res=await axios.get('https://testing-api.zoneomics.com/zoneDetail/findByLatLng?lat='+lats+'&lng='+lngs)
            if(res?.data?.data)
                    setZonedetail(res.data.data.properties)
                   // console.log(zonedetail.map((['zoneCode'])=> [zoneCode]))
                    setIsOpen(res.data.data.properties) 
                    
             } catch(error){
               setZonedetail({})
                  console.log("Not found any zone data",error);
             }
           }
           getData()
     },[data,lats,lngs]);


     useEffect(()=>{
      async function getData(){
        try{

          const res=await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/'+lngs+','+lats+'.json?access_token='+MAPBOX_TOKEN)
          setLocaladdress(res.data.features[0].place_name)

        } catch(error){
             console.log("not found any address" , error)
        }
      }
      getData()
},[data,lats,lngs]);
   

     
     useEffect(()=>{
      setColors(staticColor)
      },[])


    const matchExpression = ['match', ['get','z']];
    for (let row=0;row<zone.length; row++ ) {
        const color = colors[row]
         matchExpression.push(zone[row],color);
         }
      matchExpression.push('white');
    
const layerStyle={
            id:'zoneomics', 
            type: 'fill',
            source : 'zoneomics',
          'source-layer': 'zones',
          'paint': {
              'fill-color' : matchExpression,
               'fill-outline-color': 'gray',
               "fill-opacity": 0.5,
            },
          }

const layerlabel={
       id: 'zonelabel',
       type: 'symbol',
       source: 'zoneomics',
       'source-layer': 'zones',
        'layout': {
          'text-field': ['get', 'description'],
          'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
          'text-radial-offset': 0.5,
          'text-justify': 'auto',
          'icon-image': ['get', 'icon']
      }
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
                <div className="legend_heading"><h4>zones legend</h4></div>
              <div className="zonecode_list">{handlecolor()}</div>
              </div>
            )

            const Popups = () =>(
              <div className="zonedetailpopup">
                <div className="zonedetailpopup_closediv">
                <span className="close" onClick={() => setIsOpen(null)}>&times;</span>
                </div> 
              <div>
              <hr className="linepopup"></hr>
              <h3 className="top_address">{Localaddress}</h3>
              <hr className="linepopup"></hr>
              </div>
             
             
              <div className="tabscontainer">
                   <button className="tabbtn" onClick={()=>{setIndex(0)}}>Zones Data</button>
                   <button className="tabbtn" onClick={()=>{setIndex(1)}}>Permitted uses</button>
                   <button className="tabbtn" onClick={()=>{setIndex(2)}}>Controls</button>
                   <button className="tabbtn" onClick={()=>{setIndex(3)}}>Land use</button>
              </div>
              <div>
              <hr className="linepopup"></hr>
              </div>
            {zonedetail&&
              <div className="zonesdetial_list">
                {/* <ul className="zoneslist" hidden={index !== (0)}>{zonedetail?.map(zone => <li>{zone}</li>)}</ul> */}
                <ul className="zoneslist" hidden={index !== (0)}>
                  <li>{zonedetail[0]}</li>
                  <li>{zonedetail[1]}</li>
                  <li>{zonedetail[6]}</li>
                  <li>{zonedetail[7]}</li>
                  <li>{zonedetail[8]}</li>
                  </ul> 
                <ul className="zoneslist" hidden={index !== (1)}>
                <li>{zonedetail[2]}</li>                
                <li>{zonedetail[3]}</li>                
                <li>{zonedetail[4]}</li>
                <li>{zonedetail[5]}</li>
                </ul>
                <ul className="zoneslist" hidden={index !== (2)}>
                  <li>{zonedetail[9]}</li>
                  <li>{zonedetail[10]}</li>
                  <li>{zonedetail[11]}</li>
                  <li>{zonedetail[12]}</li>
                  <li>{zonedetail[13]}</li>
                  <li>{zonedetail[14]}</li>
                  <li>{zonedetail[15]}</li>
                  <li>{zonedetail[16]}</li>
                  <li>{zonedetail[17]}</li>
                  </ul>
                <ul className="zoneslist" hidden={index !== (3)}>
                  <li>land use</li>
                  </ul>
                </div>
              }
                  <div className="">
                  <hr className="linepopup"></hr>
                    <div className="bottombtn">
                   <button className="bottom_tabbtn"  onClick="openCity(event, 'London')">Unlock Address</button>
                   <button className="bottom_tabbtn">Order Report</button>
                   <button className="bottom_tabbtn">CSV Download</button>
                    </div>
                </div>
                </div>
            )
            const displaydata = (event) =>{
              setlatlng(event.lngLat)
          }
        
        return(
       <>  
            <button className="logoutbtn" onClick={()=>setIsLoggedIn(false)}>Signout</button>
            {isOpen ? <Popups/> : null }
            {showResults ? <Results /> : null }
            <ReactMapGl 
            width="100vw" height="100vh"
            style={{borderTop: '5px solid #245c7c'}}
            mapStyle={'mapbox://styles/hasnatulhaq/cl1kc4e5o00my14o3kuifx4vp'}
            mapboxAccessToken={MAPBOX_TOKEN}
            {...viewport} 
            onMove={evt => setviewport(evt.viewport)}
            onClick={displaydata}
             > 
              <Geocoder mapboxAccessToken={MAPBOX_TOKEN} position="top-left" setdata={setData} zoom={17} countries="us,ca"  width="100%"
        height="100%"/>
          

             {/* <Geocoder mapboxAccessToken={MAPBOX_TOKEN} position="top-left" setdata={setData} setaddress={setAddress} zoom={17} countries="us,ca"  width="100%"
             height="100%" /> */}
             <Source id="zoneomics"  type="vector"  tiles={["https://testing-api.zoneomics.com/tiles/zones?x={x}&y={y}&z={z}&city_id="+id]}
             addsource="zoneomics"  
             >
                 <Layer {...layerStyle}> 
                   </Layer> 
                   <Layer {...layerlabel}>
                     </Layer>   
             </Source> 
              </ReactMapGl>
              </>
            )
    }
export default Mapro