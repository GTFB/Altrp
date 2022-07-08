
/*import React, { useEffect, useState, useRef, useCallback } from "react"
import styled from 'styled-components'
import { useTable, useRowSelect } from 'react-table'

//import makeData from './makeData'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`



const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    )
  }
)

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
  )

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {rows.slice(0, 10).map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
        </tbody>
      </table>
      <p>Selected Rows: {Object.keys(selectedRowIds).length}</p>
      <pre>
        <code>
          {JSON.stringify(
            {
              selectedRowIds: selectedRowIds,
              'selectedFlatRows[].original': selectedFlatRows.map(
                d => d.original
              ),
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  )
}

function App() {

  const {exportData, setExportData} = useState([
    {name: 'Pages', value: 'exportPages', uri: '/admin/ajax/pages'},
    //{name: 'Page Roles', value: 'exportPageRoles'},
    //{name: 'Page DataSources', value: 'exportPageDatasources'},
    //{name: 'Page Templates', value:'exportPageTemplates'},
    //{name: 'Templates', value: 'exportTemplates', uri: '/admin/ajax/templates', field: 'templates'},
    //{name: 'Template Settings', value: 'exportTemplateSettings'},

    //{name: 'Media', value: 'exportMedia', uri: '/admin/ajax/media'},
    //{name: 'Settings', value: 'exportSettings', uri: '/admin/ajax/settings'},
    //{name: 'Diagrams', value: 'exportDiagrams', uri: '/admin/ajax/diagrams'},
    //{name: 'Dashboards', value: 'exportDashboards', uri: '/admin/ajax/dashboards'},
    //{name: 'Reports', value: 'exportReports', uri: '/admin/ajax/reports'},
    //{name: 'Tables', value: 'exportTables', uri: '/admin/ajax/tables'},
    //{name: 'Models', value: 'exportModels', uri: '/admin/ajax/models', field: 'models'},
    //{name: 'Columns', value: 'exportColumns', uri: '/admin/ajax/columns'},
    //{name: 'Accessors', value: 'exportAccessors', uri: '/admin/ajax/accessors'},
    //{name: 'SQL Editors', value: 'exportSQLEditors', uri: '/admin/ajax/sql_editors', field: 'sql_editors'},
    //{name: 'Relationships', value: 'exportRelationships', uri: '/admin/ajax/relationships'},
    //{name: 'Queries', value: 'exportQueries', uri: '/admin/ajax/queries'},
    //{name: 'Roles', value: 'exportRoles', uri: '/admin/ajax/roles'},
    //{name: 'Permission Roles', value: 'exportPermissionRoles', uri: '/admin/ajax/permissionroles'},
    //{name: 'Remote Data', value: 'exportRemoteData', uri: '/admin/ajax/remotedata'},
    //{name: 'Remote DataSources', value: 'exportRemoteDataSources', uri: '/admin/ajax/remotedatasources'},
    //{name: 'Remote DataSources Roles', value: 'exportDataSourcesRoles'},
    //{name: 'Remote DataSources Permissions', value: 'exportDataSourcesPremissions'},
    //{name: 'Validation Fields', value: 'exportValidationFields', uri: '/admin/ajax/validationfields'},
    //{name: 'Validation Rules', value: 'exportValidationRules', uri: '/admin/ajax/validationrules'},
  ]);

  async function getData(){
    let resource = [];
    let elements = [];
    let open = {};
    for (let item of this.items) {
      if (item.uri) {
        open[item.value] = false;
        elements[item.value] = [];
        resource[item.value] = new Resource({route: item.uri});
        elements[item.value]['name'] = '';
        elements[item.value]['name'] = item.name;
        elements[item.value]['items'] = [];
        elements[item.value]['items'] = await resource[item.value].getAll();
        if (item.value == 'exportMedia') {
          for(let j in elements[item.value]['items']) {
            elements[item.value]['items'][j].title = elements[item.value]['items'][j].filename;
          }
        }
        if (item.field) {
          elements[item.value]['items'] = elements[item.value]['items'][item.field];
        }
      }
    }
    console.log(elements);
    setExportData(elements);


  }

  useEffect(() => {
    getData();
  },[exportData]);


  const columns = React.useMemo(
    () => [
      {
        //Header: 'Info',
        columns: [
          {
            Header: 'Name',
            accessor: 'title',
          },
        ],
      }
    ],
    []
  )

  const data = React.useMemo(() => exportData, [])

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  )
}

export default App



*/
import React, { Component } from "react";
import Resource from "../../../../editor/src/js/classes/Resource";


