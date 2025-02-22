import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RecentSearch from "../pages/RecentSearch";
import { vi } from "vitest";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return { ...actual, useNavigate: () => mockNavigate };
});

describe("RecentSearch Component", () => {
    beforeEach(() => {
        vi.spyOn(Storage.prototype, "getItem").mockReturnValue(
            JSON.stringify([
                { id: 1, firstName: "William", lastName: "Gonzalez", email: "William@example.com", ssn: "123-45-6789", image: "" },
                { id: 2, firstName: "Michael", lastName: "Williams", email: "Michael@example.com", ssn: "987-65-4321", image: "" },
            ])
        );
        mockNavigate.mockClear();
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("renders Recent Searches header", () => {
        render(
            <MemoryRouter>
                <RecentSearch />
            </MemoryRouter>
        );
        expect(screen.getByText("Recent Searches")).toBeInTheDocument();
    });

    test("displays recent searches from localStorage", () => {
        render(
            <MemoryRouter>
                <RecentSearch />
            </MemoryRouter>
        );

        expect(screen.getByText("William Gonzalez")).toBeInTheDocument();
        expect(screen.getByText("Michael Williams")).toBeInTheDocument();
    });

    test("navigates when a user card is clicked", () => {
        render(
            <MemoryRouter>
                <RecentSearch />
            </MemoryRouter>
        );

        const userCard = screen.getByText("William Gonzalez");
        fireEvent.click(userCard);

        expect(mockNavigate).toHaveBeenCalledWith("/user/1");
    });
});
