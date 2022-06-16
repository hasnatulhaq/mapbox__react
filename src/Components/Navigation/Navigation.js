import {useMap} from 'react-map-gl';
import './Navigation.css'



function NavigateButton() {
    const {current: map} = useMap();
  
    const onClick = () => {
      map.flyTo({center: [-122.4, 37.8]});
    };
  
    return <button className='flytobutton' onClick={onClick}>Go</button>;
  }

  export default  NavigateButton;