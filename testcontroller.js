const Product = require("../models/product");
const storage = require("../config/firebase");

///CREATE PRODUCT WITH FIREBASE
exports.createProduct = async (req, res) => {
  //array to store files
  let imageArray = [];

  //if files/images are not present in req.files that is not sent by the product uploader
  if (!req.files) {
    return res.status(400).json({
      message: "ERROR FROM createProduct, Images are required",
    });
  }

  //if files are present
  if (req.files) {
    for (let index = 0; index < req.files.photos.length; index++) {
      let result = await storage.add(
        req.files.photos[index].tempFilePath
        // {
        //   folder: "products",
        //   scale: 150,
        // }
      );

      //   //pushing the values
      imageArray.push({
        id: result.public_id,
        secure_url: result.secure_url,
      });
    }
  }

  req.body.photos = imageArray;
  req.body.user = req.user.id;

  //creating a product
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    return res.status(200).json({
      success: true,
      savedProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN CREATING PRODUCT",
      error,
    });
  }
};

//CREATE PRODUCT WITH FIREBASE
exports.createProduct = async (req, res) => {
  //array to store files
  let imageArray = [];

  //if files/images are not present in req.files that is not sent by the product uploader
  if (!req.files) {
    return res.status(400).json({
      message: "ERROR FROM createProduct, Images are required",
    });
  }

  const result = await storage.ref(`/items`).add(req.body);
  console.log(result);

  // //if files are present
  // if (req.files) {
  //   for (let index = 0; index < req.files.photos.length; index++) {
  //     let result = await storage.add(
  //       req.files.photos[index].tempFilePath
  //       // {
  //       //   folder: "products",
  //       //   scale: 150,
  //       // }
  //     );

  //     //   //pushing the values
  //     imageArray.push({
  //       id: result.public_id,
  //       secure_url: result.secure_url,
  //     });
  //   }
  // }

  req.body.photos = imageArray;
  req.body.user = req.user.id;

  //creating a product
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    return res.status(200).json({
      success: true,
      savedProduct,
    });
  } catch (error) {
    res.status(400).json({
      message: "ERROR IN CREATING PRODUCT",
      error,
    });
  }
};
