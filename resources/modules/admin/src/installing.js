
import lodash from 'lodash';
import store from "./js/store/store";
import {setAceEditor} from "./js/store/ace-editor/actions";
import {setAdminProperty} from "./js/store/admin-state/actions";
window.adminStore = store;
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
      if (0 < prefix.length && ('prefix'.match(prefix) || '{{PREFIX}}'.match(prefix)) && (session.getMode().$id.indexOf('sql') >= -1)) {
        list = [{
          name: '{{PREFIX}}',
          caption: '{{PREFIX}}',
          value: '{{PREFIX}}',
          score: 1,
          meta: 'Altrp'
        }];
      }

      callback(null, list);
    }
  };
  langTools.addCompleter(selectorCompleter);
  return import("react-ace");
}).then(AceEditor=>{
  AceEditor = AceEditor.default;
  window.AceEditor = AceEditor;
  store.dispatch(setAceEditor(AceEditor));
});

window.addEventListener('keydown', e=>{
  if(e.keyCode === 65 && e.altKey){
    e.preventDefault();
    let currentTestEnable = adminStore.getState().adminState.testEnable;
    adminStore.dispatch(setAdminProperty('testEnable', ! currentTestEnable));
  }
});
window._ = lodash;