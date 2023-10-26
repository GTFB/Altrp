export default function random(length = 10, scope = '') {
  length = Number(length)
  length = length || 10
  let result = '';
  let characters
  switch (scope.toLowerCase()){
    case 'h':{
      characters = '0123456789abcdef'
    }break;
    case 'n':{
      characters = '0123456789'
    }break;
    case 'f':{
      characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%^&*()_+-=[];'\\,./?:"|{}\`~`
    }break;
    case 's':{
      characters = `!#$%^&*()_+-=[];'\\,./?:"|{}\`~`
    }break;
    case 'l':{
      characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz`
    }break;
    case 'c':{
      characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZ`
    }break;
    case 'low':{
      characters = `abcdefghijklmnopqrstuvwxyz`
    }break;
    default: {
      characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    }break;
  }

  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
