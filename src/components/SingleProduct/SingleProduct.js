import classes from '../SingleProduct/SingleProduct.module.css';
import { MdOutlineModeEdit } from 'react-icons/md';

const SingleProduct = ({product}) => {
    return <div className={classes[`urgency-${product.urgency}`]}>
        <div className={classes.product}> 
            {product.productName} 
            {product.quantity!==1 ? product.quantity : ''} 
            {product.unit || ''}
            <div className={classes.edit}><MdOutlineModeEdit /></div>
        </div>   
    </div>
}

export default SingleProduct;