import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Counter } from "../target/types/counter";
import BN from "bn.js";
import * as web3 from "@solana/web3.js";

describe("counter", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.Counter as Program<Counter>;

  it("initialize", async () => {
    const initialValue = new BN(1);
      
    const counterAccount = anchor.web3.Keypair.generate();
      
    const txhashinit = await program.methods
      .initialize(initialValue)
      .accounts({
        myStorage: counterAccount.publicKey
      })
      .signers([counterAccount])
      .rpc();
    
    console.log(`Initialize finished`,txhashinit);
    
    await program.methods
      .increment()
      .accounts({
        myStorage: counterAccount.publicKey,
      })  
      .rpc();
    const accountincrementhash = await program.account.myStorage.fetch(counterAccount.publicKey);
    console.log(`Increment finished`,accountincrementhash.data.toString());
    
    await program.methods
      .decrement()
      .accounts({
        myStorage: counterAccount.publicKey
      })  
      .rpc();
    const decrementhash = await program.account.myStorage.fetch(counterAccount.publicKey);
      console.log(`decrement finished`,decrementhash.data.toString());
  });
});
