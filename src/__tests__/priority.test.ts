import { nextPriority } from "@kanban/utils/priority";

describe("nextPriority", () => {
  it("cycles from high → medium", () => {
    expect(nextPriority("high")).toBe("medium");
  });

  it("cycles from medium → low", () => {
    expect(nextPriority("medium")).toBe("low");
  });

  it("cycles from low → high", () => {
    expect(nextPriority("low")).toBe("high");
  });

  it("defaults undefined → high", () => {
    expect(nextPriority(undefined)).toBe("high");
  });
});