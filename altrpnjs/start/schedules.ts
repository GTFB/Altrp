/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Logger from '@ioc:Adonis/Core/Logger'
import Customizer from 'App/Models/Customizer'

Logger.info('booking schedules...')
Customizer.scheduleAll()
