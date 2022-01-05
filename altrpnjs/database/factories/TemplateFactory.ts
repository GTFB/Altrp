import Factory from "@ioc:Adonis/Lucid/Factory";
import Template from "App/Models/Template";
import { v4 as uuid } from "uuid";

export const TemplateFactory = Factory
  .define(Template, ({ faker }) => {
    const name = faker.internet.userName();
    return {
      area_id: Math.floor((Math.random() * 6) + 1),
      data: JSON.stringify({}),
      name: name,
      title: name,
      guid: uuid(),
      user_id: 1,
    }
  })
  .build()
