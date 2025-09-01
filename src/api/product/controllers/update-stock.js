//andres-web\backend\src\api/controllers\update-stock.js
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product.product', ({ strapi }) => ({
  async updateStock(ctx) {
    const { productId, quantitySold } = ctx.request.body;

    if (!productId || !quantitySold) return ctx.badRequest('Missing data');

    const product = await strapi.db.query('api::product.product').findOne({ where: { id: productId } });
    if (!product) return ctx.notFound('Product not found');

    const newQuantity = product.availableQuantity - quantitySold;

    await strapi.db.query('api::product.product').update({
      where: { id: productId },
      data: { availableQuantity: newQuantity },
    });

    return { message: 'Stock updated', productId, newQuantity };
  },
}));
