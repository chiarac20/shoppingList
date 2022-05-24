import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { MdOutlineAddShoppingCart } from 'react-icons/md';
import classes from '../Home/Home.module.css';
import { shopDetailsPath } from "../ShopDetails/shopDetailsInfo";

const Home = () => {
    const shops=useSelector(state => state.shops);
    const products=useSelector(state => state.products.products);

    
    const filterProducts = (shopId) => {
        const getShopProductsById = product => product.shopId.find(id => id === shopId);
        const getShopProducts = products => products.filter(product => getShopProductsById(product));
        const filteredProducts = getShopProducts(products).filter(product => product.urgency === 'high');
        return filteredProducts;
    }

    return <>
        <ul className={classes.shopList}>
        {shops.map(shop => {
            return <li key={shop.shopId}>
                <Link to={`/${shop.shopId}${shopDetailsPath}`} className={classes.shop}>
                    <div className={classes.shopName}>{shop.shopName}</div> 
                    <div className={classes.urgentProducts}>
                        {filterProducts(shop.shopId).length > 0 ? `${filterProducts(shop.shopId).length} urgent` : <div className={classes.nothingUrgent}>Nothing urgent</div>}
                    </div>
                </Link>
                
            </li>
        })}
        </ul>
        <Link to="/add-shop" className={`${classes.shop} ${classes.trolley}`}> 
        to be fixed
            <MdOutlineAddShoppingCart />
        </Link>  
    </>
}

export default Home;