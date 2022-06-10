import { useDispatch } from 'react-redux';
import { useState } from 'react';

import classes from '../SingleProduct/SingleProduct.module.css';
import { MdOutlineModeEdit, MdDelete } from 'react-icons/md';
import { productsSliceActions } from '../../store/productsSlice';

const SingleProduct = ({product, editProduct}) => {
    const dispatch=useDispatch();
    const [checkboxState, setCheckboxState]=useState(false);

    const removeProduct = (id) => {
        dispatch(productsSliceActions.removeProduct(id));
    }

    return <div className={classes.product}> 
        <div className={classes.productSection}>
            <input type="checkbox" checked={checkboxState} 
                className={`${classes.inputCheckbox} ${classes[product.urgency]}`}
                onChange={() => setCheckboxState(!checkboxState)}
            />
            <div onClick={() => setCheckboxState(!checkboxState)} className={classes.productDetails}>
                <div className={classes.productName}>{product.productName}</div>
                <div>{product.quantity===1 && product.unit ? product.quantity : ''}</div>
                <div className={classes.quantity}>{product.quantity>1 && product.quantity}</div> {product.unit || ''}
            </div>
        </div>
        <div className={classes.actionSection}>
        {checkboxState && <MdDelete className={classes.removeShopCta} onClick={() => removeProduct(product.productId)} />}
        <MdOutlineModeEdit className={classes.edit} onClick={() => editProduct(product)} />
        </div>
    </div>   
}

export default SingleProduct;