import * as ace from "ace-builds";
/**
 * ACE Settings
 * */

ace.config.set('basePath', '/addons/ace');

let langTools = ace.require('ace/ext/language_tools');

var selectorCompleter = {
  getCompletions: function getCompletions(editor, session, pos, prefix, callback) {
    var list = [],
        token = session.getTokenAt(pos.row, pos.column);

    if (0 < prefix.length && 'selector'.match(prefix) && 'constant' === token.type) {
      list = [{
        name: 'selector',
        value: 'selector',
        score: 1,
        meta: 'Altrp'
      }];
    }

    callback(null, list);
  }
};
langTools.addCompleter(selectorCompleter);
