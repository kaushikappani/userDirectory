import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

describe("Footer Component test", () => {
    test("renders footer text correctly", () => {
        render(<Footer />);
        expect(screen.getByText("Made with ❤️ by Appani Kaushik")).toBeInTheDocument();
    });

    test("renders GitHub link correctly", () => {
        render(<Footer />);
        const githubLink = screen.getByRole("link");
        expect(githubLink).toHaveAttribute("href", "https://github.com/kaushikappani/users-api");
        expect(githubLink).toHaveAttribute("target", "_blank");
    });
});
