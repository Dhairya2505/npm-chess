export type PieceName_Type = 'rook' | 'knight' | 'bishop' | 'king' | 'queen' | 'pawn'

export type Color_Type = 'b' | 'w'

export type Coordinate_Type = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface Piece_Type {
    name: PieceName_Type,
    color: Color_Type,
    position: {
        x: Coordinate_Type,
        y: Coordinate_Type
    },
    moves: number,
    increment_move(): void
}

export interface response {
    canMoveto: {
        x: Coordinate_Type,
        y: Coordinate_Type
    }[],
    canCut: {
        x: Coordinate_Type,
        y: Coordinate_Type
    }[]
}