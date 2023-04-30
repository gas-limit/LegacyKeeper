import '@rainbow-me/rainbowkit/styles.css';

import {
  RainbowKitProvider,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { WagmiConfig, configureChains, createClient } from 'wagmi';
import { useEffect, useState } from "react"

import { ConnectButton } from '@rainbow-me/rainbowkit';
import abi from './abi';
import USDCabi from './USDCabi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { polygonMumbai } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { ethers } = require("ethers");



const { chains, provider } = configureChains(
    [polygonMumbai],
    [
      alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
      publicProvider()
    ]
  );
  
  const { connectors } = getDefaultWallets({
    appName: 'Hello Kitty App',
    projectId: 'YOUR_PROJECT_ID',
    chains
  });
  
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  })

export const Dapp = () => {
  
    const [manageClicked, setManageClicked] = useState(false);
    const [claimClicked, setClaimClicked] = useState(false);


    const mintTokens = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const USDCAddress = "0x99f8B7f4552Ce87d669175cFdb84Cc312beb26E5";
      const USDC = new ethers.Contract(USDCAddress, USDCabi, provider);
      const USDCWithSigner = USDC.connect(signer);
      await USDCWithSigner.mint();
    }


    
    const Manage = () => {
      const [beneficiaryName, setBeneficiaryName] = useState('');
      const [beneficiaryAddress, setBeneficiaryAddress] = useState('');
      const [beneficiaryAmount, setBeneficiaryAmount] = useState('');
    
      const handleBeneficiaryNameChange = (event) => {
        setBeneficiaryName(event.target.value);
      };
      const handleBeneficiaryAddressChange = (event) => {
        setBeneficiaryAddress(event.target.value);
      };
      const handleBeneficiaryAmountChange = (event) => {
        setBeneficiaryAmount(event.target.value);
      };

      const createWill = async (event) => {
      
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const USDCAddress = "0x99f8B7f4552Ce87d669175cFdb84Cc312beb26E5";
        const USDC = new ethers.Contract(USDCAddress, USDCabi, provider);
        const USDCWithSigner = USDC.connect(signer);
        await USDCWithSigner.approve("0x72660576949FFbe117b0d5dD57412D3064A24E62", ethers.constants.MaxUint256);
        const legacyKeeperAddress = "0x72660576949FFbe117b0d5dD57412D3064A24E62";
        const legacyKeeper = new ethers.Contract(legacyKeeperAddress, abi, provider);
        const legacyKeeperWithSigner = legacyKeeper.connect(signer);
        await legacyKeeperWithSigner.addBeneficiary(beneficiaryName, beneficiaryAddress, beneficiaryAmount,0);
      }



      return(
          <div className="center">
              <h1 className="inheritance">Manage Inheritance</h1>
              <br/>
             
          <label htmlFor="beneficiaryName">Beneficiary Name</label>
          <input
            type="text"
            id="beneficiaryName"
            placeholder='John Doe'
            name="beneficiaryName"
            value={beneficiaryName}
            onChange={handleBeneficiaryNameChange}
          />
          <br/>
          <br/>
          <label htmlFor="beneficiaryAddress">Beneficiary Address</label>
          <input
            type="text"
            id="beneficiaryAddress"
            placeholder='0x...'
            name="beneficiaryAddress"
            value={beneficiaryAddress}
            onChange={handleBeneficiaryAddressChange}
          />
          <br/>
          <br/>
          <label htmlFor="beneficiaryAmount">Beneficiary Amount</label>
          <input
            type="text"
            id="beneficiaryAmount"
            name="beneficiaryAmount"
            value={beneficiaryAmount}
            onChange={handleBeneficiaryAmountChange}
          />
          <br></br>
          <br/>
          <label htmlFor="time">Time to unlock</label>
          <input
            type="date"
            id="time"
            onChange={handleBeneficiaryAmountChange}
          />
          <br/>
          <br/>
        <button className="buttons" onClick={()=> createWill()}> Submit </button>
        
        <button className="buttons" onClick={()=> setManageClicked(false)}> Back </button>
          </div>
      )
    }


    
    
    const Claim = () => {
      const [inheritorAddress, setInheritorAddress] = useState('');
      const handleInheritorChange = (event) => {
        setInheritorAddress(event.target.value);
      };

      const claimInheritance = async (event) => {
      
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const legacyKeeperAddress = "0x240469aed62F11EDC58073940d0010882dbE360e";
        const legacyKeeper = new ethers.Contract(legacyKeeperAddress, abi, provider);
        const legacyKeeperWithSigner = legacyKeeper.connect(signer);
        await legacyKeeperWithSigner.claimInheritance(inheritorAddress);
      }
      
      return(
          <div className="center">
              <h1>Claim Inheritance</h1>
             
          <label htmlFor="inheritorAddress">Inheritor Address</label>
          <input
            type="text"
            id="inheritorAddress"
            name="inheritorAddress"
            placeholder="0x..."
            value={inheritorAddress}
            onChange={handleInheritorChange}
          />
          <br/>
          <br/>
          <button className="buttons" onClick={()=> claimInheritance()}> Claim </button>
         
              <button className="buttons" onClick={()=> setClaimClicked(false)}> Back </button>
          </div>
      )
    }    


    
    return(
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
      <>
    <div className=  "header">
            <a href="/">
            <img className="logo" src="https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/cdfe8bf57fec8a8.png"></img>
            </a>
        <div className= "title">Legacy Keeper</div>
          <div className="connectWallet">
          <ConnectButton>Connect</ConnectButton>
          </div>
        </div>
        
        { !manageClicked && !claimClicked && <>
        <div className="center">
          <h2> Mint yourself some test US Dollars $</h2>
        <button className="buttons" onClick={() => mintTokens()}>Mint $100,000 test tokens</button>
        <h1 className="testing"> </h1>
        <button className="buttons" onClick={()=> setManageClicked(true)}> Manage Inheritance </button>
        <button className="buttons" onClick={()=> setClaimClicked(true)}> Claim Inheritance </button>
        </div>
        </> 
        }

        { manageClicked && <Manage />}
        { claimClicked && <Claim />}
        </> 
         
         </RainbowKitProvider>
    </WagmiConfig> )
         
} 