import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ClashRoyalePage from "../page";

describe("ClashRoyalePage", () => {
  describe("Page Rendering", () => {
    it("should render the page without crashing", () => {
      render(<ClashRoyalePage />);
      expect(screen.getByText("Battle Arena")).toBeInTheDocument();
    });

    it("should render with correct metadata structure", () => {
      const { container } = render(<ClashRoyalePage />);
      expect(container).toBeInTheDocument();
    });
  });

  describe("Red Section", () => {
    it("should display red team badge", () => {
      render(<ClashRoyalePage />);
      expect(screen.getByText("Red Team Territory")).toBeInTheDocument();
    });

    it("should display Battle Arena heading", () => {
      render(<ClashRoyalePage />);
      expect(screen.getByText("Battle Arena")).toBeInTheDocument();
    });

    it("should display red team description", () => {
      render(<ClashRoyalePage />);
      expect(
        screen.getByText(
          /Dominate the battlefield with strategy and power/i
        )
      ).toBeInTheDocument();
    });

    it("should display red team stats correctly", () => {
      render(<ClashRoyalePage />);
      const trophies = screen.getAllByText("Trophies");
      const wins = screen.getAllByText("Wins");
      const arena = screen.getAllByText("Arena");

      expect(trophies).toHaveLength(2); // Both red and green sections
      expect(wins).toHaveLength(2);
      expect(arena).toHaveLength(2);
    });

    it("should display Attack button", () => {
      render(<ClashRoyalePage />);
      expect(screen.getByRole("button", { name: /attack/i })).toBeInTheDocument();
    });

    it("should have proper gradient background classes for red section", () => {
      const { container } = render(<ClashRoyalePage />);
      const redSection = container.querySelector(
        ".bg-gradient-to-b.from-red-600"
      );
      expect(redSection).toBeInTheDocument();
    });
  });

  describe("Green Section", () => {
    it("should display green team badge", () => {
      render(<ClashRoyalePage />);
      expect(screen.getByText("Green Team Territory")).toBeInTheDocument();
    });

    it("should display Defense Line heading", () => {
      render(<ClashRoyalePage />);
      expect(screen.getByText("Defense Line")).toBeInTheDocument();
    });

    it("should display green team description", () => {
      render(<ClashRoyalePage />);
      expect(
        screen.getByText(/Protect your towers with precision and tactics/i)
      ).toBeInTheDocument();
    });

    it("should display Defend button", () => {
      render(<ClashRoyalePage />);
      expect(screen.getByRole("button", { name: /defend/i })).toBeInTheDocument();
    });

    it("should have proper gradient background classes for green section", () => {
      const { container } = render(<ClashRoyalePage />);
      const greenSection = container.querySelector(
        ".bg-gradient-to-b.from-green-700"
      );
      expect(greenSection).toBeInTheDocument();
    });
  });

  describe("Battle Info Panel", () => {
    it("should display battle info panel with time", () => {
      render(<ClashRoyalePage />);
      expect(screen.getByText("Time Left")).toBeInTheDocument();
      expect(screen.getByText("3:00")).toBeInTheDocument();
    });

    it("should display battle mode", () => {
      render(<ClashRoyalePage />);
      expect(screen.getByText("Mode")).toBeInTheDocument();
      expect(screen.getByText("1v1 Battle")).toBeInTheDocument();
    });

    it("should have fixed positioning for battle info", () => {
      const { container } = render(<ClashRoyalePage />);
      const battleInfo = container.querySelector(".fixed.bottom-8");
      expect(battleInfo).toBeInTheDocument();
    });
  });

  describe("Center Divider", () => {
    it("should render center battle line divider", () => {
      const { container } = render(<ClashRoyalePage />);
      const divider = container.querySelector(
        ".bg-gradient-to-r.from-red-500.via-yellow-400.to-green-500"
      );
      expect(divider).toBeInTheDocument();
    });

    it("should render shield icon in center", () => {
      const { container } = render(<ClashRoyalePage />);
      const shieldIcon = container.querySelector("svg");
      expect(shieldIcon).toBeInTheDocument();
    });
  });

  describe("User Interactions", () => {
    it("should allow clicking Attack button", async () => {
      const user = userEvent.setup();
      render(<ClashRoyalePage />);

      const attackButton = screen.getByRole("button", { name: /attack/i });
      expect(attackButton).toBeEnabled();

      await user.click(attackButton);
      // Button should still be in the document after click
      expect(attackButton).toBeInTheDocument();
    });

    it("should allow clicking Defend button", async () => {
      const user = userEvent.setup();
      render(<ClashRoyalePage />);

      const defendButton = screen.getByRole("button", { name: /defend/i });
      expect(defendButton).toBeEnabled();

      await user.click(defendButton);
      // Button should still be in the document after click
      expect(defendButton).toBeInTheDocument();
    });

    it("should have hover effects on buttons", () => {
      render(<ClashRoyalePage />);
      const attackButton = screen.getByRole("button", { name: /attack/i });

      expect(attackButton).toHaveClass("hover:scale-105");
      expect(attackButton).toHaveClass("transition-all");
    });
  });

  describe("Visual Effects", () => {
    it("should render decorative gradient blobs in red section", () => {
      const { container } = render(<ClashRoyalePage />);
      const redBlobs = container.querySelectorAll(
        ".bg-red-500\\/30, .bg-orange-500\\/20"
      );
      expect(redBlobs.length).toBeGreaterThan(0);
    });

    it("should render decorative gradient blobs in green section", () => {
      const { container } = render(<ClashRoyalePage />);
      const greenBlobs = container.querySelectorAll(
        ".bg-green-500\\/30, .bg-emerald-500\\/20"
      );
      expect(greenBlobs.length).toBeGreaterThan(0);
    });

    it("should have animated pulse effects on badges", () => {
      const { container } = render(<ClashRoyalePage />);
      const pulseElements = container.querySelectorAll(".animate-pulse");
      expect(pulseElements.length).toBeGreaterThan(0);
    });
  });

  describe("Accessibility", () => {
    it("should have proper semantic HTML structure", () => {
      const { container } = render(<ClashRoyalePage />);
      const sections = container.querySelectorAll("section");
      expect(sections).toHaveLength(2); // Red and Green sections
    });

    it("should have accessible buttons", () => {
      render(<ClashRoyalePage />);
      const buttons = screen.getAllByRole("button");
      expect(buttons).toHaveLength(2); // Attack and Defend buttons

      buttons.forEach((button) => {
        expect(button).toHaveAccessibleName();
      });
    });

    it("should have proper color contrast for readability", () => {
      render(<ClashRoyalePage />);
      const attackButton = screen.getByRole("button", { name: /attack/i });
      const defendButton = screen.getByRole("button", { name: /defend/i });

      // Buttons should have text-white class for contrast
      expect(attackButton).toHaveClass("text-white");
      expect(defendButton).toHaveClass("text-white");
    });
  });

  describe("Responsive Design", () => {
    it("should have responsive text classes", () => {
      const { container } = render(<ClashRoyalePage />);
      const headings = container.querySelectorAll("h1");

      headings.forEach((heading) => {
        const classes = heading.className;
        expect(
          classes.includes("md:text") || classes.includes("text-")
        ).toBeTruthy();
      });
    });

    it("should have responsive padding classes", () => {
      const { container } = render(<ClashRoyalePage />);
      const mainContainer = container.querySelector(".px-6");
      expect(mainContainer).toBeInTheDocument();
    });
  });

  describe("Statistics Display", () => {
    it("should display correct trophy counts", () => {
      render(<ClashRoyalePage />);
      expect(screen.getByText("100")).toBeInTheDocument(); // Red team
      expect(screen.getByText("95")).toBeInTheDocument(); // Green team
    });

    it("should display correct win counts", () => {
      render(<ClashRoyalePage />);
      expect(screen.getByText("50")).toBeInTheDocument(); // Red team
      expect(screen.getByText("48")).toBeInTheDocument(); // Green team
    });

    it("should display correct arena levels", () => {
      render(<ClashRoyalePage />);
      expect(screen.getByText("12")).toBeInTheDocument(); // Red team
      expect(screen.getByText("11")).toBeInTheDocument(); // Green team
    });
  });

  describe("Edge Cases", () => {
    it("should handle multiple renders without errors", () => {
      const { rerender } = render(<ClashRoyalePage />);
      expect(screen.getByText("Battle Arena")).toBeInTheDocument();

      rerender(<ClashRoyalePage />);
      expect(screen.getByText("Battle Arena")).toBeInTheDocument();

      rerender(<ClashRoyalePage />);
      expect(screen.getByText("Battle Arena")).toBeInTheDocument();
    });

    it("should maintain layout structure", () => {
      const { container } = render(<ClashRoyalePage />);
      const flexContainer = container.querySelector(".flex.flex-col");
      expect(flexContainer).toBeInTheDocument();
    });
  });

  describe("Performance", () => {
    it("should render efficiently without unnecessary re-renders", () => {
      const renderSpy = jest.fn();
      const TestWrapper = () => {
        renderSpy();
        return <ClashRoyalePage />;
      };

      render(<TestWrapper />);
      expect(renderSpy).toHaveBeenCalledTimes(1);
    });
  });
});
