const selectForSQLEditor = require("../../helpers/selectForSQLEditor").default
const empty = __importDefault(require("../../helpers/empty")).default;
const Source = __importDefault(require("../Models/Source")).default;
const axios = __importDefault(require("axios")).default;
const Database = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const DB = Database.default;
const _ = __importStar(require("lodash"));
const Validator = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const {DateTime} = require("luxon");


const kyc_constant = require('../AltrpModels/kyc_constant').default
const AltrpBaseController = require('../Controllers/AltrpBaseController').default


class  kyc_constantController  extends AltrpBaseController {





  async get_kyc_constant_default(httpContext){

    if(httpContext && ! await httpContext?.auth?.user?.hasRole(['admin'])){
      httpContext.response.status(403);
      return httpContext.response.json({success: false,  message: 'Permission denied (roles)'});
    }



    const qs = httpContext?.request.qs() || {};
    const all = httpContext?.request.all() || {};
    const status = httpContext?.response.status || (()=>{});
    this.setCustomizerData('context.CurrentModel', kyc_constant );
    this.setCustomizerData('context.request', httpContext?.request);
    this.setCustomizerData('httpContext', httpContext);
    this.setCustomizerData('request', httpContext?.request);
    this.setCustomizerData('context.response', httpContext?.response);
    this.setCustomizerData('response', httpContext?.response);
    this.setCustomizerData('session', httpContext?.session);
    this.setCustomizerData('this', this);
    this.setCustomizerData('altrpuser', httpContext?.auth?.user);
    this.setCustomizerData('current_user', httpContext?.auth?.user);
    this.setCustomizerData('context.current_user', httpContext?.auth?.user);

    this.setCustomizerData('context.data.data', await require('../AltrpModels/kyc_constant').default.all());
    return httpContext.response.json(this.getCustomizerData(`context.data`));

  }

  async get_by_id_kyc_constant_default(httpContext){

    if(httpContext && ! await httpContext?.auth?.user?.hasRole(['admin'])){
      httpContext.response.status(403);
      return httpContext.response.json({success: false,  message: 'Permission denied (roles)'});
    }



    const qs = httpContext?.request.qs() || {};
    const all = httpContext?.request.all() || {};
    const status = httpContext?.response.status || (()=>{});
    this.setCustomizerData('context.CurrentModel', kyc_constant );
    this.setCustomizerData('context.request', httpContext?.request);
    this.setCustomizerData('httpContext', httpContext);
    this.setCustomizerData('request', httpContext?.request);
    this.setCustomizerData('context.response', httpContext?.response);
    this.setCustomizerData('response', httpContext?.response);
    this.setCustomizerData('session', httpContext?.session);
    this.setCustomizerData('this', this);
    this.setCustomizerData('altrpuser', httpContext?.auth?.user);
    this.setCustomizerData('current_user', httpContext?.auth?.user);
    this.setCustomizerData('context.current_user', httpContext?.auth?.user);

    this.setCustomizerData('context.data.data', await require('../AltrpModels/kyc_constant').default.find(httpContext.request.qs().id));
    return httpContext.response.json(this.getCustomizerData(`context.data`));

  }

  async post_kyc_constant_default(httpContext){

    if(httpContext && ! await httpContext?.auth?.user?.hasRole(['admin'])){
      httpContext.response.status(403);
      return httpContext.response.json({success: false,  message: 'Permission denied (roles)'});
    }



    const qs = httpContext?.request.qs() || {};
    const all = httpContext?.request.all() || {};
    const status = httpContext?.response.status || (()=>{});
    this.setCustomizerData('context.CurrentModel', kyc_constant );
    this.setCustomizerData('context.request', httpContext?.request);
    this.setCustomizerData('httpContext', httpContext);
    this.setCustomizerData('request', httpContext?.request);
    this.setCustomizerData('context.response', httpContext?.response);
    this.setCustomizerData('response', httpContext?.response);
    this.setCustomizerData('session', httpContext?.session);
    this.setCustomizerData('this', this);
    this.setCustomizerData('altrpuser', httpContext?.auth?.user);
    this.setCustomizerData('current_user', httpContext?.auth?.user);
    this.setCustomizerData('context.current_user', httpContext?.auth?.user);

    this.setCustomizerData('context.order', httpContext.request.all());

    this.unsetCustomizerData('context.order.altrp_ajax', null);

    this.setCustomizerData('context.data.data', await require('../AltrpModels/kyc_constant').default.create(this.getCustomizerData(`context.order`)));

    this.setCustomizerData('context.data.success', 1);
    return httpContext.response.json(this.getCustomizerData(`context.data`));

  }

  async put_kyc_constant_default(httpContext){

    if(httpContext && ! await httpContext?.auth?.user?.hasRole(['admin'])){
      httpContext.response.status(403);
      return httpContext.response.json({success: false,  message: 'Permission denied (roles)'});
    }



    const qs = httpContext?.request.qs() || {};
    const all = httpContext?.request.all() || {};
    const status = httpContext?.response.status || (()=>{});
    this.setCustomizerData('context.CurrentModel', kyc_constant );
    this.setCustomizerData('context.request', httpContext?.request);
    this.setCustomizerData('httpContext', httpContext);
    this.setCustomizerData('request', httpContext?.request);
    this.setCustomizerData('context.response', httpContext?.response);
    this.setCustomizerData('response', httpContext?.response);
    this.setCustomizerData('session', httpContext?.session);
    this.setCustomizerData('this', this);
    this.setCustomizerData('altrpuser', httpContext?.auth?.user);
    this.setCustomizerData('current_user', httpContext?.auth?.user);
    this.setCustomizerData('context.current_user', httpContext?.auth?.user);

    this.setCustomizerData('context.data.data', await require('../AltrpModels/kyc_constant').default.find(httpContext.request.all().id));
    if( this.getCustomizerData('context.data.data') == null ){
      this.setCustomizerData('context.data.success', 'Not Found');

      this.setCustomizerData('context._', this.getCustomizerData('context.response').status('405'));
      return httpContext.response.json(this.getCustomizerData(`context.data`));}else if( this.getCustomizerData('context.data.data') != null ){
      this.setCustomizerData('context.order', httpContext.request.all());

      this.unsetCustomizerData('context.order.altrp_ajax', null);

      this.setCustomizerData('context.data.data', await this.getCustomizerData(`context.data.data`).merge(this.getCustomizerData(`context.order`)).save());

      this.setCustomizerData('context.data.success', 'true');
      return httpContext.response.json(this.getCustomizerData(`context.data`));}

  }

