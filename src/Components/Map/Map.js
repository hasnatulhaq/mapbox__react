    import { useState, useEffect } from "react"
    import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css'
    import ReactMapGl,{Source, Layer,
      //Popup
    } from 'react-map-gl'
    import './Map.css'
    import randomColor from "randomcolor";
    import Geocoder from "../Geocoder/Geocoder"
    import axios from "axios";
  
     const MAPBOX_TOKEN = 'pk.eyJ1IjoiaGFzbmF0dWxoYXEiLCJhIjoiY2wwdzBjb3JrMTc3ajNkbjUyaDljbG8zcyJ9.zR9o-L0WGPt1JKTHd0oUFg'

  function Mapro(){

    const [showResults, setShowResults] = useState(false)
    const [address , setAddress] =useState()
    const [data , setData] = useState([]);
    let lat=data[1] , lng=data[0]
    const [id ,setId] = useState()
    const [zone , SetZone] = useState([]);
    const [zonedetail , setZonedetail] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [latlng , setlatlng] = useState([]);
    let lats=latlng.lat , lngs=latlng.lng
    //const [popupInfo, setPopupInfo] = useState(null);


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
           // setIsOpen(true)
          }
        }catch(e){
          // if (e.response && e.response.data) {
          //   console.log(e.response.data.message) // some reason error message
          // }
         console.log('NOT FOUND ANY RESULT',e);
        }
        }
      getData()
  },[data,lat,lng]);


     useEffect(()=>{
           async function getData(){
             try{
              const res=await axios.get('https://testing-api.zoneomics.com/zoneDetail/findByLatLng?lat='+lats+'&lng='+lngs)
            if(res.data.data)
                    setZonedetail(res.data.data.properties)
                    setIsOpen(res.data.data.properties)
                   // setPopupInfo(res.data.data.properties)   
                    
             } catch(error){
                  console.log("Not found any zone data",error);
             }
           }
           getData()
     },[data,lats,lngs]);
  
     const matchExpression = ['match', ['get','z']];
     for (const row of zone) {
       console.log("matchexp")
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
            // const handleClose = () =>(
            //     setIsOpen(false)
            // )
            // const handleOpen = () =>(
            //     setIsOpen(true)
            // )

            const Popups = () =>(
              <div className="zonedetailpopup">
              <span className="close" onClick={() => setIsOpen(null)}>&times;</span>
              <hr className="linepopup"></hr>
              <h3>{address}</h3>
              <hr className="linepopup"></hr>
              <div className="tabscontainer">
                   <button className="tabbtn"  onclick="openCity(event, 'London')">zones data</button>
                   <button className="tabbtn">permitted uses</button>
                   <button className="tabbtn">controls</button>
                   <button className="tabbtn">land use</button>
              </div>
              <div className="zonesdetial_list"> {zonedetail?.map(zone => <li>{zone}</li>)}</div>
                  <div className="bottombtn">
                    <hr className="linepopup"></hr>
                  <button className="bottom_tabbtn"  onclick="openCity(event, 'London')">Unlock Address</button>
                   <button className="bottom_tabbtn">Order Report</button>
                   <button className="bottom_tabbtn">CSV Download</button>
                </div>
                </div>
            )
           // const handleClick = useCallback(() => {    console.log('Clicked!');  }, []);
             
            const displaydata = (event) =>{
              setlatlng(event.lngLat)
          }
        

        return(
       <>  
            {/* <button className="popupbutton" onClick={handleOpen}>Show details</button> */}
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
        
              <Geocoder mapboxAccessToken={MAPBOX_TOKEN} position="top-left" setdata={setData} setaddress={setAddress} zoom={17} countries="us,ca"  width="100%"
        height="100%" />
          
             <Source id="zoneomics"  type="vector"  tiles={["https://testing-api.zoneomics.com/tiles/zones?x={x}&y={y}&z={z}&city_id="+id]}
             addsource="zoneomics"  
             >
                 <Layer {...layerStyle}> 
                   </Layer>    
             </Source> 
           
                  {/* <Popup latitude={Event.lat} longitude={Event.lng}>
                     <div>
                        <h1>This is popup</h1>
                     </div>
                  </Popup> */}
               {/* {layerStyle && (
          <Popup
            longitude={lng}
            latitude={lats}
          >
                    
          </Popup>
        )} */}
{/*         
        {popupInfo && (
          <Popup
           className="zonedetailpopup"
            anchor="top"
            longitude={lngs}
            latitude={lats}
            onClose={() => setPopupInfo(null)}
          >
               
           <div>
                {zonedetail?.map(zone => <li>{zone}</li>)}</div>
          
          </Popup>
        )} */}
                

              </ReactMapGl>
              </>
            )
    }
export default Mapro