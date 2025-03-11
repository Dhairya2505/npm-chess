export type PieceName_Type = 'rook' | 'knight' | 'bishop' | 'king' | 'queen' | 'pawn'

export type Color_Type = 'b' | 'w'

export type Coordinate_Type = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface Piece_Type {
    name: string,
    color: string,
    position: {
        x: Coordinate_Type,
        y: Coordinate_Type
    },
    moves: number,
    increment_move(): void
}

class Piece {
    name;
    color;
    position;
    moves: number = 0;

    increment_move(){
        this.moves = this.moves+1;
    }
    
    constructor(name: PieceName_Type, color: Color_Type, position: {
        x: Coordinate_Type,
        y: Coordinate_Type
    }) {
        this.name = name
        this.color = color
        this.position = position
    }
}

export class Board {
    board: Array<Array<null | Piece>>;

    #validPositions(current_x: Coordinate_Type, current_y: Coordinate_Type, goal_x: Coordinate_Type, goal_y: Coordinate_Type) {
        if (!(current_x >= 0 && current_x <= 7)) return false;
        if (!(current_y >= 0 && current_y <= 7)) return false;
        if (!(goal_x >= 0 && goal_x <= 7)) return false;
        if (!(goal_y >= 0 && goal_y <= 7)) return false;
        if (current_x == goal_x && current_y == goal_y) return false;
        return true;
    }

    #selfPiecePresent(current_x: Coordinate_Type, current_y: Coordinate_Type, goal_x: Coordinate_Type, goal_y: Coordinate_Type) {
        if (this.board[current_x][current_y]?.color == this.board[goal_x][goal_y]?.color) {
            return false;
        } else {
            return true;
        }
    }

    #betweenBishop(current_x: Coordinate_Type, current_y: Coordinate_Type, goal_x: Coordinate_Type, goal_y: Coordinate_Type) {
        if (goal_x > current_x && goal_y > current_y) {
            for (let i = 1; i < Math.abs(goal_x - current_x); i++) {
                if (this.board[current_x + i][current_y + i] != null) {
                    return false;
                }
            }
            if (!(this.board[goal_x][goal_y] == null || this.board[goal_x][goal_y].color != this.board[current_x][current_y]?.color)) {
                return false;
            }
            return true;
        } else if (goal_x < current_x && goal_y > current_y) {
            for (let i = 1; i < Math.abs(goal_x - current_x); i++) {
                if (this.board[current_x - i][current_y + i] != null) {
                    return false;
                }
            }
            if (!(this.board[goal_x][goal_y] == null || this.board[goal_x][goal_y].color != this.board[current_x][current_y]?.color)) {
                return false;
            }
            return true;
        } else if (goal_x < current_x && goal_y < current_y) {
            for (let i = 1; i < Math.abs(goal_x - current_x); i++) {
                if (this.board[current_x - i][current_y - i] != null) {
                    return false;
                }
            }
            if (!(this.board[goal_x][goal_y] == null || this.board[goal_x][goal_y].color != this.board[current_x][current_y]?.color)) {
                return false;
            }
            return true;
        } else if (goal_x > current_x && goal_y < current_y) {
            for (let i = 1; i < Math.abs(goal_x - current_x); i++) {
                if (this.board[current_x + i][current_y - i] != null) {
                    return false;
                }
            }
            if (!(this.board[goal_x][goal_y] == null || this.board[goal_x][goal_y].color != this.board[current_x][current_y]?.color)) {
                return false;
            }
            return true;
        } else {
            return false;
        }
    }

    #validRookMove(current_x: Coordinate_Type, current_y: Coordinate_Type, goal_x: Coordinate_Type, goal_y: Coordinate_Type) {
        if (current_x == goal_x) {
            if (current_y < goal_y) {
                for (let i = current_y + 1; i < goal_y; i++) {
                    if (this.board[goal_x][i] != null) {
                        return [0, null];
                    }
                }
                if (!(this.board[goal_x][goal_y] == null || this.board[goal_x][goal_y].color != this.board[current_x][current_y]?.color)) {
                    return [0, null];
                }
                const piece = this.board[current_x][current_y];
                this.board[current_x][current_y] = null;
                this.board[goal_x][goal_y] = piece;
                this.board[goal_x][goal_y]?.increment_move();
                return [1,this.board];
            } else if (current_y > goal_y) {
                for (let i = current_y - 1; i > goal_y; i--) {
                    if (this.board[goal_x][i] != null) {
                        return [0, null];
                    }
                }
                if (!(this.board[goal_x][goal_y] == null || this.board[goal_x][goal_y].color != this.board[current_x][current_y]?.color)) {
                    return [0, null];
                }
                const piece = this.board[current_x][current_y];
                this.board[current_x][current_y] = null;
                this.board[goal_x][goal_y] = piece;
                this.board[goal_x][goal_y]?.increment_move();
                return [1,this.board];
            } else {
                return [0, null];
            }
        } else if (current_y == goal_y) {
            if (current_x < goal_x) {
                for (let i = current_x + 1; i < goal_x; i++) {
                    if (this.board[i][goal_y] != null) {
                        return [0, null];
                    }
                }
                if (!(this.board[goal_x][goal_y] == null || this.board[goal_x][goal_y].color != this.board[current_x][current_y]?.color)) {
                    return [0, null];
                }
                const piece = this.board[current_x][current_y];
                this.board[current_x][current_y] = null;
                this.board[goal_x][goal_y] = piece;
                this.board[goal_x][goal_y]?.increment_move();
                return [1,this.board];
            } else if (current_x > goal_x) {
                for (let i = current_x - 1; i > goal_x; i--) {
                    if (this.board[i][goal_y] != null) {
                        return [0, null];
                    }
                }
                if (!(this.board[goal_x][goal_y] == null || this.board[goal_x][goal_y].color != this.board[current_x][current_y]?.color)) {
                    return [0, null];
                }
                const piece = this.board[current_x][current_y];
                this.board[current_x][current_y] = null;
                this.board[goal_x][goal_y] = piece;
                this.board[goal_x][goal_y]?.increment_move();
                return [1,this.board];
            } else {
                return [0, null];
            }
        } else {
            return [0, null];
        }
    }

    #validBishopMove(current_x: Coordinate_Type, current_y: Coordinate_Type, goal_x: Coordinate_Type, goal_y: Coordinate_Type) {
        if (this.#betweenBishop(current_x, current_y, goal_x, goal_y)) {
            if(Math.abs(current_x - goal_x) == Math.abs(current_y-goal_y)){
                const piece = this.board[current_x][current_y];
                this.board[current_x][current_y] = null;
                this.board[goal_x][goal_y] = piece;
                this.board[goal_x][goal_y]?.increment_move();
                return [1,this.board];
            }
        }
        return [0, null];
    }

    #validPawnMove(current_x: Coordinate_Type, current_y: Coordinate_Type, goal_x: Coordinate_Type, goal_y: Coordinate_Type) {
        const color = this.board[current_x][current_y]?.color
        switch (color) {

            case "b":
                if (!(goal_x >= current_x + 1 && goal_x <= current_x + 2)) return [0, null];
                if (this.board[current_x][current_y]?.moves == 0) {
                    if (!(goal_x >= current_x + 1 && goal_x <= current_x + 2)) return [0, null];
                    const possible_coords = [[1, -1], [1, 0], [1, 1]];
                    for (let i = 0; i < 3; i++) {
                        if (goal_x == current_x + possible_coords[i][0] && goal_y == current_y + possible_coords[i][1]) {
                            if (Math.abs(possible_coords[i][1]) == 1) {
                                if (this.board[goal_x][goal_y] && this.board[goal_x][goal_y].color != this.board[current_x][current_y].color) {
                                    const piece = this.board[current_x][current_y];
                                    this.board[current_x][current_y] = null;
                                    this.board[goal_x][goal_y] = piece;
                                    this.board[goal_x][goal_y]?.increment_move();
                                    return [1,this.board];;
                                } else {
                                    return [0, null];
                                }
                            } else {
                                const piece = this.board[current_x][current_y];
                                this.board[current_x][current_y] = null;
                                this.board[goal_x][goal_y] = piece;
                                this.board[goal_x][goal_y]?.increment_move();
                                return [1,this.board];;
                            }
                        }
                    }
                    if (goal_x == current_x + 2 && goal_y == current_y) {
                        if (this.board[current_x + 1][current_y] == null) {
                            const piece = this.board[current_x][current_y];
                            this.board[current_x][current_y] = null;
                            this.board[goal_x][goal_y] = piece;
                            this.board[goal_x][goal_y]?.increment_move();
                            return [1,this.board];;
                        } else {
                            return [0, null];
                        }
                    }
                    return [0, null];
                } else {
                    if (!(goal_x == current_x + 1)) return [0, null];
                    const possible_coords = [[1, -1], [1, 0], [1, 1]];
                    for (let i = 0; i < 3; i++) {
                        if (goal_x == current_x + possible_coords[i][0] && goal_y == current_y + possible_coords[i][1]) {
                            if(Math.abs(possible_coords[i][1]) == 1){
                                if (this.board[goal_x][goal_y] && this.board[goal_x][goal_y].color != this.board[current_x][current_y]?.color) {
                                    const piece = this.board[current_x][current_y];
                                    this.board[current_x][current_y] = null;
                                    this.board[goal_x][goal_y] = piece;
                                    this.board[goal_x][goal_y]?.increment_move();
                                    return [1,this.board];;
                                } else {
                                    return [0, null];
                                }
                            } else {
                                const piece = this.board[current_x][current_y];
                                this.board[current_x][current_y] = null;
                                this.board[goal_x][goal_y] = piece;
                                this.board[goal_x][goal_y]?.increment_move();
                                return [1,this.board];;
                            }
                        }
                    }
                    return [0, null];
                }
                break;

            case "w":
                if (!(goal_x <= current_x - 1 && goal_x >= current_x - 2)) return [0, null];
                if (this.board[current_x][current_y]?.moves == 0) {
                    if (!(goal_x <= current_x - 1 && goal_x >= current_x - 2)) return [0, null];
                    const possible_coords = [[-1, -1], [-1, 0], [-1, 1]];
                    for (let i = 0; i < 3; i++) {
                        if (goal_x == current_x + possible_coords[i][0] && goal_y == current_y + possible_coords[i][1]) {
                            if (Math.abs(possible_coords[i][1]) == 1) {
                                if (this.board[goal_x][goal_y] && this.board[goal_x][goal_y].color != this.board[current_x][current_y]?.color) {
                                    const piece = this.board[current_x][current_y];
                                    this.board[current_x][current_y] = null;
                                    this.board[goal_x][goal_y] = piece;
                                    this.board[goal_x][goal_y]?.increment_move();
                                    return [1,this.board];;
                                } else {
                                    return [0, null];
                                }
                            } else {
                                const piece = this.board[current_x][current_y];
                                this.board[current_x][current_y] = null;
                                this.board[goal_x][goal_y] = piece;
                                this.board[goal_x][goal_y]?.increment_move();
                                return [1,this.board];;
                            }
                        }
                    }
                    if (goal_x == current_x - 2 && goal_y == current_y) {
                        if (this.board[current_x - 1][current_y] == null) {
                            const piece = this.board[current_x][current_y];
                            this.board[current_x][current_y] = null;
                            this.board[goal_x][goal_y] = piece;
                            this.board[goal_x][goal_y]?.increment_move();
                            return [1,this.board];;
                        }
                        else {
                            return [0, null];
                        }
                    }
                    return [0, null];
                } else {
                    if (!(goal_x == current_x - 1)) return [0, null];
                    const possible_coords = [[-1, -1], [-1, 0], [-1, 1]];
                    for (let i = 0; i < 3; i++) {
                        if (goal_x == current_x + possible_coords[i][0] && goal_y == current_y + possible_coords[i][1]) {
                            if (Math.abs(possible_coords[i][1]) == 1) {
                                if (this.board[goal_x][goal_y] && this.board[goal_x][goal_y].color != this.board[current_x][current_y]?.color) {
                                    const piece = this.board[current_x][current_y];
                                    this.board[current_x][current_y] = null;
                                    this.board[goal_x][goal_y] = piece;
                                    this.board[goal_x][goal_y]?.increment_move();
                                    return [1,this.board];;
                                } else {
                                    return [0, null];
                                }
                            } else {
                                const piece = this.board[current_x][current_y];
                                this.board[current_x][current_y] = null;
                                this.board[goal_x][goal_y] = piece;
                                this.board[goal_x][goal_y]?.increment_move();
                                return [1,this.board];;
                            }
                        }
                    }
                    return [0, null];
                }
                break;

            default:
                break;

        }
    }

    #validKnightMove(current_x: Coordinate_Type, current_y: Coordinate_Type, goal_x: Coordinate_Type, goal_y: Coordinate_Type) {

        const coords = [
            [-2, -1],
            [-2, 1],
            [-1, 2],
            [1, 2]
        ]

        for (let i = 0; i < 4; i++) {
            if (current_x + coords[i][0] == goal_x && current_y + coords[i][1] == goal_y) {
                const piece = this.board[current_x][current_y];
                this.board[current_x][current_y] = null;
                this.board[goal_x][goal_y] = piece;
                this.board[goal_x][goal_y]?.increment_move();
                return [1,this.board];
            }
        }

        for (let i = 0; i < 4; i++) {
            if (current_x + coords[i][1] == goal_x && current_y + coords[i][0] == goal_y) {
                const piece = this.board[current_x][current_y];
                this.board[current_x][current_y] = null;
                this.board[goal_x][goal_y] = piece;
                this.board[goal_x][goal_y]?.increment_move();
                return [1,this.board];
            }
        }
        return [0, null];

    }

    #validKingMove(current_x: Coordinate_Type, current_y: Coordinate_Type, goal_x: Coordinate_Type, goal_y: Coordinate_Type) {
        let coords = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]]
        for (let i = 0; i < 8; i++) {
            if (current_x + coords[i][0] == goal_x && current_y + coords[i][1] == goal_y) {
                const piece = this.board[current_x][current_y];
                this.board[current_x][current_y] = null;
                this.board[goal_x][goal_y] = piece;
                this.board[goal_x][goal_y]?.increment_move();
                return [1,this.board];;
            }
        }
        return [0, null];
    }

    #validQueenMove(current_x: Coordinate_Type, current_y: Coordinate_Type, goal_x: Coordinate_Type, goal_y: Coordinate_Type) {
        if (current_x == goal_x) {
            if (current_y < goal_y) {
                for (let i = current_y + 1; i < goal_y; i++) {
                    if (this.board[goal_x][i] != null) {
                        return [0, null];
                    }
                }
                if (!(this.board[goal_x][goal_y] == null || this.board[goal_x][goal_y].color != this.board[current_x][current_y]?.color)) {
                    return [0, null];
                }
                const piece = this.board[current_x][current_y];
                this.board[current_x][current_y] = null;
                this.board[goal_x][goal_y] = piece;
                this.board[goal_x][goal_y]?.increment_move();
                return [1,this.board];
            } else if (current_y > goal_y) {
                for (let i = current_y - 1; i > goal_y; i--) {
                    if (this.board[goal_x][i] != null) {
                        return [0, null];
                    }
                }
                if (!(this.board[goal_x][goal_y] == null || this.board[goal_x][goal_y].color != this.board[current_x][current_y]?.color)) {
                    return [0, null];
                }
                const piece = this.board[current_x][current_y];
                this.board[current_x][current_y] = null;
                this.board[goal_x][goal_y] = piece;
                this.board[goal_x][goal_y]?.increment_move();
                return [1,this.board];
            } else {
                return [0, null];
            }
        } else if (current_y == goal_y) {
            if (current_x < goal_x) {
                for (let i = current_x + 1; i < goal_x; i++) {
                    if (this.board[i][goal_y] != null) {
                        return [0, null];
                    }
                }
                if (!(this.board[goal_x][goal_y] == null || this.board[goal_x][goal_y].color != this.board[current_x][current_y]?.color)) {
                    return [0, null];
                }
                const piece = this.board[current_x][current_y];
                this.board[current_x][current_y] = null;
                this.board[goal_x][goal_y] = piece;
                this.board[goal_x][goal_y]?.increment_move();
                return [1,this.board];
            } else if (current_x > goal_x) {
                for (let i = current_x - 1; i > goal_x; i--) {
                    if (this.board[i][goal_y] != null) {
                        return [0, null];
                    }
                }
                if (!(this.board[goal_x][goal_y] == null || this.board[goal_x][goal_y].color != this.board[current_x][current_y]?.color)) {
                    return [0, null];
                }
                const piece = this.board[current_x][current_y];
                this.board[current_x][current_y] = null;
                this.board[goal_x][goal_y] = piece;
                this.board[goal_x][goal_y]?.increment_move();
                return [1,this.board];
            } else {
                return [0, null];
            }
        } else {
            if (this.#betweenBishop(current_x, current_y, goal_x, goal_y)) {
                if(Math.abs(current_x - goal_x) == Math.abs(current_y-goal_y)){
                    const piece = this.board[current_x][current_y];
                    this.board[current_x][current_y] = null;
                    this.board[goal_x][goal_y] = piece;
                    this.board[goal_x][goal_y]?.increment_move();
                    return [1,this.board];
                }
            }
            return [0, null];
        }
    }

    constructor() {

        const knights = get_knights();
        const rooks = get_rooks();
        const bishops = get_bishops();
        const pawns = get_pawns();
        const kings = get_kings();
        const queens = get_queens();

        this.board = [
            [rooks[2], knights[2], bishops[2], queens[0], kings[0], bishops[0], knights[0], rooks[0]],
            [pawns[14], pawns[12], pawns[10], pawns[8], pawns[6], pawns[4], pawns[2], pawns[0]],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [pawns[1], pawns[3], pawns[5], pawns[7], pawns[9], pawns[11], pawns[13], pawns[15]],
            [rooks[1], knights[1], bishops[1], queens[1], kings[1], bishops[3], knights[3], rooks[3]]
        ]
    }

    canMove(current_x: Coordinate_Type, current_y: Coordinate_Type, goal_x: Coordinate_Type, goal_y: Coordinate_Type) {
        const piece: Piece | null = this.board[current_x][current_y];
        if (!piece) {
            return [0, null];
        }
        if (!this.#validPositions(current_x, current_y, goal_x, goal_y)) {
            return [0, null];
        }

        if (!this.#selfPiecePresent(current_x, current_y, goal_x, goal_y)) {
            return [0, null];
        }

        const name = piece.name
        let msg;
        switch (name) {
            case "rook":
                return this.#validRookMove(current_x, current_y, goal_x, goal_y);

            case "pawn":
                return this.#validPawnMove(current_x, current_y, goal_x, goal_y);

            case "knight":
                return this.#validKnightMove(current_x, current_y, goal_x, goal_y);

            case "bishop":
                return this.#validBishopMove(current_x, current_y, goal_x, goal_y);

            case "king":
                return this.#validKingMove(current_x, current_y, goal_x, goal_y);

            case "queen":
                return this.#validQueenMove(current_x, current_y, goal_x, goal_y)

            default:
                break;
        }

    }
}

function get_knights(){
    const knights: Piece[] = []
    const coords: {
        x: Coordinate_Type,
        y: Coordinate_Type
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

function get_rooks(){
    const rooks: Piece[] = []
    const coords: {
        x: Coordinate_Type,
        y: Coordinate_Type
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

function get_bishops(){
    const bishops: Piece[] = []
    const coords: {
        x: Coordinate_Type,
        y: Coordinate_Type
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

function get_pawns(){
    const pawns: Piece[] = []
    const coords: {
        x: Coordinate_Type,
        y: Coordinate_Type
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

function get_kings(){
    const kings: Piece[] = []
    const coords: {
        x: Coordinate_Type,
        y: Coordinate_Type
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

function get_queens(){
    const queens: Piece[] = []
    const coords: {
        x: Coordinate_Type,
        y: Coordinate_Type
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