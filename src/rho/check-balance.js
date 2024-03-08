// Rholang code to check REVs balance
// - intended for use with RNode exploratory deploy
export const checkBalance_rho = addr => `
  new return, rl(\`rho:registry:lookup\`), RevVaultCh, vaultCh in {
    rl!(\`rho:bigsur:revVault\`, *RevVaultCh) |
    for (@(_, RevVault) <- RevVaultCh) {
      @RevVault!("findOrCreate", "${addr}", *vaultCh) |
      for (@maybeVault <- vaultCh) {
        match maybeVault {
          (true, vault) => @vault!("balance", *return)
          (false, err)  => return!(err)
        }
      }
    }
  }
`
