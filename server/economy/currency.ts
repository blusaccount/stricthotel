/**
 * Server-autoritatives Currency-Ledger, gekeyt nach Spieler-Id (Socket-Id).
 * Konzeptionell an StrictCoins angelehnt, aber eigenständig (kein
 * Datenbank-Sharing mit StrictHotel). Noch in-memory — Persistenz kommt
 * in server/db/ (offene Frage: StrictHotel-Backend als Vorlage kopieren
 * oder neu aufsetzen, siehe PROJECT_PLAN.md Abschnitt 8).
 */
export class CurrencyLedger {
  private readonly balances = new Map<string, number>();

  getBalance(playerId: string): number {
    return this.balances.get(playerId) ?? 0;
  }

  /** Schreibt einem Spieler Währung gut und gibt den neuen Kontostand zurück. */
  grant(playerId: string, amount: number): number {
    const newBalance = this.getBalance(playerId) + amount;
    this.balances.set(playerId, newBalance);
    return newBalance;
  }

  /** Zieht Währung ab, falls gedeckt. Gibt false zurück, wenn das Guthaben nicht reicht. */
  spend(playerId: string, amount: number): boolean {
    const balance = this.getBalance(playerId);
    if (balance < amount) {
      return false;
    }
    this.balances.set(playerId, balance - amount);
    return true;
  }
}
