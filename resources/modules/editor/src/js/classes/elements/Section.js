import BaseElement from "./BaseElement";
import Column from "./Column";
import {
  CONTROLLER_TEXT,
  CONTROLLER_DIMENSIONS,
  CONTROLLER_NUMBER,
  CONTROLLER_COLOR,
  CONTROLLER_SELECT,
  CONTROLLER_SLIDER,
  TAB_STYLE
} from "../modules/ControllersManager";

class Section extends BaseElement{

  static getName(){
    return 'section';
  }
  static getTitle(){
    return 'Section';
  }
  static getType(){
    return 'section';
  }
  _registerControls(){
    this.startControlSection('content',{
      label: 'Section'
    });
    this.addControl('text',{
      type: CONTROLLER_NUMBER,
      label: 'Section',
    });
    this.endControlSection();

    this.startControlSection("section_style_background", {
      tab: TAB_STYLE,
      label: "background"
    });

    this.addControl("section_style_background_color", {
      type: CONTROLLER_COLOR,
      label: "background color",
      default: {
        color: "",
        colorPickedHex: "",
      },
      presetColors: ["#eaeaea", "#9c18a8"],
      rules: {
        "{{ELEMENT}} .altrp-section": "background-color: {{COLOR}};"
      }
    });

    this.endControlSection();

    this.startControlSection("section_style_border", {
      tab: TAB_STYLE,
      label: "Border"
    });

    this.addControl("section_style_border_type", {
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
        "{{ELEMENT}} .altrp-section": "border-style: {{VALUE}};"
      }
    });

    this.addControl("section_style_border_width", {
      type: CONTROLLER_DIMENSIONS,
      label: "Border Width",
      units: ["px", "%", "vh"],
      rules: {
        "{{ELEMENT}} .altrp-section":
          "border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};"
      }
    });

    this.addControl("section_style_border_color", {
      type: CONTROLLER_COLOR,
      label: "Border Color",
      default: {
        color: "rgb(50,168,82)",
        colorPickedHex: "#32a852"
      },
      rules: {
        "{{ELEMENT}} .altrp-section": "border-color: {{COLOR}};"
      }
    });

    this.addControl("section_style_border_radius", {
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
        "{{ELEMENT}} .altrp-section": "border-radius: {{SIZE}}{{UNIT}}"
      }
    });

    this.endControlSection();

    
  }

  appendColumn(newColumn) {
    if(!newColumn instanceof Column){
      throw 'Only Column can be a Child of Section';
    }
    this.appendChild(newColumn);
  }
}

export default Section