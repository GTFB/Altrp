import BaseElement from "./BaseElement";
import {
  CONTROLLER_TEXT,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_NUMBER,
  CONTROLLER_COLOR,
  CONTROLLER_SELECT,
  CONTROLLER_CSSEDITOR,
  CONTROLLER_SLIDER,
  TAB_STYLE,
  TAB_ADVANCED
} from "../modules/ControllersManager";
import { advancedTabControllers } from "../../decorators/register-controllers";

class Column  extends BaseElement {

  static getName(){
    return 'column';
  }
  static getTitle(){
    return 'Column';
  }
  static getType(){
    return 'column';
  }
  _registerControls(){
    this.startControlSection('content',{
      label: 'Column'
    });
    this.addControl('text',{
      label: 'Column'
    });
    this.endControlSection();

    this.startControlSection("column_style_background", {
      tab: TAB_STYLE,
      label: "background"
    });

    this.addControl("column_style_background_color", {
      type: CONTROLLER_COLOR,
      label: "background color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-column": "background-color: {{COLOR}};"
      }
    });

    this.endControlSection();

    this.startControlSection("column_style_border", {
      tab: TAB_STYLE,
      label: "Border"
    });

    this.addControl("column_style_border_type", {
      type: CONTROLLER_SELECT,
      label: "border Type",
      units: ["px", "%", "vh"],
      options: [
        {
          value: "none",
          label: "None"
        },
        {
          value: "solid",
          label: "Solid"
        },
        {
          value: "double",
          label: "Double"
        },
        {
          value: "dotted",
          label: "Dotted"
        },
        {
          value: "dashed",
          label: "Dashed"
        },
        {
          value: "groove",
          label: "Groove"
        }
      ],
      rules: {
        "{{ELEMENT}} .altrp-column": "border-style: {{VALUE}};"
      }
    });

    this.addControl("column_style_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border Width",
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-column":
          "border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};"
      }
    });

    this.addControl("column_style_border_color", {
      type: CONTROLLER_COLOR,
      label: "Border Color",
      default: {
        color: "rgb(50,168,82)",
        colorPickedHex: "#32a852"
      },
      rules: {
        "{{ELEMENT}} .altrp-column": "border-color: {{COLOR}};"
      }
    });

    this.addControl("column_style_border_radius", {
      type: CONTROLLER_SLIDER,
      label: 'Border radius',
      default:{
        size: 0,
        unit: 'px',
      },
      units:[
        'px',
        '%',
        'vh',
      ],
      max: 100,
      min: 0,
      rules: {
        "{{ELEMENT}} .altrp-column": "border-radius: {{SIZE}}{{UNIT}}"
      }
    });

    this.endControlSection();
    
    advancedTabControllers(this);
  }

  appendWidget(newWidget) {
    if(newWidget.getType() !== 'widget'){
      throw 'Only Widget can be a Child of Column';
    }
    this.appendChild(newWidget);
  }

  /**
   * Вставляет новую колонку после текущей колонки
   */
  insertNewColumnAfter(){
    let column = new Column();
    this.insertSiblingAfter(column);
  }

  /**
   * Проверяет можно ли удалить текущую колонку (в секции обязательна одна колонка)
   * @return {boolean}
   */
  canDeleteThis(){
    return this.parent.children.length > 1
  }


}

export default Column