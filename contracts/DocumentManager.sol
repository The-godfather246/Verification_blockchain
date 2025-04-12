// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentManager {
    struct Document {
        string hash;
        address creator;
        uint256 timestamp;
        string qrCode;
        bool isValid;
    }
    
    mapping(string => Document) public documents;
    mapping(address => bool) public administrators;
    
    enum UserRole { NONE, OFFICE_AGENT, VERIFIER, ADMIN }
    
    struct User {
        address userAddress;
        UserRole role;
        bool isActive;
        string name;
    }
    
    mapping(address => User) public users;
    
    event UserAdded(address indexed userAddress, UserRole role);
    event UserRoleUpdated(address indexed userAddress, UserRole role);
    event DocumentCreated(string indexed hash, address creator);
    event DocumentStatusChanged(string indexed hash, bool isValid);
    
    constructor() {
        administrators[msg.sender] = true;
    }
    
    modifier onlyAdmin() {
        require(administrators[msg.sender], "Only admin can perform this action");
        _;
    }
    
    // Ajouter un nouveau document
    function createDocument(string memory _hash, string memory _qrCode) public {
        require(documents[_hash].timestamp == 0, "Document already exists");
        
        documents[_hash] = Document({
            hash: _hash,
            creator: msg.sender,
            timestamp: block.timestamp,
            qrCode: _qrCode,
            isValid: true
        });
        
        emit DocumentCreated(_hash, msg.sender);
    }
    
    // Vérifier si un document est valide
    function verifyDocument(string memory _hash) public view returns (bool) {
        return documents[_hash].isValid;
    }
    
    // Ajouter un utilisateur
    function addUser(address _userAddress, UserRole _role, string memory _name) public onlyAdmin {
        require(_userAddress != address(0), "Invalid address");
        require(_role != UserRole.NONE, "Invalid role");
        require(users[_userAddress].userAddress == address(0), "User already exists"); // Vérifie que l'utilisateur n'existe pas déjà
        
        users[_userAddress] = User({
            userAddress: _userAddress,
            role: _role,
            isActive: true,
            name: _name
        });
        
        emit UserAdded(_userAddress, _role);
    }

    // Mettre à jour le rôle d'un utilisateur
    function updateUserRole(address _userAddress, UserRole _newRole) public onlyAdmin {
        require(users[_userAddress].userAddress != address(0), "User does not exist");
        require(_newRole != UserRole.NONE, "Invalid role");
        
        users[_userAddress].role = _newRole;
        emit UserRoleUpdated(_userAddress, _newRole);
    }
    
    // Invalider un document
    function invalidateDocument(string memory _hash) public onlyAdmin {
        require(documents[_hash].timestamp != 0, "Document does not exist");
        documents[_hash].isValid = false;
        emit DocumentStatusChanged(_hash, false);
    }
    
    // Ajouter un nouvel administrateur
    function addAdministrator(address _adminAddress) public onlyAdmin {
        require(_adminAddress != address(0), "Invalid address");
        administrators[_adminAddress] = true;
    }
    
    // Vérifier si un utilisateur a un rôle spécifique
    modifier hasRole(UserRole _role) {
        require(users[msg.sender].role == _role, "Unauthorized role");
        require(users[msg.sender].isActive, "User is not active");
        _;
    }
}
