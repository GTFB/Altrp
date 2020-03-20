import BaseElement from "./BaseElement";
import Column from "./Column";

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
      label: 'Section',
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