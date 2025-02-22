import React from 'react';
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import config from '../../config';

vi.mock("axios");

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe("SearchBar Component", () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    test("renders search bar correctly", () => {
        render(
            <MemoryRouter>
                <SearchBar />
            </MemoryRouter>
        );
        expect(screen.getByLabelText("Search users...")).toBeInTheDocument();
    });

    test("handles user input and search", async () => {
        axios.get.mockResolvedValueOnce({ data: [{ id: 1, firstName: "Appani", lastName: "Kaushik", email: "kaushikappani@gmail.com", ssn: "123-45-6789", image: "" }] });

        render(
            <MemoryRouter>
                <SearchBar />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText("Search users..."), { target: { value: "Appani" } });

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(`${config.API_BASE_URL}?search=Appani`);
        });

        expect(screen.getByText("kaushikappani@gmail.com - 123-45-6789")).toBeInTheDocument();
    });

    test("handles user selection", async () => {
        axios.get.mockResolvedValueOnce({ data: [{ id: 1, firstName: "Appani", lastName: "Kaushik", email: "kaushikappani@gmail.com", ssn: "123-45-6789", image: "" }] });

        render(
            <MemoryRouter>
                <SearchBar />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText("Search users..."), { target: { value: "Appani" } });

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(`${config.API_BASE_URL}?search=Appani`);
        });

        fireEvent.click(screen.getByText("kaushikappani@gmail.com - 123-45-6789"));

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/user/1");
        });
    });

    test("displays error message on API failure", async () => {
        axios.get.mockRejectedValueOnce(new Error("Failed to load users"));

        render(
            <MemoryRouter>
                <SearchBar />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText("Search users..."), { target: { value: "Appani" } });

        await waitFor(() => {
            expect(axios.get).toHaveBeenCalledWith(`${config.API_BASE_URL}?search=Appani`);
        });

        expect(screen.getByText("Failed to load users. Please try again.")).toBeInTheDocument();
    });
});