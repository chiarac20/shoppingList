import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { MdAdd } from 'react-icons/md';
import classes from './AddShop.module.css';
import { shopSliceActions } from "../../store/shopSlice";

const AddShop = () => {
    const inputRef=useRef();
    const dispatch=useDispatch();
    const history=useHistory();

    const addShop = (evt) => {
        evt.preventDefault();
        const shopName=inputRef.current.value;
        if(!shopName.trim()) {
            inputRef.current.focus();
            return;
        }
        const shopId = Math.random().toFixed(8).substring(2);
        dispatch(shopSliceActions.addShop({shopId, shopName, isSelected: false}));
        history.replace('/add-product');
    }

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    return <form className={classes.shopInputSection} onSubmit={(evt) => addShop(evt)}>
        <label htmlFor="shop" className={classes.shopInputLabel}>Shop name</label>
        <input type="text" id="shop" ref={inputRef} className={classes.shopInput}/>
        <button type="submit" className={classes.addCta}>
            <MdAdd />
        </button>
    </form>
}

export default AddShop;