import './App.css';
import { Route, Switch, Link, useLocation } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';
import { addProductPath } from './pages/AddProduct/AddProductInfo';

import Home from './pages/Home/Home';
import './App.css';
// import AddShop from './pages/AddShop/AddShop';
import AddProduct from './pages/AddProduct/AddProduct';

function App() {
  const location=useLocation();

  return <main>
      <header className="header">
        <div className="header-side" />
        <h1 className="main-title"> Chiara's Shopping </h1>
        <div className="header-side">
          {location.pathname!==addProductPath && <Link to={addProductPath} className="header-side-cta"> 
            <MdShoppingBasket />
          </Link>}
        </div>
      </header>
      <section>
        <Switch>
          <Route path="/homepage">
            <Home />
          </Route>
          <Route path="/add-shop">
            shop page
            {/* <AddShop /> */}
          </Route>
          <Route path={addProductPath}>
            <AddProduct /> 
          </Route>
          <Route path="*">
            <Home />
          </Route>
        </Switch>
      </section>
    </main>
}

export default App;
