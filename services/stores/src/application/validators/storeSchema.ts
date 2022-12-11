import Joi from 'joi'

export enum SchemaErrorMessages {
  'idRequired' = 'Id is required',
  'nameRequired'= 'Name is required',
  'feeRequired' = 'Fee must be a number',
  'feeMin' = 'Fee must be greater than 0',
  'feeMax' = 'Fee must be less than 100',
  'feePrecision' = 'Fee must have 2 decimal places'
}

const idErrors = {
  'string.empty': SchemaErrorMessages.idRequired,
  'any.required': SchemaErrorMessages.idRequired
}

const feeErrors = {
  'number.base': SchemaErrorMessages.feeRequired,
  'number.min': SchemaErrorMessages.feeMin,
  'number.max': SchemaErrorMessages.feeMax,
  'number.precision': SchemaErrorMessages.feePrecision
}

const messageErrors = {
  'string.empty': SchemaErrorMessages.nameRequired,
  'any.required': SchemaErrorMessages.nameRequired
}

export const CreateStoreSchema = Joi.object({
  name: Joi.string().required().messages(messageErrors),
  fee: Joi.number().min(1).max(100).precision(2).messages(feeErrors)
})

export const UpdateStoreSchema = Joi.object({
  id: Joi.string().required().messages(idErrors),
  name: Joi.string().messages(messageErrors),
  fee: Joi.number().min(1).max(100).precision(2).messages(feeErrors)
})
