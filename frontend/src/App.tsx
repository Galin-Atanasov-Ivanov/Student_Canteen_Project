import { BrowserRouter, Route, Routes } from "react-router";
import { Layout } from "./components";
import { About, Contact, Home, MealOverview, NotFound, OrderOverview, StudentOverview } from "./pages";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/students" element={<StudentOverview />} />
                    <Route path="/meals" element={<MealOverview />} />
                    <Route path="/orders" element={<OrderOverview />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;