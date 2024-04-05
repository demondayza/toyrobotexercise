import Table from "cli-table3";
import { Direction } from "./types/Direction";

export interface RobotState {
  x: number;
  y: number;
  facing: Direction;
}
export interface PotholeState {
  x: number;
  y: number;
}

export class ToyRobot {
  private state: RobotState | null = null;
  private potholestate: PotholeState[] | null = [
    { x: 2, y: 4 },
    { x: 3, y: 3 },
  ];
  private readonly gridSize: number = 5;

  place(x: number, y: number, facing: Direction): string {
    if (this.isValidPosition(x, y)) {
      this.state = { x, y, facing };
      return `Placed at (${x},${y}) facing ${facing}.`;
    } else {
      console.error(`Error: Invalid placement position (${x},${y}).`);
      return `Error: Invalid placement position (${x},${y}).`;
    }
  }

  move(): void {
    if (!this.state) return;
    const { x, y, facing } = this.state;
    let newX = x,
      newY = y;

    switch (facing) {
      case "NORTH":
        newY += 1;
        break;
      case "SOUTH":
        newY -= 1;
        break;
      case "EAST":
        newX += 1;
        break;
      case "WEST":
        newX -= 1;
        break;
    }

    if (this.isValidPosition(newX, newY)) {
      this.state = { x: newX, y: newY, facing };
    } else {
      console.error(
        "Error: Move would take the robot off the grid. Or you have landed on a pothole on the board"
      );
    }
  }

  isValidPosition(x: number, y: number): boolean {
    let potholecondition = false;
    this.potholestate?.forEach((pothole) => {
      console.log(pothole);
      console.log(pothole.x === x && pothole.y === y);
      if (pothole.x === x && pothole.y === y) {
        potholecondition = true;
      }
    });

    return (
      x >= 0 &&
      x < this.gridSize &&
      y >= 0 &&
      y < this.gridSize &&
      potholecondition === false
    );
  }

  left(): void {
    this.rotate(true);
  }

  right(): void {
    this.rotate(false);
  }

  rotate(left: boolean): void {
    if (!this.state) return;
    const directions: Direction[] = ["NORTH", "EAST", "SOUTH", "WEST"];
    let index = directions.indexOf(this.state.facing);
    index = left ? index - 1 : index + 1;
    if (index < 0) index = directions.length - 1;
    if (index >= directions.length) index = 0;
    this.state.facing = directions[index];
  }

  report(): string | void {
    if (!this.state) return;
    const table = new Table();
    for (let y = this.gridSize - 1; y >= 0; y--) {
      let row = [];
      for (let x = 0; x < this.gridSize; x++) {
        if (this.state && this.state.x === x && this.state.y === y) {
          row.push(`X(${this.state.facing[0]})`);
        } else {
          row.push(" ");
        }
      }
      table.push(row);
    }
    console.log(`${this.state.x},${this.state.y},${this.state.facing}`);
    console.log(table.toString());
    return `${this.state.x},${this.state.y},${this.state.facing}`;
  }
}
