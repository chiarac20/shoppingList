import { useRef, useEffect } from "react";
import classes from './AddShop.module.css';

const AddShop = ({onShopAdded}) => {
    const inputRef=useRef();
    
    const addShop = () => {
        const shopName=inputRef.current.value;
        if(!shopName.trim()) {
            inputRef.current.focus();
            return;
        }
        const shopId = Math.random().toFixed(8).substring(2);
        onShopAdded({shopId, shopName});
    }

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    return <div className={classes.shopInputSection}>
        <label htmlFor="shop" className={classes.shopInputLabel}>Shop name</label>
        <input type="text" id="shop" ref={inputRef} onBlur={addShop} className={classes.shopInput}/>
    </div>
}

export default AddShop;