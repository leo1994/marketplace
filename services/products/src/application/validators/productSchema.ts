import Joi from 'joi'

export enum SchemaErrorMessages {
  'idRequired' = 'Id is required',
  'nameRequired'= 'Name is required',
  'priceRequired' = 'Price must be a number',
  'priceMin' = 'Price must be greater than 0',
  'pricePrecision' = 'Price must have 2 decimal places'
}

const idErrors = {
  'string.empty': SchemaErrorMessages.idRequired,
  'any.required': SchemaErrorMessages.idRequired
}

const priceErrors = {
  'number.base': SchemaErrorMessages.priceRequired,
  'number.min': SchemaErrorMessages.priceMin,
  'number.precision': SchemaErrorMessages.pricePrecision
}

const messageErrors = {
  'string.empty': SchemaErrorMessages.nameRequired,
  'any.required': SchemaErrorMessages.nameRequired
}

export const CreateProductSchema = Joi.object({
  name: Joi.string().required().messages(messageErrors),
  price: Joi.number().min(0).precision(2).required().messages(priceErrors),
  storeId: Joi.string().required().messages(idErrors)
})

export const UpdateProductSchema = Joi.object({
  id: Joi.string().required().messages(idErrors),
  name: Joi.string().required().messages(messageErrors),
  price: Joi.number().min(0).precision(2).required().messages(priceErrors),
})
