import { get_bishops, get_knights, get_rooks, get_kings, get_queens, get_pawns } from "./pieces";
import { Piece } from './classes/classes'
import { Coordinate } from './types/types'

export class Board {
    board: Array<Array<null | Piece>>;

    #validPositions(current_x: Coordinate, current_y: Coordinate, goal_x: Coordinate, goal_y: Coordinate){
        if(!(current_x >= 0 && current_x <= 7)) return false;
        if(!(current_y >= 0 && current_y <= 7)) return false;
        if(!(goal_x >= 0 && goal_x <= 7)) return false;
        if(!(goal_y >= 0 && goal_y <= 7)) return false;
        return true;
    }

    #selfPiecePresent(current_x: Coordinate, current_y: Coordinate, goal_x: Coordinate, goal_y: Coordinate){
        if(this.board[current_x][current_y]?.color == this.board[goal_x][goal_y]?.color){
            return false;
        } else {
            return true;
        }
    }

    #validRookMove(current_x: Coordinate, current_y: Coordinate, goal_x: Coordinate, goal_y: Coordinate){
        if(current_x == goal_x){
            if(current_y < goal_y){
                for(let i=current_y+1 ; i<=goal_y ; i++){
                    if(this.board[goal_x][i] != null){
                        return "Invalid move"
                    }
                }
                // const piece = this.board[current_x][current_y];
                // this.board[current_x][current_y] = null;
                // this.board[goal_x][goal_y] = piece;
                // this.board[goal_x][goal_y]?.increment_move();
                return "valid move"
            } else if(current_y > goal_y){
                for(let i=current_y-1 ; i>=goal_y ; i--){
                    if(this.board[goal_x][i] != null){
                        return "Invalid move"
                    }
                }
                // const piece = this.board[current_x][current_y];
                // this.board[current_x][current_y] = null;
                // this.board[goal_x][goal_y] = piece;
                // this.board[goal_x][goal_y]?.increment_move();
                return "valid move"
            } else {
                return "Invalid move";
            }
        } else if(current_y == goal_y){
            if(current_x < goal_x){
                for(let i=current_x+1 ; i<=goal_x ; i++){
                    if(this.board[i][goal_y] != null){
                        return "Invalid move"
                    }
                }
                // const piece = this.board[current_x][current_y];
                // this.board[current_x][current_y] = null;
                // this.board[goal_x][goal_y] = piece;
                // this.board[goal_x][goal_y]?.increment_move();
                return "valid move"
            } else if(current_x > goal_x){
                for(let i=current_x-1 ; i>=goal_x ; i--){
                    if(this.board[i][goal_y] != null){
                        return "Invalid move"
                    }
                }
                // const piece = this.board[current_x][current_y];
                // this.board[current_x][current_y] = null;
                // this.board[goal_x][goal_y] = piece;
                // this.board[goal_x][goal_y]?.increment_move();
                return "valid move"
            } else {
                return "Invalid move";
            }
        } else {
            return "Invalid move";
        }
    }

    #validPawnMove(current_x: Coordinate, current_y: Coordinate, goal_x: Coordinate, goal_y: Coordinate){
        const color = this.board[current_x][current_y]?.color
        switch (color) {

            case "b":
                if(!(goal_x >= current_x+1 && goal_x <= current_x+2)) return "Invalid move";
                if(this.board[current_x][current_y]?.moves == 0){
                    if(!(goal_x >= current_x+1 && goal_x <= current_x+2)) return "Invalid move";
                    const possible_coords = [ [1,-1],[1,0], [1,1] ];
                    for(let i =0;i<3;i++){
                        if(goal_x == current_x+possible_coords[i][0] && goal_y == current_y+possible_coords[i][1]){
                            if(possible_coords[i][1] == Math.abs(1)){
                                if(this.board[goal_x][goal_y] && this.board[goal_x][goal_y].color != this.board[current_x][current_y].color){
                                    // const piece = this.board[current_x][current_y];
                                    // this.board[current_x][current_y] = null;
                                    // this.board[goal_x][goal_y] = piece;
                                    // this.board[goal_x][goal_y]?.increment_move();
                                    return "Valid move";
                                } else {
                                    return "Invalid move";
                                }
                            } else {
                                // const piece = this.board[current_x][current_y];
                                // this.board[current_x][current_y] = null;
                                // this.board[goal_x][goal_y] = piece;
                                // this.board[goal_x][goal_y]?.increment_move();
                                return "Valid move";
                            }
                        }
                    }
                    if(goal_x == current_x+2 && goal_y == current_y){
                        if(this.board[current_x+1][current_y] == null){
                            // const piece = this.board[current_x][current_y];
                            // this.board[current_x][current_y] = null;
                            // this.board[goal_x][goal_y] = piece;
                            // this.board[goal_x][goal_y]?.increment_move();
                            return "Valid move";
                        } else {
                            return "Invalid move";        
                        }
                    }
                    return "Invalid move";
                } else {
                    if(!(goal_x == current_x+1)) return "Invalid move";
                    const possible_coords = [ [1,-1],[1,0], [1,1] ];
                    for(let i =0;i<3;i++){
                        if(goal_x == current_x+possible_coords[i][0] && goal_y == current_y+possible_coords[i][1]){
                            // const piece = this.board[current_x][current_y];
                            // this.board[current_x][current_y] = null;
                            // this.board[goal_x][goal_y] = piece;
                            // this.board[goal_x][goal_y]?.increment_move();
                            return "Valid move";
                        }
                    }
                    return "Invalid move";
                }
                break;

            case "w":
                if(!(goal_x >= current_x-1 && goal_x <= current_x-2)) return "Invalid move";
                if(this.board[current_x][current_y]?.moves == 0){
                    if(!(goal_x >= current_x-1 && goal_x <= current_x-2)) return "Invalid move";
                    const possible_coords = [ [-1,-1],[-1,0], [-1,1] ];
                    for(let i=0;i<3;i++){
                        if(goal_x == current_x+possible_coords[i][0] && goal_y == current_y+possible_coords[i][1]){
                            if(goal_x == current_x+possible_coords[i][0] && goal_y == current_y+possible_coords[i][1]){
                                if(possible_coords[i][1] == Math.abs(1)){
                                    if(this.board[goal_x][goal_y] && this.board[goal_x][goal_y].color != this.board[current_x][current_y]?.color){
                                        // const piece = this.board[current_x][current_y];
                                        // this.board[current_x][current_y] = null;
                                        // this.board[goal_x][goal_y] = piece;
                                        // this.board[goal_x][goal_y]?.increment_move();
                                        return "Valid move";
                                    } else {
                                        return "Invalid move";
                                    }
                                } else {
                                    // const piece = this.board[current_x][current_y];
                                    // this.board[current_x][current_y] = null;
                                    // this.board[goal_x][goal_y] = piece;
                                    // this.board[goal_x][goal_y]?.increment_move();
                                    return "Valid move";
                                }
                            }
                        }
                    }
                    if(goal_x == current_x-2 && goal_y == current_y){
                        if(this.board[current_x-1][current_y] == null){
                            // const piece = this.board[current_x][current_y];
                            // this.board[current_x][current_y] = null;
                            // this.board[goal_x][goal_y] = piece;
                            // this.board[goal_x][goal_y]?.increment_move();
                            return "Valid move";
                        }
                        else {
                            return "Invalid move";
                        }
                    }
                    return "Invalid move";
                } else {
                    if(!(goal_x == current_x-1)) return "Invalid move";
                    const possible_coords = [ [-1,-1],[-1,0], [-1,1] ];
                    for(let i=0;i<3;i++){
                        if(goal_x == current_x+possible_coords[i][0] && goal_y == current_y+possible_coords[i][1]){
                            // const piece = this.board[current_x][current_y];
                            // this.board[current_x][current_y] = null;
                            // this.board[goal_x][goal_y] = piece;
                            // this.board[goal_x][goal_y]?.increment_move();
                            return "Valid move";
                        }
                    }
                    return "Invalid move";
                }
                break;

            default:
                break;

        }
    }

    #validKnightMove(current_x: Coordinate, current_y: Coordinate, goal_x: Coordinate, goal_y: Coordinate){

        const coords = [
            [-2, -1],
            [-2, 1],
            [-1, 2],
            [1, 2]
        ]

        for(let i =0;i<4;i++){
            if(current_x+coords[i][0] == goal_x && current_y+coords[i][1] == goal_y){
                // const piece = this.board[current_x][current_y];
                // this.board[current_x][current_y] = null;
                // this.board[goal_x][goal_y] = piece;
                // this.board[goal_x][goal_y]?.increment_move();
                return "Valid move"
            }
        }

        for(let i =0;i<4;i++){
            if(current_x+coords[i][1] == goal_x && current_y+coords[i][0] == goal_y){
                // const piece = this.board[current_x][current_y];
                // this.board[current_x][current_y] = null;
                // this.board[goal_x][goal_y] = piece;
                // this.board[goal_x][goal_y]?.increment_move();
                return "Valid move"
            }
        }
        return "Invalid move"

    }

    #validBishopMove(current_x: Coordinate, current_y: Coordinate, goal_x: Coordinate, goal_y: Coordinate){

    }

    #validKingMove(current_x: Coordinate, current_y: Coordinate, goal_x: Coordinate, goal_y: Coordinate){

    }

    #validQueenMove(current_x: Coordinate, current_y: Coordinate, goal_x: Coordinate, goal_y: Coordinate){

    }

    constructor(){

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

    canMove(current_x: Coordinate, current_y: Coordinate, goal_x: Coordinate, goal_y: Coordinate){
        const piece: Piece | null = this.board[current_x][current_y];
        if(!piece){
             console.log("Invalid move");
             return;
        }

        if(!this.#validPositions(current_x, current_y, goal_x, goal_y)){
            console.log("Invalid Positions !!")
            return;
        }

        if(!this.#selfPiecePresent(current_x, current_y, goal_x, goal_y)){
            console.log("Invalid move")
            return;
        }

        const name = piece.name
        let msg;
        switch (name) {
            case "rook":
                msg = this.#validRookMove(current_x, current_y, goal_x, goal_y);
                console.log(msg);
                break;
            
            case "pawn":
                msg = this.#validPawnMove(current_x, current_y, goal_x, goal_y);
                console.log(msg);
                break;
            
            case "knight":
                msg = this.#validKnightMove(current_x, current_y, goal_x, goal_y);
                console.log(msg)
                break;
            default:
                break;
        }

    }
}

// function main(){
//     const board = new Board()

//     board.canMove(0,1,2,2);
//     board.canMove(2,2,4,1);
//     board.canMove(4,1,6,2);

// }

// main();