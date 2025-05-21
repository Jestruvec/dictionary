import { render, screen } from "@testing-library/react";
import { CustomMessage } from "./CustomMessage";
import { describe, it, expect } from "vitest";

describe("CustomMessage", () => {
  it("renderiza el mensaje correctamente", () => {
    render(<CustomMessage message="Hola mundo" />);
    expect(screen.getByText("Hola mundo")).toBeInTheDocument();
  });

  it("aplica clases por defecto correctamente", () => {
    render(<CustomMessage message="Hola mundo" />);
    const el = screen.getByText("Hola mundo");
    expect(el).toHaveClass("text-purple-500");
    expect(el).toHaveClass("text-md");
    expect(el).toHaveClass("font-normal");
  });

  it("aplica clases personalizadas correctamente", () => {
    render(
      <CustomMessage
        message="Advertencia"
        type="warning"
        size="lg"
        weight="bold"
        className="custom-class"
      />
    );
    const el = screen.getByText("Advertencia");
    expect(el).toHaveClass("text-yellow-500");
    expect(el).toHaveClass("text-lg");
    expect(el).toHaveClass("font-bold");
    expect(el).toHaveClass("custom-class");
  });
});
