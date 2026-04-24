const API_URL = "http://localhost:3000";

export const getMeals = async () => {
    const res = await fetch(`${API_URL}/meals`);
    return res.json();
};

export const createMeal = async (meal: any) => {
    const res = await fetch(`${API_URL}/meals`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(meal)
    });

    return res.json();
};

export const deleteMeal = async (id: number) => {
    await fetch(`${API_URL}/meals/${id}`, {
        method: "DELETE"
    });
};