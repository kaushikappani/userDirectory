import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";

vi.mock("axios");

describe("NavBar Component", () => {
    test("renders NavBar correctly", () => {
        render(
            <BrowserRouter>
                <NavBar darkMode={false} setDarkMode={() => { }} />
            </BrowserRouter>
        );
        expect(screen.getByRole("button", { name: "Load Data" })).toBeInTheDocument();
    });

    test("toggles dark mode", () => {
        const setDarkModeMock = vi.fn();
        render(
            <BrowserRouter>
                <NavBar darkMode={false} setDarkMode={setDarkModeMock} />
            </BrowserRouter>
        );

        const toggleButton = screen.getByLabelText("Toggle Theme");
        fireEvent.click(toggleButton);
        expect(setDarkModeMock).toHaveBeenCalledWith(true);
    });

    test("shows loading spinner when loading data", async () => {
        axios.post.mockResolvedValueOnce({ status: 200 });

        render(
            <BrowserRouter>
                <NavBar darkMode={false} setDarkMode={() => { }} />
            </BrowserRouter>
        );

        const loadDataButton = screen.getByRole("button", { name: "Load Data"});
        fireEvent.click(loadDataButton);

        expect(screen.getByRole("progressbar")).toBeInTheDocument();
        await waitFor(() => expect(screen.queryByRole("progressbar")).not.toBeInTheDocument());
    });

    test("displays success message when data loads successfully", async () => {
        axios.post.mockResolvedValueOnce({ status: 200 });

        render(
            <BrowserRouter>
                <NavBar darkMode={false} setDarkMode={() => { }} />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByRole("button", { name: "Load Data" }));

        await waitFor(() => {
            expect(screen.getByText("Users loaded successfully")).toBeInTheDocument();
        });
    });

    test("displays error message when data fails to load", async () => {
        axios.post.mockRejectedValueOnce(new Error("Request failed"));

        render(
            <BrowserRouter>
                <NavBar darkMode={false} setDarkMode={() => { }} />
            </BrowserRouter>
        );

        fireEvent.click(screen.getByRole("button", { name: "Load Data" }));

        await waitFor(() => {
            expect(screen.getByText("Error loading users")).toBeInTheDocument();
        });
    });
});
