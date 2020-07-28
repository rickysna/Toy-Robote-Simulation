# Toy Robot Simulator

player can control a robot to move around a tabletop with 5 x 5 dimensions.

## Installation

clone this repository to you local system, you have to install Node.js above v12.18.0 first.

```bash
npm install
```

## Scripts

Runs the app in the development mode:
```
npm run start
```
Launches the test runner in the interactive watch mode:
```
npm run test
```
Builds the app for production to the `build` folder:
```
npm run build
```

### Usage
The robot takes commands to move or redirected it's path. \
the first valid command is PLACE with following parameter include axis(X,Y) and path.
```
PLACE 0,0,NORTH
```
after that any command below is available
```
LEFT
RIGHT
MOVE
OUTPUT
```

you can allow to upload a txt to send a sequence of commands, the [command.txt](https://github.com/rickysna/Toy-Robote-Simulation/blob/master/commands.txt) should give an example.

## License
[MIT](https://choosealicense.com/licenses/mit/)