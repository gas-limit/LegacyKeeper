import "./App.css";

import { useEffect, useState } from "react"

import { Dapp } from "./dapp.js";

export const Splashscreen = () => {
    const [dappOpened, setDappOpened] = useState(false);
    
    return(
        
        <div className = "font">
        
        { !dappOpened && <>
            <div className=  "header">
            <img className="logo" src="https://pixelartmaker-data-78746291193.nyc3.digitaloceanspaces.com/image/cdfe8bf57fec8a8.png"></img>
        <div onClick={() => setDappOpened(false)} className= "title">Legacy Keeper</div>
        <button onClick={() => setDappOpened(true)} className="openApp" >Open App</button>
        </div>
        
        <div className = "container">
            <div className="splash"> 
                <h1 className>Secure your legacy </h1>
                <h2>with effortless inheritance</h2>
                <img src="https://cdn.pixabay.com/photo/2020/08/12/15/21/family-5482934_1280.png"/>
            </div>
        </div>
        </>}

        { dappOpened && <Dapp />}

        
        </div>
    ) 
}