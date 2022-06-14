import { fireEvent, render, screen } from "@testing-library/react";
import BasicInput from "./BasicInput";
import "@testing-library/jest-dom";

const setValueMock = jest.fn();

it("should render input", async () => {
  render(
    <BasicInput
      purpose={"text"}
      label={"Label"}
      value={"value"}
      setValue={setValueMock}
    />
  );

  expect(screen.getByText("Label")).toBeInTheDocument();

  fireEvent.change(screen.getByTestId("input"), { target: { value: "new" } });

  expect(setValueMock).toHaveBeenCalledTimes(1);
});
