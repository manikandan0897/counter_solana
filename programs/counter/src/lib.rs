use anchor_lang::prelude::*;

declare_id!("67LQVCehLSwkRQ7YoA6WMU9YGPSmpseTRHJjyT2uVGer");

#[program]
pub mod counter {
    use super::*;

    pub fn initialize(ctx:Context<Initialize>,value:u64) -> Result<()> {
        ctx.accounts.my_storage.data += value;
        msg!("The value of the storage is {}",value);
        Ok(())
    }

    pub fn increment(ctx:Context<Increment>) -> Result<()> {
        ctx.accounts.my_storage.data += 1;
        Ok(())
    }

    pub fn decrement(ctx:Context<Decrement>) -> Result<()> {
        ctx.accounts.my_storage.data -= 1;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info>{
    #[account(init,payer = signer, space = 8 + 40)]
    pub my_storage: Account<'info, MyStorage>,
    #[account(mut)]
    pub signer: Signer<'info>,  
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub my_storage: Account<'info, MyStorage>,
}

#[derive(Accounts)]
pub struct Decrement<'info> {
    #[account(mut)]
    pub my_storage: Account<'info, MyStorage>,
}

#[account]
pub struct  MyStorage {
    pub data : u64,
}