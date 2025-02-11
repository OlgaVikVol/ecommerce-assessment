import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "./ProductCard";
import { truncateText } from "../../shared/helpers/truncateText";
import { cartActions } from "../../store/cart.slice";
import { useDispatch } from "react-redux";

vi.mock("react-redux", () => ({
    ...vi.importActual("react-redux"),
    useDispatch: vi.fn(),
}));

describe("ProductCard Component", () => {
    const mockDispatch = vi.fn();
    const mockProps = {
        id: 2,
        title: "Test Product",
        description: "This is a test product description.",
        price: 99.99,
        rating: 4.5,
        image: "/test-image.jpg",
        category: "test",
    };

    beforeEach(() => {
        vi.clearAllMocks();
        (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
    });

    it("renders the product card container", () => {
        render(
            <MemoryRouter>
                <ProductCard {...mockProps} />
            </MemoryRouter>
        );
        const cardElement = screen.getByTestId("product-card");

        expect(cardElement).toBeInTheDocument();
    });

    it("renders the product header with background image", () => {
        render(
            <MemoryRouter>
                <ProductCard {...mockProps} />
            </MemoryRouter>
        );
        const headerElement = screen.getByTestId("product-header");

        expect(headerElement).toBeInTheDocument();
        expect(headerElement).toHaveStyle({
            backgroundImage: `url('${mockProps.image}')`,
        });
    });

    it("renders the product price and currency", () => {
        render(
            <MemoryRouter>
                <ProductCard {...mockProps} />
            </MemoryRouter>
        );
        const priceElement = screen.getByTestId("product-price");
        const currencyElement = screen.getByTestId("product-currency");

        expect(priceElement).toBeInTheDocument();
        expect(priceElement).toHaveTextContent(String(mockProps.price));
        expect(currencyElement).toHaveTextContent("$");
    });

    it("renders the add-to-cart button with an icon", () => {
        render(
            <MemoryRouter>
                <ProductCard {...mockProps} />
            </MemoryRouter>
        );
        const buttonElement = screen.getByTestId("add-to-cart-button");
        const iconElement = screen.getByTestId("cart-button-icon");

        expect(buttonElement).toBeInTheDocument();
        expect(iconElement).toBeInTheDocument();
        expect(iconElement).toHaveAttribute("src", "/cart-button-icon.svg");
    });

    it("dispatches 'add to cart' action when button is clicked", () => {
        render(
            <MemoryRouter>
                <ProductCard {...mockProps} />
            </MemoryRouter>
        );
        const buttonElement = screen.getByTestId("add-to-cart-button");

        fireEvent.click(buttonElement);

        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDispatch).toHaveBeenCalledWith(
            cartActions.add(mockProps.id)
        );
    });

    it("renders the product rating with an icon", () => {
        render(
            <MemoryRouter>
                <ProductCard {...mockProps} />
            </MemoryRouter>
        );
        const ratingElement = screen.getByTestId("product-rating");
        const ratingIcon = screen.getByTestId("rating-icon");

        expect(ratingElement).toBeInTheDocument();
        expect(ratingElement).toHaveTextContent(String(mockProps.rating));
        expect(ratingIcon).toBeInTheDocument();
        expect(ratingIcon).toHaveAttribute("src", "/star-icon.svg");
    });

    it("renders the product title and description", () => {
        render(
            <MemoryRouter>
                <ProductCard {...mockProps} />
            </MemoryRouter>
        );
        const titleElement = screen.getByTestId("product-title");
        const descriptionElement = screen.getByTestId("product-description");

        expect(titleElement).toBeInTheDocument();
        expect(titleElement).toHaveTextContent(mockProps.title);

        expect(descriptionElement).toBeInTheDocument();
        expect(descriptionElement).toHaveTextContent(
            truncateText(mockProps.description, 28)
        );
    });

    it("checks if the product card links to the correct product page", () => {
        render(
            <MemoryRouter>
                <ProductCard {...mockProps} />
            </MemoryRouter>
        );

        const linkElement = screen.getByRole("link");

        expect(linkElement).toHaveAttribute("href", `/product/${mockProps.id}`);
    });
});
