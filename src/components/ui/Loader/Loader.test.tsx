import { render, screen, fireEvent } from "@testing-library/react";
import Loader from "./Loader";
import { afterAll, describe, expect, it, vi } from "vitest";

vi.useFakeTimers();

afterAll(() => {});

describe("Loader", () => {
  const waitingMsg = "Are you still there?";

  it("renders the loading message", () => {
    render(<Loader hasDialog={false} />);
    const loadingMessage = screen.getByText("Loading...");
    expect(loadingMessage).toBeInTheDocument();
  });

  it("does not render the dialog by default", () => {
    render(<Loader hasDialog={false} />);
    const dialog = screen.queryByText(waitingMsg);
    expect(dialog).toBeNull();
  });

  it("renders the dialog when hasDialog is true", async () => {
    render(<Loader hasDialog={true} />);
    await vi.advanceTimersByTimeAsync(1000);
    const dialog = screen.getByText(waitingMsg);
    expect(dialog).toBeInTheDocument();
  });

  it.todo(
    "calls handleWait when 'Keep waiting' button is clicked",
    async () => {
      render(<Loader hasDialog={true} />);
      await vi.advanceTimersByTimeAsync(1000);
      const keepWaitingButton = screen.getByText("Keep waiting");
      fireEvent.click(keepWaitingButton);
      await vi.advanceTimersByTimeAsync(1000);
      const dialog = screen.getByText(waitingMsg);
      expect(dialog).not.toBeInTheDocument();
    }
  );

  it.todo("calls handleLeave when 'Leave' button is clicked", () => {
    render(<Loader hasDialog={true} />);
    const leaveButton = screen.getByText("Leave");
    fireEvent.click(leaveButton);
    // Add your assertions here
  });
});
