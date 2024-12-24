class King extends Piece 
{
    constructor(row, col, team)
    {
        super(row, col, team);
        this.face = team.toUpperCase() === 'BLACK' ? '♚' : '♔';
        this.move_set = [];
        this.max_step = 1;
        this.name = 'KING';
        this.danger_tiles = [];
        this.has_moved = false;
        this.isChecked = false;
        this.castling_move_set = [];
    }

    hasMoved()
    {
        this.has_moved = true;
    }

    deleteMoveSet(row, col)
    {
        for(let i = 0; i < this.move_set.length; i++)
        {
            const [move_row, move_col] = this.move_set[i];
            if(move_row === row && move_col === col) 
            {
                this.move_set.splice(i, 1);
            }
        }
    }

    deleteDangerTiles()
    {
        for(let i = 0; i < this.danger_tiles.length; i++)
        {
            const danger = this.danger_tiles[i];
            this.deleteMoveSet(danger[0], danger[1]);
        }
    }

    hasNoMoves()
    {
        if(this.move_set.length > 0) return false;
        return true;
    }

    isMoveSetCollideWithEnemy(row, col)
    {
        for(let i = 0; i < this.move_set.length; i++)
        {
            const king_moves = this.move_set[i];
            if(king_moves[0] === row && king_moves[1] === col) 
            {
                return true;
            }
        }

        return false;
    }

    createDangerTiles(game_pieces)
    {
        this.danger_tiles = [];
        for(let i = 0; i < game_pieces.length; i++)
        {
            const piece = game_pieces[i];
            if(piece.team !== this.team)
            {
                for(let j = 0; j < piece.move_set.length; j++)
                {
                    const [enemy_row, enemy_col] = piece.move_set[j];

                    if(this.isMoveSetCollideWithEnemy(enemy_row, enemy_col))
                    {
                        this.danger_tiles.push([enemy_row, enemy_col]);
                    }
                }
            }
        }
    }

    createMoveSetWithDirection(direction, game_pieces)
    {
        const i = this.max_step;

        direction = direction.toUpperCase();
        let potential_row = this.row; 
        let potential_col = this.col;
        
        if(direction === 'TOPLEFT')
        {
            potential_col = this.col - i;
            potential_row = this.row - i;
        }

        if(direction === 'TOPRIGHT')
        {
            potential_col = this.col + i;
            potential_row = this.row - i;
        }

        if(direction === 'BOTTOMLEFT')
        {
            potential_col = this.col - i;
            potential_row = this.row + i;
        }

        if(direction === 'BOTTOMRIGHT')
        {
            potential_col = this.col + i;
            potential_row = this.row + i;
        }

        if(direction === 'UP')
        {
            potential_row = this.row - i;
        }

        if(direction === 'DOWN')
        {
            potential_row = this.row + i;
        }

        if(direction === 'LEFT')
        {
            potential_col = this.col - i;
        }

        if(direction === 'RIGHT')
        {
            potential_col = this.col + i;
        }


        if(this.isOutOfBounds(potential_row, potential_col)) return false;
        const isBlocked = this.isBlockedForward(game_pieces, {row: potential_row, col: potential_col});

        if(isBlocked && isBlocked.isBlocked)
        {
            if(isBlocked.type === 'enemy')
            {
                this.move_set.push([potential_row, potential_col]);
                return false;
            }
            if(isBlocked.type === 'ally')
            {
                return false;
            }
        }
        this.move_set.push([potential_row, potential_col]);
    }


    isCastlingBlocked(game_pieces)
    {
        let blocked = {
            right: false,
            left: false
        };

        for(let i = this.col - 1; i >= 0; i--)
        {
            if(this.isOutOfBounds(this.row, i)) break;

            const blocked_left = this.isBlockedForward(game_pieces, {row: this.row, col: i});
            
            if(blocked_left) 
            {
                if(blocked_left.piece.name === 'ROOK' && i === 0 && !blocked_left.piece.has_moved && blocked_left.type === 'ally') 
                {
                    blocked.left = false;
                    break;
                }

                blocked.left = true;
                break;
            }
        }

        for(let i = this.col + 1; i <= 7; i++)
        {
            const blocked_right = this.isBlockedForward(game_pieces, {row: this.row, col: i});

            if(blocked_right)
            {
                if(blocked_right.piece.name === 'ROOK' && i === 7 && !blocked_right.piece.has_moved && blocked_right.type === 'ally')
                {
                    blocked.right = false;
                    break;
                }

                blocked.right = true;
                break;
            }
        }

        return blocked;
    }

    getCastlingTiles(game_pieces)
    {
        let tiles = {
            left: [],
            right: []
        }

        for(let i = 0; i < 8; i++)
        {
            if(this.isOutOfBounds(this.row, this.col + i)) break;
            if(this.isOutOfBounds(this.row, this.col - i)) break;
            if(this.isCurrentLocation(this.row, this.col + i)) continue;
            if(this.isCurrentLocation(this.row, this.col - i)) continue;

            const potential_row = this.row;
            const potential_col_left = this.col - i;
            const not_blocked_left = !this.isBlockedForward(game_pieces, {row: potential_row, col: potential_col_left});
        
            const potential_col_right = this.col + i;
            const not_blocked_right = !this.isBlockedForward(game_pieces, {row: potential_row, col: potential_col_right});

            if(not_blocked_left)
            { 
                tiles.left.push([potential_row, potential_col_left]);
            }

            if(not_blocked_right)
            {
                tiles.right.push([potential_row, potential_col_right]);
            }
        }

        return tiles;
    }

    isCastlingTileFreeFromAttack(game_pieces)
    {
        const tiles = this.getCastlingTiles(game_pieces);

        let left = true;
        let right = true;

        for(let piece of game_pieces)
        {
            if(piece.team !== this.team)
            {
                for(let move of piece.move_set)
                {
                    for(let castling_move of tiles.left)
                    {
                        if(move[0] === castling_move[0] && move[1] === castling_move[1])
                        {
                            left = false;
                        }
                    }

                    for(let castling_move of tiles.right)
                    {
                        if(move[0] === castling_move[0] && move[1] === castling_move[1])
                        {
                            right = false;
                        }
                    }
                }
            }
        }

        return { left: left, right: right };
    }

    addCastlingMove(move)
    {
        this.castling_move_set.push(move);
        this.move_set.push(move);
    }

    refreshCastlingMove()
    {
        this.castling_move_set = [];
    }

    isCastlingMoveValid(row, col)
    {
        const castling_moves = this.castling_move_set;
        
        for(let move of castling_moves)
        {
            if(move[0] === row && move[1] === col)
            {
                return true;
            }
        }

        return false;
    }

    createCastlingMoves(game_pieces)
    {
        this.refreshCastlingMove();
        if(this.has_moved) return false;
        if(this.isChecked) return false;

        // tiles must not be blocked 
        const blocked = this.isCastlingBlocked(game_pieces);

        // tiles must not be attacked 
        const castling_clearance = this.isCastlingTileFreeFromAttack(game_pieces);

        if(!blocked.left && castling_clearance.left)
        {
            const castling_left = [ this.row, this.col - 2 ];
            this.addCastlingMove(castling_left);
        }

        if(!blocked.right && castling_clearance.right)
        {
            const castling_right = [ this.row, this.col + 2 ];
            this.addCastlingMove(castling_right);
        }

        return true;
    }

    createMoveSet(game_pieces)
    {
        this.clearMoveSet();
        const MOVES = ['up', 'down', 'left', 'right', 'topleft', 'topright', 'bottomleft', 'bottomright'];

        for(let move of MOVES)
        {
            this.createMoveSetWithDirection(move, game_pieces);     
        }
    }
}