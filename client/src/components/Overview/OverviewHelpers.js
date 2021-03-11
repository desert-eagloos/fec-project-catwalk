const _ = require('underscore');
const axios = require('axios').default;

module.exports = {
  reformatStyleGetResponse: (response) => {
    const newFormat = {
      product_id: response.product_id,
      results: _.map(response.results, (entry) => (
        {
          style_id: entry.style_id,
          name: entry.name,
          original_price: entry.original_price,
          sale_price: entry.sale_price,
          'default?': entry['default?'],
          photos: entry.photos,
          skus: _.map(entry.skus, (value, key) => ({
            sku: key,
            quantity: value.quantity,
            size: value.size,
          })),
        }
      )),
    };
    // console.log(newFormat);
    return newFormat;
  },
  findDefaultStyle: (styles) => {
    const defaultStyle = _.find(styles.results, (entry) => entry['default?'] === true);
    return defaultStyle.name;
  },
  findDefaultPrice: (styles) => {
    const defaultStyle = _.find(styles.results, (entry) => entry['default?'] === true);
    return {
      salePrice: defaultStyle.sale_price,
      originalPrice: defaultStyle.original_price,
    };
  },
  filterPriceBySelectedStyle: (styles, styleName) => {
    const filteredResults = _.find(styles.results, (style) => style.name === styleName);
    return {
      salePrice: filteredResults.sale_price,
      originalPrice: filteredResults.original_price,
    };
  },
  filterCartOptionsBySelectedStyle: (styles, styleName) => {
    const filteredResults = _.find(styles.results, (style) => style.name === styleName);
    const sizeOptionsProp = _.map(filteredResults.skus, (value) => ({
      id: value.sku,
      quantity: value.quantity,
      size: value.size,
    }));
    return sizeOptionsProp;
  },
  filterStockOfSelectedSize: (list, size) => (
    _.filter(list, (element) => element.size === size)
  ),
  filterPhotosBySelectedStyle: (styles, styleName) => {
    const filteredResults = _.find(styles.results, (style) => style.name === styleName);
    const photoOptions = _.map(filteredResults.photos, (value) => ({
      thumbnail: value.thumbnail_url,
      fullSize: value.url,
    }));
    return photoOptions;
  },
  returnSKUForSizeInNewStyle: (stockList, sizePreviouslySelected) => (
    _.find(stockList, (entry) => entry.size === sizePreviouslySelected).id
  ),
  filterOutOfStockSizes: (list) => (
    _.filter(list, (element) => element.quantity > 0)
  ),
  maxQuantityOptions: (number) => (
    (number > 15) ? 15 : number
  ),
  sendAddToCartRequests: (quantity, itemSKU) => {
    const url = '/add-to-cart';
    const params = { sku_id: itemSKU };
    const arrayOfPromises = _.map(_.range(quantity), () => axios.post(url, params));
    Promise.all(arrayOfPromises)
      // eslint-disable-next-line no-console
      .then((response) => console.log('Success', response))
      .catch();
  },
};
