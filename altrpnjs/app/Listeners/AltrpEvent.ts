import Customizer from 'App/Models/Customizer'

export default class AltrpEvent {
  public async listener({ type, data }) {
    const [_namespace, modelName, eventType] = type.split('.')
    const hookType = eventType.indexOf('before') === 0 ? 'before' : 'after'
    let actionType = eventType.replace('after', '').replace('before', '').toLowerCase()

    if (actionType === 'find') {
      actionType = 'read'
    }
    if (['create', 'update', 'delete'].includes(actionType)) {
      let customizers = await Customizer.query()
        .join('altrp_models', 'altrp_models.id', '=', 'altrp_customizers.model_id')
        .where('altrp_models.name', modelName)
        .preload('altrp_model', modelQuery => {
          modelQuery.where('name', modelName)
        })
        .whereRaw(`altrp_customizers.settings::json->>'event_type' = ?`, [actionType])
        .whereRaw(`altrp_customizers.settings::json->>'event_hook_type' = ?`, [hookType])
        .where('type', 'crud')
        .select('altrp_customizers.*')


      for (let customizer of customizers) {
        customizer.callCrud(data).catch(e=>{
          console.error(`Error in "${modelName}" model ${hookType} ${actionType} listener: `, e , customizer.toJSON(), data?.toJSON())
        })
      }
    }

  }
}
