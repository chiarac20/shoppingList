import './App.css';
import { Route, Switch, Link, useLocation } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';

import Home from './pages/Home/Home';
import './App.css';
// import AddShop from './pages/AddShop/AddShop';
// import AddProduct from './pages/AddProduct/AddProduct';

function App() {
  const location=useLocation();

  return <main>
      <header className="header">
        <div className="header-side" />
        <h1> My Shopping List </h1> 
        {location.pathname!=="/add-product" && <Link to="/add-product" className="header-side-cta"> 
          <MdShoppingBasket />
        </Link>}
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
          <Route path="/add-product">
            product page
            {/* <AddProduct /> */}
          </Route>
          <Route path="*">
            <Home />
          </Route>
        </Switch>
      </section>
    </main>
}

export default App;
