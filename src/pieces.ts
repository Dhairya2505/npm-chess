import { Coordinate } from './types/types'
import { Piece } from './classes/classes'

export function get_knights(){
    const knights: Piece[] = []
    const coords: {
        x: Coordinate,
        y: Coordinate
    }[] = [{ x: 6, y: 0 }, { x: 1, y: 7 }, { x: 1, y: 0 }, { x: 6, y: 7 }]

    for (let i = 0; i < 4; i++) {
        if (i % 2 == 0) {
            knights.push(new Piece('knight', 'b', coords[i]))
        } else {
            knights.push(new Piece('knight', 'w', coords[i]))
        }
    }
    return knights;
}

export function get_rooks(){
    const rooks: Piece[] = []
    const coords: {
        x: Coordinate,
        y: Coordinate
    }[] = [{ x: 7, y: 0 }, { x: 0, y: 7 }, { x: 0, y: 0 }, { x: 7, y: 7 }]
    
    for (let i = 0; i < 4; i++) {
        if (i % 2 == 0) {
            rooks.push(new Piece('rook', 'b', coords[i]))
        } else {
            rooks.push(new Piece('rook', 'w', coords[i]))
        }
    }
    return rooks;
}

export function get_bishops(){
    const bishops: Piece[] = []
    const coords: {
        x: Coordinate,
        y: Coordinate
    }[] = [{ x: 5, y: 0 }, { x: 2, y: 7 }, { x: 2, y: 0 }, { x: 5, y: 7 }]

    for (let i = 0; i < 4; i++) {
        if (i % 2 == 0) {
            bishops.push(new Piece('bishop', 'b', coords[i]))
        } else {
            bishops.push(new Piece('bishop', 'w', coords[i]))
        }
    }
    return bishops;
}

export function get_pawns(){
    const pawns: Piece[] = []
    const coords: {
        x: Coordinate,
        y: Coordinate
    }[] = [{ x: 7, y: 1 }, { x: 0, y: 6 }, { x: 6, y: 1 }, { x: 1, y: 6 }, { x: 5, y: 1 }, { x: 2, y: 6 }, { x: 4, y: 1 }, { x: 3, y: 6 }, { x: 3, y: 1 }, { x: 4, y: 6 }, { x: 2, y: 1 }, { x: 5, y: 6 }, { x: 1, y: 1 }, { x: 6, y: 6 }, { x: 0, y: 1 }, { x: 7, y: 6 }]
    
    for (let i = 0; i < 16; i++) {
        if (i % 2 == 0) {
            pawns.push(new Piece('pawn', 'b', coords[i]))
        } else {
            pawns.push(new Piece('pawn', 'w', coords[i]))
        }
    }
    return pawns;
}

export function get_kings(){
    const kings: Piece[] = []
    const coords: {
        x: Coordinate,
        y: Coordinate
    }[] = [{ x: 4, y: 0 }, { x: 4, y: 7 }]
    
    for (let i = 0; i < 4; i++) {
        if (i % 2 == 0) {
            kings.push(new Piece('king', 'b', coords[i]))
        } else {
            kings.push(new Piece('king', 'w', coords[i]))
        }
    }
    return kings;
}

export function get_queens(){
    const queens: Piece[] = []
    const coords: {
        x: Coordinate,
        y: Coordinate
    }[] = [{ x: 3, y: 0 }, { x: 3, y: 7 }]
    
    for (let i = 0; i < 4; i++) {
        if (i % 2 == 0) {
            queens.push(new Piece('queen', 'b', coords[i]))
        } else {
            queens.push(new Piece('queen', 'w', coords[i]))
        }
    }
    return queens;
}