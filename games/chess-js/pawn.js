// PAWN 
class Pawn extends Piece
{
    constructor(row, col, team)
    {
        super(row, col, team);
        this.face = team.toUpperCase() === 'BLACK' ? '♟︎' : '♙';
        this.direction = this.team === 'BLACK' ? 1 : -1;
        this.move_set = [];
        this.step = 1;
        this.starting_row = this.team === 'BLACK' ? 1 : 6;
        this.end_row = this.team === 'BLACK' ? 7 : 0;
        this.name = 'PAWN';

        this.en_passant_states = { INIT: 0, STEP: 1, ENEMY_CHANCE: 2, DONE: 3 }
        this.en_passant_state = this.en_passant_states.INIT;

        this.is_en_passant = false;
        this.en_passant_object = {
            enemy: null, 
            moves: []
        };
    }

    setEnPassantState(state)
    {
        this.en_passant_state = state;

        if(state === this.en_passant_states.ENEMY_CHANCE)
        {
            this.is_en_passant = true;
        }
        else 
        {
            this.is_en_passant = false;
        }
    }

    isBlockedForward(game_pieces, steps = 1)
    {
        const potential_row = this.row + (steps * this.direction);
        const potential_col = this.col;

        for (let i = 0; i < game_pieces.length; i++) {
            const piece = game_pieces[i];
            
            if(piece.row === potential_row && piece.col === potential_col)
            {
                return true;
            }
        }

        return false;
    }

    isBlockedLeftForwardByEnemy(game_pieces)
    {
        const potential_row = this.row + (1 * this.direction);
        const potential_col = this.col + (1 * this.direction);

        for (let i = 0; i < game_pieces.length; i++) {
            const piece = game_pieces[i];
            
            if(piece.row === potential_row && piece.col === potential_col && piece.team !== this.team)
            {
                return true;
            }
        }

        return false;
    }

    isBlockedRightForwardByEnemy(game_pieces)
    {
        const potential_row = this.row + (1 * this.direction);
        const potential_col = this.col + (-1 * this.direction);

        for (let i = 0; i < game_pieces.length; i++) {
            const piece = game_pieces[i];
            
            if(piece.row === potential_row && piece.col === potential_col && piece.team !== this.team)
            {
                return true;
            }
        }

        return false;
    }

    checkAdjacent(game_pieces)
    {
        let results = {
            found: false, 
            left: {},
            right: {}
        }

        for(let piece of game_pieces)
        {
            if(piece.team !== this.team && piece.name === 'PAWN')
            {
                const enemy_pawn = piece;
                // left
                if(enemy_pawn.row === this.row && enemy_pawn.col === this.col - 1) 
                {
                    results.found = true;
                    results.left.piece = enemy_pawn; 
                    results.left.found = true;
                }

                if(enemy_pawn.row === this.row && enemy_pawn.col === this.col + 1)
                {
                    results.found = true;
                    results.right.piece = enemy_pawn; 
                    results.right.found = true;
                }
            }
        }

        // console.log(results);
        return results;
    }

    clearEnPassantMoves()
    {
        this.en_passant_moves = [];
    }

    isEnPassantMove(row, col)
    {
        for(let moves of this.en_passant_object.moves)
        {
            if(moves[0] === row && moves[1] === col) return true;
        }
        return false;
    }

    createMoveSet(game_pieces)
    {
        this.clearMoveSet();
        this.clearEnPassantMoves();
        
        if(!this.isBlockedForward(game_pieces))
        {
            if(this.starting_row === this.row && !this.isBlockedForward(game_pieces, 2))
            {
                this.move_set.push([this.row + (2 * this.direction), this.col]);    
            }
            this.move_set.push([this.row + (1 * this.direction), this.col]);
        }

        if(this.isBlockedLeftForwardByEnemy(game_pieces))
        {
            this.move_set.push([this.row + (1 * this.direction), this.col + (1 * this.direction)]);
        }

        if(this.isBlockedRightForwardByEnemy(game_pieces))
        {
            this.move_set.push([this.row + (1 * this.direction), this.col + (-1 * this.direction)]);
        }

        const adjacent = this.checkAdjacent(game_pieces);
        
        if(adjacent.found) 
        {
            if(adjacent.left.found && adjacent.left.piece.is_en_passant)
            {
                this.move_set.push([ this.row + (1 * this.direction), this.col - 1 ]);
                this.en_passant_object.moves.push([ this.row + (1 * this.direction), this.col - 1 ]);
                this.en_passant_object.enemy = adjacent.left.piece;
            }

            if(adjacent.right.found && adjacent.right.piece.is_en_passant)
            {
                this.move_set.push([ this.row + (1 * this.direction), this.col + 1 ]);
                this.en_passant_object.moves.push([ this.row + (1 * this.direction), this.col + 1 ]);
                this.en_passant_object.enemy = adjacent.right.piece;
            }
        }
    }
}