import { Color, Coordinate, PieceName } from './../types/types'

export class Piece {
    name;
    color;
    position;
    moves: number = 0;

    increment_move(){
        this.moves = this.moves+1;
    }
    
    constructor(name: PieceName, color: Color, position: {
        x: Coordinate,
        y: Coordinate
    }) {
        this.name = name
        this.color = color
        this.position = position
    }
}