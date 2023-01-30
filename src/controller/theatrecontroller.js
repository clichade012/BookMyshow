const theatremodel = require('../model/theatremodel')
const usermodel = require('../model/usermodel')
const {isValid ,isValidName,isvalidObjectId} = require('../validation/validator')

const theatrecreate = async function (req, res) {
    try {
        let data = req.body
        let { name, location } = data

        if (!name) {
            return res.status(400).send({ status: false, message: "name is required" })
        }

        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: "Name is not valid" })
        }

        if (!isValidName(name)) {
            return res.status(400).send({ status: false, message: "Name should not have any special charcter!" })
        }

        if (!location) {
            return res.status(400).send({ status: false, message: "location is required" })
        }

        if (!isValid(location)) {
            return res.status(400).send({ status: false, message: "location is not valid" })
        }

        if (!isValidName(location)) {
            return res.status(400).send({ status: false, message: "location should not have any special charcter!" })
        }

        let create = await theatremodel.create(data)

        return res.status(201).send({ status: true, message: "Create theatre successfully!", data: create })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

const getBylocation = async function (req, res) {
    try {
        let data = req.body
        let { location } = data
        let userId = req.params.userId

        if (!userId) {
            return res.status(400).send({ status: false, message: "userId is required" })
        }

        if (!isvalidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "userId must be of 13 String!" })
        }

        let userexists = await usermodel.findOne({ _id: userId })
        if (!userexists) {
            return res.status(400).send({ status: false, message: "UserId does n't exists!" })
        }

        if(Object.keys(data).length == 0){
            let getnodata= await theatremodel.find()
        if (getnodata.length == 0) {
            return res.status(404).send({ status: false, message: "Theatre not founded!" })
        }

        return res.status(200).send({ status: true, message: "Theatre successfully founded", data: getnodata })
        }

        let get = await theatremodel.find({ location: {$regex:location , $options:"i" }})
        if (get.length == 0) {
            return res.status(404).send({ status: false, message: "Theatre not founded!" })
        }

        return res.status(200).send({ status: true, message: "Theatre successfully founded", data: get })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { theatrecreate ,getBylocation}