class Export extends Component {
  constructor(props) {
    super(props);
    this.open = {};
    this.listPages = [];
    //this.props = {};
    this.items = [
      {name: 'Pages', value: 'exportPages', uri: '/admin/ajax/pages'},
      //{name: 'Page Roles', value: 'exportPageRoles'},
      //{name: 'Page DataSources', value: 'exportPageDatasources'},
      //{name: 'Page Templates', value:'exportPageTemplates'},
      {name: 'Templates', value: 'exportTemplates', uri: '/admin/ajax/templates', field: 'templates'},
      //{name: 'Template Settings', value: 'exportTemplateSettings'},

      {name: 'Media', value: 'exportMedia', uri: '/admin/ajax/media'},
      {name: 'Settings', value: 'exportSettings', uri: false},
      //{name: 'Diagrams', value: 'exportDiagrams', uri: '/admin/ajax/diagrams'},
      //{name: 'Dashboards', value: 'exportDashboards', uri: '/admin/ajax/dashboards'},
      //{name: 'Reports', value: 'exportReports', uri: '/admin/ajax/reports'},
      {name: 'Tables', value: 'exportTables', uri: '/admin/ajax/tables'},
      {name: 'Models', value: 'exportModels', uri: '/admin/ajax/models', field: 'models'},
      //{name: 'Columns', value: 'exportColumns', uri: '/admin/ajax/columns'},
      //{name: 'Accessors', value: 'exportAccessors', uri: '/admin/ajax/accessors'},
      {name: 'SQL Editors', value: 'exportSQLEditors', uri: '/admin/ajax/sql_editors', field: 'sql_editors'},
      //{name: 'Relationships', value: 'exportRelationships', uri: '/admin/ajax/relationships'},
      //{name: 'Queries', value: 'exportQueries', uri: '/admin/ajax/queries'},
      //{name: 'Roles', value: 'exportRoles', uri: '/admin/ajax/roles'},
      //{name: 'Permission Roles', value: 'exportPermissionRoles', uri: '/admin/ajax/permissionroles'},
      //{name: 'Remote Data', value: 'exportRemoteData', uri: '/admin/ajax/remotedata'},
      //{name: 'Remote DataSources', value: 'exportRemoteDataSources', uri: '/admin/ajax/ajax/data_sources'},
      //{name: 'Remote DataSources Roles', value: 'exportDataSourcesRoles'},
      //{name: 'Remote DataSources Permissions', value: 'exportDataSourcesPremissions'},
      //{name: 'Validation Fields', value: 'exportValidationFields', uri: '/admin/ajax/validationfields'},
      //{name: 'Validation Rules', value: 'exportValidationRules', uri: '/admin/ajax/validationrules'},
      {name: 'Customizers', value: 'exportCustomizers', uri: '/admin/ajax/customizers', field: 'data'},
    ];

    this.state = {
      elements: [],
      open: {},
      props: {},
      value: {},
    };
    this.resourceOut = new Resource({route: '/admin/ajax/downloads/filtered_settings'});
    //this.toggleMainItem = this.toggleMainItem.bind(this);
    this.submitData = this.submitData.bind(this);
  }

  toggleLine = (name)=>{
    const open = {...this.state.open};
    open[name] = ! open[name];
    this.setState(state => ({...state, open}));
  }

