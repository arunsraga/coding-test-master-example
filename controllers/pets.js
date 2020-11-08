
//Get all pets
exports.getAll = (req, res)=>{
        console.log("[ get pets ]");
        let petDb = req.app.db.model("Pets");
        petDb.find((err, data)=>{
            if(err){
                return res.status(500).json({"status":"fail", "err":err})
            } else {
                return res.json({"status":"success", result:data})
            }
        })
}

// Get Pet details using _id
exports.get = async(req, res)=>{
    console.log("[ get pet ]");
    let petDb = req.app.db.model("Pets");
    let reqId = req.params.id
    console.log(" [ reqId ]", reqId)
    try {
        let resData = await petDb.findOne({"_id":reqId})
        if(!resData){
            return res.status(404).json({"status":"success", "msg":"Requested Pet Details Not Found"})
        }
        return res.json({"status":"success", result:resData})
    } catch (err) {
        return res.status(500).json({"status":"fail", "err":err})
    }
}

//Create a new Pet
exports.create = async(req, res)=>{
    let petDb = req.app.db.model("Pets");
    let name = req.body.name
    let age = req.body.age
    let colour = req.body.colour
    let petObj = {"name":name, "age":age, "colour":colour}

    try {
        let savedPet = await petDb(petObj).save()
        console.log("[ Ceated new pet ]", JSON.stringify(savedPet))
        return res.status(201).json({"status":"Success", 
            "msg":"New Pet Details Added Successfully",
            "result": savedPet
        })
    } catch (err) {
        console.log([ "Error in new pet creation" ], err)
        return res.status(500).json({"error":"Internal Server Error"})
    }
}

//Delete a Specific pet with _id
exports.delete = (req, res)=>{
    let petDb = req.app.db.model("Pets");
    let reqId = req.params.id
    console.log(" [ reqId ]", reqId)
    petDb.deleteOne({"_id":reqId},(err, data)=>{
        if(err){
            return res.status(500).json({"status":"fail", "err":err})
        } else {
            if(data.deletedCount==0){
                return res.status(404).json({"status":"success", "msg":"Requested pet Details not found"})
            } else {
                return res.json({"status":"success", "msg":"Requested Pet Deleted Successfully"})
            }
        }
    })
}