  async delete_kyc_constant_default(httpContext){

    if(httpContext && ! await httpContext?.auth?.user?.hasRole(['admin'])){
      httpContext.response.status(403);
      return httpContext.response.json({success: false,  message: 'Permission denied (roles)'});
    }



    const qs = httpContext?.request.qs() || {};
    const all = httpContext?.request.all() || {};
    const status = httpContext?.response.status || (()=>{});
    this.setCustomizerData('context.CurrentModel', kyc_constant );
    this.setCustomizerData('context.request', httpContext?.request);
    this.setCustomizerData('httpContext', httpContext);
    this.setCustomizerData('request', httpContext?.request);
    this.setCustomizerData('context.response', httpContext?.response);
    this.setCustomizerData('response', httpContext?.response);
    this.setCustomizerData('session', httpContext?.session);
    this.setCustomizerData('this', this);
    this.setCustomizerData('altrpuser', httpContext?.auth?.user);
    this.setCustomizerData('current_user', httpContext?.auth?.user);
    this.setCustomizerData('context.current_user', httpContext?.auth?.user);

    this.setCustomizerData('context.data.data', await require('../AltrpModels/kyc_constant').default.query().where("id", httpContext.request.qs().id).delete());
    return httpContext.response.json(this.getCustomizerData(`context.data`));

  }

  async filters(httpContext){

    if(httpContext && ! await httpContext?.auth?.user?.hasRole(['admin'])){
      httpContext.response.status(403);
      return httpContext.response.json({success: false,  message: 'Permission denied (roles)'});
    }



  }

  async update_column(httpContext){

    if(httpContext && ! await httpContext?.auth?.user?.hasRole(['admin'])){
      httpContext.response.status(403);
      return httpContext.response.json({success: false,  message: 'Permission denied (roles)'});
    }



    let oldModel = await kyc_constant.find(httpContext.params.kyc_constant);
    if(!oldModel){
      httpContext.response.status(404);
      return httpContext.response.json({success:false, message: 'not found'})
    }
    oldModel[httpContext.params.column] = httpContext.request.input('column_value');
    await oldModel.save();
    return httpContext.response.json({success:true,});

  }

  async destroy(httpContext){

    if(httpContext && ! await httpContext?.auth?.user?.hasRole(['admin'])){
      httpContext.response.status(403);
      return httpContext.response.json({success: false,  message: 'Permission denied (roles)'});
    }



    let oldModel = await kyc_constant.find(httpContext.params.kyc_constant);
    if(!oldModel){
      httpContext.response.status(404);
      return httpContext.response.json({success:false, message: 'not found'})
    }
    await oldModel.delete();
    return httpContext.response.json({success:true,});

  }

  async update(httpContext){

    if(httpContext && ! await httpContext?.auth?.user?.hasRole(['admin'])){
      httpContext.response.status(403);
      return httpContext.response.json({success: false,  message: 'Permission denied (roles)'});
    }



    let oldModel = await kyc_constant.find(httpContext.params.kyc_constant);
    if(!oldModel){
      httpContext.response.status(404);
      return httpContext.response.json({success:false, message: 'not found'})
    }
    oldModel.merge(httpContext.request.all());
    await oldModel.save();
    return httpContext.response.json({success:true, data: oldModel.serialize()});

  }

  async add(httpContext){

    if(httpContext && ! await httpContext?.auth?.user?.hasRole(['admin'])){
      httpContext.response.status(403);
      return httpContext.response.json({success: false,  message: 'Permission denied (roles)'});
    }



    let newModel = new kyc_constant();
    const newModelData = httpContext.request.all();
    if(newModelData.altrp_ajax){
      delete newModelData.altrp_ajax;
    }
    newModel.fill(newModelData);
    await newModel.save();
    return httpContext.response.json({success: true, data: newModel.serialize()});

  }

  async index(httpContext){



    const query = kyc_constant.query();

    let search = httpContext.request.qs().s;
    let page = parseInt(httpContext.request.qs().page);
    let limit = parseInt(httpContext.request.qs().pageSize);
    let filters = {};

    if(httpContext.request.qs().filters){
      try {
        filters = JSON.parse(httpContext.request.qs().filters);
      } catch (e) {

      }
    }

    for(let filter in filters){
      if(filters.hasOwnProperty(filter)){
        query.orWhere(filter, 'like', `%${filters[filter]}%`);
      }
    }

    if(search){

    }

    const order = httpContext.request.qs()?.order === 'asc' ? 'asc' : 'desc';
    query.orderBy(httpContext.request.qs()?.order_by || 'id', order);

    if(page && limit){
      let paginate = (await query.paginate(page, limit)).serialize()
      let hasMore = page < paginate.meta.last_page
      let pageCount = paginate.meta.last_page

      return httpContext.response.json({
        hasMore,
        pageCount,
        data: paginate.data
      });
    }

    return httpContext.response.json({
      hasMore:false,
      pageCount: 0,
      data:  await query.select('*')
    });

  }

  async show(httpContext){



    return httpContext.response.json((await kyc_constant.find(httpContext.params.kyc_constant))?.serialize());

  }

  async options(httpContext){



    let query = kyc_constant.query();

    let filters = {};

    if(httpContext.request.qs().filters){
      try {
        filters = JSON.parse(httpContext.request.qs().filters);
      } catch (e) {

      }
    }

    for(let filter in filters){
      if(filters.hasOwnProperty(filter)){
        query.orWhere(filter, 'like', `%${filters[filter]}%`);
      }
    }

    if(httpContext.request.qs().s){
      query.where(query=>{
        query.orWhere('id', 'like',
          `%${httpContext.request.qs().s}%`);
        query.orWhere('id', 'like',
          `%${httpContext.request.qs().s}%`);
      })
    }

    let result = (await query.select(
      { 'label':'id',  'value': 'id' }
    )).map(result => result.$extras);

    return httpContext.response.json(result);

  }

