const Product = require("../models/product");
const formidable = require("formidable");
const fs = require("fs");
const _ = require("lodash");



exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
    .populate("Category") //read
    .exec((error, product) => {
        if(error) return res.status(400).json({
            error: "No Product Found"
        });
        req.product = product; //read
        next();
    })
};



exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm(); //require 3 parameters error, field, files
    form.keepExtensions = true;
    form.parse(req, (error, fields, file) => {
        if(error) return res.status(400).json({
            error: "Something wrong with the image"
        });


        //do restrictions on route level as done in auth
        const { name, price, description, category, stock } = fields;

        //TODO restricts
        let product = new Product(fields);
        if(!name || !description || !price || !category || !stock) return res.status(400).json({
            error: "Please provide all the mandatory fields"
        });

        if(file.photo){
            if(file.photo.size > 3000000) return res.status(400).json({
                error: "File size too large"
            });
            product.photo.data = fs.readFileSync(file.photo.path); //read about buffer data type and fs
            product.photo.contentType = file.photo.type
        }
        product.save((error, product) => {
            if(error) return res.status(400).json({
                error: "Product was not created"
            });
            return res.json(product);
        });
    });
}; 



exports.getProduct = (req, res) => {
    req.product.photo = undefined; //read
    return res.json(req.product); //read
};



//middleware. Try with rremoving it
exports.photo = (req, res, next) => {
    if(req.product.photo.data){ //read
        res.set("Contet-Type", req.product.photot.contentType); //read
        return res.send(req.product.photo.data); //read
    }
    next();
};



exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((error, deletedProduct) => {
        if(error) return res.status(400).json({
            error: "Cannot delete product"
        });
        return res.json({
            message: "deletion was successful"
        });
    });
};



exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm(); //require 3 parameters error, field, files
    form.keepExtensions = true;
    form.parse(req, (error, fields, file) => {
        if(error) return res.status(400).json({
            error: "Something wrong with the image"
        });
        let product = req.product;
        product = _.extend(product, fieldds);
        if(file.photo){
            if(file.photo.size > 3000000) return res.status(400).json({
                error: "File size too large"
            });
            product.photo.data = fs.readFileSync(file.photo.path); //read about buffer data type and fs
            product.photo.contentType = file.photo.type
        }
        product.save((error, product) => {
            if(error) return res.status(400).json({
                error: "Updation od product failed"
            });
            return res.json(product);
        });
    });    
};



exports.getAllProducts = (req, res) => {
    let limit = res.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
    Product.find()
    .populate("category")
    .select("-photo")//dont show photo
    .limit(limit)
    .sort([[sortBy, "asc"]])
    .exec((error, products) => {
        if(error) return res.status(400).json({
            error: "Cannot get products"
        });
        return res.json(products);
    })
};



exports.getAllUniqueProducts = (req, res) => {
    Product.distinct("category", {}, (error, prod) => {
        if(error) return res.status(400).json({
            error: "cannot list all the categories"
        });
        return res.json(prod);
    });
}



exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.productss.map(prod => {
        return{
            updateOne: {
                filter: {_id : prod._id},
                update: {$inc: {stock: -prod.count, sold: +prod.count}}
            }
        }
    });
    Product.bulkWrite(myOperations, {}, (error, product) => {
        if(error) return res.status(400).json({
            error: "could not perform bulk write"
        })
    });
    next();
};