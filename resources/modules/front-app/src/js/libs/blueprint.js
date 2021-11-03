import { Popover2, Tooltip2, Popover2InteractionKind, Classes as PopoverClasses } from "@blueprintjs/popover2";
import * as Blueprint from '@blueprintjs/core';

import '../../../../editor/src/sass/blueprint.scss';
import '../../../../editor/src/sass/blueprint-tooltip.scss';
import '../../../../editor/src/sass/blueprint-hi-contrast.scss'

const NS = Blueprint.Classes.getClassNamespace();

(window.altrpLibs = window.altrpLibs || {}).Blueprint = Blueprint;
window.altrpLibs.Popover2 = Popover2;
window.altrpLibs.Tooltip2 = Tooltip2;

window.altrpLibs.Popover2InteractionKind = Popover2InteractionKind;
window.altrpLibs.Popover2Classes = PopoverClasses;

