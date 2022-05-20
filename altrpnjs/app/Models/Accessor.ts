import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
const test = {"text":"Лицензия № ЛО-56-01-002816 от 13 ноября 2020 г., выдана Министерством здравоохранения Оренбургской области (460006, г. Оренбург, ул. Терешковой, д. 33, тел. 8 (3532) 77-63-57\/37-54-80) на осуществление доврачебной медицинской помощи по: рентгенологии; сестринскому делу; стоматологии; на осуществление амбулаторно-поликлинической медицинской помощи, в т.ч. при осуществлении специализированной медицинской помощи по: контролю качества медицинской помощи; общественному здоровью и организации здравоохранения; ортодонтии; стоматологии; стоматологии детской; стоматологии ортопедической; стоматологии терапевтической; стоматологии хирургической; экспертизе временной нетрудоспособности)","text_sub":"I Am Sub Heading","sub_heading_settings_alignment":"left","heading_settings_html_tag":"h2","sub_heading_settings_html_tag":"h5","sub_heading_settings_position":"bottom","link_link":{"tag":"Link"},"text_advanced_heading_content":"Advanced heading","heading_style_color":{"color":"rgba(128, 128, 128, 1)","colorPickedHex":"#808080","colorRGB":{"r":128,"g":128,"b":128,"a":1}},"heading_style_text_shadow":{"opacity":1,"colorRGB":"rgb(0, 0, 0)","color":"rgb(0, 0, 0)","colorPickedHex":"#000000"},"style_position_padding":{"unit":"px"},"gradient":{"firstColor":"rgba(97,206,112,1)","firstPoint":"0","secondColor":"rgba(242,41,91,1)","secondPoint":"100","angle":"0"},"background_position":"top left","background_attachment":"scroll","background_repeat":"repeat","background_image_width":{"size":100,"unit":"px"},"background_size":"unset","style_border_color":{"color":"rgb(50,168,82)","colorPickedHex":"#32a852"},"style_border_radius":{"unit":"px"},"text_shadow_advanced_heading_style":{"opacity":1,"spread":1,"colorRGB":"rgb(0, 0, 0)","color":"rgb(0, 0, 0)","colorPickedHex":"#000000","type":"outline"},"spacing_sub_heading":{"unit":"px"},"width_sub_heading":{"unit":"%"},"padding_sub_heading":{"unit":"px","bind":true},"typographic_sub_heading":{"lineHeight":1,"size":16,"weight":"normal","family":"roboto"},"text_shadow_sub_heading":{"opacity":1,"colorRGB":"rgb(0, 0, 0)","color":"rgb(0, 0, 0)","colorPickedHex":"#000000"},"positioning_custom_width":{"unit":"%"},"conditional_other_display":"AND","disabled_conditional_other_display":"AND","active_conditional_other_display":"AND","tooltip_show_type":"never","global_styles_storage":{"63b6b08e-5d38-46cc-987a-e8c8b28e45d4":["heading_style_color"],"d3afecc6-ac01-4bb9-bee8-302f753a8976":["heading_style_typographic"]},"__altrpFonts__":{"heading_style_typographic":"Montserrat"},"heading_style_typographic":{"family":"Montserrat","label":"Montserrat","lineHeight":1.3,"size":"10","sizeUnit":"px","weight":"normal"},"style_position_margin":{"unit":"px"},"positioning_vertical_align":"flex-start","heading_style_typographic__Tablet":{"family":"Montserrat","label":"Montserrat","lineHeight":1.3,"size":"10","sizeUnit":"px","weight":"normal"},"heading_settings_alignment":"flex-start","positioning_margin":{"unit":"px"},"text__Desktop":"Клинически доказано, что зубы становятся светлее до 8 тонов всего за 45 минут.","heading_style_typographic__Laptop":{"family":"Montserrat","label":"Montserrat","lineHeight":1.3,"size":"10","sizeUnit":"px","weight":"normal"},"background_image":{"url":""}}
console.log(test);
export default class Accessors extends BaseModel {
  public  static table = 'altrp_accessors'

  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public title: string

  @column()
  public calculation: string

  @column()
  public calculation_logic: string

  @column()
  public description: string

  @column()
  public  	test : string

  @column()
  public model_id: number

  @column()
  public user_id: number

  @column()
  public status: boolean


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
