import { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Route, useLocation, useHistory } from 'react-router-dom';

import AddShop from "../AddShop/AddShop";
import { shopSliceActions } from "../../store/shopSlice";
import { productsSliceActions } from "../../store/productsSlice";
import { AddShopPath } from "../AddShop/AddShopInfo";
import classes from './AddProduct.module.css';

const AddProduct = () => {
    
    const inputRef=useRef();
    const dispatch=useDispatch();
    const location=useLocation();
    const history=useHistory();
    const shops=useSelector(state => state.shops);
    let shopInfo;
    
    const onProductAdded = (evt) => { 
        evt.preventDefault(); 
        const productName=inputRef.current.value;
        if(!productName.trim()) {
            inputRef.current.focus();
            return;
        }
        const productId = Math.random().toFixed(8).substring(2);
        const productInfo = {productName, productQuantity: 1, productId, shopId: shopInfo.shopId, urgency: 'medium'}
        dispatch(productsSliceActions.addProduct(productInfo));
        dispatch(shopSliceActions.addShop(shopInfo));
        history.push("/homepage");
    }

    const onShopSelected = (shopData) => {
        inputRef.current.focus();
        shopInfo = shopData;
    }

    return <>
        <div className={classes.shopsSection}>
            {shops.map(shop => <li key={shop.shopId} 
            className={classes.shopName} 
                onClick={() => onShopSelected(shop)}>
                {shop.shopName}
            </li>)}
            {location.pathname!=={AddShopPath} && <Link to={AddShopPath} className={`${classes.shopName} ${classes.addShopCta}`}>
                Add a new shop
            </Link>}
        </div>
        <Route path={AddShopPath}>
                <AddShop onShopAdded={(shopData) => shopInfo = shopData}/>
        </Route>
        <form onSubmit={(evt) => onProductAdded(evt)}>
            <label htmlFor="product">Add product</label>
            <input type="text" id="product" ref={inputRef}/>
        </form>
    </>
}

export default AddProduct;