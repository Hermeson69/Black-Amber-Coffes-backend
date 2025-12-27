export class OrderStatus {
  static readonly VALUES = ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"] as const;

  static values() {
    return OrderStatus.VALUES;
  }
}