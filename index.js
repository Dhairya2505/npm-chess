"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Board_instances, _Board_validPositions, _Board_selfPiecePresent, _Board_betweenBishop, _Board_validRookMove, _Board_validBishopMove, _Board_validPawnMove, _Board_validKnightMove, _Board_validKingMove, _Board_validQueenMove;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
class Piece {
    increment_move() {
        this.moves = this.moves + 1;
    }
    constructor(name, color, position) {
        this.moves = 0;
        this.name = name;
        this.color = color;
        this.position = position;
    }
}
class Board {
    constructor() {
        _Board_instances.add(this);
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
        ];
    }
    canMove(current_x, current_y, goal_x, goal_y) {
        const piece = this.board[current_x][current_y];
        if (!piece) {
            return [0, null];
        }
        if (!__classPrivateFieldGet(this, _Board_instances, "m", _Board_validPositions).call(this, current_x, current_y, goal_x, goal_y)) {
            return [0, null];
        }
        if (!__classPrivateFieldGet(this, _Board_instances, "m", _Board_selfPiecePresent).call(this, current_x, current_y, goal_x, goal_y)) {
            return [0, null];
        }
        const name = piece.name;
        let msg;
        switch (name) {
            case "rook":
                return __classPrivateFieldGet(this, _Board_instances, "m", _Board_validRookMove).call(this, current_x, current_y, goal_x, goal_y);
            case "pawn":
                return __classPrivateFieldGet(this, _Board_instances, "m", _Board_validPawnMove).call(this, current_x, current_y, goal_x, goal_y);
            case "knight":
                return __classPrivateFieldGet(this, _Board_instances, "m", _Board_validKnightMove).call(this, current_x, current_y, goal_x, goal_y);
            case "bishop":
                return __classPrivateFieldGet(this, _Board_instances, "m", _Board_validBishopMove).call(this, current_x, current_y, goal_x, goal_y);
            case "king":
                return __classPrivateFieldGet(this, _Board_instances, "m", _Board_validKingMove).call(this, current_x, current_y, goal_x, goal_y);
            case "queen":
                return __classPrivateFieldGet(this, _Board_instances, "m", _Board_validQueenMove).call(this, current_x, current_y, goal_x, goal_y);
            default:
                break;
        }
    }
}
exports.Board = Board;
_Board_instances = new WeakSet(), _Board_validPositions = function _Board_validPositions(current_x, current_y, goal_x, goal_y) {
    if (!(current_x >= 0 && current_x <= 7))
        return false;
    if (!(current_y >= 0 && current_y <= 7))
        return false;
    if (!(goal_x >= 0 && goal_x <= 7))
        return false;
    if (!(goal_y >= 0 && goal_y <= 7))
        return false;
    if (current_x == goal_x && current_y == goal_y)
        return false;
    return true;
}, _Board_selfPiecePresent = function _Board_selfPiecePresent(current_x, current_y, goal_x, goal_y) {
    var _a, _b;
    if (((_a = this.board[current_x][current_y]) === null || _a === void 0 ? void 0 : _a.color) == ((_b = this.board[goal_x][goal_y]) === null || _b === void 0 ? void 0 : _b.color)) {
        return false;
    }
    else {
        return true;
    }
}, _Board_betweenBishop = function _Board_betweenBishop(current_x, current_y, goal_x, goal_y) {
    var _a, _b, _c, _d;
    if (goal_x > current_x && goal_y > current_y) {
        for (let i = 1; i < Math.abs(goal_x - current_x); i++) {
            if (this.board[current_x + i][current_y + i] != null) {
                return false;
            }
        }
        if (!(this.board[goal_x][goal_y] == null || this.board[goal_x][goal_y].color != ((_a = this.board[current_x][current_y]) === null || _a === void 0 ? void 0 : _a.color))) {
            return false;
        }
        return true;
    }
    else if (goal_x < current_x && goal_y > current_y) {
        for (let i = 1; i < Math.abs(goal_x - current_x); i++) {
            if (this.board[current_x - i][current_y + i] != null) {
                return false;
            }
        }
        if (!(this.board[goal_x][goal_y] == null || this.board[goal_x][goal_y].color != ((_b = this.board[current_x][current_y]) === null || _b === void 0 ? void 0 : _b.color))) {
            return false;
        }
        return true;
    }
    else if (goal_x < current_x && goal_y < current_y) {
        for (let i = 1; i < Math.abs(goal_x - current_x); i++) {
            if (this.board[current_x - i][current_y - i] != null) {
                return false;
            }
        }
        if (!(this.board[goal_x][goal_y] == null || this.board[goal_x][goal_y].color != ((_c = this.board[current_x][current_y]) === null || _c === void 0 ? void 0 : _c.color))) {
            return false;
        }
        return true;
    }
    else if (goal_x > current_x && goal_y < current_y) {
        for (let i = 1; i < Math.abs(goal_x - current_x); i++) {
            if (this.board[current_x + i][current_y - i] != null) {
                return false;
            }
        }
        if (!(this.board[goal_x][goal_y] == null || this.board[goal_x][goal_y].color != ((_d = this.board[current_x][current_y]) === null || _d === void 0 ? void 0 : _d.color))) {
            return false;
        }
        return true;
    }
    else {
        return false;
    }
}, _Board_validRookMove = function _Board_validRookMove(current_x, current_y, goal_x, goal_y) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    if (current_x == goal_x) {
        if (current_y < goal_y) {
            for (let i = current_y + 1; i < goal_y; i++) {
                if (this.board[goal_x][i] != null) {
                    return [0, null];
                }
            }
            if (!(this.board[goal_x][goal_y] == null || this.board[goal_x][goal_y].color != ((_a = this.board[current_x][current_y]) === null || _a === void 0 ? void 0 : _a.color))) {
                return [0, null];
            }
            const piece = this.board[current_x][current_y];
            this.board[current_x][current_y] = null;
            this.board[goal_x][goal_y] = piece;
            (_b = this.board[goal_x][goal_y]) === null || _b === void 0 ? void 0 : _b.increment_move();
            return [1, this.board];
        }
        else if (current_y > goal_y) {
            for (let i = current_y - 1; i > goal_y; i--) {
                if (this.board[goal_x][i] != null) {
                    return [0, null];
                }
            }
            if (!(this.board[goal_x][goal_y] == null || this.board[goal_x][goal_y].color != ((_c = this.board[current_x][current_y]) === null || _c === void 0 ? void 0 : _c.color))) {
                return [0, null];
            }
            const piece = this.board[current_x][current_y];
            this.board[current_x][current_y] = null;
            this.board[goal_x][goal_y] = piece;
            (_d = this.board[goal_x][goal_y]) === null || _d === void 0 ? void 0 : _d.increment_move();
            return [1, this.board];
        }
        else {
            return [0, null];
        }
    }
    else if (current_y == goal_y) {
        if (current_x < goal_x) {
            for (let i = current_x + 1; i < goal_x; i++) {
                if (this.board[i][goal_y] != null) {
                    return [0, null];
                }
            }
            if (!(this.board[goal_x][goal_y] == null || this.board[goal_x][goal_y].color != ((_e = this.board[current_x][current_y]) === null || _e === void 0 ? void 0 : _e.color))) {
                return [0, null];
            }
            const piece = this.board[current_x][current_y];
            this.board[current_x][current_y] = null;
            this.board[goal_x][goal_y] = piece;
            (_f = this.board[goal_x][goal_y]) === null || _f === void 0 ? void 0 : _f.increment_move();
            return [1, this.board];
        }
        else if (current_x > goal_x) {
            for (let i = current_x - 1; i > goal_x; i--) {
                if (this.board[i][goal_y] != null) {
                    return [0, null];
                }
            }
            if (!(this.board[goal_x][goal_y] == null || this.board[goal_x][goal_y].color != ((_g = this.board[current_x][current_y]) === null || _g === void 0 ? void 0 : _g.color))) {
                return [0, null];
            }
            const piece = this.board[current_x][current_y];
            this.board[current_x][current_y] = null;
            this.board[goal_x][goal_y] = piece;
            (_h = this.board[goal_x][goal_y]) === null || _h === void 0 ? void 0 : _h.increment_move();
            return [1, this.board];
        }
        else {
            return [0, null];
        }
    }
    else {
        return [0, null];
    }
}, _Board_validBishopMove = function _Board_validBishopMove(current_x, current_y, goal_x, goal_y) {
    var _a;
    if (__classPrivateFieldGet(this, _Board_instances, "m", _Board_betweenBishop).call(this, current_x, current_y, goal_x, goal_y)) {
        if (Math.abs(current_x - goal_x) == Math.abs(current_y - goal_y)) {
            const piece = this.board[current_x][current_y];
            this.board[current_x][current_y] = null;
            this.board[goal_x][goal_y] = piece;
            (_a = this.board[goal_x][goal_y]) === null || _a === void 0 ? void 0 : _a.increment_move();
            return [1, this.board];
        }
    }
    return [0, null];
}, _Board_validPawnMove = function _Board_validPawnMove(current_x, current_y, goal_x, goal_y) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
    const color = (_a = this.board[current_x][current_y]) === null || _a === void 0 ? void 0 : _a.color;
    switch (color) {
        case "b":
            if (!(goal_x >= current_x + 1 && goal_x <= current_x + 2))
                return [0, null];
            if (((_b = this.board[current_x][current_y]) === null || _b === void 0 ? void 0 : _b.moves) == 0) {
                if (!(goal_x >= current_x + 1 && goal_x <= current_x + 2))
                    return [0, null];
                const possible_coords = [[1, -1], [1, 0], [1, 1]];
                for (let i = 0; i < 3; i++) {
                    if (goal_x == current_x + possible_coords[i][0] && goal_y == current_y + possible_coords[i][1]) {
                        if (Math.abs(possible_coords[i][1]) == 1) {
                            if (this.board[goal_x][goal_y] && this.board[goal_x][goal_y].color != this.board[current_x][current_y].color) {
                                const piece = this.board[current_x][current_y];
                                this.board[current_x][current_y] = null;
                                this.board[goal_x][goal_y] = piece;
                                (_c = this.board[goal_x][goal_y]) === null || _c === void 0 ? void 0 : _c.increment_move();
                                return [1, this.board];
                                ;
                            }
                            else {
                                return [0, null];
                            }
                        }
                        else {
                            const piece = this.board[current_x][current_y];
                            this.board[current_x][current_y] = null;
                            this.board[goal_x][goal_y] = piece;
                            (_d = this.board[goal_x][goal_y]) === null || _d === void 0 ? void 0 : _d.increment_move();
                            return [1, this.board];
                            ;
                        }
                    }
                }
                if (goal_x == current_x + 2 && goal_y == current_y) {
                    if (this.board[current_x + 1][current_y] == null) {
                        const piece = this.board[current_x][current_y];
                        this.board[current_x][current_y] = null;
                        this.board[goal_x][goal_y] = piece;
                        (_e = this.board[goal_x][goal_y]) === null || _e === void 0 ? void 0 : _e.increment_move();
                        return [1, this.board];
                        ;
                    }
                    else {
                        return [0, null];
                    }
                }
                return [0, null];
            }
            else {
                if (!(goal_x == current_x + 1))
                    return [0, null];
                const possible_coords = [[1, -1], [1, 0], [1, 1]];
                for (let i = 0; i < 3; i++) {
                    if (goal_x == current_x + possible_coords[i][0] && goal_y == current_y + possible_coords[i][1]) {
                        if (Math.abs(possible_coords[i][1]) == 1) {
                            if (this.board[goal_x][goal_y] && this.board[goal_x][goal_y].color != ((_f = this.board[current_x][current_y]) === null || _f === void 0 ? void 0 : _f.color)) {
                                const piece = this.board[current_x][current_y];
                                this.board[current_x][current_y] = null;
                                this.board[goal_x][goal_y] = piece;
                                (_g = this.board[goal_x][goal_y]) === null || _g === void 0 ? void 0 : _g.increment_move();
                                return [1, this.board];
                                ;
                            }
                            else {
                                return [0, null];
                            }
                        }
                        else {
                            const piece = this.board[current_x][current_y];
                            this.board[current_x][current_y] = null;
                            this.board[goal_x][goal_y] = piece;
                            (_h = this.board[goal_x][goal_y]) === null || _h === void 0 ? void 0 : _h.increment_move();
                            return [1, this.board];
                            ;
                        }
                    }
                }
                return [0, null];
            }
            break;
        case "w":
            if (!(goal_x <= current_x - 1 && goal_x >= current_x - 2))
                return [0, null];
            if (((_j = this.board[current_x][current_y]) === null || _j === void 0 ? void 0 : _j.moves) == 0) {
                if (!(goal_x <= current_x - 1 && goal_x >= current_x - 2))
                    return [0, null];
                const possible_coords = [[-1, -1], [-1, 0], [-1, 1]];
                for (let i = 0; i < 3; i++) {
                    if (goal_x == current_x + possible_coords[i][0] && goal_y == current_y + possible_coords[i][1]) {
                        if (Math.abs(possible_coords[i][1]) == 1) {
                            if (this.board[goal_x][goal_y] && this.board[goal_x][goal_y].color != ((_k = this.board[current_x][current_y]) === null || _k === void 0 ? void 0 : _k.color)) {
                                const piece = this.board[current_x][current_y];
                                this.board[current_x][current_y] = null;
                                this.board[goal_x][goal_y] = piece;
                                (_l = this.board[goal_x][goal_y]) === null || _l === void 0 ? void 0 : _l.increment_move();
                                return [1, this.board];
                                ;
                            }
                            else {
                                return [0, null];
                            }
                        }
                        else {
                            const piece = this.board[current_x][current_y];
                            this.board[current_x][current_y] = null;
                            this.board[goal_x][goal_y] = piece;
                            (_m = this.board[goal_x][goal_y]) === null || _m === void 0 ? void 0 : _m.increment_move();
                            return [1, this.board];
                            ;
                        }
                    }
                }
                if (goal_x == current_x - 2 && goal_y == current_y) {
                    if (this.board[current_x - 1][current_y] == null) {
                        const piece = this.board[current_x][current_y];
                        this.board[current_x][current_y] = null;
                        this.board[goal_x][goal_y] = piece;
                        (_o = this.board[goal_x][goal_y]) === null || _o === void 0 ? void 0 : _o.increment_move();
                        return [1, this.board];
                        ;
                    }
                    else {
                        return [0, null];
                    }
                }
                return [0, null];
            }
            else {
                if (!(goal_x == current_x - 1))
                    return [0, null];
                const possible_coords = [[-1, -1], [-1, 0], [-1, 1]];
                for (let i = 0; i < 3; i++) {
                    if (goal_x == current_x + possible_coords[i][0] && goal_y == current_y + possible_coords[i][1]) {
                        if (Math.abs(possible_coords[i][1]) == 1) {
                            if (this.board[goal_x][goal_y] && this.board[goal_x][goal_y].color != ((_p = this.board[current_x][current_y]) === null || _p === void 0 ? void 0 : _p.color)) {
                                const piece = this.board[current_x][current_y];
                                this.board[current_x][current_y] = null;
                                this.board[goal_x][goal_y] = piece;
                                (_q = this.board[goal_x][goal_y]) === null || _q === void 0 ? void 0 : _q.increment_move();
                                return [1, this.board];
                                ;
                            }
                            else {
                                return [0, null];
                            }
                        }
                        else {
                            const piece = this.board[current_x][current_y];
                            this.board[current_x][current_y] = null;
                            this.board[goal_x][goal_y] = piece;
                            (_r = this.board[goal_x][goal_y]) === null || _r === void 0 ? void 0 : _r.increment_move();
                            return [1, this.board];
                            ;
                        }
                    }
                }
                return [0, null];
            }
            break;
        default:
            break;
    }
}, _Board_validKnightMove = function _Board_validKnightMove(current_x, current_y, goal_x, goal_y) {
    var _a, _b;
    const coords = [
        [-2, -1],
        [-2, 1],
        [-1, 2],
        [1, 2]
    ];
    for (let i = 0; i < 4; i++) {
        if (current_x + coords[i][0] == goal_x && current_y + coords[i][1] == goal_y) {
            const piece = this.board[current_x][current_y];
            this.board[current_x][current_y] = null;
            this.board[goal_x][goal_y] = piece;
            (_a = this.board[goal_x][goal_y]) === null || _a === void 0 ? void 0 : _a.increment_move();
            return [1, this.board];
        }
    }
    for (let i = 0; i < 4; i++) {
        if (current_x + coords[i][1] == goal_x && current_y + coords[i][0] == goal_y) {
            const piece = this.board[current_x][current_y];
            this.board[current_x][current_y] = null;
            this.board[goal_x][goal_y] = piece;
            (_b = this.board[goal_x][goal_y]) === null || _b === void 0 ? void 0 : _b.increment_move();
            return [1, this.board];
        }
    }
    return [0, null];
}, _Board_validKingMove = function _Board_validKingMove(current_x, current_y, goal_x, goal_y) {
    var _a;
    let coords = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
    for (let i = 0; i < 8; i++) {
        if (current_x + coords[i][0] == goal_x && current_y + coords[i][1] == goal_y) {
            const piece = this.board[current_x][current_y];
            this.board[current_x][current_y] = null;
            this.board[goal_x][goal_y] = piece;
            (_a = this.board[goal_x][goal_y]) === null || _a === void 0 ? void 0 : _a.increment_move();
            return [1, this.board];
            ;
        }
    }
    return [0, null];
}, _Board_validQueenMove = function _Board_validQueenMove(current_x, current_y, goal_x, goal_y) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    if (current_x == goal_x) {
        if (current_y < goal_y) {
            for (let i = current_y + 1; i < goal_y; i++) {
                if (this.board[goal_x][i] != null) {
                    return [0, null];
                }
            }
            if (!(this.board[goal_x][goal_y] == null || this.board[goal_x][goal_y].color != ((_a = this.board[current_x][current_y]) === null || _a === void 0 ? void 0 : _a.color))) {
                return [0, null];
            }
            const piece = this.board[current_x][current_y];
            this.board[current_x][current_y] = null;
            this.board[goal_x][goal_y] = piece;
            (_b = this.board[goal_x][goal_y]) === null || _b === void 0 ? void 0 : _b.increment_move();
            return [1, this.board];
        }
        else if (current_y > goal_y) {
            for (let i = current_y - 1; i > goal_y; i--) {
                if (this.board[goal_x][i] != null) {
                    return [0, null];
                }
            }
            if (!(this.board[goal_x][goal_y] == null || this.board[goal_x][goal_y].color != ((_c = this.board[current_x][current_y]) === null || _c === void 0 ? void 0 : _c.color))) {
                return [0, null];
            }
            const piece = this.board[current_x][current_y];
            this.board[current_x][current_y] = null;
            this.board[goal_x][goal_y] = piece;
            (_d = this.board[goal_x][goal_y]) === null || _d === void 0 ? void 0 : _d.increment_move();
            return [1, this.board];
        }
        else {
            return [0, null];
        }
    }
    else if (current_y == goal_y) {
        if (current_x < goal_x) {
            for (let i = current_x + 1; i < goal_x; i++) {
                if (this.board[i][goal_y] != null) {
                    return [0, null];
                }
            }
            if (!(this.board[goal_x][goal_y] == null || this.board[goal_x][goal_y].color != ((_e = this.board[current_x][current_y]) === null || _e === void 0 ? void 0 : _e.color))) {
                return [0, null];
            }
            const piece = this.board[current_x][current_y];
            this.board[current_x][current_y] = null;
            this.board[goal_x][goal_y] = piece;
            (_f = this.board[goal_x][goal_y]) === null || _f === void 0 ? void 0 : _f.increment_move();
            return [1, this.board];
        }
        else if (current_x > goal_x) {
            for (let i = current_x - 1; i > goal_x; i--) {
                if (this.board[i][goal_y] != null) {
                    return [0, null];
                }
            }
            if (!(this.board[goal_x][goal_y] == null || this.board[goal_x][goal_y].color != ((_g = this.board[current_x][current_y]) === null || _g === void 0 ? void 0 : _g.color))) {
                return [0, null];
            }
            const piece = this.board[current_x][current_y];
            this.board[current_x][current_y] = null;
            this.board[goal_x][goal_y] = piece;
            (_h = this.board[goal_x][goal_y]) === null || _h === void 0 ? void 0 : _h.increment_move();
            return [1, this.board];
        }
        else {
            return [0, null];
        }
    }
    else {
        if (__classPrivateFieldGet(this, _Board_instances, "m", _Board_betweenBishop).call(this, current_x, current_y, goal_x, goal_y)) {
            if (Math.abs(current_x - goal_x) == Math.abs(current_y - goal_y)) {
                const piece = this.board[current_x][current_y];
                this.board[current_x][current_y] = null;
                this.board[goal_x][goal_y] = piece;
                (_j = this.board[goal_x][goal_y]) === null || _j === void 0 ? void 0 : _j.increment_move();
                return [1, this.board];
            }
        }
        return [0, null];
    }
};
function get_knights() {
    const knights = [];
    const coords = [{ x: 6, y: 0 }, { x: 1, y: 7 }, { x: 1, y: 0 }, { x: 6, y: 7 }];
    for (let i = 0; i < 4; i++) {
        if (i % 2 == 0) {
            knights.push(new Piece('knight', 'b', coords[i]));
        }
        else {
            knights.push(new Piece('knight', 'w', coords[i]));
        }
    }
    return knights;
}
function get_rooks() {
    const rooks = [];
    const coords = [{ x: 7, y: 0 }, { x: 0, y: 7 }, { x: 0, y: 0 }, { x: 7, y: 7 }];
    for (let i = 0; i < 4; i++) {
        if (i % 2 == 0) {
            rooks.push(new Piece('rook', 'b', coords[i]));
        }
        else {
            rooks.push(new Piece('rook', 'w', coords[i]));
        }
    }
    return rooks;
}
function get_bishops() {
    const bishops = [];
    const coords = [{ x: 5, y: 0 }, { x: 2, y: 7 }, { x: 2, y: 0 }, { x: 5, y: 7 }];
    for (let i = 0; i < 4; i++) {
        if (i % 2 == 0) {
            bishops.push(new Piece('bishop', 'b', coords[i]));
        }
        else {
            bishops.push(new Piece('bishop', 'w', coords[i]));
        }
    }
    return bishops;
}
function get_pawns() {
    const pawns = [];
    const coords = [{ x: 7, y: 1 }, { x: 0, y: 6 }, { x: 6, y: 1 }, { x: 1, y: 6 }, { x: 5, y: 1 }, { x: 2, y: 6 }, { x: 4, y: 1 }, { x: 3, y: 6 }, { x: 3, y: 1 }, { x: 4, y: 6 }, { x: 2, y: 1 }, { x: 5, y: 6 }, { x: 1, y: 1 }, { x: 6, y: 6 }, { x: 0, y: 1 }, { x: 7, y: 6 }];
    for (let i = 0; i < 16; i++) {
        if (i % 2 == 0) {
            pawns.push(new Piece('pawn', 'b', coords[i]));
        }
        else {
            pawns.push(new Piece('pawn', 'w', coords[i]));
        }
    }
    return pawns;
}
function get_kings() {
    const kings = [];
    const coords = [{ x: 4, y: 0 }, { x: 4, y: 7 }];
    for (let i = 0; i < 4; i++) {
        if (i % 2 == 0) {
            kings.push(new Piece('king', 'b', coords[i]));
        }
        else {
            kings.push(new Piece('king', 'w', coords[i]));
        }
    }
    return kings;
}
function get_queens() {
    const queens = [];
    const coords = [{ x: 3, y: 0 }, { x: 3, y: 7 }];
    for (let i = 0; i < 4; i++) {
        if (i % 2 == 0) {
            queens.push(new Piece('queen', 'b', coords[i]));
        }
        else {
            queens.push(new Piece('queen', 'w', coords[i]));
        }
    }
    return queens;
}
