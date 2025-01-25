import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

function AdminDashboard({ contract }) {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        address: '',
        role: '1', // OFFICE_AGENT par défaut
        name: ''
    });

    const roles = {
        1: 'Agent de bureau',
        2: 'Agent vérificateur',
        3: 'Administrateur'
    };

    const addUser = async (e) => {
        e.preventDefault();
        try {
            const tx = await contract.addUser(
                newUser.address,
                parseInt(newUser.role),
                newUser.name
            );
            await tx.wait();
            alert('Utilisateur ajouté avec succès!');
        } catch (error) {
            console.error('Erreur:', error);
            alert('Erreur lors de l\'ajout de l\'utilisateur');
        }
    };

    return (
        <div className="admin-dashboard">
            <h2>Tableau de bord administrateur</h2>
            
            <div className="add-user-form">
                <h3>Ajouter un utilisateur</h3>
                <form onSubmit={addUser}>
                    <div>
                        <label>Adresse Ethereum:</label>
                        <input 
                            type="text"
                            value={newUser.address}
                            onChange={(e) => setNewUser({...newUser, address: e.target.value})}
                        />
                    </div>
                    <div>
                        <label>Rôle:</label>
                        <select 
                            value={newUser.role}
                            onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                        >
                            {Object.entries(roles).map(([value, label]) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Nom:</label>
                        <input 
                            type="text"
                            value={newUser.name}
                            onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                        />
                    </div>
                    <button type="submit">Ajouter l'utilisateur</button>
                </form>
            </div>
        </div>
    );
}

export default AdminDashboard; 