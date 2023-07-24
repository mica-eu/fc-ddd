export interface DomainEvent {
  readonly name: string;
  readonly createdAt: Date;
  readonly data: unknown;
}
