import delay from "./delay";

/**
 * Функция выводит определенный элемент на печать
 * @params {HTMLElement[]} elements
 * @params {null || HTMLElement} stylesTag
 */
export default function printElements(elements, title = "") {
  let myWindow = window.open("", "my div", "height=400,width=1200");
  myWindow.document.write(`<html><head><title>${title}</title></head>`);
  myWindow.document.write("<body >");
  elements = _.isArray(elements) ? elements : [elements];
  let headContent = '';
  myWindow.document.write("</body></html>");
  let bodyContent = '';
  elements.forEach(element => {
    if(element instanceof HTMLHeadElement){
      headContent = element.innerHTML;
      return
    }
    bodyContent += element.outerHTML;
  });
  myWindow.document.close(); // necessary for IE >= 10
  myWindow.document.head.innerHTML = headContent;
  bodyContent = bodyContent
    .replace(/<tr/g, '<div className="altrp-table-tr"')
    .replace(/<th/g, '<div')
    .replace(/<\/tr>/g, '</div>')
    .replace(/<\/th>/g, '</div>')
  myWindow.document.body.innerHTML = bodyContent;
  myWindow.focus(); // necessary for IE >= 10
  delay(250).then(()=>{
    myWindow.print();
    myWindow.close();
  })
  return true;
}
