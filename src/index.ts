import prompts from "prompts";
import { Direction } from "./types/Direction";
import { ToyRobot } from "./ToyRobot";
import { displayInstructions, generateSimpleAsciiBanner } from "./utils";

async function main() {
  const robot = new ToyRobot();

  generateSimpleAsciiBanner("Toy Robot");
  displayInstructions();

  let exit = false;

  while (!exit) {
    const response = await prompts({
      type: "text",
      name: "command",
      message:
        "Enter a command (PLACE X,Y,F | MOVE | LEFT | RIGHT | REPORT | EXIT):",
    });

    if (response.command.toUpperCase() === "EXIT") {
      exit = true;
      continue;
    }

    if (response.command.toUpperCase().startsWith("PLACE")) {
      const [, x, y, facing] = response.command.split(/[\s,]+/);
      robot.place(parseInt(x, 10), parseInt(y, 10), facing as Direction);
    } else {
      switch (response.command.toUpperCase()) {
        case "MOVE":
          robot.move();
          break;
        case "LEFT":
          robot.rotate(true);
          break;
        case "RIGHT":
          robot.rotate(false);
          break;
        case "REPORT":
          robot.report();
          break;
      }
    }
  }
}

main().then(() => console.log("Toy Robot Simulation ended."));
