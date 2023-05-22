import random from "./random";

export default function altrpGUID(){
  return `${random(1, 'h')}-${random(12, 'h')}-${random(20, 'h')}-${random(18, 'h')}-${random(16, 'h')}`
}
