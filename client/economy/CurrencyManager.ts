import type { NetworkClient } from "../net/NetworkClient";

/**
 * Clientseitiger Spiegel des server-autoritativen Kontostands
 * (server/economy/currency.ts). Angelehnt an die StrictCoins-Logik:
 * der Client rechnet nie selbst, er zeigt nur an, was der Server pusht.
 */
export class CurrencyManager {
  onChanged?: (newAmount: number) => void;

  private currentBalance = 0;

  constructor(network: NetworkClient) {
    network.onBalance = (newAmount) => {
      this.currentBalance = newAmount;
      this.onChanged?.(newAmount);
    };
  }

  get balance(): number {
    return this.currentBalance;
  }
}
