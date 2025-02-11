import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { useDispatch, useSelector } from "react-redux";
import Login from "./Login";

vi.mock("react-redux", () => {
    const actual = require("react-redux");
    return {
        ...actual,
        useDispatch: vi.fn(),
        useSelector: vi.fn(),
    };
});

describe("Login Component", () => {
    const mockDispatch = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
        (useSelector as unknown as Mock).mockImplementation((selector) =>
            selector({
                user: {
                    token: null,
                    loginErrorMessage: "Invalid credentials",
                },
            })
        );
    });

    const renderComponent = () =>
        render(
            <BrowserRouter>
                <Login />
            </BrowserRouter>
        );

    it("renders the login page", () => {
        renderComponent();
        expect(screen.getByTestId("login-page")).toBeInTheDocument();
    });

    it("renders the login heading", () => {
        renderComponent();
        expect(screen.getByTestId("login-heading")).toHaveTextContent("Login");
    });

    it("renders the email and password fields", () => {
        renderComponent();
        expect(screen.getByTestId("login-email-field")).toBeInTheDocument();
        expect(screen.getByTestId("login-password-field")).toBeInTheDocument();
    });

    it("displays an error message if login fails", () => {
        renderComponent();
        expect(screen.getByTestId("login-error")).toHaveTextContent(
            "Invalid credentials"
        );
    });

    it("renders the submit button", () => {
        renderComponent();
        const submitButton = screen.getByTestId("login-submit-button");
        expect(submitButton).toBeInTheDocument();
        expect(submitButton).toHaveTextContent("Enter");
    });

    it("renders the registration link", () => {
        renderComponent();
        expect(screen.getByTestId("login-register-link")).toBeInTheDocument();
        expect(screen.getByTestId("login-register-link")).toHaveTextContent(
            "Register"
        );
    });
});

