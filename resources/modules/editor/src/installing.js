import * as ace from "ace-builds";
import decorate from "./js/decorators/element-component";
import ElementWrapper from "./js/components/ElementWrapper";
/**
 * ACE Settings
 * */
ace.config.set('basePath', '/addons/ace');

let langTools = ace.require('ace/ext/language_tools');

let selectorCompleter = {
  getCompletions: function getCompletions(editor, session, pos, prefix, callback) {
    let list = [],
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

/**
 * Elements Decorator for Editor
* */

window.elementDecorator = decorate;
/**
 * Elements Wrapper
* */

window.ElementWrapper = ElementWrapper;
