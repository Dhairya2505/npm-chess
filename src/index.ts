import { Color_Type, Coordinate_Type, Piece_Type, PieceName_Type, response } from './types.js'

class Piece {
    name: PieceName_Type;
    color: Color_Type;
    position: {
        x: Coordinate_Type,
        y: Coordinate_Type
    };
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

    #get_knights(){
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

    #get_rooks(){
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
    
    #get_bishops(){
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
    
    #get_pawns(){
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
    
    #get_kings(){
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
    
    #get_queens(){
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

    #validPositions(current_x: Coordinate_Type, current_y: Coordinate_Type, goal_x: Coordinate_Type, goal_y: Coordinate_Type) {
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

    #betweenBishop(board: Array<Array<null | Piece_Type>>, current_x: Coordinate_Type, current_y: Coordinate_Type) {
        const response: response = {
            canMoveto: [],
            canCut: []
        }

        let i = 1;
        while(current_x+i <= 7 && current_y+i <= 7){
            if(board[current_x+i][current_y+i] != null){
                if(board[current_x+i][current_y+i]?.color != board[current_x][current_y]?.color){
                    response.canCut.push({ x: current_x+i as Coordinate_Type, y: current_y+i  as Coordinate_Type })
                }
                break;
            }
            response.canMoveto.push({ x: current_x+i as Coordinate_Type, y: current_y+i  as Coordinate_Type })
            i++;
        }

        i = 1;
        while(current_x+i <= 7 && current_y-i >= 0){
            if(board[current_x+i][current_y-i] != null){
                if(board[current_x+i][current_y-i]?.color != board[current_x][current_y]?.color){
                    response.canCut.push({ x: current_x+i as Coordinate_Type, y: current_y-i  as Coordinate_Type })
                }
                break;
            }
            response.canMoveto.push({ x: current_x+i as Coordinate_Type, y: current_y-i  as Coordinate_Type })
            i++;
        }

        i = 1;
        while(current_x-i >= 0 && current_y-i >= 0){
            if(board[current_x-i][current_y-i] != null){
                if(board[current_x-i][current_y-i]?.color != board[current_x][current_y]?.color){
                    response.canCut.push({ x: current_x-i as Coordinate_Type, y: current_y-i  as Coordinate_Type })
                }
                break;
            }
            response.canMoveto.push({ x: current_x-i as Coordinate_Type, y: current_y-i  as Coordinate_Type })
            i++;
        }

        i = 1;
        while(current_x-i >= 0 && current_y+i <=7){
            if(board[current_x-i][current_y+i] != null){
                if(board[current_x-i][current_y+i]?.color != board[current_x][current_y]?.color){
                    response.canCut.push({ x: current_x-i as Coordinate_Type, y: current_y+i  as Coordinate_Type })
                }
                break;
            }
            response.canMoveto.push({ x: current_x-i as Coordinate_Type, y: current_y+i  as Coordinate_Type })
            i++;
        }

