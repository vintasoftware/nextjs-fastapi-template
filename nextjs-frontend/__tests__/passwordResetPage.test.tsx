import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";

import Page from "@/app/password-recovery/page";
import { passwordReset } from "@/components/actions/password-reset-action";

jest.mock("../components/actions/password-reset-action", () => ({
  passwordReset: jest.fn(),
}));

describe("Password Reset Page", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the form with email input and submit button", () => {
    render(<Page />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /send/i })).toBeInTheDocument();
  });

  it("displays success message on successful form submission", async () => {
    // Mock a successful password reset
    (passwordReset as jest.Mock).mockResolvedValue({
      message: "Password reset instructions sent to your email.",
    });

    render(<Page />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole("button", { name: /send/i });

    fireEvent.change(emailInput, { target: { value: "testuser@example.com" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Password reset instructions sent to your email."),
      ).toBeInTheDocument();
    });

    const formData = new FormData();
    formData.set("email", "testuser@example.com");
    expect(passwordReset).toHaveBeenCalledWith(undefined, formData);
  });

  it("displays error message if password reset fails", async () => {
    // Mock a failed password reset
    (passwordReset as jest.Mock).mockResolvedValue({
      server_validation_error: "User not found",
    });

    render(<Page />);

    const emailInput = screen.getByLabelText(/email/i);
    const submitButton = screen.getByRole("button", { name: /send/i });

    fireEvent.change(emailInput, {
      target: { value: "invaliduser@example.com" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("User not found")).toBeInTheDocument();
    });

    const formData = new FormData();
    formData.set("email", "invaliduser@example.com");
    expect(passwordReset).toHaveBeenCalledWith(undefined, formData);
  });
});
