import React, {Component} from "react";
import Resource from "../../../editor/src/js/classes/Resource";
import AdminTable from "./AdminTable";
import store from "../js/store/store";
import {setModalSettings, toggleModal} from "../js/store/modal-settings/actions";
import { generateId, redirect, objectDeepCleaning } from "../js/helpers";
import Pagination from "./Pagination";


export default class Templates extends Component{
  constructor(props){
    super(props);
    this.state = {
      templates: [],
      allTemplates: [],
      templateAreas: [],
      activeTemplateArea: {},
      pageCount: 1,
      currentPage: 1,
    };
    this.resource = new Resource({
      route: '/admin/ajax/templates'
    });
    this.templateTypesResource = new Resource({
      route: '/admin/ajax/areas'
    });
    this.onClick = this.onClick.bind(this);
    this.changePage = this.changePage.bind(this);
    this.changeActiveArea = this.changeActiveArea.bind(this);
    this.generateTemplateJSON = this.generateTemplateJSON.bind(this);
  }
  changeActiveArea(e){
    let areaId = parseInt(e.target.dataset.area);
    let activeTemplateArea = {};
    this.state.templateAreas.forEach(area=>{
      if(area.id === areaId){
        activeTemplateArea = area;
      }
    });
    this.setActiveArea(activeTemplateArea)
  }

  /**
   * Смена текущей страницы
   */
  changePage(currentPage){
    this.updateTemplates(currentPage, this.state.activeTemplateArea);
    this.setState(state => ({ ...state, currentPage}));
  }

  /**
   * Сменить текущую область шаблона (вкладка)
   * @param activeTemplateArea
   */
  setActiveArea(activeTemplateArea){
    this.updateTemplates(1, activeTemplateArea);
    this.setState(state=>{
      return{...state, activeTemplateArea};
    })
  }

