// ROOK
class Rook extends Piece 
{
    constructor(row, col, team)
    {
        super(row, col, team);
        this.face = team.toUpperCase() === 'BLACK' ? '♜' : '♖';
        this.move_set = [];
        this.max_step = 8;
        this.has_moved = false;
        this.name = 'ROOK';
    }

    hasMoved()
    {
        this.has_moved = true;
    }

    createMoveSetWithDirection(direction, game_pieces)
    {
        direction = direction.toUpperCase();
        let potential_row = this.row; 
        let potential_col = this.col;
        
        for(let i = 0; i < this.max_step; i++)
        {
            if(direction === 'RIGHT')
            {
                potential_col = this.col + i;
            }

            if(direction === 'LEFT')
            {
                potential_col = this.col - i;
            }

            if(direction === 'UP')
            {
                potential_row = this.row - i;
            }

            if(direction === 'DOWN')
            {
                potential_row = this.row + i;
            }

            if(this.isOutOfBounds(potential_row, potential_col)) break;
            if(this.isMoveSetExist(potential_row, potential_col)) break;
            if(this.isCurrentLocation(potential_row, potential_col)) continue;
            const isBlocked = this.isBlockedForward(game_pieces, {row: potential_row, col: potential_col});

            if(isBlocked && isBlocked.isBlocked)
            {
                if(isBlocked.type === 'enemy')
                {
                    if(isBlocked.piece.name === "KING")
                    {
                        this.move_set.push([potential_row, potential_col]);
                        continue;
                    }
                    this.move_set.push([potential_row, potential_col]);
                    break;
                }
                if(isBlocked.type === 'ally')
                {
                    if(isBlocked.piece.name === "KING")
                    {
                        // this.move_set.push([potential_row, potential_col]);
                        break;
                    }
                    this.move_set.push([potential_row, potential_col]);
                    break;
                }
            }
            this.move_set.push([potential_row, potential_col]);
        }
    }

    createMoveSet(game_pieces)
    {
        this.clearMoveSet();
        this.createMoveSetWithDirection('up', game_pieces);
        this.createMoveSetWithDirection('down', game_pieces);
        this.createMoveSetWithDirection('left', game_pieces);
        this.createMoveSetWithDirection('right', game_pieces);
    }
}