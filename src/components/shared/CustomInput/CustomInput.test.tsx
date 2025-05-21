import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CustomInput } from "./CustomInput";
import { describe, it, expect, vi } from "vitest";

describe("CustomInput", () => {
  it("renderiza el input con label y placeholder", () => {
    render(
      <CustomInput
        id="username"
        label="Nombre de usuario"
        placeholder="Escribe tu nombre"
        value=""
        setValue={() => {}}
        error={null}
      />
    );

    expect(screen.getByLabelText("Nombre de usuario")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Escribe tu nombre")
    ).toBeInTheDocument();
  });

  it("llama a setValue al escribir en el input", async () => {
    const user = userEvent.setup();
    const mockSetValue = vi.fn();

    render(
      <CustomInput id="email" value="" setValue={mockSetValue} error={null} />
    );

    const input = screen.getByRole("textbox");
    await user.type(input, "jhonny@example.com");

    expect(mockSetValue).toHaveBeenCalled();
    expect(mockSetValue).toHaveBeenLastCalledWith("m");
  });

  it("muestra mensaje de error si `error` tiene valor", () => {
    render(
      <CustomInput
        id="password"
        value=""
        setValue={() => {}}
        error="Campo requerido"
      />
    );

    expect(screen.getByText("Campo requerido")).toBeInTheDocument();
  });

  it("muestra hint si `hint` tiene valor", () => {
    render(
      <CustomInput
        id="phone"
        value=""
        setValue={() => {}}
        error={null}
        hint="Formato: +52..."
      />
    );

    expect(screen.getByText("Formato: +52...")).toBeInTheDocument();
  });

  it("deshabilita el input si `disabled` es true", () => {
    render(
      <CustomInput
        id="disabled"
        value=""
        setValue={() => {}}
        error={null}
        disabled
      />
    );

    expect(screen.getByRole("textbox")).toBeDisabled();
  });
});
