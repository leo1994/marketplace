import Joi from 'joi'

export enum SchemaErrorMessages {
  'nameRequired'= 'Name is required',
  'feeRequired' = 'Fee must be a number',
  'feeMin' = 'Fee must be greater than 0',
  'feeMax' = 'Fee must be less than 100'
}

export default Joi.object({
  name: Joi.string().required().messages({
    'string.empty': SchemaErrorMessages.nameRequired,
    'any.required': SchemaErrorMessages.nameRequired
  }),
  fee: Joi.number().min(1).max(100).messages({
    'number.base': SchemaErrorMessages.feeRequired,
    'number.min': SchemaErrorMessages.feeMin,
    'number.max': SchemaErrorMessages.feeMax
  })
})
