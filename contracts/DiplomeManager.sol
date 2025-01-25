// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DiplomeManager {
    struct Diplome {
        string hash;
        string titre;
        string institution;
        string etudiant;
        uint256 dateDelivrance;
        address emetteur;
        bool verifie;
    }

    // Mapping du hash du diplôme vers ses informations
    mapping(string => Diplome) public diplomes;
    
    // Mapping des diplômes par étudiant
    mapping(string => string[]) public diplomesParEtudiant;
    
    // Mapping des institutions autorisées
    mapping(address => bool) public institutionsAutorisees;
    
    // Événements
    event DiplomeCreated(string hash, string titre, string etudiant, string institution);
    event DiplomeVerified(string hash, address verifier);
    
    modifier onlyInstitution() {
        require(institutionsAutorisees[msg.sender], "Réservé aux institutions autorisées");
        _;
    }
    
    constructor() {
        institutionsAutorisees[msg.sender] = true; // Le déployeur est la première institution
    }
    
    // Fonction pour créer un nouveau diplôme
    function creerDiplome(
        string memory _hash,
        string memory _titre,
        string memory _etudiant,
        string memory _institution
    ) public onlyInstitution {
        require(bytes(diplomes[_hash].hash).length == 0, "Ce diplôme existe déjà");
        
        Diplome memory newDiplome = Diplome({
            hash: _hash,
            titre: _titre,
            institution: _institution,
            etudiant: _etudiant,
            dateDelivrance: block.timestamp,
            emetteur: msg.sender,
            verifie: true // Auto-vérifié car créé par une institution autorisée
        });
        
        diplomes[_hash] = newDiplome;
        diplomesParEtudiant[_etudiant].push(_hash);
        
        emit DiplomeCreated(_hash, _titre, _etudiant, _institution);
    }
    
    // Fonction pour vérifier un diplôme
    function verifierDiplome(string memory _hash) public view returns (
        string memory titre,
        string memory institution,
        string memory etudiant,
        uint256 dateDelivrance,
        bool verifie
    ) {
        Diplome memory diplome = diplomes[_hash];
        require(bytes(diplome.hash).length > 0, "Diplôme non trouvé");
        
        return (
            diplome.titre,
            diplome.institution,
            diplome.etudiant,
            diplome.dateDelivrance,
            diplome.verifie
        );
    }
    
    // Fonction pour récupérer tous les diplômes d'un étudiant
    function getDiplomesEtudiant(string memory _etudiant) public view returns (string[] memory) {
        return diplomesParEtudiant[_etudiant];
    }
    
    // Fonction pour ajouter une institution
    function ajouterInstitution(address _institution) public onlyInstitution {
        institutionsAutorisees[_institution] = true;
    }
    
    // Fonction pour retirer une institution
    function retirerInstitution(address _institution) public onlyInstitution {
        require(_institution != msg.sender, "Impossible de se retirer soi-même");
        institutionsAutorisees[_institution] = false;
    }
    
    // Fonction pour vérifier si une adresse est une institution
    function estInstitution(address _address) public view returns (bool) {
        return institutionsAutorisees[_address];
    }
} 