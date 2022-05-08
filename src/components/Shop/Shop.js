import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import classes from '../Shop/Shop.module.css';

const Shop = ({shop}) => {
    const products = useSelector(state => state.products.products);
    const shopProducts = products.filter(product => product.shopId === shop.shopId);
    const urgentProducts =  shopProducts.filter(product => product.urgency === "high");
   
    return <Link to={`/${shop.shopId}/add-product`} className={classes.shop}>
        <div>{shop.shopName}</div>
        <div className={classes['urgency-high']}>{urgentProducts.length || "no urgent prod"}</div>
    </Link>  
}

export default Shop;

