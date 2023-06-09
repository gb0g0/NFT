const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config")
const BASE_FEE = ethers.utils.parseEther("0.25");
const GAS_PRICE_LINK = 1e9; // 1000000000

module.exports = async function({getNamedAccounts, deployments}){
    const {deploy, log} = deployments;
    const { deployer } =  await getNamedAccounts()

    const args = [BASE_FEE, GAS_PRICE_LINK]
    if(developmentChains.includes(network.name)){
        log("Local Network detected deploying mocks")
        const mocks = await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: args,
        })
        log("Mocks deployed🤗🤗........");
        log(`Mocks deployed at ${mocks.address}`);
        log("----------------------------------------------");
    }
}

module.exports.tags = ["all", "mocks"]