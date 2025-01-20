import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { CounterProgram } from "../target/types/counter_program";
import * as web3 from "@solana/web3.js";

describe("counter", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.CounterProgram as Program<CounterProgram>;
  
  it("initialize", async () => {
    const payer = program.provider.publicKey
    const [owner] =  web3.PublicKey.findProgramAddressSync(
      [payer.toBuffer()],
      program.programId,
    );
    const txhashinit = await program.methods.initialize()
      .accounts({
        newAccount: owner
      })
      .rpc();
    console.log(`Initialize finished`,txhashinit);
    
    const txhashincr = await program.methods
      .increment()
      .accounts({
        newAccount: owner
      })  
      .rpc();
    console.log(`Increment finished`,txhashincr);
    
    const txhashdec = await program.methods
      .decrement()
      .accounts({
        newAccount: owner
      })  
      .rpc();
      console.log(`decrement finished`,txhashdec);
  });
});
