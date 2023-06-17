import ProductStats from "../models/ProductStat.js";
import Product from "../models/Products.js";
import Transactions from "../models/Transactions.js";
import User from "../models/User.js";
import getCountryISO3 from "country-iso-2-to-3";

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

export const getCustomers = async (req, res) => {
  const customers = await User.find({ role: "user" }).select("-password");
  res.status(200).json(customers);
};

export const getTransactions = async (req, res) => {
  const {
    currentPage = 1,
    pageSize = 20,
    sort = null,
    search = "",
  } = req.query;

  const generateSort = () => {
    const parsedSort = JSON.parse(sort);
    console.log("parsedSort", parsedSort);
    const sortFormatted = {
      [parsedSort.field]: parsedSort.sort === "asc" ? 1 : -1,
    };
    return sortFormatted;
  };

  const sortFormatted = Boolean(sort) ? generateSort() : {};
  //Can perfomr multiple field search
  const transactions = await Transactions.find({
    $or: [
      {
        cost: { $regex: new RegExp(search, "i") },
      },
      {
        userId: { $regex: new RegExp(search, "i") },
      },
    ],
  })
    .sort(sortFormatted)
    .skip(currentPage * pageSize)
    .limit(pageSize);

  const total = await Transactions.countDocuments();

  res.status(200).json({ transactions, total });
};

export const getGeography = async (req, res) => {
  const user = await User.find({});
  const mappedLocation = user.reduce((acc, { country }) => {
    const countryIso3 = getCountryISO3(country);
    if (!acc[countryIso3]) {
      acc[countryIso3] = 0;
    }
    acc[countryIso3]++;
    return acc;
  }, {});

  const formattedLocations = Object.entries(mappedLocation).map(
    ([country, count]) => ({
      id: country,
      value: count,
    })
  );
  
  res.status(200).json(formattedLocations);
};
