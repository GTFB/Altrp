import mbParseJSON from "../../../../front-app/src/js/functions/mb-parse-JSON";
import  Cookies from 'js-cookie';

export default function getAPiToken(){
  window.altrpMarketApiToken = Cookies.get('altrpMarketApiToken') || '';
  window.addEventListener('message', data=>{
    console.log(Cookies.get('altrpMarketApiToken'));

    const _data = mbParseJSON(data.data, data.data)
    if((data.origin === 'https://altrp.org' || data.origin === 'https://altrp.market')
      && _data
      && _data?.data?.api_token
      &&  window.altrpMarketApiToken !== _data?.data?.api_token){
      window.altrpMarketApiToken = _data?.data?.api_token;
      Cookies.set('altrpMarketApiToken', _data?.data?.api_token)
      console.log(Cookies.get('altrpMarketApiToken'));
    }
  })
}
