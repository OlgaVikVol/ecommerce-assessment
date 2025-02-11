import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import ErrorPage from "./ErrorPage";

describe("ErrorPage Component", () => {
    it("renders the error page with title, message, and button", () => {
        render(
            <BrowserRouter>
                <ErrorPage />
            </BrowserRouter>
        );

        expect(screen.getByTestId("error-page")).toBeInTheDocument();
        expect(
            screen.getByText("Oops! Something went wrong.")
        ).toBeInTheDocument();
        expect(
            screen.getByText("We couldn't find the page you're looking for.")
        ).toBeInTheDocument();

        const button = screen.getByTestId("error-button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("href", "/");
        expect(button).toHaveTextContent("Go Back Home");
    });
});
