
const TILE_SIZE = 30;
const FPS = 30;
const SLEEP = 1000 / FPS;

enum RawTile {
  AIR,
  FLUX,
  UNBREAKABLE,
  PLAYER,
  STONE, FALLING_STONE,
  BOX, FALLING_BOX,
  KEY1, LOCK1,
  KEY2, LOCK2
}

interface Tile2 {
  isAir(): boolean,
  isPlayer(): boolean,
  isFlux(): boolean,
  isUnbreakable(): boolean,
  isFallingBox(): boolean,
  isFallingStone(): boolean,
  isKey1(): boolean,
  isLock1(): boolean,
  isKey2(): boolean,
  isLock2(): boolean,
  draw(g: CanvasRenderingContext2D, x: number, y: number): void,
  isEdible(): boolean,
  isPushable(): boolean,
  isStony(): boolean,
  isBoxy(): boolean,
  moveHorizontal(dx: number): void
  moveVertical(dy: number): void
}

class Air implements Tile2 {
  isAir() { return true }
  isPlayer() { return false }
  isFlux() { return false }
  isUnbreakable() { return false }
  isFallingBox() { return false }
  isFallingStone() { return false }
  isKey1() { return false }
  isLock1() { return false }
  isKey2() { return false }
  isLock2() { return false }
  draw(g: CanvasRenderingContext2D, x: number, y: number) { }
  isEdible() { return true }
  isPushable() { return false }
  moveHorizontal(dx: number) {
    moveToTile(playerx + dx, playery);
  }
  moveVertical(dy: number) {
    moveToTile(playerx, playery + dy);
  }
  isStony() { return false }
  isBoxy() { return false }
}

class Player implements Tile2 {
  isAir() { return false }
  isPlayer() { return true }
  isFlux() { return false }
  isUnbreakable() { return false }
  isFallingBox() { return false }
  isFallingStone() { return false }
  isKey1() { return false }
  isLock1() { return false }
  isKey2() { return false }
  isLock2() { return false }
  draw(g: CanvasRenderingContext2D, x: number, y: number) { }
  isEdible() { return false }
  isPushable() { return false }
  moveHorizontal(dx: number) {
  }
  moveVertical(dy: number) {
  }
  isStony() { return false }
  isBoxy() { return false }
}

class Flux implements Tile2 {
  isAir() { return false }
  isPlayer() { return false }
  isFlux() { return true }
  isUnbreakable() { return false }
  isFallingBox() { return false }
  isFallingStone() { return false }
  isKey1() { return false }
  isLock1() { return false }
  isKey2() { return false }
  isLock2() { return false }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = "#ccffcc";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible() { return true }
  isPushable() { return false }
  moveHorizontal(dx: number) {
    moveToTile(playerx + dx, playery);
  }
  moveVertical(dy: number) {
    moveToTile(playerx, playery + dy);
  }
  isStony() { return false }
  isBoxy() { return false }
}

class Unbreakable implements Tile2 {
  isAir() { return false }
  isPlayer() { return false }
  isFlux() { return false }
  isUnbreakable() { return true }
  isFallingBox() { return false }
  isFallingStone() { return false }
  isKey1() { return false }
  isLock1() { return false }
  isKey2() { return false }
  isLock2() { return false }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = "#999999";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible() { return false }
  isPushable() { return false }
  moveHorizontal(dx: number) {
  }
  moveVertical(dy: number) {
  }
  isStony() { return false }
  isBoxy() { return false }
}

class Box implements Tile2 {
  private falling: boolean

  constructor() {
    this.falling = false
  }
  isAir() { return false }
  isPlayer() { return false }
  isFlux() { return false }
  isUnbreakable() { return false }
  isFallingBox() { return this.falling }
  isFallingStone() { return false }
  isKey1() { return false }
  isLock1() { return false }
  isKey2() { return false }
  isLock2() { return false }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = "#8b4513";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible() { return false }
  isPushable() { return true }
  moveHorizontal(dx: number) {
    if(this.isFallingBox() === false) {
      if (map[playery][playerx + dx + dx].isAir()
          && !map[playery + 1][playerx + dx].isAir()) {
        map[playery][playerx + dx + dx] = map[playery][playerx + dx];
        moveToTile(playerx + dx, playery);
      } else if (this.isFallingBox() === true) {

      }
    }
  }
  moveVertical(dy: number) {
  }
  isStony() { return false }
  isBoxy() { return true }
}

class FallingBox implements Tile2 {
  private falling: boolean

  constructor() {
    this.falling = true
  }
  isAir() { return false }
  isPlayer() { return false }
  isFlux() { return false }
  isUnbreakable() { return false }
  isFallingBox() { return true }
  isFallingStone() { return false }
  isKey1() { return false }
  isLock1() { return false }
  isKey2() { return false }
  isLock2() { return false }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = "#8b4513";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible() { return false }
  isPushable() { return false }
  moveHorizontal(dx: number) {
    if(this.isFallingBox() === true) {

    } else if (this.isFallingBox() === false) {
      if (map[playery][playerx + dx + dx].isAir()
          && !map[playery + 1][playerx + dx].isAir()) {
        map[playery][playerx + dx + dx] = map[playery][playerx + dx];
        moveToTile(playerx + dx, playery);
      }
    }
  }
  moveVertical(dy: number) {
  }
  isStony() { return false }
  isBoxy() { return true }
}

