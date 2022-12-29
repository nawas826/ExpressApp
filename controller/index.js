const Users = require("../models/users");

const getUserData = async (req, res) => {
    try {
        console.log('req.query--->', req.query)
        const limit = parseInt(req.query.limit);
        const page = parseInt(req.query.pageNumber);
        const skip = parseInt(page - 1) * parseInt(limit);
        const sortOrder = req.query.sortOrder ? req.query.sortOrder : 'asc';
        const re = new RegExp(req.query.keyword, 'i');
        const orCondition = [{ 'name': { $regex: re } }]
        await Users.find()
            .or(orCondition)
            .limit(limit)
            .skip(skip)
            .sort({ age: sortOrder })
            .exec((err, result) => {
            if (err) {
                res.json({
                "status": "failure",
                "message": err
                })
            }

            res.json({
                "status": "success",
                result
            });
    });
    } catch (err) {
        res.status(500).send({
            message:
              err.message || "Some error occurred while fetching data",
          });
    }
}

const saveUserData = (req, res) => {
    try{
        const user = new Users({
            id: req.body.id,
            name: req.body.name,
            age: req.body.age
        });
        user.save((err, doc) => {
            if (err) {
                console.log('Error--->', err)
                res.status(500).send({
                    message:
                      err.message || "Some error occurred while fetching data",
                  });
            }
            console.log("Document inserted succussfully!");
            res.send({message: "ocument inserted succussfully!"});
        });   
    } catch(err) {
        console.log(err)
        res.status(500).send({
            message:
              err.message || "Some error occurred while fetching data",
          });
    }
}

module.exports = {getUserData, saveUserData};