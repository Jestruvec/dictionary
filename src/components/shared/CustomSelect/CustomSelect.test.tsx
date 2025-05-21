import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CustomSelect, SelectOption } from "./CustomSelect";
import { describe, it, expect, vi } from "vitest";

const options: SelectOption[] = [
  { label: "Opción 1", value: "1" },
  { label: "Opción 2", value: "2" },
  { label: "Opción 3", value: "3" },
];

describe("CustomSelect", () => {
  it("renderiza con la opción seleccionada", () => {
    render(
      <CustomSelect
        options={options}
        selected={options[0]}
        onChange={() => {}}
      />
    );

    expect(screen.getByText("Opción 1")).toBeInTheDocument();
  });

  it("abre el menú al hacer clic en el botón", async () => {
    render(
      <CustomSelect
        options={options}
        selected={options[0]}
        onChange={() => {}}
      />
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button"));

    expect(screen.getByText("Opción 2")).toBeInTheDocument();
  });

  it("llama a onChange al seleccionar una opción", async () => {
    const onChange = vi.fn();
    render(
      <CustomSelect
        options={options}
        selected={options[0]}
        onChange={onChange}
      />
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button"));
    await user.click(screen.getByText("Opción 2"));

    expect(onChange).toHaveBeenCalledWith(options[1]);
  });

  it("cierra el menú al seleccionar una opción", async () => {
    render(
      <CustomSelect
        options={options}
        selected={options[0]}
        onChange={() => {}}
      />
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button"));
    await user.click(screen.getByText("Opción 2"));
    await waitFor(() => {
      expect(screen.queryByText("Opción 3")).not.toBeInTheDocument();
    });
  });

  it("cierra el menú al hacer clic fuera", async () => {
    render(
      <>
        <CustomSelect
          options={options}
          selected={options[0]}
          onChange={() => {}}
        />
        <div data-testid="outside">Outside</div>
      </>
    );

    const user = userEvent.setup();
    await user.click(screen.getByRole("button"));
    expect(screen.getByText("Opción 2")).toBeInTheDocument();
    await user.click(screen.getByTestId("outside"));

    await waitFor(() => {
      expect(screen.queryByText("Opción 2")).not.toBeInTheDocument();
    });
  });
});
