import React from 'react';
import { FatalError } from './Messages';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught in ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <FatalError text={`משהו השתבש ${this.state.errorMessage}`}/>
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
