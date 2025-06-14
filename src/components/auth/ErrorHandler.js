import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log l'erreur pour debugging
    console.error('Erreur capturée par ErrorBoundary:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-container">
            <h2>🚨 Une erreur s'est produite</h2>
            <details className="error-details">
              <summary>Détails de l'erreur</summary>
              <pre>{this.state.error && this.state.error.toString()}</pre>
              <pre>{this.state.errorInfo.componentStack}</pre>
            </details>
            <button 
              onClick={() => window.location.reload()}
              className="retry-button"
            >
              🔄 Recharger la page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook pour les erreurs async
export const useErrorHandler = () => {
  const handleError = (error, context = '') => {
    console.error(`Erreur ${context}:`, error);
    
    // Notification utilisateur
    if (error.code === 4001) {
      alert('Transaction rejetée par l\'utilisateur');
    } else if (error.code === -32603) {
      alert('Erreur de connexion au réseau Ethereum');
    } else if (error.message?.includes('insufficient funds')) {
      alert('Fonds insuffisants pour cette transaction');
    } else {
      alert(`Erreur: ${error.message || 'Erreur inconnue'}`);
    }
  };

  return { handleError };
};

export default ErrorBoundary;
