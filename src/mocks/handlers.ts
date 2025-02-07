import { http, HttpResponse } from "msw";
import { getProducts } from "./product-list";
import { Profile } from "../shared/interfaces/user.interface";

interface LoginRequestBody {
    email: string;
    password: string;
}

interface RegisterRequestBody {
    email: string;
    password: string;
    name: string;
}

// 🔹 Temporary in-memory user storage
const mockUsers: Array<{ profile: Profile; password: string }> = [
    {
        profile: {
            id: 1,
            email: "test@example.com",
            name: "John Doe",
            phone: "+1 234 567 890",
            address: "123 Main St, Toronto, ON, Canada",
        },
        password: "password123",
    },
];

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
            return HttpResponse.json(
                { message: "Product not found" },
                { status: 404 }
            );
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

            return HttpResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        } catch (error) {
            return HttpResponse.json(
                { message: "Invalid request format" },
                { status: 400 }
            );
        }
    }),

    // Handler for User Profile Fetching
    http.get("/api/user/profile", async ({ request }) => {
        const authHeader = request.headers.get("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return HttpResponse.json(
                { message: "Unauthorized. Missing or invalid token." },
                { status: 401 }
            );
        }

        const token = authHeader.split(" ")[1];

        if (token !== "mocked-jwt-token") {
            return HttpResponse.json(
                { message: "Invalid token" },
                { status: 403 }
            );
        }

        const mockUserProfile: Profile = {
            id: 1,
            email: "test@example.com",
            name: "John Doe",
            phone: "+1 234 567 890",
            address: "123 Main St, Toronto, ON, Canada",
        };

        return HttpResponse.json(mockUserProfile);
    }),

    // New Handler for User Registration
    http.post("/api/auth/register", async ({ request }) => {
        try {
            const body = (await request.json()) as RegisterRequestBody;
            const { email, password, name } = body;

            if (!email || !password || !name) {
                return HttpResponse.json(
                    { message: "Email, password, and name are required" },
                    { status: 400 }
                );
            }

            const existingUser = mockUsers.find((user) => user.profile.email === email);
            if (existingUser) {
                return HttpResponse.json(
                    { message: "User with this email already exists" },
                    { status: 409 }
                );
            }

            const newUserProfile: Profile = {
                id: mockUsers.length + 1,
                email,
                name,
                phone: "Not provided",
                address: "Not provided",
            };

            mockUsers.push({ profile: newUserProfile, password });

            return HttpResponse.json({
                message: "Registration successful",
                token: "mocked-jwt-token",
                user: newUserProfile,
            });
        } catch (error) {
            return HttpResponse.json(
                { message: "Invalid request format" },
                { status: 400 }
            );
        }
    }),
];