  async bot_y2v6z8k26(httpContext){



    const qs = httpContext?.request.qs() || {};
    const all = httpContext?.request.all() || {};
    const status = httpContext?.response.status || (()=>{});
    this.setCustomizerData('context.CurrentModel', kyc_constant );
    this.setCustomizerData('context.request', httpContext?.request);
    this.setCustomizerData('httpContext', httpContext);
    this.setCustomizerData('request', httpContext?.request);
    this.setCustomizerData('context.response', httpContext?.response);
    this.setCustomizerData('response', httpContext?.response);
    this.setCustomizerData('session', httpContext?.session);
    this.setCustomizerData('this', this);
    this.setCustomizerData('altrpuser', httpContext?.auth?.user);
    this.setCustomizerData('current_user', httpContext?.auth?.user);
    this.setCustomizerData('context.current_user', httpContext?.auth?.user);


    this.setCustomizerData('context.alt_bot.update_data', httpContext.request.all())

    const chat_id = this.getCustomizerData('context.alt_bot.update_data.message.chat.id') ||
      this.getCustomizerData('context.alt_bot.update_data.callback_query.message.chat.id') ||
      this.getCustomizerData('context.alt_bot.update_data.pre_checkout_query.from.id');
    this.setCustomizerData('context.alt_bot.chat_id', chat_id);
    if(! chat_id ){
      console.error(httpContext.request.all());
      console.error('Altbot Error: Non chat Id Receive!');
      return {
        success: false,
        message: 'Altbot Error: Non chat Id Receive!'
      }
    }
    const app_path = require('../../helpers/path/app_path').default
    const base_path = require('../../helpers/path/base_path').default
    const guid = require('../../helpers/guid').default
    const telegraf = require(app_path('AltrpPlugins/alt-bot/classes/Models/telegraf')).default;
    const telegram = new telegraf.Telegram('5562985496:AAEqhogGsPZNazJXC0J3m5lu1EKYSwOVGeo');
    const Conversation = require(app_path('AltrpPlugins/alt-bot/classes/Models/Conversation')).default

    let conversation = await Conversation.query().where('customizer', '42140193-0a1c-46a3-96c9-f66ff1a526c1')
      .where('telegram_user_id', chat_id).first();
    if(! conversation){
      conversation = await Conversation.create({
        customizer: '42140193-0a1c-46a3-96c9-f66ff1a526c1',
        telegram_user_id: chat_id,
        guid: guid(),
        data: {
          updates: [
            this.getCustomizerData('context.alt_bot.update_data'),
          ],
          currentStep: 'start',
        }
      })
    } else {
      await conversation.refresh();
      conversation.data.updates = conversation.data.updates || [];
      conversation.data.updates.push(this.getCustomizerData('context.alt_bot.update_data'));
      await conversation.save();
    }
    if(this.getCustomizerData('context.alt_bot.update_data.my_chat_member.new_chat_member.user.id') ===
      this.getCustomizerData('context.alt_bot.update_data.my_chat_member.chat.id') &&
      this.getCustomizerData('context.alt_bot.update_data.my_chat_member.new_chat_member.status') === 'kicked'){
      conversation.data.currentStep = 'start';
      await conversation.save();
      return;
    }
    if(this.getCustomizerData('context.alt_bot.update_data.message.text') === '/start'){
      conversation.data.currentStep = 'start';
      await conversation.save();
    }
    this.setCustomizerData('context.alt_bot.conversation', conversation)

    if(this.getCustomizerData('context.alt_bot.update_data.callback_query.data')){
      switch(this.getCustomizerData('context.alt_bot.update_data.callback_query.data')){

        case '35830837830355255': {

          {

            try{
              await telegram.sendMessage( chat_id,
                this.replaceContentWithData(`Спасибо за регистрацию`)
              );
            } catch(e){
              console.error(e, );
            }

          }

          await conversation.refresh();
          conversation.data.updates = conversation.data.updates || [];
          conversation.data.updates.push({
            sendMessage: this.replaceContentWithData(`Спасибо за регистрацию`),
            inline_key_board: []
          });
          await conversation.save();


          this.setCustomizerData('context.res', await (
            async()=>{
              const User = require('../Models/User').default
              const user_profile = require('../AltrpModels/user_profile').default
              let user = await User.query().where('telegram_user_id', chat_id).first()
              const up = await user_profile.firstOrCreate({
                user_id: user.id
              })
              up.lang = `RU`
              await up.save()
            })
          ());

          conversation.data.currentStep = '1677333057945';
          await conversation.save();

          try{
            await telegram.answerCbQuery(this.getCustomizerData('context.alt_bot.update_data.callback_query.id'));
          } catch(e){
            console.error(e)
          }
          return;
        }

        case '7550716609390766': {

          {

            try{
              await telegram.sendMessage( chat_id,
                this.replaceContentWithData(`Спасибо за регистрацию`)
              );
            } catch(e){
              console.error(e, );
            }

          }

          await conversation.refresh();
          conversation.data.updates = conversation.data.updates || [];
          conversation.data.updates.push({
            sendMessage: this.replaceContentWithData(`Спасибо за регистрацию`),
            inline_key_board: []
          });
          await conversation.save();


          this.setCustomizerData('context.res', await (
            async()=>{
              const User = require('../Models/User').default
              const user_profile = require('../AltrpModels/user_profile').default
              let user = await User.query().where('telegram_user_id', chat_id).first()
              const up = await user_profile.firstOrCreate({
                user_id: user.id
              })
              up.lang = `EN`
              await up.save()
            })
          ());

          conversation.data.currentStep = '1677333057945';
          await conversation.save();

          try{
            await telegram.answerCbQuery(this.getCustomizerData('context.alt_bot.update_data.callback_query.id'));
          } catch(e){
            console.error(e)
          }
          return;
        }

        case '3956967119087438': {

          this.setCustomizerData('context.res', await (
            async()=>{
              const User = require('../Models/User').default
              const Hash = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
              let user = await User.query().where('telegram_user_id', chat_id).first()
              let check = false

              if (!user) {
                check = false
              } else {
                check = true
              }
              this.setCustomizerData (`context.check`, check)
            })
          ());
          if( this.getCustomizerData('context.check') == true ){
            {

              try{
                await telegram.sendMessage( chat_id,
                  this.replaceContentWithData(`Пожалуйста отправьте Ваш пароль`)
                );
              } catch(e){
                console.error(e, );
              }

            }

            await conversation.refresh();
            conversation.data.updates = conversation.data.updates || [];
            conversation.data.updates.push({
              sendMessage: this.replaceContentWithData(`Пожалуйста отправьте Ваш пароль`),
              inline_key_board: {}
            });
            await conversation.save();


            conversation.data.currentStep = '1676663424266';
            await conversation.save();
          }else if( this.getCustomizerData('context.check') == false ){
            {

              try{
                await telegram.sendMessage( chat_id,
                  this.replaceContentWithData(`Вы не зарегистрированы в сервисе`)
                );
              } catch(e){
                console.error(e, );
              }

            }

            await conversation.refresh();
            conversation.data.updates = conversation.data.updates || [];
            conversation.data.updates.push({
              sendMessage: this.replaceContentWithData(`Вы не зарегистрированы в сервисе`),
              inline_key_board: {}
            });
            await conversation.save();

          }
          try{
            await telegram.answerCbQuery(this.getCustomizerData('context.alt_bot.update_data.callback_query.id'));
          } catch(e){
            console.error(e)
          }
          return;
        }

        case '8909574541238079': {

          {

            try{
              await telegram.sendMessage( chat_id,
                this.replaceContentWithData(`Хорошо. Желаем успехов!`)
              );
            } catch(e){
              console.error(e, );
            }

          }

          await conversation.refresh();
          conversation.data.updates = conversation.data.updates || [];
          conversation.data.updates.push({
            sendMessage: this.replaceContentWithData(`Хорошо. Желаем успехов!`),
            inline_key_board: {}
          });
          await conversation.save();


          try{
            await telegram.answerCbQuery(this.getCustomizerData('context.alt_bot.update_data.callback_query.id'));
          } catch(e){
            console.error(e)
          }
          return;
        }

        default: {

          this.setCustomizerData('context.data', await (
            async ()=>{
              const product_buttons = require('../AltrpModels/product_buttons').default
              const product_user = require('../AltrpModels/product_user').default
              const User = require('../Models/User').default
              const query = product_buttons.query()
              const button = await query.where('callback_data', this.getCustomizerData(`context.alt_bot.update_data.callback_query.data`)).first()
              let user = await User.query().where('telegram_user_id', chat_id).first()

              if (button) {
                const prod_user = await product_user.query().where('product_id', button.product_id).where('status_id', 1).where('user_id', user.id).first()
                if (prod_user) {
                  prod_user.answer = button.id
                  await prod_user.save()
                }
              }

              /**
               * перехват нажатия на кнопки в рассылке
               */
              const callback_data = this.getCustomizerData(`context.alt_bot.update_data.callback_query.data`)

              const Media = require('../Models/Media').default
              const payment = require('../AltrpModels/payment').default
              const course = require('../AltrpModels/course').default
              const course_distribution = require('../AltrpModels/course_distribution').default
              const course_distribution_confiramtion = require('../AltrpModels/course_distribution_confiramtion').default
              const course_forwarded_message = require('../AltrpModels/course_forwarded_message').default


              const messages = []

              User.$addRelation(
                'payments',
                'hasMany',
                ()=>payment,
                {
                  foreignKey: 'user_id'
                }
              )
              course_distribution.$addRelation(
                'media',
                'belongsTo',
                ()=>Media,
                {
                  foreignKey: 'media_id'
                }
              )

              const currentMessage = await course_distribution.query().where('guid', callback_data).first()
              //найдено сообщение нажатой кнопкой, значит надо искать все сообщения и проверять надо прясо сейчас что-то отправить в ответ
              if(currentMessage){
                //ищем следующее сообщение
                const nextMessages = await course_distribution.query()
                  .where('course_guid', currentMessage.course_guid)
                  .where('day', '=', currentMessage.day)
                  .where('id', '>', currentMessage.id)
                  .orderBy('id')
                  .preload('media')

                //отмечаем, что пользователь подтвердил нажатием кнопки
                await course_distribution_confiramtion.create({
                  course_distribution_id: currentMessage.id,
                  user_id: user.id,
                })
                for (const nextMessage of nextMessages){
                  if(nextMessage.media_id){
                    const image = {
                      type: 'image',
                      media: nextMessage.media,
                      telegram_id: user.telegram_user_id,
                    }
                    image.fM = new course_forwarded_message()
                    image.fM.fill({
                      course_distribution_id: nextMessage.id,
                      user_id: user.id,
                    })
                    messages.push( image)
                  }
                  if(nextMessage.text){


                    for(let i = 4096; i < nextMessage.text.length || i === 4096; i += 4096){
                      const text = {
                        type: 'text',
                        text: nextMessage.text.substring(i - 4096, i),
                        telegram_id: user.telegram_user_id,
                        buttons: []
                      }
                      if(nextMessage.confirm_text && nextMessage.with_confirm && (i+4096) > nextMessage.text.length){
                        text.buttons = [{
                          text: nextMessage.confirm_text,
                          callback_data: nextMessage.guid
                        }]
                      }
                      text.fM = new course_forwarded_message()
                      text.fM.fill({
                        course_distribution_id: nextMessage.id,
                        user_id: user.id,
                      })
                      messages.push( text)

                    }
                    // }
                  }


                  if(nextMessage.need_reply && nextMessage.user_text || nextMessage.with_confirm && nextMessage.confirm_text){
                    break;
                  }

                }
              }

              return messages

              /**
               * перехват нажатия на кнопки в рассылке    КОНЕЦ
               */
            }
          )
          ());

          this.setCustomizerData('context.data1', []);


          for(const _idx in this.getCustomizerData('context.data', [])){
            if(this.getCustomizerData('context.data').hasOwnProperty(_idx)){
              this.setCustomizerData('context.currentItem', this.getCustomizerData('context.data')[_idx]);
              this.setCustomizerData('context.currentIndex', _idx);
              try{

                this.getCustomizerData('context.data1').push(
                  await (async ()=>{
                    if( this.getCustomizerData('context.currentItem.type') == 'text' ){

                      {
                        const app_path = require('../../helpers/path/app_path').default;
                        const telegraf = require(app_path('AltrpPlugins/alt-bot/classes/Models/telegraf')).default;
                        const telegram = new telegraf.Telegram(this.replaceContentWithData('5562985496:AAEqhogGsPZNazJXC0J3m5lu1EKYSwOVGeo'));

                        await require(app_path('AltrpPlugins/alt-bot/functions/sendMessage')).default(
                          telegram, this.replaceContentWithData(`{{context.currentItem.telegram_id}}`),
                          this.replaceContentWithData(`{{context.currentItem.text}}`),
                          this.getCustomizerData('context.currentItem.buttons'), 1
                        )
                      }


                      this.setCustomizerData('context._', await this.getCustomizerData('context.currentItem.fM').save());
                    }else if( this.getCustomizerData('context.currentItem.type') == 'image' ){


                      {
                        const app_path = require('../../helpers/path/app_path').default;
                        const telegraf = require(app_path('AltrpPlugins/alt-bot/classes/Models/telegraf')).default;
                        const telegram = new telegraf.Telegram(this.replaceContentWithData('5562985496:AAEqhogGsPZNazJXC0J3m5lu1EKYSwOVGeo'));

                        await telegram.sendPhoto(this.replaceContentWithData(`{{context.currentItem.telegram_id}}`),
                          'https://cdn.altrp.com/storage' + this.getCustomizerData('context.currentItem.media.filename'));
                      }


                      this.setCustomizerData('context._', await this.getCustomizerData('context.currentItem.fM').save());


                    }
                  })()
                );
              } catch(e){
                console.error(e)
              }
            }
          }


          try{
            await telegram.answerCbQuery(this.getCustomizerData('context.alt_bot.update_data.callback_query.id'));
          } catch(e){
            console.error(e)
          }

        }break;

      }
    }



    if(this.getCustomizerData('context.alt_bot.update_data.pre_checkout_query.invoice_payload')){
      this.setCustomizerData('context.__temp__.preCheckoutQueryId',
        this.getCustomizerData('context.alt_bot.update_data.pre_checkout_query.id'));
      switch(this.getCustomizerData('context.alt_bot.update_data.pre_checkout_query.invoice_payload')){

      }
    }




    switch(this.getCustomizerData('context.alt_bot.update_data.message.text')){

      default: {

        this.setCustomizerData('context.data', await (
          async ()=>{

            const User = require('../Models/User').default
            const Media = require('../Models/Media').default
            let text = this.getCustomizerData(`context.alt_bot.update_data.message.text`) || ''
            text = text.trim()
            text = text.toLowerCase()

            if(! text){
              return
            }

            let user = await User.query().where('telegram_user_id', chat_id).first()
            if(! user){
              return
            }


            /**
             * поиск сообщения и отметка в БД если пользователь его верно ввел
             */

            const payment = require('../AltrpModels/payment').default
            const course = require('../AltrpModels/course').default
            const course_distribution = require('../AltrpModels/course_distribution').default
            const course_distribution_confiramtion = require('../AltrpModels/course_distribution_confiramtion').default
            const course_forwarded_message = require('../AltrpModels/course_forwarded_message').default

            const messages = []

            User.$addRelation(
              'payments',
              'hasMany',
              ()=>payment,
              {
                foreignKey: 'user_id'
              }
            )
            course_distribution.$addRelation(
              'media',
              'belongsTo',
              ()=>Media,
              {
                foreignKey: 'media_id'
              }
            )

            let currentMessage =  course_distribution.query()
              .where('user_text','ilike', `%${text}%`)
              .whereDoesntHave('confiramtions', query=>{
                query.where('user_id', user.id)
              })
              .where('need_reply', 1)
            console.log(currentMessage.toSQL())
            currentMessage = await currentMessage.first()
            console.log(`пользователь ${user.id } ${user.fullName} отправил текст "${text}" найдено сообщение ${currentMessage?.id}`)

            //найдено сообщение с нужным текстом
            if(currentMessage){

              if(text !== currentMessage.user_text.trim().toLowerCase()){
                return
              }

              //ищем следующее сообщение в этот же день
              const nextMessages = await course_distribution.query()
                .where('course_guid', currentMessage.course_guid)
                .where('day', '=', currentMessage.day)
                .where('id', '>', currentMessage.id)
                .orderBy('id')
                .preload('media')
              //отмечаем, что пользователь подтвердил сообщением
              await course_distribution_confiramtion.create({
                course_distribution_id: currentMessage.id,
                user_id: user.id,
              })

              for (const nextMessage of nextMessages){
                if(nextMessage.media_id){
                  const image = {
                    type: 'image',
                    media: nextMessage.media,
                    telegram_id: user.telegram_user_id,
                  }
                  image.fM = new course_forwarded_message()
                  image.fM.fill({
                    course_distribution_id: nextMessage.id,
                    user_id: user.id,
                  })
                  messages.push( image)
                }
                if(nextMessage.text){


                  for(let i = 4096; i < nextMessage.text.length || i === 4096; i += 4096){
                    const text = {
                      type: 'text',
                      text: nextMessage.text.substring(i - 4096, i),
                      telegram_id: user.telegram_user_id,
                      buttons: []
                    }
                    if(nextMessage.confirm_text && nextMessage.with_confirm && (i+4096) > nextMessage.text.length){
                      text.buttons = [{
                        text: nextMessage.confirm_text,
                        callback_data: nextMessage.guid
                      }]
                    }
                    text.fM = new course_forwarded_message()
                    text.fM.fill({
                      course_distribution_id: nextMessage.id,
                      user_id: user.id,
                    })
                    messages.push( text)

                  }
                  // }
                }
                if(nextMessage.need_reply && nextMessage.user_text || nextMessage.with_confirm && nextMessage.confirm_text){
                  break;
                }

              }
            }
            console.log(messages?.[0]?.media?.filename)
            return messages
            /**
             * поиск сообщения и отметка в БД если пользователь его верно ввел    КОНЕЦ
             */
          }
        )
        ());

        this.setCustomizerData('context.data1', []);


        for(const _idx in this.getCustomizerData('context.data', [])){
          if(this.getCustomizerData('context.data').hasOwnProperty(_idx)){
            this.setCustomizerData('context.currentItem', this.getCustomizerData('context.data')[_idx]);
            this.setCustomizerData('context.currentIndex', _idx);
            try{

              this.getCustomizerData('context.data1').push(
                await (async ()=>{
                  if( this.getCustomizerData('context.currentItem.type') == 'text' ){

                    {
                      const app_path = require('../../helpers/path/app_path').default;
                      const telegraf = require(app_path('AltrpPlugins/alt-bot/classes/Models/telegraf')).default;
                      const telegram = new telegraf.Telegram(this.replaceContentWithData('5562985496:AAEqhogGsPZNazJXC0J3m5lu1EKYSwOVGeo'));

                      await require(app_path('AltrpPlugins/alt-bot/functions/sendMessage')).default(
                        telegram, this.replaceContentWithData(`{{context.currentItem.telegram_id}}`),
                        this.replaceContentWithData(`{{context.currentItem.text}}`),
                        this.getCustomizerData('context.currentItem.buttons'), 1
                      )
                    }


                    this.setCustomizerData('context._', await this.getCustomizerData('context.currentItem.fM').save());
                  }else if( this.getCustomizerData('context.currentItem.type') == 'image' ){


                    {
                      const app_path = require('../../helpers/path/app_path').default;
                      const telegraf = require(app_path('AltrpPlugins/alt-bot/classes/Models/telegraf')).default;
                      const telegram = new telegraf.Telegram(this.replaceContentWithData('5562985496:AAEqhogGsPZNazJXC0J3m5lu1EKYSwOVGeo'));

                      await telegram.sendPhoto(this.replaceContentWithData(`{{context.currentItem.telegram_id}}`),
                        'https://cdn.altrp.com/storage' + this.getCustomizerData('context.currentItem.media.filename'));
                    }


                    this.setCustomizerData('context._', await this.getCustomizerData('context.currentItem.fM').save());


                  }
                })()
              );
            } catch(e){
              console.error(e)
            }
          }
        }

        ;

      }break;
    }

    switch (conversation.data.currentStep) {
      case 'start': {

        this.setCustomizerData('context.res', await (
          async()=>{
            let res = all.message?.text || ''

            res = res.replace('/start ', '')

            const validGuid = require('../../helpers/validGuid').default

            res = validGuid(res) ? res : ''


            return res
          }
        )());
        if( this.getCustomizerData('context.res') == null ){}else if( this.getCustomizerData('context.res') != null ){
          this.setCustomizerData('context.user', await (
            async()=>{
              let res = this.getCustomizerData(`context.res`)

              const User = require('../Models/User').default

              const user = res ? await User.query().where('telegram_user_id', all.message.chat.id).first() : null

              return user
            }
          )());
          if( this.getCustomizerData('context.user') == null ){
            this.setCustomizerData('context.user1', await (
              async()=>{
                let res = this.getCustomizerData(`context.res`)

                const User = require('../Models/User').default
                const Role = require('../Models/Role').default
                const tree = require('../AltrpModels/tree').default
                const user_profile = require('../AltrpModels/user_profile').default

                User.$addRelation(
                  'tree',
                  'hasOne',
                  ()=>tree,
                  {
                    foreignKey: 'user_id'
                  }
                )

                tree.$addRelation(
                  'leftChild',
                  'belongsTo',
                  ()=>tree,
                  {
                    foreignKey: 'left',
                  }
                )
                tree.$addRelation(
                  'rightChild',
                  'belongsTo',
                  ()=>tree,
                  {
                    foreignKey: 'right',
                  }
                )
                const user = res ? await User.query().where('guid', res).first() : null

                if(user){
                  user.telegram_user_id = all.message.chat.id
                  user.telegram_verified_at = DateTime.now()

                  // const clientRole = await Role.query().where('name', 'client').first()

                  // await user.related('roles').sync([clientRole.id])
                  await user.save()

                  const _tree = await tree.query().where('user_id', user.id).first()


                  //если еще нет в дереве то закидываем в конец
                  if(! await tree.query().where('left', _tree.id).orWhere('right', _tree.id).first()){
                    //         let lastNode =await DB.rawQuery(`
                    // WITH RECURSIVE subtree AS (
                    //   SELECT "id", "left", "right", 1 AS "distance"
                    //   FROM trees
                    //   WHERE trees.user_id = 48
                    //   UNION ALL
                    //   SELECT t.id, t.left, t.right, s.distance + 1
                    //   FROM trees t
                    //   JOIN subtree s ON t.id = s.left OR t.id = s.right
                    //   WHERE s.left IS NULL OR s.right IS NULL
                    // )
                    // SELECT *
                    // FROM (
                    //   SELECT *, ROW_NUMBER() OVER (ORDER BY distance) AS rn
                    //   FROM subtree
                    //   WHERE "left" IS NULL OR "right" IS NULL
                    // ) sub
                    // WHERE rn = 1;
                    //             `)
                    //UPD 5: присваиваем gпотомка только если участников больше 1
                    if((await tree.query().limit(2)).length > 1){
                      //UPD 3: сделал без корневого чувака



                      let _TR = (await tree.query().orderBy('id', 'asc').first())
                      let treeRoot = _TR?.id
                      if(treeRoot){
                        let side = 'left'
                        let inviterProfile
                        let ignoreProfileSide = false
                        //UPD 2 : выясняем side_branch и в эту сторону закидываем

                        if(_tree.inviter_id){
                          //UPD 6: приоритетное правило рапрседеление личников для пригласившего:
                          // как минимум один должке встать слева, и как минимум один справа, остальные идут в соответствующую ногу!
                          //UPD 6.1: получим список личников (учитываем, что один из них это текущий пользователь), и список потомков в дереве
                          // для определения есть ли пустая сторона у пригласившего

                          const inviter_tree = await tree.query().where('user_id', _tree.inviter_id).first()
                          let inviter_invited = await tree.query().where('inviter_id', _tree.inviter_id).select('id')
                          inviter_invited = inviter_invited.map(i=>i.id)
                          // получаем левую ногу и правую ногу для определения реферала
                          let leftNodes = []
                          let rightNodes = []
                          if(inviter_tree.left){
                            leftNodes =await DB.rawQuery(`
                        WITH RECURSIVE subtree AS (
                      SELECT "id", "left", "right", 1 AS distance
                      FROM trees
                      WHERE id = ?
                      UNION ALL
                      SELECT t.id, t.left, t.right, s.distance + 1
                      FROM trees t
                      JOIN subtree s ON t.id = s.left OR t.id = s.right
                    )

                    SELECT *
                    FROM (
                      SELECT *, ROW_NUMBER() OVER (ORDER BY distance) AS rn
                      FROM subtree
                    ) sub
                                    `, [inviter_tree.left,])
                            leftNodes = leftNodes.rows
                            if(! leftNodes.find(n=>{
                              return inviter_invited.find(i => i== n.id)
                            })){
                              ignoreProfileSide = true
                              side = 'left'
                            }
                          } else {
                            ignoreProfileSide = true
                            side = 'left'
                          }
                          if(! ignoreProfileSide){
                            if(inviter_tree.right){
                              rightNodes =await DB.rawQuery(`
                            WITH RECURSIVE subtree AS (
                          SELECT "id", "left", "right", 1 AS distance
                          FROM trees
                          WHERE id = ?
                          UNION ALL
                          SELECT t.id, t.left, t.right, s.distance + 1
                          FROM trees t
                          JOIN subtree s ON t.id = s.left OR t.id = s.right
                        )

                        SELECT *
                        FROM (
                          SELECT *, ROW_NUMBER() OVER (ORDER BY distance) AS rn
                          FROM subtree
                        ) sub
                                        `, [inviter_tree.right,])
                              rightNodes = rightNodes.rows

                              if(! rightNodes.find(n=>{
                                return inviter_invited.find(i => i== n.id)
                              })){
                                ignoreProfileSide = true
                                side = 'right'
                              }
                            } else {
                              ignoreProfileSide = true
                              side = 'right'
                            }

                          }



                          // const rootUser = await User.query().where('id', _tree.inviter_id).preload('tree', query=>{
                          //     query.preload('leftChild')
                          //     query.preload('rightChild')
                          // }).first()
                          // treeRoot = rootUser.tree.id || treeRoot
                          inviterProfile = await user_profile.query().where('user_id', _tree.inviter_id).first()

                          treeRoot = (await tree.query().where('user_id', _tree.inviter_id).first())?.id || treeRoot
                        } else {
                          inviterProfile = await user_profile.query().where('user_id', _TR.user_id).first()
                        }
                        if(!ignoreProfileSide){
                          if(inviterProfile.side_branch){
                            side = inviterProfile.side_branch
                          } else if((await tree.find(treeRoot)).left){
                            side= 'right'
                          }

                        }
                        let lastNode =await DB.rawQuery(`
            WITH RECURSIVE subtree AS (
          SELECT "id", "left", "right", 1 AS distance
          FROM trees
          WHERE id = ?
          UNION ALL
          SELECT t.id, t.left, t.right, s.distance + 1
          FROM trees t
          JOIN subtree s ON t.id = s.${side}
        )

        SELECT *
        FROM (
          SELECT *, ROW_NUMBER() OVER (ORDER BY distance) AS rn
          FROM subtree
          WHERE ("${side}" IS NULL)
        ) sub
        WHERE rn = 1;
                        `, [treeRoot, ])

                        lastNode = await tree.query().where('id', lastNode.rows[0].id).first()
                        //UPD 4: логика выбора стороны различается для пригласившего и для всех остальных
                        if(lastNode.user_id == _tree.inviter_id){
                          if(! lastNode.left){
                            lastNode.left = _tree.id
                          } else if(! lastNode.right){
                            lastNode.right = _tree.id
                          }

                        } else {
                          lastNode[side] = _tree.id
                        }

                        await lastNode.save()

                      }
                    }


                  }
                  res = user.toJSON()

                  res.inviter_id = _tree.inviter_id
                }


                return res
              }
            )());

            {

              try{
                await telegram.sendMessage( chat_id,
                  this.replaceContentWithData(`Вы привязали telegram`)
                );
              } catch(e){
                console.error(e, );
              }

            }

            await conversation.refresh();
            conversation.data.updates = conversation.data.updates || [];
            conversation.data.updates.push({
              sendMessage: this.replaceContentWithData(`Вы привязали telegram`),
              inline_key_board: {}
            });
            await conversation.save();


            this.setCustomizerData('context.inviter', await (
              async()=>{
                let res = this.getCustomizerData(`context.user1`)

                const User = require('../Models/User').default

                if(res.inviter_id){
                  res = await User.find(res.inviter_id)
                  console.log(`письмо с уведомлением о реферале будет отправлено ${JSON.stringify(res.toJSON(), null, 2)}`)
                } else {
                  res = null
                }

                return res
              }
            )());
            if( this.getCustomizerData('context.inviter') != null ){

              {
                const app_path = require('../../helpers/path/app_path').default;
                const telegraf = require(app_path('AltrpPlugins/alt-bot/classes/Models/telegraf')).default;
                const telegram = new telegraf.Telegram(this.replaceContentWithData('6076334739:AAGQ-EKRxJCmLYGSOf8Hx9NTj8PStRH1nNE'));


                try{
                  await telegram.sendMessage( this.replaceContentWithData(`{{context.inviter.telegram_user_id}}`),
                    this.replaceContentWithData(`🎉 Поздравляем! По вашему промо-коду зарегистрировался новый участник:

👤 {{context.user1.name}} {{context.user1.last_name}}, {{context.user1.email}}
`)
                  );
                } catch(e){
                  console.error(e, );
                }

              }

            }}else if( this.getCustomizerData('context.user') != null ){
            {

              try{
                await telegram.sendMessage( chat_id,
                  this.replaceContentWithData(`данный telegram id уж есть в системе`)
                );
              } catch(e){
                console.error(e, );
              }

            }

            await conversation.refresh();
            conversation.data.updates = conversation.data.updates || [];
            conversation.data.updates.push({
              sendMessage: this.replaceContentWithData(`данный telegram id уж есть в системе`),
              inline_key_board: {}
            });
            await conversation.save();

          }}
      } break;

      case '1676658706209': {

        {

          try{
            await telegram.sendMessage( chat_id,
              this.replaceContentWithData(`Выберите язык`),telegraf.Markup.inlineKeyboard([[telegraf.Markup.button.callback(this.replaceContentWithData(`RU`), '35830837830355255'),telegraf.Markup.button.callback(this.replaceContentWithData(`EN`), '7550716609390766'),],]).resize()
            );
          } catch(e){
            console.error(e, );
          }

        }

        await conversation.refresh();
        conversation.data.updates = conversation.data.updates || [];
        conversation.data.updates.push({
          sendMessage: this.replaceContentWithData(`Выберите язык`),
          inline_key_board: [[{"callback_data":"35830837830355255","text":"RU"},{"callback_data":"7550716609390766","text":"EN"}]]
        });
        await conversation.save();


        conversation.data.currentStep = '1676658706209';
        await conversation.save();

      }break;


      case '1676660574029': {

        this.setCustomizerData('context.res', await (
          async()=>{
            function validateEmail(email) {
              const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
              return regex.test(email.trim());
            }
            let email = this.getCustomizerData(`context.alt_bot.update_data.message.text`)
            this.setCustomizerData('context.check', validateEmail(email))
          })
        ());
        if( this.getCustomizerData('context.check') == true ){
          this.setCustomizerData('context.res', await (
            async()=>{
              const User = require('../Models/User').default
              const temp_password = require('../../helpers/altrpRandomId').default()+require('../../helpers/altrpRandomId').default()

              let email = this.getCustomizerData(`context.alt_bot.update_data.message.text`).trim()
              let user = await User.query().where('telegram_user_id', chat_id).orWhere('email', email).first()
              let pass = `${temp_password}`
              let check2

              if (!user) {
                user = await User.create ({
                  telegram_user_id: this.getCustomizerData(`context.alt_bot.update_data.message.chat.id`),
                  password: temp_password,
                  email: email,
                })
                check2 = true
              } else {
                pass = `Вы уже зарегистрированы!`
                check2 = false
              }
              await user.related('roles').attach({
                2:{
                  user_type: 'App\\User'
                }
              })
              this.setCustomizerData (`context.pass`, pass)
              this.setCustomizerData (`context.check2`, check2)
            })
          ());
          if( this.getCustomizerData('context.check2') == true ){
            {

              try{
                await telegram.sendMessage( chat_id,
                  this.replaceContentWithData(`Ваш пароль: `)
                );
              } catch(e){
                console.error(e, );
              }

            }

            await conversation.refresh();
            conversation.data.updates = conversation.data.updates || [];
            conversation.data.updates.push({
              sendMessage: this.replaceContentWithData(`Ваш пароль: `),
              inline_key_board: {}
            });
            await conversation.save();


            {

              try{
                await telegram.sendMessage( chat_id,
                  this.replaceContentWithData(`{{context.pass}}`)
                );
              } catch(e){
                console.error(e, );
              }

            }

            await conversation.refresh();
            conversation.data.updates = conversation.data.updates || [];
            conversation.data.updates.push({
              sendMessage: this.replaceContentWithData(`{{context.pass}}`),
              inline_key_board: {}
            });
            await conversation.save();


            {

              try{
                await telegram.sendMessage( chat_id,
                  this.replaceContentWithData(`Выберите язык`),telegraf.Markup.inlineKeyboard([[telegraf.Markup.button.callback(this.replaceContentWithData(`RU`), '35830837830355255'),telegraf.Markup.button.callback(this.replaceContentWithData(`EN`), '7550716609390766'),],]).resize()
                );
              } catch(e){
                console.error(e, );
              }

            }

            await conversation.refresh();
            conversation.data.updates = conversation.data.updates || [];
            conversation.data.updates.push({
              sendMessage: this.replaceContentWithData(`Выберите язык`),
              inline_key_board: [[{"callback_data":"35830837830355255","text":"RU"},{"callback_data":"7550716609390766","text":"EN"}]]
            });
            await conversation.save();


            conversation.data.currentStep = '1676658706209';
            await conversation.save();
          }else if( this.getCustomizerData('context.check2') == false ){
            {

              try{
                await telegram.sendMessage( chat_id,
                  this.replaceContentWithData(`{{context.pass}}`)
                );
              } catch(e){
                console.error(e, );
              }

            }

            await conversation.refresh();
            conversation.data.updates = conversation.data.updates || [];
            conversation.data.updates.push({
              sendMessage: this.replaceContentWithData(`{{context.pass}}`),
              inline_key_board: {}
            });
            await conversation.save();

          }}else if( this.getCustomizerData('context.check') == false ){
          {

            try{
              await telegram.sendMessage( chat_id,
                this.replaceContentWithData(`Пожалуйста отправьте корректный email`)
              );
            } catch(e){
              console.error(e, );
            }

          }

          await conversation.refresh();
          conversation.data.updates = conversation.data.updates || [];
          conversation.data.updates.push({
            sendMessage: this.replaceContentWithData(`Пожалуйста отправьте корректный email`),
            inline_key_board: {}
          });
          await conversation.save();


          conversation.data.currentStep = '1676660574029';
          await conversation.save();
        }
      }break;


      case '1676663424266': {

        this.setCustomizerData('context.res', await (
          async()=>{
            const User = require('../Models/User').default
            const Hash = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Hash"));
            let user = await User.query().where('telegram_user_id', this.getCustomizerData(`context.alt_bot.update_data.message.chat.id`)).first()
            let pass = this.getCustomizerData(`context.alt_bot.update_data.message.text`).trim()

            this.setCustomizerData (`context.check`, await Hash.default.verify(user.password, pass))
          })
        ());
        if( this.getCustomizerData('context.check') == true ){
          this.setCustomizerData('context.res', await (
            async()=>{
              const User = require('../Models/User').default
              const user_profile = require('../AltrpModels/user_profile').default
              let user = await User.query().where('telegram_user_id', this.getCustomizerData(`context.alt_bot.update_data.message.chat.id`)).first()
              const up = await user_profile.first({
                user_id: user.id
              })

              await user.delete()
              await up?.delete()
            })
          ());

          {

            try{
              await telegram.sendMessage( chat_id,
                this.replaceContentWithData(`Ваш аккаунт удален. Желаем успехов!`)
              );
            } catch(e){
              console.error(e, );
            }

          }

          await conversation.refresh();
          conversation.data.updates = conversation.data.updates || [];
          conversation.data.updates.push({
            sendMessage: this.replaceContentWithData(`Ваш аккаунт удален. Желаем успехов!`),
            inline_key_board: {}
          });
          await conversation.save();

        }else if( this.getCustomizerData('context.check') == false ){
          {

            try{
              await telegram.sendMessage( chat_id,
                this.replaceContentWithData(`Ваш пароль не верен. Пожалуйста, пришлите верный пароль.`)
              );
            } catch(e){
              console.error(e, );
            }

          }

          await conversation.refresh();
          conversation.data.updates = conversation.data.updates || [];
          conversation.data.updates.push({
            sendMessage: this.replaceContentWithData(`Ваш пароль не верен. Пожалуйста, пришлите верный пароль.`),
            inline_key_board: {}
          });
          await conversation.save();


          conversation.data.currentStep = '1676663424266';
          await conversation.save();
        }
      }break;


      case '1677333057945': {

        this.setCustomizerData('context.res', await (
          async ()=>{
            const product = require('../AltrpModels/product').default
            const product_user = require('../AltrpModels/product_user').default
            const User = require('../Models/User').default
            const query = product.query()
            let user = await User.query().where('telegram_user_id', chat_id).first()
            let text = this.getCustomizerData(`context.alt_bot.update_data.message.text`)

            if (text) {
              text = text.trim()
              if (text.indexOf('#')==0) {
                text = text.substring(1)
                text = text.trim()
                if (parseInt(text)){
                  const prod_answer = await query.where('answer', parseInt(text)).first()
                  if (prod_answer) {
                    const prod_user = await product_user.query().where('product_id', prod_answer.id).where('status_id', 1).where('user_id', user.id).first()
                    if (prod_user) {
                      text = text.replace(parseInt(text), '')
                      text = text.trim()
                      prod_user.answer = text
                      await prod_user.save()
                    }
                  }
                }
              }
            }
          }
        )
        ());

      }break;

    }


  }



  // CUSTOM_START

  // CUSTOM_START
}
// CUSTOM_END

// CUSTOM_END
exports.default =  kyc_constantController ;
