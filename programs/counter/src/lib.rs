use anchor_lang::prelude::*;

declare_id!("67LQVCehLSwkRQ7YoA6WMU9YGPSmpseTRHJjyT2uVGer");

#[program]
pub mod counter_program {
    
    use super::*;
    
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        // check the account is initialized
        if ctx.accounts.new_account.initialized {
            return Err(ErrorCode::AccountAlreadyInitialized.into());
        }
        // Set the account as initialized
        let counter = &mut ctx.accounts.new_account;
        counter.initialized = true;
        counter.data += 0;
        msg!("The counter value is {}",counter.data);
        Ok(())
    }

    pub fn increment(ctx:Context<Increment>) -> Result<()> {
        let counter = &mut ctx.accounts.new_account;
        counter.data += 1;
        msg!("The counter value is {}",counter.data);
        Ok(())
    }

    pub fn decrement(ctx:Context<Decrement>) -> Result<()> {
        if ctx.accounts.new_account.data < 1 {
            return Err(ErrorCode::Lessthanvalue.into());
        }
        let counter = &mut ctx.accounts.new_account;
        counter.data -= 1; 
        msg!("The counter value is {}",counter.data);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init_if_needed,
        seeds = [owner.key().as_ref()],
        bump,
        payer = owner,
        space = 8 + 40
    )]
    pub new_account: Account<'info, NewAccount>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Increment<'info> {
    #[account(mut)]
    pub new_account: Account<'info, NewAccount>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Decrement<'info> {
    #[account(mut)]
    pub new_account: Account<'info, NewAccount>,
    #[account(mut)]
    pub owner: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct NewAccount {
    pub initialized: bool,
    pub data: u64
}

#[error_code]
pub enum ErrorCode {
    #[msg("The account is already initialized.")]
    AccountAlreadyInitialized,
    #[msg("value is not 0")]
    Lessthanvalue
}