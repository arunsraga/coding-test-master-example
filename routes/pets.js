const express = require('express');
const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi)

const { validateBody } = require('../middlewares/route');

const router = express.Router();
const petsCtl = require('./../controllers/pets');

router.get("/", petsCtl.getAll) 
router.get("/:id", validateBody(Joi.object().keys({
    id: Joi.objectId()
})), petsCtl.get) 

router.post("/",
        validateBody(Joi.object().keys({
            name: Joi.string().required().description('Pet Name'),
            age: Joi.number().integer().required().description('Pet age'),
            colour: Joi.string().required('Pet colour'),
        })),
       petsCtl.create
)

router.delete("/:id", validateBody(Joi.object().keys({
    id: Joi.objectId()
})), petsCtl.delete)


module.exports = router;