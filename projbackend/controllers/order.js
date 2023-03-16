const { Cart, Order } = require("../models/order");

exports.getOrderById = (req, es, next, id) => {
    Order.findById(id)
    .populate("products.product", "name price")
    .exec((error, order) => {
        if(error) return res.status(400).json({
            error: "Cannot find orders"
        });
        req.order = order;
        next();
    });
};



exports.createOrder = (req, res) => {
    req.body.order.user = req.profile;
    const order = new Order(req.body.order);
    order.save((error, order) => {
        if(error) return res.status(400).json({
            error: "Cannor create order"
        });
        return res.json(order);
    });
};



exports.getAllOrders = (req, res) => {
    Order.find()
    .populate("user", "_id name")
    .exec((error, orders) => {
        if(error) return res.status(400).json({
            error: "Cannot fetch orders"
        });
        return res.json(orders);
    });
};



exports.getOrderStatus = (req, res) => {
    return res.json(Order.schema.path("status".enumValues));
}



exports.updateStatus = (req, res) => {
    Order.update(//read
        {_id: req.body.orderId},
        {$set: {status: req.body.status}},
        (error, status) => {
            if(error) return res.status(400).json({
                error: "Cannot update status of order"
            });
            return res.json(status);
        }
    )
}