import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom"; 
import ProductCard from "./ProductCard";
import { truncateText } from "../../shared/helpers/truncateText";

describe("ProductCard Component", () => {
    const mockProps = {
        id: 2,
        title: "Test Product",
        description: "This is a test product description.",
        price: 99.99,
        rating: 4.5,
        image: "/test-image.jpg",
    };

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
        
        // Instead of checking full text, check the truncated text
        const truncatedDescription = truncateText(mockProps.description, 28);
        expect(descriptionElement).toHaveTextContent(truncatedDescription);
    });
});
