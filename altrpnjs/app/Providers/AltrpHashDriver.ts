import { HashDriverContract } from '@ioc:Adonis/Core/Hash'
import * as bcrypt from 'bcrypt'

export default class AltrpHashDriver implements HashDriverContract {
  saltRounds = 10
  make(value: string): Promise<string> {

    return bcrypt.hash(value, this.saltRounds)
  }

  verify(hashedValue: string, plainValue: string){
    hashedValue = hashedValue.replace('$2y$', '$2b$');
    return bcrypt.compare(plainValue, hashedValue)
  }
}
