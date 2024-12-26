import { register } from "@/components/actions/register-action";
import { redirect } from "next/navigation";
import { registerRegister } from "@/app/clientService";

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

jest.mock("../app/clientService", () => ({
  registerRegister: jest.fn(),
}));

describe("register action", () => {
  it("should call register service action with the correct input", async () => {
    const formData = new FormData();
    formData.set("email", "a@a.com");
    formData.set("password", "Q12341414#");

    // Mock a successful register
    (registerRegister as jest.Mock).mockResolvedValue({});

    await register({}, formData);

    expect(registerRegister).toHaveBeenCalledWith({
      body: {
        email: "a@a.com",
        password: "Q12341414#",
      },
    });

    expect(redirect).toHaveBeenCalled();
  });
  it("should should return an error if the server call fails", async () => {
    const formData = new FormData();
    formData.set("email", "a@a.com");
    formData.set("password", "Q12341414#");

    // Mock a failed register
    (registerRegister as jest.Mock).mockResolvedValue({
      error: {
        detail: "REGISTER_USER_ALREADY_EXISTS",
      },
    });

    const result = await register({}, formData);

    expect(registerRegister).toHaveBeenCalledWith({
      body: {
        email: "a@a.com",
        password: "Q12341414#",
      },
    });
    expect(result).toEqual({
      server_validation_error: "REGISTER_USER_ALREADY_EXISTS",
    });
  });

  it("should return an validation error if the form is invalid", async () => {
    const formData = new FormData();
    formData.set("email", "email");
    formData.set("password", "invalid_password");

    const result = await register({}, formData);

    expect(result).toEqual({
      errors: {
        email: ["Invalid email address"],
        password: [
          "Password should contain at least one uppercase letter.",
          "Password should contain at least one special character.",
        ],
      },
    });
    expect(registerRegister).not.toHaveBeenCalledWith();
  });

  it("should handle unexpected errors and return server error message", async () => {
    // Mock the registerRegister to throw an error
    const mockError = new Error("Network error");
    (registerRegister as jest.Mock).mockRejectedValue(mockError);

    const formData = new FormData();
    formData.append("email", "testuser@example.com");
    formData.append("password", "Password123#");

    const result = await register(undefined, formData);

    expect(result).toEqual({
      server_error: "An unexpected error occurred. Please try again later.",
    });
  });
});
