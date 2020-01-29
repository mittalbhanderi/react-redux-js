import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'

function ProductItem({product, onAddToCartClicked}) {
    return (
        <div style={{ marginBottom: 20 }}>
          <Product
            title={product.title}
            price={product.price}
            quantity={product.inventory} />
          <button
            onClick={onAddToCartClicked}
            disabled={product.inventory > 0 ? '' : 'disabled'}>
            {product.inventory > 0 ? 'Add to cart' : 'Sold Out'}
          </button>
        </div>
    )
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  }).isRequired,
  onAddToCartClicked: PropTypes.func.isRequired
}

export default ProductItem