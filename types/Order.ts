export interface Order {
    id: number;
    studentId: number;
    mealId: number;
}

export interface CreateOrderDTO {
    studentId: number;
    mealId: number;
}