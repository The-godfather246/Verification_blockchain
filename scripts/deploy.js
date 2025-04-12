const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Déploiement avec le compte:", deployer.address);

    const DocumentManager = await hre.ethers.getContractFactory("DocumentManager");
    console.log("Instance du contrat récupérée");

    try {
        console.log("Déploiement du contrat DocumentManager...");
        const documentManager = await DocumentManager.deploy();
        console.log("Contrat envoyé, attente du déploiement...");

        await documentManager.waitForDeployment();
        const contractAddress = await documentManager.getAddress();
        console.log("DocumentManager déployé à l'adresse:", contractAddress);

        // Ajoutez uniquement le déployeur comme admin
        await documentManager.addUser(deployer.address, 3, "Admin");
        console.log("Admin ajouté:", deployer.address);

        // Si vous voulez ajouter d'autres utilisateurs, spécifiez leurs adresses directement
        // Par exemple:
        // const agentBureauAddress = "0x..."; // Remplacez par une adresse réelle
        // const agentVerificateurAddress = "0x..."; // Remplacez par une adresse réelle
        // await documentManager.addUser(agentBureauAddress, 1, "Agent Bureau");
        // await documentManager.addUser(agentVerificateurAddress, 2, "Agent Verificateur");

        console.log("Déploiement terminé avec succès");
    } catch (err) {
        console.error("Erreur pendant le déploiement:", err);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Erreur globale:", error);
        process.exit(1);
    });