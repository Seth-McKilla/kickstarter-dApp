import dotenv from "dotenv";
dotenv.config();
import web3 from "./web3";
import compiledFactory from "../ethereum/build/CampaignFactory.json";

export default new web3.eth.Contract(
  compiledFactory.abi,
  process.env.CONTRACT_ADDRESS
);
