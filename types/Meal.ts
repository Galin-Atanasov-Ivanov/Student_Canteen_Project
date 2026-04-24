export interface Meal {
    id: number;
    name: string;
    price: number;
}

export interface CreateMealDTO {
    name: string;
    price: number;
}