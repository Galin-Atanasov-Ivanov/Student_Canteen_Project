export interface Order {
    id: number;
    student_id: number;
    meal_id: number;
    order_date: Date;
}

export interface CreateOrderDTO {
    student_id: number;
    meal_id: number;
    order_date: Date;
}