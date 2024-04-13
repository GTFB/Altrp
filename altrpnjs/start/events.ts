/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Event from '@ioc:Adonis/Core/Event'
console.log('Start Listen Events');
// Event.on('model:updating', 'Model.updating');
Event.on('model:updated', 'Model.updated');
// Event.on('model:deleting', 'Model.deleting');
// Event.on('model:deleted', 'Model.deleted');
Event.on('altrp:message', 'Message.receiver')
Event.on('altrp_event', "AltrpEvent.listener")
Event.onError(function (type, error, data){
  if(type === 'altrp_event' && data.type?.indexOf('custom_events.') === 0){
    throw  error
  }
  console.error('listener error:', ...arguments)
})
