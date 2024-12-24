class Knight extends Piece 
{
    constructor(row, col, team)
    {
        super(row, col, team);
        this.face = team.toUpperCase() === 'BLACK' ? '♞' : '♘';
        this.move_set = [];
        this.forward = 2;
        this.flank = 1;
        this.name = 'KNIGHT';
    }

    createMoveSetWithDirection(direction, game_pieces)
    {
        direction = direction.toUpperCase();
        let potential_row = this.row; 
        let potential_col = this.col;
        
        if(direction === 'TOPLEFT')
        {
            potential_col = this.col - this.forward;
            potential_row = this.row - this.flank;
        }

        if(direction === 'TOPRIGHT')
        {
            potential_col = this.col - this.forward;
            potential_row = this.row + this.flank;
        }

        if(direction === 'BOTTOMLEFT')
        {
            potential_col = this.col - this.flank;
            potential_row = this.row + this.forward;
        }

        if(direction === 'BOTTOMRIGHT')
        {
            potential_col = this.col + this.flank;
            potential_row = this.row + this.forward;
        }

        if(direction === 'LEFTUP')
        {
            potential_col = this.col - this.flank;
            potential_row = this.row - this.forward;
        }

        if(direction === 'LEFTDOWN')
        {
            potential_col = this.col + this.flank;
            potential_row = this.row - this.forward;
        }

        if(direction === 'RIGHTUP')
        {
            potential_col = this.col + this.forward;
            potential_row = this.row - this.flank;
        }

        if(direction === 'RIGHTDOWN')
        {
            potential_col = this.col + this.forward;
            potential_row = this.row + this.flank;
        }

        if(this.isOutOfBounds(potential_row, potential_col)) return false;
        const isBlocked = this.isBlockedForward(game_pieces, {row: potential_row, col: potential_col});

        if(isBlocked && isBlocked.isBlocked)
        {
            if(isBlocked.type === 'enemy')
            {
                this.move_set.push([potential_row, potential_col]);
                return true;
            }
            
            if(isBlocked.type === 'ally')
            {
                if(isBlocked.piece.name === "KING")
                {
                    return false;
                }

                this.move_set.push([potential_row, potential_col]);
                return false;
            }
        }
        this.move_set.push([potential_row, potential_col]);
    }

    createMoveSet(game_pieces)
    {
        this.clearMoveSet();
        this.createMoveSetWithDirection('topleft', game_pieces);
        this.createMoveSetWithDirection('topright', game_pieces);
        this.createMoveSetWithDirection('bottomleft', game_pieces);
        this.createMoveSetWithDirection('bottomright', game_pieces); 
        this.createMoveSetWithDirection('leftup', game_pieces);
        this.createMoveSetWithDirection('leftdown', game_pieces);
        this.createMoveSetWithDirection('rightup', game_pieces);
        this.createMoveSetWithDirection('rightdown', game_pieces);  
    }
}