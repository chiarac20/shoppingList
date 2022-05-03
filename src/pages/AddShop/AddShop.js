import { useDispatch } from "react-redux";
import { useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

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
        dispatch(shopSliceActions.addShop({shopName, shopId}));
        history.push("/homepage");
        inputRef.current.value="";
    }

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    return <form onSubmit={addShop}>
        <div></div>
        <label htmlFor="shop">Shop name</label>
        <input type="text" id="shop" ref={inputRef} ></input>
        <button type="submit">Add</button>
    </form>
}

export default AddShop;