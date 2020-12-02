import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // console.log(errorInfo);
    // console.log(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1 style={{ textAlign: "center" }}>Ошибка отрисовки</h1>
          <h4>Измените настройки диаграммы и перезагрузите страницу</h4>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
