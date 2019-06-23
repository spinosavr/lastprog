var LiveForm = require("./LiveForm");
var random = require("./random.js");

module.exports = class Amen extends LiveForm {
    constructor(x, y) {
        super(x, y);
        this.life = 10;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    } 
    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            amenHashiv++;
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            let amen = new Amen(x, y);
            AmenArr.push(amen);
            this.life = 10;
        }
    }
    eat() {
        let emptyCells = this.chooseCell(3);
        let newCell = random(emptyCells);

        if (newCell) {

            this.life++;
            let x = newCell[0];
            let y = newCell[1];

            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;

            for (let i in GishArr) {
                if (GishArr[i].x == x && GishArr[i].y == y) {
                    GishArr.splice(i, 1)
                }
            }
            this.x = x;
            this.y = y;

            if (this.life >= 18) {
                this.mul();
            }
        }
        else {
            this.move()
        }
    }
    move() {
        this.life--;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            matrix[y][x] = 4;
            matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if (this.life < 0) {
            this.die();
        }
    }
    die() {
        matrix[this.y][this.x] = 0;

        for (let i in AmenArr) {
            if (AmenArr[i].x == this.x && AmenArr[i].y == this.y) {
                AmenArr.splice(i, 1)
            }
        }
    }
}