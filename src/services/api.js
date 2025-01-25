const API_URL = 'http://localhost:5000/api';

export const api = {
  async creerDiplome(diplomeData) {
    const response = await fetch(`${API_URL}/diplomes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(diplomeData)
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la création du diplôme');
    }
    
    return response.json();
  },

  async verifierDiplome(hash) {
    const response = await fetch(`${API_URL}/diplomes/${hash}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Diplôme non trouvé');
      }
      throw new Error('Erreur lors de la vérification du diplôme');
    }
    
    return response.json();
  },

  async getDiplomes() {
    const response = await fetch(`${API_URL}/diplomes`);
    
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des diplômes');
    }
    
    return response.json();
  }
}; 