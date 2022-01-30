import './App.css';
import React,{useState , useEffect} from 'react'
import Navbar from './components/Navbar';
import {Switch , Route , useLocation} from "react-router-dom"
import AddProduct from './components/Products/AddProduct';
import View from './components/3DView/View';
import EditProduct from './components/Products/EditProduct';
import Users from './components/User/Users';
import AddUser from './components/User/AddUser';
import EditUser from './components/User/EditUser';
import EditView from './components/3DView/EditView';
import AddCategory from './components/Categories/AddCategory';
import EditCategory from './components/Categories/EditCategory';
import CategoriesList from './components/Categories/CategoriesList';
import EditParentCategory from './components/Categories/EditParentCategory';
import AddDiscount from './components/Discount/AddDiscount';
import DiscountList from './components/Discount/DiscountList';
import EditDiscount from './components/Discount/EditDiscount';
import Reports from './components/Report/Reports';
import ProductsList from './components/Products/AdminProduct';
import OrdersList from './components/Orders/OrdersList';
import EditOrder from './components/Orders/EditOrder';
import RefundsList from './components/Refunds/RefundsList';
import RefundsEdit from './components/Refunds/RefundsEdit';
import AdminMainPanel from './components/AdminMainPanel';
import Login from './components/Login/Login';
import LoginConfirmation from './components/Login/LoginConfirmation';
import NewsList from './components/News/NewsList';
import AddNews from './components/News/AddNews';
import EditNews from './components/News/EditNews';
import axios from 'axios';
import { MainLink } from './components/Link/MainLink';
import Notfound from './components/Notfound/Notfound';
import { useHistory } from 'react-router-dom';



function App() {
  const history = new useHistory();
  const [isAdmin , setIsAdmin] = useState(false)
  const location = useLocation();
  const currentLocation = location.pathname;


  useEffect(async () =>  {
    axios.get(`${MainLink}/api/v1/check/user/per/`,{
        headers:{
          'Authorization': 'Token '+ localStorage.getItem('token'), 
      },
      }).then(response => setIsAdmin(response.data.is_admin))

}, [isAdmin])

  return (
    <div className="App">
        {currentLocation !=  '/' && currentLocation != '/Login-Confirmation' && isAdmin ? <Navbar /> : "" }
        {isAdmin === true ?
          <div>
            {console.log("yes")}
          </div>
        :
        <div>
          { currentLocation != '/' && currentLocation != '/Login-Confirmation' && currentLocation != '/Notfound' && 
            console.log("no")
          }
        </div>
        
  }    
        <Switch>
          <Route path="/Notfound" component={Notfound} />
          <Route path="/Login-Confirmation" component={LoginConfirmation} />
          <Route exact path="/" component={Login} />
        </Switch>
    </div>
  );
}

export default App;
