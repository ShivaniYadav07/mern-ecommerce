import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.logErrorToConsole(error, errorInfo);
  }

  logErrorToConsole(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error);
    console.error('Error Info:', errorInfo);
    // You can add additional logic here, such as sending the error to a server.
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
