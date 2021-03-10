const _ = require('underscore');

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
    return newFormat;
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
  findDefaultStyle: (styles) => {
    const defaultStyle = _.find(styles.results, (entry) => entry['default?'] === true);
    return defaultStyle.name;
  },
  findDefaultPrice: (styles) => {
    const defaultStyle = _.find(styles.results, (entry) => entry['default?'] === true);
    return defaultStyle.sale_price ? defaultStyle.sale_price : defaultStyle.original_price;
  },
  filterPriceBySelectedStyle: (styles, styleName) => {
    const filteredResults = _.find(styles.results, (style) => style.name === styleName);
    return filteredResults.sale_price ? filteredResults.sale_price : filteredResults.original_price;
  },
  returnSKUForSizeInNewStyle: (stockList, sizePreviouslySelected) => (
    _.find(stockList, (entry) => entry.size === sizePreviouslySelected).id
  ),
};
