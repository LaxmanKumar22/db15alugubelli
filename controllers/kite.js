var kite = require('../models/kite');

// for a specific kite.
exports.kite_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await kite.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};
exports.kite_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id)
    try {
        result = await kite.findById(req.query.id)
        res.render('kitedetail',
            { title: 'kite Detail', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};
// VIEWS 
// Handle a show all view 
exports.kite_view_all_Page = async function (req, res) {
    try {
        thekites = await kite.find();
        res.render('kite', { title: 'kite Search Results', results: thekites });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle kite delete form on DELETE.
exports.kite_delete = async function (req, res) {
    console.log("delete " + req.params.id)
    try {
        result = await kite.findByIdAndDelete(req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};
// Handle kite update form on PUT.
//Handle kite update form on PUT.
exports.kite_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await kite.findById(req.params.id)
        // Do updates of properties
        if (req.body.Brand)
            toUpdate.Brand = req.body.Brand;
        if (req.body.color) toUpdate.color = req.body.color;
        if (req.body.price) toUpdate.price = req.body.price;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
    }
};

// List of all kites 
exports.kite_list = async function (req, res) {
    try {
        thekites = await kite.find();
        res.send(thekites);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle kite create on POST.
exports.kite_create_post = async function (req, res) {
    console.log(req.body)
    let document = new kite();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"kite_type":"goat", "cost":12, "size":"large"}
    document.Brand = req.body.Brand;
    document.color = req.body.color;
    document.price = req.body.price;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle building the view for creating a kite. 
// No body, no in path parameter, no query. 
// Does not need to be async 
exports.kite_create_Page = function (req, res) {
    console.log("create view")
    try {
        res.render('kitecreate', { title: 'Kite Create' });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};
exports.kite_update_Page = async function (req, res) {
    console.log("update view for item " + req.query.id)
    try {
        let result = await kite.findById(req.query.id)
        res.render('kiteupdate', { title: 'kite Update', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

exports.kite_delete_Page = async function (req, res) {
    console.log("Delete view for id " + req.query.id)
    try {
        result = await kite.findById(req.query.id)
        res.render('kitedelete', {
            title: 'kite Delete', toShow:
                result
        });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};