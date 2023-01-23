import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FreteGratis from './FreteGratis';

class ProductInfo extends Component {
  render() {
    const { productList, addToCart } = this.props;
    const maxLengthTitleProduct = 30;
    return (
      <div className="result">
        {productList.results === undefined
          ? <p className="nao-encontrado">Nenhum produto foi encontrado</p>
          : productList.results.map((product) => (
            <div className="product-container" data-testid="product" key={ product.id }>
              <div className="product">
                <Link to={ `/details/${product.id}` } data-testid="product-detail-link">

                  <p>
                    {product.title.length > maxLengthTitleProduct
                      ? `${product.title.substring(0, maxLengthTitleProduct)}...`
                      : product.title}

                  </p>
                  <img src={ product.thumbnail } alt={ product.title } />
                  <p className="productInfo--price">
                    R$
                    {' '}
                    {product.price}
                  </p>
                  {product.shipping.free_shipping
                && <FreteGratis />}
                </Link>
                <button
                  id={ product.id }
                  type="button"
                  data-testid="product-add-to-cart"
                  onClick={ () => addToCart(product) }
                >
                  Adicionar ao carrinho
                </button>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

ProductInfo.propTypes = {
  productList: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default ProductInfo;
