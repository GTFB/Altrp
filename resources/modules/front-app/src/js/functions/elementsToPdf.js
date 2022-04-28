
/**
 * Функция конвертирует HTML в PDF
 * @params {HTMLElement[]} element
 * @params {string} filename
 */
export default async function elementsToPdf(elements, filename = "", withBreaks = false, padding = '')
{
  let html2pdf = (await import(/* webpackChunkName: 'html2pdf' */"html2pdf.js")).default;
  elements = elements.body ? elements.body : elements;

  if (!elements) {
    return {
      success: true
    };
  }
  if(padding){
    if(! Number.isNaN(Number(padding))){
      padding += 'px'
    }
  }
  let myWindow = window.open("", "my div", "height=400,width=1440");
  myWindow.document.write(`<html><head><title></title></head>`);
  if(padding){
    myWindow.document.write(`</head><body style="padding:${padding};" >`);
  } else {
    myWindow.document.write(`</head><body>`);
  }
  elements = _.isArray(elements) ? elements : [elements];
  elements.forEach((element, idx) => {
    myWindow.document.write(element.outerHTML);
    if(idx < elements.length - 1 && withBreaks) {
      if(padding){
        myWindow.document.write(`<div style="padding-bottom:${padding};"></div>`)
        myWindow.document.write(`<div class="html2pdf__page-break"></div>`)
        myWindow.document.write(`<div style="padding-top:${padding};"></div>`)
      } else {
        myWindow.document.write('<div class="html2pdf__page-break"></div>')
      }
    }
  });
  myWindow.document.write("</body></html>");
  return new Promise((resolve, reject) => {
    html2pdf()
      .from(myWindow.document.body)
      .save(filename);
    myWindow.close();
    resolve({ success: true });
  });
}
