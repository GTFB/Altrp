export default function random(length = 10, scope = '') {
  length = length || 10
  let result = '';
  let characters
  switch (scope){
    case 'h':{
      characters = '0123456789abcdef'
    }break;
    case 'n':{
      characters = '0123456789'
    }break;
    case 'f':{
      characters = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%^&*()_+-=[];'\\,./<>?:"|{}\`~`
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
