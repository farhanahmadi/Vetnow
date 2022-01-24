import './App.css';
import AdminProduct from './components/AdminProduct';
import Navbar from './components/Navbar';
import {Switch , Route} from "react-router-dom"
import AddProduct from './components/AddProduct';
import View from './components/View';
import EditProduct from './components/EditProduct';
import Users from './components/Users';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import EditView from './components/EditView';
import AddCategory from './components/AddCategory';
import EditCategory from './components/EditCategory';
import CategoriesList from './components/CategoriesList';
import EditParentCategory from './components/EditParentCategory';
import Discount from './components/Discount/AddDiscount';
import DistcountProductsList from './components/DistcountProductsList';
// import EditDiscount from './components/EditDiscount';
// import Reports from './components/Reports';
import AdminMainPanel from './components/AdminProduct';

function App() {
  return (
    <div className="App">
        <Navbar />
        <Switch>
          {/* <Route path="/Discount-Products-List" component={DistcountProductsList} /> */}
          {/* <Route path="/Discount-Products-Edit/:id" component={EditDiscount} /> */}
          <Route path="/Edit-Product/:id/:slug" component={EditProduct} />
          <Route path="/Add-Category" component={AddCategory} />
          <Route path="/Edit-Category/:slug" component={EditCategory} />
          <Route path="/Edit-Parent-Category" component={EditParentCategory} />
          <Route path="/3Dview-Products/:id" component={View} />
          <Route path="/Edit-3Dview-Products/:slug" component={EditView} />
          <Route path="/Edit-User/:id" component={EditUser} />
          <Route path="/Products-List" component={AdminProduct} />
          <Route path="/Add-Product" component={AddProduct} />
          <Route path="/Add-User" component={AddUser} />
          <Route path="/Users" component={Users} />
          {/* <Route path="/Reports" component={Reports} /> */}
          {/* <Route path="/Categories-List" component={CategoriesList} /> */}
          <Route path="/Discount-Products" component={Discount} />
          <Route path="/" component={AdminMainPanel} />
        

        </Switch>
    </div>
  );
}

export default App;
