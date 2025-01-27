import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "./Button"; 
import { describe, it, expect, vi } from "vitest";
import '@testing-library/jest-dom';

describe("Button Component", () => {
  it("renders the button with default props", () => {
    render(<Button data-testid="button">Click Me</Button>);
    const buttonElement = screen.getByTestId("button");

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.className).toContain("button");
    expect(buttonElement.className).toContain("accent");
  });

  it("applies the small appearance class by default", () => {
    render(<Button data-testid="button">Click Me</Button>);
    const buttonElement = screen.getByTestId("button");

    expect(buttonElement.className).toContain("small");
    expect(buttonElement.className).not.toContain("big");
  });

  it("applies the big appearance class when appearance is 'big'", () => {
    render(
      <Button data-testid="button" appearance="big">
        Click Me
      </Button>
    );
    const buttonElement = screen.getByTestId("button");

    expect(buttonElement.className).toContain("big");
    expect(buttonElement.className).not.toContain("small");
  });

  it("applies additional classes passed via className prop", () => {
    render(
      <Button className="extra-class" data-testid="button">
        Click Me
      </Button>
    );
    const buttonElement = screen.getByTestId("button");

    expect(buttonElement.className).toContain("button");
    expect(buttonElement.className).toContain("accent");
    expect(buttonElement.className).toContain("extra-class");
  });

  it("handles click events", async () => {
    const handleClick = vi.fn();
    render(
      <Button data-testid="button" onClick={handleClick}>
        Click Me
      </Button>
    );
    const buttonElement = screen.getByTestId("button");

    await userEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledOnce();
  });

  it("renders children correctly", () => {
    render(<Button data-testid="button">Click Me</Button>);
    const buttonElement = screen.getByTestId("button");

    expect(buttonElement).toHaveTextContent("Click Me");
  });
});
