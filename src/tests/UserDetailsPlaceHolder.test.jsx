import React from 'react';
import { render, screen } from "@testing-library/react";
import { UserDetailsPlaceHolder } from "../components/UserDetailsPlaceHolder";
import placeHolderImage from '../assets/ebe6eb.png';

describe("UserDetailsPlaceHolder Component", () => {
    test("renders loading placeholder correctly", () => {
        render(<UserDetailsPlaceHolder />);

        const imgElement = screen.getByAltText("Loading");
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', placeHolderImage);
        const labels = ["SSN:", "Email:", "BirthDate:", "Phone:", "University:"];
        labels.forEach(label => {
            expect(screen.getByText(label)).toBeInTheDocument();
            expect(screen.getAllByText("Loading...")).toHaveLength(labels.length + 1); // +1 for the main "Loading..." text
        });
    });
});