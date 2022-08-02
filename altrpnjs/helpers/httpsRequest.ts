import https from 'https';
import http from 'http';

export default function httpsRequest(url: string, params, postData?) {
  return new Promise(function (resolve, reject) {
    let client;
    if (!params.protocol) {
      client = https;
    } else if (params.protocol.indexOf('https') === 0) {
      client = https;
    } else {
      client = http;
    }
    var req = client.request(url, params, function (res) {
      // @ts-ignore
      if ((res && res.statusCode < 200) || (res && res?.statusCode >= 300)) {
        return reject(new Error('statusCode=' + res.statusCode));
      }
      // cumulate data
      var body: any = [];
      res.on('data', function (chunk) {
        body.push(chunk);
      });
      // resolve on end
      res.on('end', function () {
        body = Buffer.concat(body);
        try {
          body = JSON.parse(body.toString('utf8'));
        } catch (e) {
          resolve(body);
          return;
        }
        resolve(body);
        return;
      });
    });
    req.on('error', function (err) {
      reject(err);
    });
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}
