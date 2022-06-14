import { fireEvent, render, screen } from "@testing-library/react";
import DeleteModal from "./DeleteModal";
import "@testing-library/jest-dom";

const onConfirmMock = jest.fn();
const onCloseModalMock = jest.fn();

it("should render modal", async () => {
  render(
    <DeleteModal
      onCloseModal={onCloseModalMock}
      onConfirm={onConfirmMock}
      label={"Label"}
    />
  );

  expect(screen.getByText("Label")).toBeInTheDocument();
});
