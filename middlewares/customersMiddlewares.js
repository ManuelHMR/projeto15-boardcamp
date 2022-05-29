import joi from "joi";
import DateExtension from '@joi/date';
const Joi = joi.extend(DateExtension);

import connection from "../database.js";

const CPF_REGEX = /^[0-9]{11,11}$/;
const PHONE_REGEX = /^[0-9]{10,11}$/;

const customersSchema = joi.object({
    name: joi.string().required(),
    phone: joi
    .string()
    .pattern(PHONE_REGEX)
    .required(),
cpf: joi
    .string()
    .pattern(CPF_REGEX)
    .required(),
birthday: Joi.date().format('YYYY-MM-DD').required(),
});

export async function customersValidation(req, res, next){
    const validation = customersSchema.validate(req.body)
    if(validation.error){
        return  res.status(400).send({
            message: 'Invalid customer input',
            details: validation.error.details.map((e) => e.message),
        });
    }
    next();
};

export async function uniqueCpfValidation(req, res, next){
    try{
        const result = await connection.query(`
        SELECT *
        FROM customers
        WHERE cpf= $1;`, [req.body.cpf]);
        const {rows} = result;
        if(rows.length > 0){
            return res.sendStatus(409);
        }
    } catch(err){
        return res.send(err);
    }
    next()
}