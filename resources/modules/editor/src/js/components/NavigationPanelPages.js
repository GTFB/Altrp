import Resource from "../classes/Resource";
import Scrollbars from "react-custom-scrollbars";
import {Component} from "react";
import {Tree} from "@blueprintjs/core";

class NavigationPanelPages extends Component {
  constructor(props) {
    super(props);

    this.state = {
      treePages: [],
      pages: []
    }
    this.resource = new Resource({route: "/admin/ajax/pages"});
  }

  async componentDidMount() {
    console.log('dawdawdawdwa')
    let pages = await this.resource.getAll()
    await this.setState(state => {
      return {
        ...state,
        pages
      }
    })
    this.setState(state => {
      return {
        ...state,
        treePages: pages.filter(item => item.parent_page_id === null).map(page => this.treePagesMap(page))
      }
    })
  }

  handleNodeExpand = (nodeData, nodePath) => {
    let currentTree = _.cloneDeep(this.state.treePages);
    let currentNode = Tree.nodeFromPath(nodePath, currentTree);
    currentNode.isExpanded = true;
    this.setState(s => ({...s, treePages: currentTree}));
  }

  handleNodeCollapse = (nodeData, nodePath) => {
    let currentTree = _.cloneDeep(this.state.treePages);
    let currentNode = Tree.nodeFromPath(nodePath, currentTree);
    currentNode.isExpanded = false;
    this.setState(s => ({...s, treePages: currentTree}));
  }

  treePagesMap = (page) => {

    let treePage = {}
    let childPage = []
    let hasCaret = false

    let objectPage = this.state.pages.filter(item => item.parent_page_id === page.id)
    if (objectPage[0]) {
      hasCaret = true
      childPage = objectPage.map(item => this.treePagesMap(item))
    }
    treePage = {
      id: page.id,
      key: page.id,
      isExpanded: true,
      label: (
        <a
          href={page.path}
          target="_blank">
          {page.title}
        </a>
      ),
      hasCaret: hasCaret,
      childNodes: childPage,
    }
    return treePage
  }

  render() {
    return (
      <Scrollbars  autoHide autoHideTimeout={500} autoHideDuration={200}>
        <div style={{ width: '100%', padding: '10px'}}>
          <Tree
            contents={this.state.treePages}
            onNodeCollapse={this.handleNodeCollapse}
            onNodeExpand={this.handleNodeExpand}
          />
        </div>
      </Scrollbars>
    );
  }
}

export default NavigationPanelPages;
