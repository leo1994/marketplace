import Joi from 'joi'

export enum SchemaErrorMessages {
  'productListEmpty' = 'Product list is empty',
  'productIdEmpty' = 'Product id is empty',
}

const productListErrors = {
  'array.includesRequiredUnknowns': SchemaErrorMessages.productListEmpty,
  'string.empty': SchemaErrorMessages.productIdEmpty
}

export const CreateOrderSchema = Joi.object({
  productList: Joi.array().items(Joi.string().required()).required().messages(productListErrors)
})