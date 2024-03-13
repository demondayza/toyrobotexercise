export function generateSimpleAsciiBanner(text: string): void {
  let banner = "";
  for (let i = 0; i < text.length; i++) {
    // Simple pattern for each character
    banner += `* ${text[i]} *\n`;
  }
  console.log(banner);
}

export function displayInstructions() {
  console.log(`
  Welcome to the Toy Robot Simulator!
  
  Instructions:
  - PLACE X,Y,F: Places the robot on a 5x5 grid at coordinates X,Y facing F direction (NORTH, SOUTH, EAST, WEST).
  - MOVE: Moves the robot one unit forward in the direction it is currently facing.
  - LEFT: Rotates the robot 90 degrees to the left without changing its position.
  - RIGHT: Rotates the robot 90 degrees to the right without changing its position.
  - REPORT: Outputs the current position and direction of the robot.
  - EXIT: Exits the simulator.
  
  Example:
  > PLACE 0,0,NORTH
  > MOVE
  > REPORT
  Output: 0,1,NORTH
  
  Please enter your commands below:
      `);
}
