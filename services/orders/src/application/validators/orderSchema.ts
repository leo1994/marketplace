import Joi from 'joi'

export enum SchemaErrorMessages {
  'idRequired' = 'Id is required',
}

const messageErrors = {
  'string.empty': SchemaErrorMessages.idRequired,
  'any.required': SchemaErrorMessages.idRequired
}

export const CreateOrderSchema = Joi.object({

})