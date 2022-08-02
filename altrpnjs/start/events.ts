/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/
import Event from '@ioc:Adonis/Core/Event';

Event.on('model:updating', 'Model.updating');
Event.on('model:updated', 'Model.updated');
Event.on('model:deleting', 'Model.deleting');
Event.on('model:deleted', 'Model.deleted');
Event.on('altrp:message', 'Message.receiver');
Event.on('altrp_event', 'AltrpEvent.listener');
