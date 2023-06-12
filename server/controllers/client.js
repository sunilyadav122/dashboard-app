import ProductStats from "../models/ProductStat.js";
import Product from "../models/Products.js";

export const getProducts = async (req, res) => {
  const allProducts = await Product.find({});
  const productsWithStats = await Promise.all(
    allProducts.map(async (prod) => {
      const stats = await ProductStats.find({
        productId: prod._id,
      });
      return {
        ...prod._doc,
       stats,
      };
    })
  );
  res.status(200).json({
     productsWithStats,
  });
};
