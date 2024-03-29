import Customizer from 'App/Models/Customizer'

export default class AltrpEvent {
  public async listener({ type, data }) {
    const [_namespace, modelName, eventType] = type.split('.')

    const hookType = eventType.indexOf('before') === 0 ? 'before' : 'after'
    let actionType = eventType.replace('after', '').replace('before', '').toLowerCase()

    if (actionType === 'find') {
      actionType = 'read'
    }
    if (['create', 'read', 'update', 'delete'].includes(actionType)) {

      let customizers = await Customizer.query()
        .join('altrp_models', 'altrp_models.id', '=', 'altrp_customizers.model_id')
        .where('altrp_models.name', modelName)
        .preload('altrp_model', modelQuery => {
          modelQuery.where('name', modelName)
        })
        .where('type', 'crud')

      customizers = customizers.filter(
        customizer => customizer.settings.event_type === actionType
          && customizer.settings.event_hook_type === hookType
      )
      console.error(customizers.map(customizer => customizer.toJSON()));

      for (let customizer of customizers) {
        customizer.callCrud(data.id)
      }
    }

  }
}
