import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import UserDetailsComponent from "../components/UserDetailsComponent";
import placeHolderImage from '../assets/ebe6eb.png';

const mockUser = {
    firstName: "Appani",
    lastName: "Kaushik",
    ssn: "123-45-6789",
    email: "kaushikappani@gmail.com",
    birthDate: "2002-19-04",
    phone: "7878787878",
    university: "VIT University",
    image: ""
};

Object.assign(navigator, {
    clipboard: {
        writeText: vi.fn().mockResolvedValue(),
    },
});

describe("UserDetailsComponent", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("renders user details correctly", () => {
        render(<UserDetailsComponent user={mockUser} />);

        expect(screen.getByText("Appani Kaushik")).toBeInTheDocument();
        expect(screen.getByText("123-45-6789")).toBeInTheDocument();
        expect(screen.getByText("kaushikappani@gmail.com")).toBeInTheDocument();
        expect(screen.getByText("2002-19-04")).toBeInTheDocument();
        expect(screen.getByText("7878787878")).toBeInTheDocument();
        expect(screen.getByText("VIT University")).toBeInTheDocument();
        expect(screen.getByAltText("User")).toHaveAttribute('src', placeHolderImage);
    });

    test("copies SSN to clipboard", async () => {
        render(<UserDetailsComponent user={mockUser} />);

        fireEvent.click(screen.getAllByRole('button')[0]);
        await expect(navigator.clipboard.writeText).toHaveBeenCalledWith("123-45-6789");
    });

    test("copies email to clipboard", async () => {
        render(<UserDetailsComponent user={mockUser} />);

        fireEvent.click(screen.getAllByRole('button')[1]);
        await expect(navigator.clipboard.writeText).toHaveBeenCalledWith("kaushikappani@gmail.com");
    });

    test("copies phone to clipboard", async () => {
        render(<UserDetailsComponent user={mockUser} />);

        fireEvent.click(screen.getAllByRole('button')[2]);
        await expect(navigator.clipboard.writeText).toHaveBeenCalledWith("7878787878");
    });
});