  /**
   * Метод для обновления списка шаблонов
   * @param currentPage
   * @param activeTemplateArea
   */
  updateTemplates(currentPage, activeTemplateArea){
    this.resource.getQueried({
      area: activeTemplateArea.name,
      page: currentPage,
      pageSize: 10,
    }).then(res=>{
      this.setState(state=> {
        return {
          ...state,
          pageCount: res.pageCount,
          templates: res.templates
        }
      });
    });
  }
  /** @function generateTemplateJSON
  * Генерируем контент файла template в формате JSON
  * @param {object} template Данные, получаемые с сервера
  * @return {string} Строка в формате JSON
  */
  generateTemplateJSON(template) {
    const data = objectDeepCleaning(JSON.parse(template.data));
    return JSON.stringify({
      area: this.state.activeTemplateArea.name,
      data,
      title: template.title,
      name: template.name,
    });
  }
  /** @function downloadJSONFile
  * Скачиваем файл
  * @param {object} template Данные, получаемые с сервера
  */
  downloadJSONFile(template) {
    const element = document.createElement("a");
    const file = new Blob([this.generateTemplateJSON(template)], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${template.name}.json`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  /**
   * Компонент загрузился
   */
  async componentDidMount(){
    let templateAreas = await this.templateTypesResource.getAll();
    this.setActiveArea(templateAreas[0]);
    this.setState(state=>{
      return{...state,templateAreas}
    });
    this.updateTemplates(this.state.currentPage, this.state.activeTemplateArea)
  }

  /**
   * Показываем/скрываем форму импорта
   */
  toggleImportForm = ()=>{
    this.setState(state=>({...state,showImportForm: ! this.state.showImportForm}))
  };
  /**
   * Импортируем шаблон из файла
   */
  importTemplate = (e)=>{
    e.preventDefault();
    let files = _.get(e, 'target.files.files', []);
    let uploadedFilesCount = 0;
    if(files.length){
      _.forEach(files, f =>{
        let fr = new FileReader();
        fr.onload = async (e) =>{
          let importedTemplateData = _.get(e, 'target.result', '{}');
          importedTemplateData = JSON.parse(importedTemplateData);
          console.log(importedTemplateData);
          let areaExists = false;
          this.state.templateAreas.forEach(ta=>{
            if(ta.name === importedTemplateData.area){
              importedTemplateData.area = ta.id;
              areaExists = true;
            }
          });
          if(! areaExists){
            importedTemplateData.area = _.filter(this.state.templateAreas,ta=>{
              return ta.name === 'content';
            });
          }
          // let res = await this.templateImportModule.importTemplate(importedTemplateData)
          console.log(this.resource);
          console.log(importedTemplateData);
          let res = this.resource.post(importedTemplateData);
          console.log(res);
        };

        fr.readAsText(f);
      })
    }
  };

  onClick(){
    let modalSettings = {
      title: 'Add New Template',
      submitButton: 'Add',
      submit: function(formData){
        let data = {
          name: formData.title,
          title: formData.title,
          area: formData.area,
          data:{
            children: [],
            id: generateId(),
            name: "root-element",
            settings: {},
            type: "root-element",
          }
        };
        return (new Resource({route:'/admin/ajax/templates'})).post(data)
      },
      fields: [
        {
          name: 'title',
          label: 'Template Name',
          required: true,
        },
        {
          name: 'area',
          label: 'Area Name',
          required: true,
          type: 'select',
          options: this.getAreasOptions(),
          defaultValue: this.state.activeTemplateArea.id
        }
      ],
      success: function(res){
        if(res.redirect && res.url){
          redirect(res.url)
        }
      },
      active: true,
    };
    store.dispatch(setModalSettings(modalSettings));
  }
  getAreasOptions(){
    return this.state.templateAreas;
  }
  setTemplates(templates){
    let allTemplates = templates;
    templates = templates.filter(template=>{
      return template.area === this.state.activeTemplateArea.name;
    });
    this.setState(state=>{
      return{...state, templates, allTemplates};
    });
  }

  render(){
    return <div className="admin-templates admin-page">
      <div className="admin-heading">
        <div className="admin-breadcrumbs">
          <a className="admin-breadcrumbs__link" href="#">Templates</a>
          <span className="admin-breadcrumbs__separator">/</span>
          <span className="admin-breadcrumbs__current">All Templates</span>
        </div>
        <button onClick={this.onClick} className="btn">Add New</button>
        <button onClick={this.toggleImportForm} className="btn ml-3">Import Template</button>
        <div className="admin-filters">
          <span className="admin-filters__current">All ({this.state.allTemplates.length || ''})</span>
        </div>
      </div>
      <div className="admin-content">
        {this.state.showImportForm &&<form className={"admin-form justify-content-center" + (this.state.showImportForm ? ' d-flex' : ' d-none')}
              onSubmit={this.importTemplate}>
          <input type="file"
                 name="files"
                 multiple={true}
                 required={true}
                 accept="application/json"
                 className="form__input"/>
          <button  className="btn">Import</button>
        </form>}
        <ul className="nav nav-pills admin-pills">
          {this.state.templateAreas.map(area=>{
            let tabClasses = ['nav-link',];
            if(this.state.activeTemplateArea.name === area.name){
              tabClasses.push('active');
            }
            return<li className="nav-item" key={area.id}>
              <button className={tabClasses.join(' ')}
                      onClick={this.changeActiveArea}
                      data-area={area.id}>{area.title}</button>
            </li>
          })}
        </ul>
        <AdminTable columns={[
          {
            name: 'title',
            title: 'Title',
            url: true,
            target: '_blank',
          },
          {
            name: 'author',
            title: 'Author',
          },
          ]}
          rows={this.state.templates}
          quickActions={[{ tag: 'a', props: {
            href: '/admin/editor?template_id=:id',
            target: '_blank',
            // className: ''
            },
            title: 'Edit'
          }, {
            tag: 'button',
            route: '/admin/ajax/templates/:id/reviews',
            method: 'delete',
            // className: ''
            title: 'Clear History'
          }, {
            tag: 'button',
            route: '/admin/ajax/templates',
            method: 'get',
            after: response => this.downloadJSONFile(response),
            title: 'Export'
          }, {
            tag: 'button',
            route: '/admin/ajax/templates/:id',
            method: 'delete',
            confirm: 'Are You Sure?',
            after: () => this.updateTemplates(this.state.currentPage, this.state.activeTemplateArea),
            className: 'quick-action-menu__item_danger',
            title: 'Trash'
          }]}
        />
        <Pagination pageCount={this.state.pageCount || 1}
                    currentPage={this.state.currentPage}
                    changePage={this.changePage}
                    itemsCount={this.state.templates.length }
        />
      </div>
    </div>;
  }

}