  async componentDidMount(){
    let resource = [];
    let elements = [];
    let open = {};
    for (let item of this.items) {
      let element = {};
      if (item.uri) {
        open[item.value] = false;
        // elements[item.value] = [];
        if (item.uri)
          resource[item.value] = new Resource({route: item.uri});
        else
          resource[item.value] = [];
            // elements[item.value]['name'] = '';
        // elements[item.value]['name'] = item.name;
        // elements[item.value]['items'] = [];
        // elements[item.value]['items'] = await resource[item.value].getAll();
        element = {
          value: item.value,
          name: item.name || '',
        };
        try{
          element.items = await resource[item.value].getAll();
          if (item.field && element.items[item.field]){
            element.items = element.items[item.field]
          }
        } catch (e) {
          element.items = [];
        }
        if (item.value === 'exportMedia') {
          element.items = element.items.map(i => {
            return {...i, title: i.filename}
          })
        }

        // if (item.value == 'exportMedia') {
        //   for(let j in elements[item.value]['items']) {
        //     elements[item.value]['items'][j].title = elements[item.value]['items'][j].filename;
        //   }
        // }
        // if (item.field) {
        //   elements[item.value]['items'] = elements[item.value]['items'][item.field];
        // }
      } else {
        element = {
          value: item.value,
          name: item.name || '',
        };
        element.items = [];
        if (item.value == 'exportSettings') {
          element.items = [{id: 'admin_logo', title: 'admin_logo'}, {id: 'container_width', title: 'container_width'}];
        }
      }
      elements.push(element);
    }


    let newValue = {};
    elements.forEach(el=>{
      newValue[el.value] = el.items.map(i=>i.id)
    })
    this.setState(state => ({
      ...state,
      elements,
      open,
      value: newValue,
    }));
  }
/*
  toggleMainItem = param => e => {
    let open = {};
    this.open[param] = !this.open[param];
    open[param] = this.open[param];
    this.setState(state => ({
      ...state,
      open
    }));

  }
*/
  changeMainItem(id, line) {
    let newValue = {...this.state.value};
    const props = {...this.state.props};
    props[line] = ! props[line];
    if (props[line]) {
      newValue[line] = [];
    } else {
      newValue[line] = newValue[line];
    }
    this.setState(state =>({...state, props, value: newValue}));
    /*
    if (newValue.length == 0) {
      for(let item of newValue) {

      }
    }

     */
  }

  changeItem(id, line) {
    console.log(id, line);
    let newValue = {...this.state.value};
    if(newValue[line].indexOf(id) === -1){
      newValue[line].push(id);
    } else {
      newValue[line] = newValue[line].filter(item => item !== id);
    }
    console.log(newValue);
    this.setState(state =>({...state, value: newValue}));
  }

  async submitData() {
    //const data = '?exportPages=' + JSON.stringify([1, 2]) + '&exportTemplates=' + JSON.stringify([13, 15]);
    const data = this.state.value;
    let url = '/admin/ajax/downloads/filtered_settings';
    //let res = await this.resourceOut.post(data);

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        //'Content-Type': 'application/zip',
        'X-CSRF-TOKEN': _token
      },
      body: JSON.stringify(data)
    }).then(resp => resp.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        // the filename you want
        a.download = 'altrp.zip';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        alert('Export File Downloaded!'); // or you know, something with better UX...
      })
      .catch((e) => alert('Error! '+ e.message));

  }



  render() {

    const { elements, open } =  this.state;

    const Style = {
      dt: {
        width: '100%',
      },
      dd: {
        width: '100%',
        borderBottom: '1px solid #cccccc',
      }
    };

    let temp = [];
    let i = 0;
    for(let key in elements) {
      //this.props[key] = true;
      const template = <React.Fragment key={i}>
        <dl >
          <dt className="dt_font" style={Style.dt}>
            <input
              type="checkbox"
              className="form-check-input mr-1 ml-0 mt-0 position-static"
              id={key}
              onChange={e=>this.changeMainItem(key, elements[key].value)}
              checked={this.state.value[elements[key].value]?.length === elements[key]?.items?.length}
            />
            <a onClick={()=>{ this.toggleLine(elements[key].name)}}>{elements[key].name}</a>
          </dt>
          {this.state.open[elements[key].name] && elements[key]?.items?.map((item, index) =>
            <dd style={Style.dd}
              className={(open[key] === false) ? "d-none" : null}
              key={index}>
              <input
                type="checkbox"
                className="form-check-input mr-1 ml-0 mt-0 position-static"
                onChange={e=>this.changeItem(item.id, elements[key].value)}
                checked={this.state.value[elements[key].value] && this.state.value[elements[key].value].indexOf(item.id) !== -1}/>{item.title}

            </dd>
          )}
        </dl>
      </React.Fragment>
      temp.push(template);
      i++;
    }

    return <div className="admin-updates p-4">
      <div className="admin-export-caption mt-1">
        Export All App Settings in Archive
      </div>
      <div className="mt-1 admin-export-middle">
        {temp}
      </div>
      <div className="export-block">
        <button className="btn_success btn" onClick={this.submitData}>Download Filtered ZIP Archive (JSON)</button>
      </div>
      <div className="export-block">
        <a className="btn_success btn"
           href="/admin/ajax/downloads/settings"
        >Download ZIP Archive (JSON)</a>
      </div>
      <div className="export-block">
        <a className="btn_success btn "
           href="/admin/ajax/downloads/stream_settings"

        >Download ZIP Archive (JSON Stream)</a>
      </div>
    </div>
  }
}

export default Export

