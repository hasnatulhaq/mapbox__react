import './Sidebar.css'
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';


export default function Sidbar() {
  return (<>
            <div className="sidebar__item">
              <p><DashboardIcon/>Dashboard</p>
              <p><AccountBoxIcon/>Account</p>
            </div>
  </>
  ) 
}
