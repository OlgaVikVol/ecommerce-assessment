import { http, HttpResponse } from "msw";
import { getProducts } from "./product-list";

interface LoginRequestBody {
    email: string;
    password: string;
}

export const handlers = [
    // Handler to fetch all products
    http.get("/api/products", () => {
        return HttpResponse.json(getProducts());
    }),

    // Handler to fetch a specific product by ID
    http.get("/api/products/:id", ({ params }) => {
        const products = getProducts();
        const productId = Number(params.id);
        const product = products.find((p) => p.id === productId);

        if (!product) {
            return HttpResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return HttpResponse.json(product);
    }),

    //Handler for user login with proper typing
    http.post("/api/auth/login", async ({ request }) => {
        try {
            const body = (await request.json()) as LoginRequestBody;
            const { email, password } = body;

            if (!email || !password) {
                return HttpResponse.json(
                    { message: "Email and password are required" },
                    { status: 400 }
                );
            }

            const mockUser = {
                email: "test@example.com",
                password: "password123",
                token: "mocked-jwt-token",
            };

            if (email === mockUser.email && password === mockUser.password) {
                return HttpResponse.json({
                    message: "Login successful",
                    token: mockUser.token,
                    user: { email: mockUser.email },
                });
            }

            return HttpResponse.json({ message: "Invalid credentials" }, { status: 401 });

        } catch (error) {
            return HttpResponse.json({ message: "Invalid request format" }, { status: 400 });
        }
    }),
];

