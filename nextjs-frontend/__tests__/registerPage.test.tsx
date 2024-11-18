import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import Page from "@/app/register/page";
import { register } from "@/components/actions/register-action";

jest.mock("../components/actions/register-action", () => ({
  register: jest.fn(),
}));

describe("Register Page", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form with email and password input and submit button", () => {
    render(<Page />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /sign up/i }),
    ).toBeInTheDocument();
  });

  it("displays success message on successful form submission", async () => {
    (register as jest.Mock).mockResolvedValue({});

    render(<Page />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign up/i });

    fireEvent.change(emailInput, { target: { value: "testuser@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "@1231231%a" } });
    fireEvent.click(submitButton);

    await waitFor(() => {});

    expect(register).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(FormData),
    );
  });

  it("displays error message if register fails", async () => {
    (register as jest.Mock).mockResolvedValue({
      message: "REGISTER_USER_ALREADY_EXISTS",
    });

    render(<Page />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole("button", { name: /sign up/i });

    fireEvent.change(emailInput, { target: { value: "already@already.com" } });
    fireEvent.change(passwordInput, { target: { value: "@1231231%a" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("REGISTER_USER_ALREADY_EXISTS"),
      ).toBeInTheDocument();
    });

    expect(register).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(FormData),
    );
  });
});