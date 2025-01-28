import { renderHook, waitFor } from "@testing-library/react";
import { useFetchProducts } from "./useFetchProducts";
import { describe, it, expect,beforeEach, vi, afterEach, Mock } from "vitest";

const mockData = [
  {
    id: 1,
    title: "Pizza Margherita",
    description: "Classic pizza with fresh tomatoes and mozzarella.",
    image: "/product-demo.png",
    price: 10.99,
    rating: 4.5,
  },
  {
    id: 2,
    title: "Caesar Salad",
    description: "Crisp romaine lettuce with creamy Caesar dressing.",
    image: "/product-demo.png",
    price: 7.99,
    rating: 4.2,
  },
];

describe("useFetchProducts hook", () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches and returns products successfully", async () => {
    // Mock successful fetch response
    (global.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useFetchProducts());

    // Wait for the products to be fetched
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Assert products and loading state
    expect(result.current.products).toEqual(mockData);
    expect(result.current.error).toBe("");
    expect(result.current.loading).toBe(false);
  });

  it("handles API errors gracefully", async () => {
    // Mock failed fetch response
    (global.fetch as Mock).mockResolvedValueOnce({
      ok: false,
      statusText: "Internal Server Error",
    });

    const { result } = renderHook(() => useFetchProducts());

    // Wait for the error to be set
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Assert error state
    expect(result.current.products).toEqual([]);
    expect(result.current.error).toContain("Error: Internal Server Error");
    expect(result.current.loading).toBe(false);
  });

  it("sets loading state correctly", async () => {
    // Mock fetch response
    (global.fetch as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useFetchProducts());

    // Assert initial loading state
    expect(result.current.loading).toBe(true);

    // Wait for the loading to finish
    await waitFor(() => expect(result.current.loading).toBe(false));

    // Assert final state
    expect(result.current.products).toEqual(mockData);
  });
});