        return response;

    }

    #betweenRook(board: Array<Array<null | Piece_Type>>, current_x: Coordinate_Type, current_y: Coordinate_Type){
        const response: response = {
            canMoveto: [],
            canCut: []
        }

        let i = 1; 
        if(current_x+i <= 7){
            while(board[current_x+i][current_y] == null && current_x+i <= 7){
                response.canMoveto.push({x: current_x+i as Coordinate_Type, y: current_y});
                i++;
            }
            if(current_x + i != 8){
                if(board[current_x+i][current_y]?.color != board[current_x][current_y]?.color){
                    response.canCut.push({ x: current_x+i as Coordinate_Type, y: current_y })
                }
            }
        }

        i=1;
        if(current_y+i <= 7){
            while(board[current_x][current_y+i] == null && current_y+i <= 7){
                response.canMoveto.push({x: current_x , y: current_y+i as Coordinate_Type});
                i++;
            }
            if(current_y+i != 8){
                if(board[current_x][current_y+i]?.color != board[current_x][current_y]?.color){
                    response.canCut.push({ x: current_x, y: current_y+i as Coordinate_Type })
                }
            }
        }

        i=1;
        if(current_x-i >= 0){
            while(board[current_x-i][current_y] == null && current_x-i >= 0){
                response.canMoveto.push({x: current_x-i as Coordinate_Type , y: current_y });
                i++;
            }
            if(current_x-i != -1){
                if(board[current_x-i][current_y]?.color != board[current_x][current_y]?.color){
                    response.canCut.push({ x: current_x-i as Coordinate_Type, y: current_y })
                }
            }
        }

        i=1;
        if(current_y-i >= 0){
            while(board[current_x][current_y-i] == null && current_y-i >= 0){
                response.canMoveto.push({x: current_x , y: current_y-i as Coordinate_Type});
                i++;
            }
            if(current_y-i != -1){
                if(board[current_x][current_y-i]?.color != board[current_x][current_y]?.color){
                    response.canCut.push({ x: current_x, y: current_y-i as Coordinate_Type })
                }
            }
        }

        return response;
    }

    #validRookMove(board: Array<Array<null | Piece_Type>>, current_x: Coordinate_Type, current_y: Coordinate_Type) {
        return this.#betweenRook(board, current_x, current_y)
    }

    #validBishopMove(board: Array<Array<null | Piece_Type>>, current_x: Coordinate_Type, current_y: Coordinate_Type) {
        return this.#betweenBishop(board, current_x, current_y)
    }

    #validPawnMove(board: Array<Array<null | Piece_Type>>, current_x: Coordinate_Type, current_y: Coordinate_Type) {
        const color = board[current_x][current_y]?.color as Color_Type
        const response: response = {
            canMoveto: [],
            canCut: []
        }
        switch (color) {
            case "b":
                if(current_x+1>=0 && current_x+1 <= 7 && board[current_x+1][current_y] == null){
                    response.canMoveto.push({x: current_x+1 as Coordinate_Type, y: current_y})
                }
                if(current_y+1>=0 && current_y+1 <= 7 && current_x+1 >= 0 && current_x+1 <=7 && board[current_x+1][current_y+1] != null && board[current_x+1][current_y+1]?.color != board[current_x][current_y]?.color){
                    response.canCut.push({x: current_x+1 as Coordinate_Type, y: current_y+1 as Coordinate_Type})
                }
                if(current_y-1>=0 && current_y-1 <= 7 && current_x+1 >= 0 && current_x+1 <=7 && board[current_x+1][current_y-1] != null && board[current_x+1][current_y-1]?.color != board[current_x][current_y]?.color){
                    response.canCut.push({x: current_x+1 as Coordinate_Type, y: current_y-1 as Coordinate_Type})
                }
                if(board[current_x][current_y]?.moves == 0){
                    if(current_x+2>=0 && current_x+2 <= 7 && board[current_x+1][current_y] == null && board[current_x+2][current_y] == null){
                        response.canMoveto.push({x: current_x+2 as Coordinate_Type, y: current_y})
                    }
                }
                return response;
            
            case "w":
                if(current_x-1>=0 && current_x-1 <= 7 && board[current_x-1][current_y] == null){
                    response.canMoveto.push({x: current_x-1 as Coordinate_Type, y: current_y})
                }
                if(current_y+1>=0 && current_y+1 <= 7 && current_x-1 >= 0 && current_x-1 <=7 && board[current_x-1][current_y+1] != null && board[current_x-1][current_y+1]?.color != board[current_x][current_y]?.color){
                    response.canCut.push({x: current_x-1 as Coordinate_Type, y: current_y+1 as Coordinate_Type})
                }
                if(current_y-1>=0 && current_y-1 <= 7 && current_x-1 >= 0 && current_x-1 <=7 && board[current_x-1][current_y-1] != null && board[current_x-1][current_y-1]?.color != board[current_x][current_y]?.color){
                    response.canCut.push({x: current_x-1 as Coordinate_Type, y: current_y-1 as Coordinate_Type})
                }
                if(board[current_x][current_y]?.moves == 0){
                    if(current_x-2>=0 && current_x-2 <= 7 && board[current_x-1][current_y] == null && board[current_x-2][current_y] == null){
                        response.canMoveto.push({x: current_x-2 as Coordinate_Type, y: current_y})
                    }
                }
                return response;
        }
        
    }

    #validKnightMove(board: Array<Array<null | Piece_Type>>, current_x: Coordinate_Type, current_y: Coordinate_Type) {
        const response: response = {
            canMoveto: [],
            canCut: []
        }

        const coords = [
            [-2, -1],
            [-2, 1],
            [-1, 2],
            [1, 2]
        ]

        for (let i = 0; i < 4; i++) {
            if (current_x + coords[i][0] <=7 && current_x + coords[i][0] >=0 && current_y + coords[i][1] <=7 && current_y + coords[i][1] >=0 ) {
                if(board[current_x+coords[i][0]][current_y + coords[i][1]] != null){
                    if(board[current_x+coords[i][0]][current_y + coords[i][1]]?.color != board[current_x][current_y]?.color){
                        response.canCut.push({ x: current_x+coords[i][0] as Coordinate_Type, y: current_y + coords[i][1] as Coordinate_Type });
                    }
                }else {
                    response.canMoveto.push({ x: current_x+coords[i][0] as Coordinate_Type, y: current_y + coords[i][1] as Coordinate_Type });
                }
            }
        }

        for (let i = 0; i < 4; i++) {
            if (current_x + coords[i][1] <= 7 && current_x + coords[i][1] >= 0 && current_y + coords[i][0] <= 7 && current_y + coords[i][0] >= 0) {
                if(board[current_x+coords[i][1]][current_y + coords[i][0]] != null){
                    if(board[current_x+coords[i][1]][current_y + coords[i][0]]?.color != board[current_x][current_y]?.color){
                        response.canCut.push({ x: current_x+coords[i][1] as Coordinate_Type, y: current_y + coords[i][0] as Coordinate_Type });
                    }
                }
                else {
                    response.canMoveto.push({ x: current_x+coords[i][1] as Coordinate_Type, y: current_y + coords[i][0] as Coordinate_Type });
                }
            }
        }
        return response;

    }

    #validKingMove(board: Array<Array<null | Piece_Type>>, current_x: Coordinate_Type, current_y: Coordinate_Type) {
        const response: response = {
            canMoveto: [],
            canCut: []
        }
        
        let coords = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]]
        for (let i = 0; i < 8; i++) {
            if (current_x + coords[i][0] <= 7 && current_y + coords[i][1] <= 7 && current_x + coords[i][0] >= 0 && current_y + coords[i][1] >= 0) {
                if(board[current_x + coords[i][0]][current_y + coords[i][1]] != null){
                    if(board[current_x + coords[i][0]][current_y + coords[i][1]]?.color != board[current_x][current_y]?.color){
                        response.canCut.push({ x: current_x + coords[i][0] as Coordinate_Type, y: current_y + coords[i][1] as Coordinate_Type })
                    }
                } else {
                    response.canMoveto.push({ x: current_x + coords[i][0] as Coordinate_Type, y: current_y + coords[i][1] as Coordinate_Type })
                }
            }
        }
        return response;
    }

    #validQueenMove(board: Array<Array<null | Piece_Type>>, current_x: Coordinate_Type, current_y: Coordinate_Type) {
        const res1 = this.#betweenRook(board, current_x, current_y)
        const res2 = this.#betweenBishop(board, current_x, current_y);

        const canMoveTo = []
        const canCut = []
        for(let i =0;i<res1.canMoveto.length;i++){
            canMoveTo.push(res1.canMoveto[i])
        }
        for( let i =0;i<res2.canMoveto.length;i++){
            canMoveTo.push(res2.canMoveto[i])
        }
        for(  let i =0;i<res1.canCut.length;i++){
            canCut.push(res1.canCut[i])
        }
        for(  let i =0;i<res2.canCut.length;i++){
            canCut.push(res2.canCut[i])
        }

        return {
            canMoveto: canMoveTo,
            canCut
        }
    }

    constructor() {

        const knights = this.#get_knights();
        const rooks = this.#get_rooks();
        const bishops = this.#get_bishops();
        const pawns = this.#get_pawns();
        const kings = this.#get_kings();
        const queens = this.#get_queens();

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

    move(board: Array<Array<null | Piece_Type>>, current_x: Coordinate_Type, current_y: Coordinate_Type, goal_x: Coordinate_Type, goal_y: Coordinate_Type) {
        const piece: Piece_Type | null = board[current_x][current_y];
        if (!piece) {
            return null;
        }
        if (!this.#validPositions(current_x, current_y, goal_x, goal_y)) {
            return null;
        }

        if (!this.#selfPiecePresent(board, current_x, current_y, goal_x, goal_y)) {
            return null;
        }

        board[current_x][current_y]?.increment_move()
        board[goal_x][goal_y] = piece;
        board[current_x][current_y] = null;
        return board;

    }

    canMoveTo(board: Array<Array<null | Piece_Type>>, current_x: number, current_y: number): response | null {
        if(!(current_x >= 0 && current_x <= 7)) return null;
        if(!(current_x >= 0 && current_x <= 7)) return null; 
        
        const piece: Piece_Type | null = board[current_x][current_y];
        if (!piece) {
            return null;
        }

        const name = piece.name

        switch (name) {
            case "rook":
                return this.#validRookMove(board, current_x as Coordinate_Type, current_y as Coordinate_Type);

            case "pawn":
                return this.#validPawnMove(board, current_x as Coordinate_Type, current_y as Coordinate_Type);

            case "bishop":
                return this.#validBishopMove(board, current_x as Coordinate_Type, current_y as Coordinate_Type);
            
            case "knight":
                return this.#validKnightMove(board, current_x as Coordinate_Type, current_y as Coordinate_Type);

            case "king":
                return this.#validKingMove(board, current_x as Coordinate_Type, current_y as Coordinate_Type);

            case "queen":
                return this.#validQueenMove(board, current_x as Coordinate_Type, current_y as Coordinate_Type)

            default:
                return null;
        }
    }
}