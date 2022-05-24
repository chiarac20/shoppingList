import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useRef } from "react";
import classes from "../ShopDetails/ShopDetails.module.css";
import AddProduct from '../../components/AddProduct/AddProduct';
import SingleProduct from "../../components/SingleProduct/SingleProduct";
import { MdDelete } from 'react-icons/md';

const ShopDetails = () => {
    const addProductRef=useRef();
    const params = useParams();
    const shopId = params.shopId;

    const getShopProductsById = product => product.shopId.find(id => id === shopId);
    const getShopProducts = products => products.filter(product => getShopProductsById(product));
    const products = useSelector(state => state.products.products);
    const shopProducts = getShopProducts(products);
    const shops = useSelector(state => state.shops);
    const selectedShop = shops.find(shop => shop.shopId === shopId);
    const highUrgencyProducts = shopProducts?.filter(product => product.urgency === "high");
    const mediumUrgencyProducts = shopProducts?.filter(product => product.urgency === "medium");
    const lowUrgencyProducts = shopProducts?.filter(product => product.urgency === "low");
   
    const editProduct = product => {
        addProductRef.current.editInput(product);
    }
    
    return<div className={classes.shopDetailsSection}>
        <AddProduct ref={addProductRef}/>
        <div className={classes.shopNameSection}>
            <h2 className={classes.shopName}>{selectedShop.shopName}</h2>
            <button className={classes.removeShopCta}>
                <MdDelete />
            </button>
        </div>
        <ul className={classes.productsList}>
            {highUrgencyProducts && highUrgencyProducts.map(product => <li key={product.productId}>
                <SingleProduct product={product} editProduct={editProduct}/>
            </li>)}  
            {mediumUrgencyProducts && mediumUrgencyProducts.map(product => <li key={product.productId}>
                <SingleProduct product={product} editProduct={editProduct}/>
            </li>)} 
            {lowUrgencyProducts && lowUrgencyProducts.map(product => <li key={product.productId}>
                <SingleProduct product={product} editProduct={editProduct}/>
            </li>)} 
        </ul>
    </div>
}

export default ShopDetails;