import Env from "@ioc:Adonis/Core/Env";

export default function Edge(values) {
  return {
    ...values,
    version: Env.get("ALTRP_VERSION"),
    token: "node"
  }
}

export const inserters = {
  body: "{{-- EDGEGENERATOR::body --}}",
  head: "{{-- EDGEGENERATOR::head --}}"
}

export function builder() {
  return {
    base: "@@layout('../base')",
    head: `@section('head')${inserters.head}@end`,
    body: `@section('body')${inserters.body}@end`,
  }
}

export class EdgeGenerator {
  public builder = builder()


  addInHead(value: string) {
    const splittedText = this.builder.head.split(inserters.head);

    this.builder.head = splittedText[0] + " " + value + " " + inserters.head + splittedText[1]
  }

  addInBody(value: string) {
    const splittedText = this.builder.head.split(inserters.body);

    this.builder.body = splittedText[0] + value + inserters.body + splittedText[1]
  }

  toTemplate() {
    return `${this.builder.base} ${this.builder.head} ${this.builder.body}`
  }
}
