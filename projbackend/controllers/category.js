const Category = require("../models/category");



exports.getCategoryById = (req, res, next, id) => {
    Category.findById(id).exec((error, cat) => {
        if(error) return res.status(400).json({
            error: "category not found"
        });
        req.category = cat;
        next();
    });
};



exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((error, category) => {
        if(error) return res.status(400).json({
            error: "cannot create cat"
        });
        return res.json({ category });
    })
};



exports.getCategory = (req, res) => {
    return res.json(req.category);
}



exports.getAllCategory = (req, res) => {
    Category.find().exec((error, categories) => {
        if(error) return res.status(400).json({
            error: "No categories found"
        });
        return res.json(categories);
    })
}



exports.updateCategory = (req, res) => {
    const category = req.category;
    category.name = req.body.name;
    category.save((error, updatedCat) => {
        if(error) return res.status(400).json({
            error: "Not able to update category"
        });
        return res.json(updatedCat);
    });
}



exports.removeCategory = (req, res) => {
    const category = req.category;
    category.remove((error, cat) => {
        if(error) return res.status(400).json({
            error: "Not able to delete cat"
        });
        return res.json({
            message: "Category deleted successfully"
        })
    });
}