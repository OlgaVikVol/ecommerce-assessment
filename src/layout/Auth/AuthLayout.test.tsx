import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { describe, it, expect } from "vitest";

describe("AuthLayout Component", () => {
    it("renders the layout container", () => {
        render(
            <MemoryRouter>
                <AuthLayout />
            </MemoryRouter>
        );
        const layoutElement = screen.getByTestId("auth-layout");
        expect(layoutElement).toBeInTheDocument();
    });

    it("renders the logo", () => {
        render(
            <MemoryRouter>
                <AuthLayout />
            </MemoryRouter>
        );
        const logoElement = screen.getByTestId("auth-logo");
        const logoImg = screen.getByTestId("auth-logo-img");

        expect(logoElement).toBeInTheDocument();
        expect(logoImg).toBeInTheDocument();
        expect(logoImg).toHaveAttribute("src", "/logo.svg");
    });

    it("renders the content area", () => {
        render(
            <MemoryRouter>
                <AuthLayout />
            </MemoryRouter>
        );
        const contentElement = screen.getByTestId("auth-content");
        expect(contentElement).toBeInTheDocument();
    });
});
