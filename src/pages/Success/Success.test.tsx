import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import Success from "./Success";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe("Success Component", () => {
    const renderComponent = () =>
        render(
            <MemoryRouter>
                <Success />
            </MemoryRouter>
        );

    it("renders the success container", () => {
        renderComponent();
        expect(screen.getByTestId("success-container")).toBeInTheDocument();
    });

    it("renders the success message", () => {
        renderComponent();
        expect(screen.getByTestId("success-message")).toBeInTheDocument();
        expect(screen.getByTestId("success-message")).toHaveTextContent(
            "Your order has been successfully placed!"
        );
    });

    it("renders the pizza image with correct attributes", () => {
        renderComponent();
        const image = screen.getByTestId("success-image");
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("src", "/pizza.png");
        expect(image).toHaveAttribute("alt", "Pizza image");
    });

    it("renders the 'Make a new order' button", () => {
        renderComponent();
        const button = screen.getByTestId("success-button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent("Make a new order");
    });

    it("navigates to home when the button is clicked", () => {
        renderComponent();

        const button = screen.getByTestId("success-button");
        fireEvent.click(button);

        expect(mockNavigate).toHaveBeenCalledWith("/");
    });
});
