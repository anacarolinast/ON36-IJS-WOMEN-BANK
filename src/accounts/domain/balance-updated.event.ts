export class BalanceUpdatedEvent {
  constructor(
    public readonly accountId: number,
    public readonly newBalance: number,
  ) {}
}
