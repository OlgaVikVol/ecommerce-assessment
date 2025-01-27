import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Headling from "./Headling"; 

describe("Headling Component", () => {
  it("renders the heading with children", () => {
    render(<Headling>Test Heading</Headling>);
    const headingElement = screen.getByText("Test Heading");

    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe("H1");
  });

  it("applies default class from styles", () => {
    render(<Headling>Styled Heading</Headling>);
    const headingElement = screen.getByText("Styled Heading");

    expect(headingElement.className).toContain("h1"); // The class `h1` from `styles.h1`
  });

  it("applies additional className prop", () => {
    render(<Headling className="extra-class">Test Heading</Headling>);
    const headingElement = screen.getByText("Test Heading");

    expect(headingElement.className).toContain("extra-class");
  });

  it("forwards additional props to the h1 element", () => {
    render(<Headling id="test-id">Prop Test</Headling>);
    const headingElement = screen.getByText("Prop Test");

    expect(headingElement).toHaveAttribute("id", "test-id");
  });

  it("renders children correctly", () => {
    render(<Headling>Render Test</Headling>);
    const headingElement = screen.getByText("Render Test");

    expect(headingElement).toHaveTextContent("Render Test");
  });
});
