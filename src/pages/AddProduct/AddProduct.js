import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Route, useLocation, useHistory } from 'react-router-dom';

import AddShop from "../AddShop/AddShop";
import { shopSliceActions } from "../../store/shopSlice";
import { productsSliceActions } from "../../store/productsSlice";
import { addShopPath } from "../AddShop/addShopInfo";
import classes from './AddProduct.module.css';
import SingleShop from "../../components/SingleShop/SingleShop";
import AddProduct from "../../components/AddProduct/AddProduct";

const AddProductPage = () => {
    const inputRef=useRef();
    const dispatch=useDispatch();
    const location=useLocation();
    const history=useHistory();
    const shops=useSelector(state => state.shops);
    const selectedShops = shops?.filter(shop => shop.isSelected) || [];
    const shopIds=selectedShops?.map(shop => shop.shopId) || [];
    
   
    // history.push("/homepage");
    const shopClickHandler = (shopId) => {
        dispatch(shopSliceActions.changeSelection(shopId));
    }

    return <>
        <h2 className={classes.title}>Add a product to multiple shops</h2>
        <div className={classes.shopsSection}>
            {shops.map(shop => <SingleShop key={shop.shopId} shop={shop} onShopClicked={() => shopClickHandler(shop.shopId)}/>)}
            {location.pathname==={addShopPath} || <Link to={addShopPath} className={classes.addShopCta}>
                Add a new shop
            </Link>}
        </div>
        <Route path={addShopPath}>
            <AddShop />
        </Route>
        <h3 className={classes.addProductSubtitle}>Add a product to all selected shops</h3>
        <AddProduct shopIds={shopIds}/>
    </>
}

export default AddProductPage;