import BaseSchema from '@ioc:Adonis/Lucid/Schema';

export default class TemplateSettings extends BaseSchema {
  protected tableName = 'template_settings';

  public async up() {
    if (await this.schema.hasTable(this.tableName)) {
      return;
    }
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id');

      table.bigInteger('template_id').unsigned().references('templates.id').notNullable();
      table.string('setting_name', 25).index().notNullable();
      table.json('data').notNullable();
      table.unique(['template_id', 'setting_name']);
      table.uuid('template_guid').nullable().index();
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true });
      table.timestamp('updated_at', { useTz: true });
    });
    // const settings = await TemplateSetting.all()
    //
    // for (const setting of settings) {
    //
    //   const template = await Template.find(setting.template_id);
    //
    //
    //   if(!template) {
    //     setting.delete()
    //     continue
    //   }
    //
    //   setting.template_guid = template.getGuid() || ""
    //   setting.save()
    // }
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
