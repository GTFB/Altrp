import decorate from "./js/decorators/element-component";
import ElementWrapper from "./js/components/ElementWrapper";

import("ace-builds").then(ace=>{
  window.ace = ace.default;
  ace.config.set('basePath', '/addons/ace');

  return import("../../../../node_modules/ace-builds/src-min-noconflict/ext-language_tools");
}).then(_module=>{
  return import("../../../../node_modules/ace-builds/src-noconflict/snippets/css");
}).then(_module=>{
  return import("../../../../node_modules/ace-builds/src-noconflict/theme-textmate");
}).then(_module=>{
  return import("../../../../node_modules/ace-builds/src-noconflict/mode-css");
}).then(_module=>{
  let langTools =  window.ace.require('ace/ext/language_tools');

  let selectorCompleter = {
    getCompletions: function getCompletions(editor, session, pos, prefix, callback) {
      let list = [],
          token = session.getTokenAt(pos.row, pos.column);

      if (0 < prefix.length && 'selector'.match(prefix) && 'constant' === token.type) {
        list = [{
          name: '__selector__',
          caption: 'selector',
          value: '__selector__',
          score: 1,
          meta: 'Altrp'
        }];
      }

      callback(null, list);
    }
  };
  // const frameDocument = _.get(document.getElementsByTagName('iframe'), '0.contentWindow.document');
  // console.log(frameDocument);
  // if(frameDocument){
  //   frameDocument.onload = ()=>{
  //     console.log(frameDocument.head.appendChild(document.querySelector('[data-cke]').cloneNode(true)));
  //
  //   };
  //   console.log(frameDocument.head);
  // }
  langTools.addCompleter(selectorCompleter);
  return import("react-ace");
}).then(AceEditor=>{
  AceEditor = AceEditor.default;
  window.AceEditor = AceEditor;
});
/**
 * ACE Settings
 * */


/**
 * Elements Decorator for Editor
* */

window.elementDecorator = decorate;
/**
 * Elements Wrapper
* */

window.ElementWrapper = ElementWrapper;
