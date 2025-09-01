
  export const nextPriority = (current: "high" | "medium" | "low" | undefined) => {
    if (current === "high") return "medium";
    if (current === "medium") return "low";
    return "high"; // default → start at high
  };