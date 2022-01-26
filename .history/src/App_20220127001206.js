import './App.css';
import AdminProduct from './components/Products/';
import Navbar from './components/Navbar';
import {Switch , Route} from "react-router-dom"
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
import ProductsList from './components/AdminProduct';
import OrdersList from './components/Orders/OrdersList';
import EditOrder from './components/Orders/EditOrder';
import RefundsList from './components/Refunds/RefundsList';
import RefundsEdit from './components/Refunds/RefundsEdit';
import AdminMainPanel from './components/AdminMainPanel';
import Login from './components/Login/Login';

function App() {
  return (
    <div className="App">
        <Navbar />
        <Switch>
          <Route path="/Discount-Products-List" component={DiscountList} />
          <Route path="/Discount-Products-Edit/:id" component={EditDiscount} />
          <Route path="/Edit-Product/:id/:slug" component={EditProduct} />
          <Route path="/Add-Category" component={AddCategory} />
          <Route path="/Edit-Category/:slug" component={EditCategory} />
          <Route path="/Edit-Parent-Category" component={EditParentCategory} />
          <Route path="/3Dview-Products/:id" component={View} />
          <Route path="/Edit-3Dview-Products/:slug" component={EditView} />
          <Route path="/Edit-User/:id" component={EditUser} />
          <Route path="/Admin-MainPanel" component={AdminMainPanel} />
          <Route path="/Edit-Refund_Order/:id" component={RefundsEdit} />
          <Route path="/Edit-Order/:id" component={EditOrder} />
          <Route path="/Order-List" component={OrdersList} />
          <Route path="/Products-List" component={ProductsList} />
          <Route path="/Products-List" component={AdminProduct} />
          <Route path="/Refunds-List" component={RefundsList} />
          <Route path="/Add-Product" component={AddProduct} />
          <Route path="/Add-User" component={AddUser} />
          <Route path="/Users" component={Users} />
          <Route path="/Reports" component={Reports} />
          {/* <Route path="/Categories-List" component={CategoriesList} /> */}
          <Route path="/Add-Discount-Products" component={AddDiscount} />
          <Route path="/" component={Login} />
        

        </Switch>
    </div>
  );
}

export default App;
