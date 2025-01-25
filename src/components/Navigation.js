import React from 'react';
import { Link } from 'react-router-dom';

function Navigation({ userRole, account }) {
    return (
        <nav className="main-nav">
            <div className="nav-brand">
                <Link to="/">BlockDoc</Link>
            </div>
            
            <div className="nav-links">
                {userRole === 'OFFICE_AGENT' && (
                    <Link to="/create">Créer un document</Link>
                )}
                
                {userRole === 'VERIFIER' && (
                    <Link to="/verify">Vérifier un document</Link>
                )}
                
                {userRole === 'ADMIN' && (
                    <>
                        <Link to="/admin">Administration</Link>
                        <Link to="/documents">Gestion Documents</Link>
                    </>
                )}
            </div>
            
            <div className="nav-account">
                {account ? (
                    <span>Connecté: {account.slice(0, 6)}...{account.slice(-4)}</span>
                ) : (
                    <button className="connect-btn">Connecter Wallet</button>
                )}
            </div>
        </nav>
    );
}

export default Navigation; 