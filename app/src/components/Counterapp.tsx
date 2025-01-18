import React,{useEffect, useState} from 'react'
import { useWallet,useConnection,useAnchorWallet } from "@solana/wallet-adapter-react";
import { PhantomWalletName } from "@solana/wallet-adapter-wallets"
import { PublicKey, Keypair } from "@solana/web3.js";
import { Program, AnchorProvider, setProvider,BN  } from '@coral-xyz/anchor';
import idl from './idl.json'
import type { Counter } from './counter';


export default function Counterapp() {

  const { connected, select, publicKey } = useWallet()
  const { connection } = useConnection();
  const [value,setvalue] = useState("");
  const wallet = useAnchorWallet();

  
  const onConnect = () => {
    select(PhantomWalletName)
  }

  useEffect(() => {
    const gettokenvalue = async() => {
      if(wallet) {
        const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
        setProvider(provider);
        const program = new Program(idl as Counter, provider);
        try {
          const accountincrementhash = await program.account.myStorage.fetch("4MU2rZQpeJ7dZJh3YUZ3SXTWFPP8PnuBQBz3v4apfRxB");
          const valueinc = accountincrementhash.data;
          setvalue(valueinc.toString())
        } catch (error) {
            console.log("erro",error);
        }
      }
    }
    gettokenvalue()
  },[value])

  const counterinit = async() => {
    if(wallet) {
      const counterAccount = Keypair.generate();
      const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
      setProvider(provider);
      const program = new Program(idl as Counter, provider);
      // const counteraccount = new PublicKey(wallet.publicKey); 
      const initialize = await program.methods.initialize(new BN(1)).accounts({
        myStorage: counterAccount.publicKey,
        signer: wallet.publicKey
      })
      .signers([counterAccount])
      .rpc();
      console.log("Transaction successful: ", initialize);
    }
  }

  const counterinc = async() => {
    if(wallet) {
      const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
      setProvider(provider);
      const program = new Program(idl as Counter, provider);
      await program.methods.increment().accounts({
        myStorage: "4MU2rZQpeJ7dZJh3YUZ3SXTWFPP8PnuBQBz3v4apfRxB",
      })
      .rpc();
      const accountincrementhash = await program.account.myStorage.fetch("4MU2rZQpeJ7dZJh3YUZ3SXTWFPP8PnuBQBz3v4apfRxB");
      const valueinc = accountincrementhash.data;
      setvalue(valueinc.toString())
    }
  }

  const counterdec = async() => {
    if(wallet) {
      const provider = new AnchorProvider(connection, wallet, { commitment: "confirmed" });
      setProvider(provider);
      const program = new Program(idl as Counter, provider);
      await program.methods.decrement().accounts({
        myStorage: "4MU2rZQpeJ7dZJh3YUZ3SXTWFPP8PnuBQBz3v4apfRxB",
      })
      .rpc();
      const accountincrementhash = await program.account.myStorage.fetch("4MU2rZQpeJ7dZJh3YUZ3SXTWFPP8PnuBQBz3v4apfRxB");
      const valueinc = accountincrementhash.data;
      setvalue(valueinc.toString())
    }
  }

  
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">{
                  connected ? <>
                  <button className="btn btn-primary">{publicKey?.toBase58()}</button>
                  </> : <>
                    <button className="btn btn-primary" onClick={onConnect}>Connect Wallet</button>
                  </>
                }                
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className='container text-center'>
          <div className=''>
            <h4>Counter app</h4>
          </div>
          <div className='d-flex'>
            <div className='ms-lg-3'>
              <button className='btn btn-primary px-3' onClick={counterinit}>Counter</button>
            </div>
            <div className='ms-lg-3'>
              <button className='btn btn-primary' onClick={counterinc}>Increment</button>
            </div>
            <div className='ms-lg-3'>
              <button className='btn btn-secondary' onClick={counterdec}>Decrement</button>
            </div>
          </div>
          <div className='container'>
              <p>{value}</p>
          </div>
      </div>
    </>
  
  )
}