import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { MdDelete, MdOutlineAddShoppingCart } from 'react-icons/md';
import classes from '../Home/Home.module.css';
import { shopSliceActions } from "../../store/shopSlice";

const Home = () => {
    const shops=useSelector(state => state.shops);
    const products=useSelector(state => state.products.products);
    const dispatch=useDispatch();

    const removeShop = shopId => {
        dispatch(shopSliceActions.removeShop(shopId));
    }

    const filterProducts = (shopId) => {
        const filteredByShop = products.filter(product => product.shopId === shopId);
        const filteredByUrgency = filteredByShop.filter(product => product.urgency === 'high');
        return {filteredByShop, filteredByUrgency};
    }
      
    console.log(filterProducts('49469486').filteredByShop.length);

    return <>
        <ul className={classes.shopList}>
        {shops.map(shop => {
            return <li key={shop.shopId} className={classes.shop}>
                <div className={classes.shopName}>{shop.shopName}</div>
                <button onClick={() => removeShop(shop.shopId)} className={classes.removeShopCta}>
                    <MdDelete />
                </button>  
                <div className={classes.urgentProducts}>
                    {filterProducts(shop.shopId).filteredByUrgency.length > 0 ? filterProducts(shop.shopId).filteredByUrgency.length : ''}
                </div>
                {filterProducts(shop.shopId).filteredByShop.map(product => <div key={product.productId}>
                    {product.productName}
                </div>)}
            </li>
        })}
            <Link to="/add-shop" className={`${classes.shop} ${classes.trolley}`}> 
                <MdOutlineAddShoppingCart />
            </Link>
        </ul>      
    </>
}

export default Home;