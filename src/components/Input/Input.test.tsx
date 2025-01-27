import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "./Input"; 
import { describe, it, expect, vi } from "vitest";
import '@testing-library/jest-dom';

describe("Input Component", () => {
  it("renders the input element with default props", () => {
    render(<Input data-testid="input" className="input" isValid/>);
    const inputElement = screen.getByTestId("input");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass("input");
  });

  it("applies the invalid class when isValid is false", () => {
    render(<Input isValid={false} data-testid="input" className="input invalid" />);
    const inputElement = screen.getByTestId("input");

    expect(inputElement).toHaveClass("invalid");
  });

  it("does not apply the invalid class when isValid is true", () => {
    render(<Input isValid={true} data-testid="input" className="input" />);
    const inputElement = screen.getByTestId("input");

    expect(inputElement).not.toHaveClass("invalid");
  });

  it("forwards the ref to the input element", () => {
    const ref = vi.fn();
    render(<Input ref={ref} data-testid="input" className="input" isValid/>);
    const inputElement = screen.getByTestId("input");

    expect(ref).toHaveBeenCalled();
    expect(ref.mock.calls[0][0]).toBe(inputElement);
  });

  it("handles user input correctly", async () => {
    render(<Input data-testid="input" className="input" isValid/>);
    const inputElement = screen.getByTestId("input");

    await userEvent.type(inputElement, "Hello");
    expect(inputElement).toHaveValue("Hello");
  });

  it("applies additional classes passed via className prop", () => {
    render(<Input className="extra-class input" data-testid="input" isValid/>);
    const inputElement = screen.getByTestId("input");

    expect(inputElement).toHaveClass("input");
    expect(inputElement).toHaveClass("extra-class");
  });
});
