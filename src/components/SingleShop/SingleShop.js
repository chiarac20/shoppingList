import classes from '../SingleShop/SingleShop.module.css';

const SingleShop = ({shop, onShopClicked, selected}) => {
    const shopClasses = `${classes.shopName} ${selected ? classes.selected : ''}`;

    return <div className={shopClasses} onClick={onShopClicked} selected={selected}>
        {shop.shopName}
    </div>
}

export default SingleShop;