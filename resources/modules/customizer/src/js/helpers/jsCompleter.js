

export default async function jsCompleter(editor, session, pos, prefix, callback) {
  let list = [],
    token = session.getTokenAt(pos.row, pos.column);

  // if (0 < prefix.length && 'selector'.match(prefix) && 'constant' === token.type) {
  //   list = [{
  //     name: '__selector__',
  //     caption: 'selector',
  //     value: '__selector__',
  //     score: 1,
  //     meta: 'Altrp'
  //   }];
  // }
  console.log(token, editor, session, pos, prefix, callback)

  callback(null, list);
}
let jsModules = []
