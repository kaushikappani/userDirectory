import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";
import axios from "axios";
import UserDetails from "../pages/UserDetails";


vi.mock("axios");

vi.mock("../components/UserDetailsComponent", () => ({
    default: ({ user }) => <div data-testid="user-details">User: {user.firstName} {user.lastName}</div>
}));

vi.mock("../components/UserDetailsPlaceHolder", () => ({
    UserDetailsPlaceHolder: () => <div data-testid="loading-placeholder">Loading...</div>
}));

describe("UserDetails Component", () => {
    const mockUser = {
        id: "1",
        firstName: "Appani",
        lastName: "Kaushik",
        email: "kaushikappani@gmail.com"
    };

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("renders loading placeholder while fetching user data", async () => {
        axios.get.mockReturnValue(new Promise(() => { }));

        render(
            <MemoryRouter initialEntries={["/user/1"]}>
                <Routes>
                    <Route path="/user/:id" element={<UserDetails />} />
                </Routes>
            </MemoryRouter>
        );

        expect(screen.getByTestId("loading-placeholder")).toBeInTheDocument();
    });

    test("displays user details when API call succeeds", async () => {
        axios.get.mockResolvedValue({ data: mockUser });

        render(
            <MemoryRouter initialEntries={["/user/1"]}>
                <Routes>
                    <Route path="/user/:id" element={<UserDetails />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByTestId("user-details")).toBeInTheDocument());
        expect(screen.getByText("User: Appani Kaushik")).toBeInTheDocument();
    });

    test("displays error message when API call fails", async () => {
        axios.get.mockRejectedValue({
            response: { data: { message: "User not found" } }
        });

        render(
            <MemoryRouter initialEntries={["/user/1"]}>
                <Routes>
                    <Route path="/user/:id" element={<UserDetails />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => expect(screen.getByText("User not found")).toBeInTheDocument());
    });
});
