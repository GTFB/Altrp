import * as React from "react";
import { Handle } from "react-flow-renderer";

export default class Customizer extends React.Component {
  constructor(props) {
    super(props);
    this.redirectTo = this.redirectTo.bind(this);
  }

  redirectTo(item) {
    if (!item) {
      alert('Куда перейти? Робот не указан!');
    }
    else {
      if (confirm('Перейти без сохранения?')) return window.location.href = `customizer-editor?customizer_id=${item}`;
    }
  }

  render() {
    let nodeClasses = "flow-node-customizer";
    if (this.props.selected) nodeClasses += " selected";

    return (
      <div className={nodeClasses} onDoubleClick={() => this.redirectTo(this.props?.data?.props?.nodeData?.id ?? false)}>
        <Handle type="target" position={this.props?.targetPosition ?? 'top'} />
        <div className="wrapper">
          <div></div>
          <div className="customizer-text">{this.props?.data?.label}</div>
          <div className="customizer-type">{this.props?.type}</div>
        </div>
        <Handle type="source" position={this.props?.sourcePosition ?? 'bottom'} style={{ borderRadius: 0 }} />
      </div>
    );
  }
}
