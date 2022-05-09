import { useRef, useEffect } from "react";

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

    return <div>
        <label htmlFor="shop">Shop name</label>
        <input type="text" id="shop" ref={inputRef} onBlur={addShop}/>
    </div>
}

export default AddShop;