import React, { Component } from "react";

interface BarProps {
    first: string;
}

class BarDiagram extends Component {
    constructor(props: BarProps) {
        super(props);
    }

    render() {
        return <div>Bar</div>;
    }
}

export default BarDiagram;
