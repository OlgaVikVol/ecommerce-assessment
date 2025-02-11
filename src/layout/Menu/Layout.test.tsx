import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { useDispatch, useSelector, Provider } from "react-redux";
import Layout from "./Layout";
import { configureStore } from "@reduxjs/toolkit";
import userReducer, { userActions } from "../../store/user.slice";
import cartReducer from "../../store/cart.slice";

vi.mock("react-redux", () => {
    const actual = require("react-redux");
    return {
        ...actual,
        useDispatch: vi.fn(),
        useSelector: vi.fn(),
    };
});

describe("Layout Component", () => {
    const mockDispatch = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
        (useSelector as unknown as Mock).mockImplementation((selector) => {
            return selector({
                user: {
                    profile: {
                        name: "Bob Dealan",
                        email: "BobDealan@gmail.com",
                    },
                },
                cart: {
                    items: [
                        { id: 1, count: 2 },
                        { id: 2, count: 3 },
                    ],
                },
            });
        });
    });

    const renderComponent = () =>
        render(
            <Provider
                store={configureStore({
                    reducer: { user: userReducer, cart: cartReducer },
                })}
            >
                <BrowserRouter>
                    <Layout />
                </BrowserRouter>
            </Provider>
        );

    it("renders the layout container", () => {
        renderComponent();
        expect(screen.getByTestId("layout")).toBeInTheDocument();
    });

    it("renders the sidebar with user info", () => {
        renderComponent();
        expect(screen.getByTestId("sidebar")).toBeInTheDocument();
        expect(screen.getByTestId("user-avatar")).toBeInTheDocument();
        expect(screen.getByTestId("user-name")).toHaveTextContent("Bob Dealan");
        expect(screen.getByTestId("user-email")).toHaveTextContent(
            "BobDealan@gmail.com"
        );
    });

    it("renders menu links", () => {
        renderComponent();
        expect(screen.getByTestId("menu-link-home")).toBeInTheDocument();
        expect(screen.getByTestId("menu-link-home")).toHaveTextContent("Menu");

        expect(screen.getByTestId("menu-link-cart")).toBeInTheDocument();
        expect(screen.getByTestId("menu-link-cart")).toHaveTextContent(
            "Cart 5"
        );
    });

    it("renders the exit button", () => {
        renderComponent();
        const exitButton = screen.getByTestId("exit-button");
        expect(exitButton).toBeInTheDocument();
        expect(exitButton).toHaveTextContent("Log out");

        fireEvent.click(exitButton);
        expect(mockDispatch).toHaveBeenCalledWith(userActions.logout()); 
    });

    it("renders the Outlet container", () => {
        renderComponent();
        expect(screen.getByTestId("outlet-container")).toBeInTheDocument();
    });
});
