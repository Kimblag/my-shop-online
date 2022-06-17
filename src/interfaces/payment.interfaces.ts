export enum PaymentStatus {
    CREATED,
    PAID,
}

export interface IPayment {
    _id: string;
    userId: string;
    status: PaymentStatus;
    amount: number;
    description: string;
    createdAt?: Date;
}