interface FallingState {
  isFalling(): boolean,
  moveHorizontal(dx: number): void
}

class Falling implements FallingState {
  isFalling() { return true }
  moveHorizontal(dx: number) {

  }
}

class Resting implements FallingState {
  isFalling() { return false }
  moveHorizontal(dx: number) {
    if (map[playery][playerx + dx + dx].isAir()
        && !map[playery + 1][playerx + dx].isAir()) {
      map[playery][playerx + dx + dx] = map[playery][playerx + dx];
      moveToTile(playerx + dx, playery);
    }
  }
}

class Stone implements Tile2 {
  constructor(private falling: FallingState) {
  }
  isAir() { return false }
  isPlayer() { return false }
  isFlux() { return false }
  isUnbreakable() { return false }
  isFallingBox() { return false }
  isFallingStone() { return this.falling.isFalling() }
  isKey1() { return false }
  isLock1() { return false }
  isKey2() { return false }
  isLock2() { return false }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = "#0000cc";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible() { return false }
  isPushable() { return true }
  moveHorizontal(dx: number) {
    this.falling.moveHorizontal(dx)
  }
  moveVertical(dy: number) {
  }
  isStony() { return true }
  isBoxy() { return false }
}

class Key1 implements Tile2 {
  isAir() { return false }
  isPlayer() { return false }
  isFlux() { return false }
  isUnbreakable() { return false }
  isFallingBox() { return false }
  isFallingStone() { return false }
  isKey1() { return true }
  isLock1() { return false }
  isKey2() { return false }
  isLock2() { return false }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = "#ffcc00";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible() { return false }
  isPushable() { return false }
  moveHorizontal(dx: number) {
    removeLock1();
    moveToTile(playerx + dx, playery);
  }
  moveVertical(dy: number) {
    removeLock1();
    moveToTile(playerx, playery + dy);
  }
  isStony() { return false }
  isBoxy() { return false }
}

class Lock1 implements Tile2 {
  isAir() { return false }
  isPlayer() { return false }
  isFlux() { return false }
  isUnbreakable() { return false }
  isFallingBox() { return false }
  isFallingStone() { return false }
  isKey1() { return false }
  isLock1() { return true }
  isKey2() { return false }
  isLock2() { return false }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = "#ffcc00";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible() { return false }
  isPushable() { return false }
  moveHorizontal(dx: number) {
  }
  moveVertical(dy: number) {
  }
  isStony() { return false }
  isBoxy() { return false }
}

class Key2 implements Tile2 {
  isAir() { return false }
  isPlayer() { return false }
  isFlux() { return false }
  isUnbreakable() { return false }
  isFallingBox() { return false }
  isFallingStone() { return false }
  isKey1() { return false }
  isLock1() { return false }
  isKey2() { return true }
  isLock2() { return false }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = "#00ccff";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible() { return false }
  isPushable() { return false }
  moveHorizontal(dx: number) {
    removeLock2();
    moveToTile(playerx + dx, playery);
  }
  moveVertical(dy: number) {
    removeLock2();
    moveToTile(playerx, playery + dy);
  }
  isStony() { return false }
  isBoxy() { return false }
}

class Lock2 implements Tile2 {
  isAir() { return false }
  isPlayer() { return false }
  isFlux() { return false }
  isUnbreakable() { return false }
  isFallingBox() { return false }
  isFallingStone() { return false }
  isKey1() { return false }
  isLock1() { return false }
  isKey2() { return false }
  isLock2() { return true }
  draw(g: CanvasRenderingContext2D, x: number, y: number) {
    g.fillStyle = "#00ccff";
    g.fillRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }
  isEdible() { return false }
  isPushable() { return false }
  moveHorizontal(dx: number) {
  }
  moveVertical(dy: number) {
  }
  isStony() { return false }
  isBoxy() { return false }
}

enum RawInput {
  UP, DOWN, LEFT, RIGHT
}

interface Input {
  isUp(): boolean,
  isDown(): boolean,
  isLeft(): boolean,
  isRight(): boolean,
  handle(): void
}

class Up implements Input {
  isUp() { return true }
  isDown() { return false }
  isLeft() { return false }
  isRight() { return false }
  handle() {
    map[playery - 1][playerx].moveVertical(-1);
  }
}

class Down implements Input {
  isUp() { return false }
  isDown() { return true }
  isLeft() { return false }
  isRight() { return false }
  handle() {
    map[playery + 1][playerx].moveVertical(1);
  }
}

