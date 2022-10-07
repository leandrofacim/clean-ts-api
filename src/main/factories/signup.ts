import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/cryptography/cryptography'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { SignUpController } from '../../presentation/controllers/signup/signup'
import { Controller } from '../../presentation/protocols'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { LogControllerDecorator } from '../decorators/log'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const addAccountRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const addDbAccount = new DbAddAccount(bcryptAdapter, addAccountRepository)
  const signUpController = new SignUpController(emailValidatorAdapter, addDbAccount)
  return new LogControllerDecorator(signUpController)
}
