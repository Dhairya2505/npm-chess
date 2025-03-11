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

    private board: Array<Array<null | Piece_Type>>

    #validPositions(board: Array<Array<null | Piece_Type>>, current_x: Coordinate_Type, current_y: Coordinate_Type, goal_x: Coordinate_Type, goal_y: Coordinate_Type) {
        if (!(current_x >= 0 && current_x <= 7)) return false;
        if (!(current_y >= 0 && current_y <= 7)) return false;
        if (!(goal_x >= 0 && goal_x <= 7)) return false;
        if (!(goal_y >= 0 && goal_y <= 7)) return false;
        if (current_x == goal_x && current_y == goal_y) return false;
        return true;
    }

    #selfPiecePresent(board: Array<Array<null | Piece_Type>>, current_x: Coordinate_Type, current_y: Coordinate_Type, goal_x: Coordinate_Type, goal_y: Coordinate_Type) {
        if (board[current_x][current_y]?.color == board[goal_x][goal_y]?.color) {
            return false;
        } else {
            return true;
        }
    }

    #betweenBishop(board: Array<Array<null | Piece_Type>>, current_x: Coordinate_Type, current_y: Coordinate_Type, goal_x: Coordinate_Type, goal_y: Coordinate_Type) {
        if (goal_x > current_x && goal_y > current_y) {
            for (let i = 1; i < Math.abs(goal_x - current_x); i++) {
                if (board[current_x + i][current_y + i] != null) {
                    return false;
                }
            }
            if (!(board[goal_x][goal_y] == null || board[goal_x][goal_y].color != board[current_x][current_y]?.color)) {
                return false;
            }
            return true;
        } else if (goal_x < current_x && goal_y > current_y) {
            for (let i = 1; i < Math.abs(goal_x - current_x); i++) {
                if (board[current_x - i][current_y + i] != null) {
                    return false;
                }
            }
            if (!(board[goal_x][goal_y] == null || board[goal_x][goal_y].color != board[current_x][current_y]?.color)) {
                return false;
            }
            return true;
        } else if (goal_x < current_x && goal_y < current_y) {
            for (let i = 1; i < Math.abs(goal_x - current_x); i++) {
                if (board[current_x - i][current_y - i] != null) {
                    return false;
                }
            }
            if (!(board[goal_x][goal_y] == null || board[goal_x][goal_y].color != board[current_x][current_y]?.color)) {
                return false;
            }
            return true;
        } else if (goal_x > current_x && goal_y < current_y) {
            for (let i = 1; i < Math.abs(goal_x - current_x); i++) {
                if (board[current_x + i][current_y - i] != null) {
                    return false;
                }
            }
            if (!(board[goal_x][goal_y] == null || board[goal_x][goal_y].color != board[current_x][current_y]?.color)) {
                return false;
            }
            return true;
        } else {
            return false;
        }
    }

    #validRookMove(board: Array<Array<null | Piece_Type>>, current_x: Coordinate_Type, current_y: Coordinate_Type, goal_x: Coordinate_Type, goal_y: Coordinate_Type) {
        if (current_x == goal_x) {
            if (current_y < goal_y) {
                for (let i = current_y + 1; i < goal_y; i++) {
                    if (board[goal_x][i] != null) {
                        return null;
                    }
                }
                if (!(board[goal_x][goal_y] == null || board[goal_x][goal_y].color != board[current_x][current_y]?.color)) {
                    return null;
                }
                const piece = board[current_x][current_y];
                board[current_x][current_y] = null;
                board[goal_x][goal_y] = piece;
                board[goal_x][goal_y]?.increment_move();
                return board;
            } else if (current_y > goal_y) {
                for (let i = current_y - 1; i > goal_y; i--) {
                    if (board[goal_x][i] != null) {
                        return null;
                    }
                }
                if (!(board[goal_x][goal_y] == null || board[goal_x][goal_y].color != board[current_x][current_y]?.color)) {
                    return null;
                }
                const piece = board[current_x][current_y];
                board[current_x][current_y] = null;
                board[goal_x][goal_y] = piece;
                board[goal_x][goal_y]?.increment_move();
                return board;
            } else {
                return null;
            }
        } else if (current_y == goal_y) {
            if (current_x < goal_x) {
                for (let i = current_x + 1; i < goal_x; i++) {
                    if (board[i][goal_y] != null) {
                        return null;
                    }
                }
                if (!(board[goal_x][goal_y] == null || board[goal_x][goal_y].color != board[current_x][current_y]?.color)) {
                    return null;
                }
                const piece = board[current_x][current_y];
                board[current_x][current_y] = null;
                board[goal_x][goal_y] = piece;
                board[goal_x][goal_y]?.increment_move();
                return board;
            } else if (current_x > goal_x) {
                for (let i = current_x - 1; i > goal_x; i--) {
                    if (board[i][goal_y] != null) {
                        return null;
                    }
                }
                if (!(board[goal_x][goal_y] == null || board[goal_x][goal_y].color != board[current_x][current_y]?.color)) {
                    return null;
                }
                const piece = board[current_x][current_y];
                board[current_x][current_y] = null;
                board[goal_x][goal_y] = piece;
                board[goal_x][goal_y]?.increment_move();
                return board;
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    #validBishopMove(board: Array<Array<null | Piece_Type>>, current_x: Coordinate_Type, current_y: Coordinate_Type, goal_x: Coordinate_Type, goal_y: Coordinate_Type) {
        if (this.#betweenBishop(board, current_x, current_y, goal_x, goal_y)) {
            if(Math.abs(current_x - goal_x) == Math.abs(current_y-goal_y)){
                const piece = board[current_x][current_y];
                board[current_x][current_y] = null;
                board[goal_x][goal_y] = piece;
                board[goal_x][goal_y]?.increment_move();
                return board;
            }
        }
        return null;
    }

    #validPawnMove(board: Array<Array<null | Piece_Type>>, current_x: Coordinate_Type, current_y: Coordinate_Type, goal_x: Coordinate_Type, goal_y: Coordinate_Type) {
        const color = board[current_x][current_y]?.color
        switch (color) {

            case "b":
                if (!(goal_x >= current_x + 1 && goal_x <= current_x + 2)) return null;
                if (board[current_x][current_y]?.moves == 0) {
                    if (!(goal_x >= current_x + 1 && goal_x <= current_x + 2)) return null;
                    const possible_coords = [[1, -1], [1, 0], [1, 1]];
                    for (let i = 0; i < 3; i++) {
                        if (goal_x == current_x + possible_coords[i][0] && goal_y == current_y + possible_coords[i][1]) {
                            if (Math.abs(possible_coords[i][1]) == 1) {
                                if (board[goal_x][goal_y] && board[goal_x][goal_y].color != board[current_x][current_y].color) {
                                    const piece = board[current_x][current_y];
                                    board[current_x][current_y] = null;
                                    board[goal_x][goal_y] = piece;
                                    board[goal_x][goal_y]?.increment_move();
                                    return board;;
                                } else {
                                    return null;
                                }
                            } else {
                                const piece = board[current_x][current_y];
                                board[current_x][current_y] = null;
                                board[goal_x][goal_y] = piece;
                                board[goal_x][goal_y]?.increment_move();
                                return board;
                            }
                        }
                    }
                    if (goal_x == current_x + 2 && goal_y == current_y) {
                        if (board[current_x + 1][current_y] == null) {
                            const piece = board[current_x][current_y];
                            board[current_x][current_y] = null;
                            board[goal_x][goal_y] = piece;
                            board[goal_x][goal_y]?.increment_move();
                            return board;
                        } else {
                            return null;
                        }
                    }
                    return null;
                } else {
                    if (!(goal_x == current_x + 1)) return null;
                    const possible_coords = [[1, -1], [1, 0], [1, 1]];
                    for (let i = 0; i < 3; i++) {
                        if (goal_x == current_x + possible_coords[i][0] && goal_y == current_y + possible_coords[i][1]) {
                            if(Math.abs(possible_coords[i][1]) == 1){
                                if (board[goal_x][goal_y] && board[goal_x][goal_y].color != board[current_x][current_y]?.color) {
                                    const piece = board[current_x][current_y];
                                    board[current_x][current_y] = null;
                                    board[goal_x][goal_y] = piece;
                                    board[goal_x][goal_y]?.increment_move();
                                    return board;
                                } else {
                                    return null;
                                }
                            } else {
                                const piece = board[current_x][current_y];
                                board[current_x][current_y] = null;
                                board[goal_x][goal_y] = piece;
                                board[goal_x][goal_y]?.increment_move();
                                return board;
                            }
                        }
                    }
                    return null;
                }

            default:
                if (!(goal_x <= current_x - 1 && goal_x >= current_x - 2)) return null;
                if (board[current_x][current_y]?.moves == 0) {
                    if (!(goal_x <= current_x - 1 && goal_x >= current_x - 2)) return null;
                    const possible_coords = [[-1, -1], [-1, 0], [-1, 1]];
                    for (let i = 0; i < 3; i++) {
                        if (goal_x == current_x + possible_coords[i][0] && goal_y == current_y + possible_coords[i][1]) {
                            if (Math.abs(possible_coords[i][1]) == 1) {
                                if (board[goal_x][goal_y] && board[goal_x][goal_y].color != board[current_x][current_y]?.color) {
                                    const piece = board[current_x][current_y];
                                    board[current_x][current_y] = null;
                                    board[goal_x][goal_y] = piece;
                                    board[goal_x][goal_y]?.increment_move();
                                    return board;
                                } else {
                                    return null;
                                }
                            } else {
                                const piece = board[current_x][current_y];
                                board[current_x][current_y] = null;
                                board[goal_x][goal_y] = piece;
                                board[goal_x][goal_y]?.increment_move();
                                return board;
                            }
                        }
                    }
                    if (goal_x == current_x - 2 && goal_y == current_y) {
                        if (board[current_x - 1][current_y] == null) {
                            const piece = board[current_x][current_y];
                            board[current_x][current_y] = null;
                            board[goal_x][goal_y] = piece;
                            board[goal_x][goal_y]?.increment_move();
                            return board;
                        }
                        else {
                            return null;
                        }
                    }
                    return null;
                } else {
                    if (!(goal_x == current_x - 1)) return null;
                    const possible_coords = [[-1, -1], [-1, 0], [-1, 1]];
                    for (let i = 0; i < 3; i++) {
                        if (goal_x == current_x + possible_coords[i][0] && goal_y == current_y + possible_coords[i][1]) {
                            if (Math.abs(possible_coords[i][1]) == 1) {
                                if (board[goal_x][goal_y] && board[goal_x][goal_y].color != board[current_x][current_y]?.color) {
                                    const piece = board[current_x][current_y];
                                    board[current_x][current_y] = null;
                                    board[goal_x][goal_y] = piece;
                                    board[goal_x][goal_y]?.increment_move();
                                    return board;;
                                } else {
                                    return null;
                                }
                            } else {
                                const piece = board[current_x][current_y];
                                board[current_x][current_y] = null;
                                board[goal_x][goal_y] = piece;
                                board[goal_x][goal_y]?.increment_move();
                                return board;
                            }
                        }
                    }
                    return null;
                }

        }
    }

    #validKnightMove(board: Array<Array<null | Piece_Type>>, current_x: Coordinate_Type, current_y: Coordinate_Type, goal_x: Coordinate_Type, goal_y: Coordinate_Type) {

        const coords = [
            [-2, -1],
            [-2, 1],
            [-1, 2],
            [1, 2]
        ]

        for (let i = 0; i < 4; i++) {
            if (current_x + coords[i][0] == goal_x && current_y + coords[i][1] == goal_y) {
                const piece = board[current_x][current_y];
                board[current_x][current_y] = null;
                board[goal_x][goal_y] = piece;
                board[goal_x][goal_y]?.increment_move();
                return board;
            }
        }

        for (let i = 0; i < 4; i++) {
            if (current_x + coords[i][1] == goal_x && current_y + coords[i][0] == goal_y) {
                const piece = board[current_x][current_y];
                board[current_x][current_y] = null;
                board[goal_x][goal_y] = piece;
                board[goal_x][goal_y]?.increment_move();
                return board;
            }
        }
        return null;

    }

    #validKingMove(board: Array<Array<null | Piece_Type>>, current_x: Coordinate_Type, current_y: Coordinate_Type, goal_x: Coordinate_Type, goal_y: Coordinate_Type) {
        let coords = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]]
        for (let i = 0; i < 8; i++) {
            if (current_x + coords[i][0] == goal_x && current_y + coords[i][1] == goal_y) {
                const piece = board[current_x][current_y];
                board[current_x][current_y] = null;
                board[goal_x][goal_y] = piece;
                board[goal_x][goal_y]?.increment_move();
                return board;
            }
        }
        return null;
    }

    #validQueenMove(board: Array<Array<null | Piece_Type>>, current_x: Coordinate_Type, current_y: Coordinate_Type, goal_x: Coordinate_Type, goal_y: Coordinate_Type) {
        if (current_x == goal_x) {
            if (current_y < goal_y) {
                for (let i = current_y + 1; i < goal_y; i++) {
                    if (board[goal_x][i] != null) {
                        return null;
                    }
                }
                if (!(board[goal_x][goal_y] == null || board[goal_x][goal_y].color != board[current_x][current_y]?.color)) {
                    return null;
                }
                const piece = board[current_x][current_y];
                board[current_x][current_y] = null;
                board[goal_x][goal_y] = piece;
                board[goal_x][goal_y]?.increment_move();
                return board;
            } else if (current_y > goal_y) {
                for (let i = current_y - 1; i > goal_y; i--) {
                    if (board[goal_x][i] != null) {
                        return null;
                    }
                }
                if (!(board[goal_x][goal_y] == null || board[goal_x][goal_y].color != board[current_x][current_y]?.color)) {
                    return null;
                }
                const piece = board[current_x][current_y];
                board[current_x][current_y] = null;
                board[goal_x][goal_y] = piece;
                board[goal_x][goal_y]?.increment_move();
                return board;
            } else {
                return null;
            }
        } else if (current_y == goal_y) {
            if (current_x < goal_x) {
                for (let i = current_x + 1; i < goal_x; i++) {
                    if (board[i][goal_y] != null) {
                        return null;
                    }
                }
                if (!(board[goal_x][goal_y] == null || board[goal_x][goal_y].color != board[current_x][current_y]?.color)) {
                    return null;
                }
                const piece = board[current_x][current_y];
                board[current_x][current_y] = null;
                board[goal_x][goal_y] = piece;
                board[goal_x][goal_y]?.increment_move();
                return board;
            } else if (current_x > goal_x) {
                for (let i = current_x - 1; i > goal_x; i--) {
                    if (board[i][goal_y] != null) {
                        return null;
                    }
                }
                if (!(board[goal_x][goal_y] == null || board[goal_x][goal_y].color != board[current_x][current_y]?.color)) {
                    return null;
                }
                const piece = board[current_x][current_y];
                board[current_x][current_y] = null;
                board[goal_x][goal_y] = piece;
                board[goal_x][goal_y]?.increment_move();
                return board;
            } else {
                return null;
            }
        } else {
            if (this.#betweenBishop(board, current_x, current_y, goal_x, goal_y)) {
                if(Math.abs(current_x - goal_x) == Math.abs(current_y-goal_y)){
                    const piece = board[current_x][current_y];
                    board[current_x][current_y] = null;
                    board[goal_x][goal_y] = piece;
                    board[goal_x][goal_y]?.increment_move();
                    return board;
                }
            }
            return null;
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

    getBoard(){
        return this.board;
    }

    canMove(board: Array<Array<null | Piece_Type>>, current_x: Coordinate_Type, current_y: Coordinate_Type, goal_x: Coordinate_Type, goal_y: Coordinate_Type) {
        const piece: Piece_Type | null = board[current_x][current_y];
        if (!piece) {
            return null;
        }
        if (!this.#validPositions(board, current_x, current_y, goal_x, goal_y)) {
            return null;
        }

        if (!this.#selfPiecePresent(board, current_x, current_y, goal_x, goal_y)) {
            return null;
        }

        const name = piece.name
        switch (name) {
            case "rook":
                return this.#validRookMove(board, current_x, current_y, goal_x, goal_y);

            case "pawn":
                return this.#validPawnMove(board, current_x, current_y, goal_x, goal_y);

            case "knight":
                return this.#validKnightMove(board, current_x, current_y, goal_x, goal_y);

            case "bishop":
                return this.#validBishopMove(board, current_x, current_y, goal_x, goal_y);

            case "king":
                return this.#validKingMove(board, current_x, current_y, goal_x, goal_y);

            case "queen":
                return this.#validQueenMove(board, current_x, current_y, goal_x, goal_y)

            default:
                return null
        }

    }
}

function get_knights(){
    const knights: Piece_Type[] = []
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
    const rooks: Piece_Type[] = []
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
    const bishops: Piece_Type[] = []
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
    const pawns: Piece_Type[] = []
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
    const kings: Piece_Type[] = []
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
    const queens: Piece_Type[] = []
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