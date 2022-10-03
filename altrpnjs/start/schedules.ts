/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

import Customizer from 'App/Models/Customizer'

console.log('booking schedules...')
Customizer.scheduleAll()
