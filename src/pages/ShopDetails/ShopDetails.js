import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import classes from "../ShopDetails/ShopDetails.module.css";
import AddProduct from '../../components/AddProduct/AddProduct';
import SingleProduct from "../../components/SingleProduct/SingleProduct";
import { MdDelete } from 'react-icons/md';

const ShopDetails = () => {
    const params = useParams();
    const products = useSelector(state => state.products.products);
    const shops = useSelector(state => state.shops);
    const selectedShop = shops.find(shop => shop.shopId === params.shopId);
    const shopProducts = products.filter(product => product.shopId === params.shopId);
    const highUrgencyProducts = shopProducts.filter(product => product.urgency === "high");
    const mediumUrgencyProducts = shopProducts.filter(product => product.urgency === "medium");
    const lowUrgencyProducts = shopProducts.filter(product => product.urgency === "low");

    return<div className={classes.shopDetailsSection}>
        <AddProduct />
        <h3 className={classes.shopName}>{selectedShop.shopName}</h3>
        <ul className={classes.productsList}>
            {highUrgencyProducts && highUrgencyProducts.map(product => <li key={product.productId}>
                <SingleProduct product={product}/>
            </li>)}  
            {mediumUrgencyProducts && mediumUrgencyProducts.map(product => <li key={product.productId}>
                <SingleProduct product={product}/>
            </li>)} 
            {lowUrgencyProducts && lowUrgencyProducts.map(product => <li key={product.productId}>
            <SingleProduct product={product}/>
            </li>)} 
        </ul>
        <button className={classes.removeShopCta}>
            <MdDelete />
        </button>
    </div>
}

export default ShopDetails;