class Left implements Input {
  isUp() { return false }
  isDown() { return false }
  isLeft() { return true }
  isRight() { return false }
  handle() {
    map[playery][playerx - 1].moveHorizontal(-1);
  }
}

class Right implements Input {
  isUp() { return false }
  isDown() { return false }
  isLeft() { return false }
  isRight() { return true }
  handle() {
    map[playery][playerx + 1].moveHorizontal(1);
  }
}

let playerx = 1;
let playery = 1;
let rawMap: RawTile[][] = [
  [2, 2, 2, 2, 2, 2, 2, 2],
  [2, 3, 0, 1, 1, 2, 0, 2],
  [2, 4, 2, 6, 1, 2, 0, 2],
  [2, 8, 4, 1, 1, 2, 0, 2],
  [2, 4, 1, 1, 1, 9, 0, 2],
  [2, 2, 2, 2, 2, 2, 2, 2],
];

let map: Tile2[][];

function assertExhausted(x: never) : never {
  throw new Error("Unexpected object: " + x);
}

function transformTile(tile: RawTile) {
  switch (tile) {
    case RawTile.AIR: return new Air();
    case RawTile.FLUX: return new Flux();
    case RawTile.UNBREAKABLE: return new Unbreakable();
    case RawTile.PLAYER: return new Player();
    case RawTile.STONE: return new Stone(new Resting());
    case RawTile.FALLING_STONE: return new Stone(new Falling());
    case RawTile.BOX: return new Box(false);
    case RawTile.FALLING_BOX: return new FallingBox(true);
    case RawTile.KEY1: return new Key1();
    case RawTile.LOCK1: return new Lock1();
    case RawTile.KEY2: return new Key2();
    case RawTile.LOCK2: return new Lock2();
    default: assertExhausted(tile);
  }
}

function transformMap() {
  map = new Array(rawMap.length);
  for (let y = 0; y < rawMap.length; y++) {
    map[y] = new Array(rawMap[y].length);
    for(let x = 0; x < rawMap[y].length; x++) {
      map[y][x] = transformTile(rawMap[y][x])
    }
  }
}

let inputs: Input[] = [];

function removeLock1() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].isLock1()) {
        map[y][x] = new Air();
      }
    }
  }
}

function removeLock2() {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x].isLock2()) {
        map[y][x] = new Air();
      }
    }
  }
}

function moveToTile(newx: number, newy: number) {
  map[playery][playerx] = new Air();
  map[newy][newx] = new Player();
  playerx = newx;
  playery = newy;
}

function handleInput(current: Input) {
  current.handle()
}

function handleInputs() {
  while (inputs.length > 0) {
    let current = inputs.pop();
    handleInput(current);
  }
}

function updateTile(x: number, y: number) {
  if ((map[y][x].isStony())
      && map[y + 1][x].isAir()) {
    map[y + 1][x] = new Stone(new Falling());
    map[y][x] = new Air();
  } else if ((map[y][x].isBoxy())
      && map[y + 1][x].isAir()) {
    map[y + 1][x] = new FallingBox(true);
    map[y][x] = new Air();
  } else if (map[y][x].isFallingStone()) {
    map[y][x] = new Stone(new Resting());
  } else if (map[y][x].isFallingBox()) {
    map[y][x] = new Box(false);
  }
}

function updateMap() {
  for (let y = map.length - 1; y >= 0; y--) {
    for (let x = 0; x < map[y].length; x++) {
      updateTile(x, y);
    }
  }
}

function update() {
  handleInputs();
  updateMap();
}

function drawMap(g: CanvasRenderingContext2D) {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      map[y][x].draw(g, x, y);
    }
  }
}

function drawPlayer(g: CanvasRenderingContext2D) {
  g.fillStyle = "#ff0000";
  g.fillRect(playerx * TILE_SIZE, playery * TILE_SIZE, TILE_SIZE, TILE_SIZE);
}

function createGraphics() {
  let canvas = document.getElementById("GameCanvas") as HTMLCanvasElement;
  let g = canvas.getContext("2d");

  g.clearRect(0, 0, canvas.width, canvas.height);
  return g;
}

function draw() {
  let g = createGraphics();
  drawMap(g);
  drawPlayer(g);
}

function gameLoop() {
  let before = Date.now();
  update();
  draw();
  let after = Date.now();
  let frameTime = after - before;
  let sleep = SLEEP - frameTime;
  setTimeout(() => gameLoop(), sleep);
}

window.onload = () => {
  transformMap()
  gameLoop();
}

const LEFT_KEY = "ArrowLeft";
const UP_KEY = "ArrowUp";
const RIGHT_KEY = "ArrowRight";
const DOWN_KEY = "ArrowDown";
window.addEventListener("keydown", e => {
  if (e.key === LEFT_KEY || e.key === "a") inputs.push(new Left());
  else if (e.key === UP_KEY || e.key === "w") inputs.push(new Up());
  else if (e.key === RIGHT_KEY || e.key === "d") inputs.push(new Right());
  else if (e.key === DOWN_KEY || e.key === "s") inputs.push(new Down());
});
