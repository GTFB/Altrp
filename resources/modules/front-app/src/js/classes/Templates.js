class Templates {
  constructor(){
    console.log(this);
  }
}
Templates.instance  = new Templates();
export default Templates.instance