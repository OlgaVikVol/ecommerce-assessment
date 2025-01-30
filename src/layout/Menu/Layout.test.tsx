import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import { describe, it, expect } from "vitest";

describe("Layout Component", () => {
  it("renders the layout container", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    const layout = screen.getByTestId("layout");
    expect(layout).toBeInTheDocument();
  });

  it("renders the sidebar with user info", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toBeInTheDocument();

    const avatar = screen.getByTestId("user-avatar");
    const username = screen.getByTestId("user-name");
    const email = screen.getByTestId("user-email");

    expect(avatar).toBeInTheDocument();
    expect(username).toHaveTextContent("Bob Dealan");
    expect(email).toHaveTextContent("BobDealan@gmail.com");
  });

  it("renders menu links", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    const homeLink = screen.getByTestId("menu-link-home");
    const cartLink = screen.getByTestId("menu-link-cart");

    expect(homeLink).toBeInTheDocument();
    expect(cartLink).toBeInTheDocument();

    expect(homeLink).toHaveTextContent("Menu");
    expect(cartLink).toHaveTextContent("Cart");
  });

  it("renders the exit button", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    const exitButton = screen.getByTestId("exit-button");
    expect(exitButton).toBeInTheDocument();
    expect(exitButton).toHaveTextContent("Log out");
  });

  it("renders the Outlet container", () => {
    render(
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    );
    const outletContainer = screen.getByTestId("outlet-container");
    expect(outletContainer).toBeInTheDocument();
  });
});
