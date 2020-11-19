import React, { Component } from "react";

class ErrorBoundaty extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Ошибка отрисовки</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundaty;
