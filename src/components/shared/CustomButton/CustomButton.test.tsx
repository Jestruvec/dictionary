import { render, screen } from "@testing-library/react";
import { CustomButton } from "./CustomButton";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

describe("CustomButton", () => {
  it("renderiza con texto básico", () => {
    render(<CustomButton text="Click me" />);
    const btn = screen.getByRole("button", { name: "Click me" });
    expect(btn).toBeInTheDocument();
  });

  it("renderiza con children en lugar de text", () => {
    render(
      <CustomButton>
        <span>Child Text</span>
      </CustomButton>
    );
    expect(screen.getByText("Child Text")).toBeInTheDocument();
  });

  it("muestra 'Loading...' si loading es true", () => {
    render(<CustomButton loading text="Should not show" />);
    expect(screen.getByRole("button")).toHaveTextContent("Loading...");
  });

  it("deshabilita el botón si loading o disabled es true", () => {
    const { rerender } = render(<CustomButton loading text="Loading" />);
    let btn = screen.getByRole("button");
    expect(btn).toBeDisabled();

    rerender(<CustomButton disabled text="Disabled" />);
    btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
  });

  it("ejecuta onClick si se hace click y no está deshabilitado", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<CustomButton text="Click me" onClick={handleClick} />);
    await user.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("no ejecuta onClick si está deshabilitado", async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(<CustomButton text="Can't click" disabled onClick={handleClick} />);
    await user.click(screen.getByText("Can't click"));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
