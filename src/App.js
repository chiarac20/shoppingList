import './App.css';
import { Route, Switch, Link, useLocation } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';

import './App.css';
import Home from './pages/Home/Home';
import AddShop from './pages/AddShop/AddShop';
import AddProductPage from './pages/AddProduct/AddProduct';
import ShopDetails from './pages/ShopDetails/ShopDetails';
import { addProductPath } from './pages/AddProduct/addProductInfo';
import { homePath } from './pages/Home/homeInfo';
import { addShopPath } from './pages/AddShop/addShopInfo';
import { shopDetailsPath } from './pages/ShopDetails/shopDetailsInfo';


function App() {

  const location=useLocation();

  return <>
    <header className="header">
      <div className="header-side" />
      <h1 className="main-title"> Chiara's Shopping </h1>
      <div className="header-side">
        {location.pathname!==addProductPath && <Link to={addProductPath} className="header-side-cta"> 
          <MdShoppingBasket />
        </Link>}
      </div>
    </header>
    <main>
      <Switch>
        <Route path={homePath}>
          <Home />
        </Route>
        <Route path={addShopPath}>
          <AddShop />
        </Route>
        <Route path={addProductPath}>
          <AddProductPage /> 
        </Route>
        <Route path={`/:shopId${shopDetailsPath}`}>
          <ShopDetails /> 
        </Route>
        <Route path="*">
          <Home />
        </Route>
      </Switch>
    </main>
  </>
}

export default App;
