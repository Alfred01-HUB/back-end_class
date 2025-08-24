const Product = require("../Model/product");

exports.createProduct = async (req, res) => {
    try {
      const { name, description, price } = req.body;

      const imageUrls = req.files.map((file) => file.path);

      const product = await Product.create({
        name,
        description,
        price,
        images: imageUrls,
      });

      res.status(201).json({ success: true, product });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }


