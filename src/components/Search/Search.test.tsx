import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Search from "./Search";
import "@testing-library/jest-dom";

describe("Search Component", () => {
    it("renders the input wrapper", () => {
        render(<Search />);
        const wrapperElement = screen.getByTestId("input-wrapper");

        expect(wrapperElement).toBeInTheDocument();
    });

    it("renders the search input", () => {
        render(<Search />);
        const inputElement = screen.getByTestId("search-input");

        expect(inputElement).toBeInTheDocument();
    });

    it("renders the search icon", () => {
        render(<Search />);
        const iconElement = screen.getByTestId("search-icon");

        expect(iconElement).toBeInTheDocument();
        expect(iconElement).toHaveAttribute("src", "/search-icon.svg");
        expect(iconElement).toHaveAttribute("alt", "Search Icon");
    });

    it("forwards the ref to the input element", () => {
        const ref = vi.fn();
        render(<Search ref={ref} />);
        const inputElement = screen.getByTestId("search-input");

        expect(ref).toHaveBeenCalled();
        expect(ref.mock.calls[0][0]).toBe(inputElement);
    });

    it("handles user input correctly", async () => {
        render(<Search />);
        const inputElement = screen.getByTestId("search-input");

        await userEvent.type(inputElement, "Hello");
        expect(inputElement).toHaveValue("Hello");
    });

    it("applies additional classes passed via className prop", () => {
        render(<Search className="extra-class" />);
        const inputElement = screen.getByTestId("search-input");

        expect(inputElement).toHaveClass("extra-class");
    });
});
