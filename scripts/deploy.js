const hre = require("hardhat");

async function main() {
    // Récupérer le compte déployeur
    const [deployer] = await hre.ethers.getSigners();
    console.log("Déploiement avec le compte:", deployer.address);

    // Déployer le contrat
    const DocumentManager = await hre.ethers.getContractFactory("DocumentManager");
    console.log("Déploiement du contrat DocumentManager...");
    const documentManager = await DocumentManager.deploy();
    
    // Attente que le déploiement soit terminé
    await documentManager.deployed();
    
    console.log("DocumentManager déployé à l'adresse:", documentManager.address);

    // Ajouter quelques utilisateurs de test
    await documentManager.addUser(deployer.address, 3, "Admin"); // 3 = ADMIN
    
    // Vous pouvez ajouter d'autres utilisateurs de test ici
    const accounts = await hre.ethers.getSigners();
    await documentManager.addUser(accounts[1].address, 1, "Agent Bureau"); // 1 = OFFICE_AGENT
    await documentManager.addUser(accounts[2].address, 2, "Agent Verificateur"); // 2 = VERIFIER

    console.log("Utilisateurs de test ajoutés");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    }); 