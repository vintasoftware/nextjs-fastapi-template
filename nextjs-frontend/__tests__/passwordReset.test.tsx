import { passwordReset } from "@/components/actions/password-reset-action";
import { resetForgotPassword } from "@/app/clientService";

jest.mock("../app/openapi-client/sdk.gen", () => ({
  resetForgotPassword: jest.fn(),
}));

jest.mock("../lib/clientConfig", () => ({
  client: {
    setConfig: jest.fn(),
  },
}));

describe("passwordReset action", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should call resetForgotPassword with the correct input and return success message", async () => {
    const formData = new FormData();
    formData.set("email", "testuser@example.com");
    // Mock a successful password reset
    (resetForgotPassword as jest.Mock).mockResolvedValue({});

    const result = await passwordReset({}, formData);

    expect(resetForgotPassword).toHaveBeenCalledWith({
      body: { email: "testuser@example.com" },
    });
    expect(result).toEqual({
      message: "Password reset instructions sent to your email.",
    });
  });

  it("should return a server validation error if the server call fails", async () => {
    const formData = new FormData();
    formData.set("email", "testuser@example.com");

    // Mock a failed password reset
    (resetForgotPassword as jest.Mock).mockResolvedValue({
      error: { detail: "User not found" },
    });

    const result = await passwordReset({}, formData);

    expect(result).toEqual({ server_validation_error: "User not found" });
    expect(resetForgotPassword).toHaveBeenCalledWith({
      body: { email: "testuser@example.com" },
    });
  });

  it("should handle unexpected errors and return server error message", async () => {
    // Mock the resetForgotPassword to throw an error
    const mockError = new Error("Network error");
    (resetForgotPassword as jest.Mock).mockRejectedValue(mockError);

    const formData = new FormData();
    formData.append("email", "testuser@example.com");

    const result = await passwordReset(undefined, formData);

    expect(result).toEqual({
      server_error: "An unexpected error occurred. Please try again later.",
    });
  });
});
