import { describe, it, expect } from "bun:test";
import { ToyRobot } from "../src/ToyRobot";

describe("Toy Robot Simulator Tests", () => {
  it("Test Case 1: Valid Placement and Movement", () => {
    const robot = new ToyRobot();
    robot.place(1, 2, "EAST");
    robot.move();
    robot.move();
    robot.left();
    robot.move();
    const report = robot.report();
    expect(report).toBe("3,3,NORTH");
  });

  it("Test Case 2: Invalid Placement", () => {
    const robot = new ToyRobot();
    const result = robot.place(5, 5, "NORTH");
    expect(result).toBe("Error: Invalid placement position (5,5).");
  });

  it("Test Case 3: Movement Prevented at Edge", () => {
    const robot = new ToyRobot();
    robot.place(0, 0, "SOUTH");
    robot.move();
    const report = robot.report();
    expect(report).toBe("0,0,SOUTH");
  });

  it("Test Case 4: Ignoring Commands Before Valid PLACE", () => {
    const robot = new ToyRobot();
    robot.move(); // Should be ignored
    robot.left(); // Should be ignored
    robot.place(0, 0, "NORTH");
    const report = robot.report();
    expect(report).toBe("0,0,NORTH");
  });

  it("Test Case 5: Sequential PLACE Commands", () => {
    const robot = new ToyRobot();
    robot.place(0, 0, "NORTH");
    robot.move();
    robot.place(2, 2, "EAST");
    robot.move();
    const report = robot.report();
    expect(report).toBe("3,2,EAST");
  });

  it("Test Case 6: Rotation Logic", () => {
    const robot = new ToyRobot();
    robot.place(1, 1, "EAST");
    robot.left();
    robot.left();
    const report = robot.report();
    expect(report).toBe("1,1,WEST");
  });

  it("Test Case 7: Complex Movement Around the Grid", () => {
    const robot = new ToyRobot();
    robot.place(1, 2, "NORTH");
    robot.move();
    robot.right();
    robot.move();
    robot.move();
    robot.left();
    robot.move();
    const report = robot.report();
    expect(report).toBe("3,4,NORTH");
  });

  it("Test Case 8: Exiting the Simulation", () => {
    const robot = new ToyRobot();
    robot.place(0, 0, "NORTH");
    robot.move();
    // Assuming an exit or quit method that stops the simulation
    // The test for EXIT command might be conceptual since the actual exit process might depend on your application's design
    const report = robot.report();
    expect(report).toBe("0,1,NORTH");
    // This conceptual test assumes you have some mechanism to capture the exit intent
  });
});
