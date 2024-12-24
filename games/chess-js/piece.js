class Piece
{
    constructor(row, col, team)
    {
        this.row = row;
        this.col = col; 
        this.team = team.toUpperCase();
        this.move_set = [];
        this.end_row = false;
        this.name = this.team;
    }

    clearMoveSet()
    {
        this.move_set = [];
    }

    getMoveSet()
    {
        return this.move_set;
    }

    isOutOfBounds(row, col)
    {
        return (row < 0 || row > 7 || col < 0 || col > 7);
    }

    isCurrentLocation(row, col)
    {
        return this.row === row && this.col === col;
    }

    isMoveSetExist(row, col)
    {
        for(let move in this.move_set)
        {
            const [move_row, move_col] = move; 
            if(move_row === row && move_col === col) return true;
        }

        return false;
    }

    isEnemy(piece)
    {
        return piece.team !== this.team;
    }

    isBlockedForward(game_pieces, coor)
    {
        for(let i = 0; i < game_pieces.length; i++)
        {
            const piece = game_pieces[i];

            if(this.isCurrentLocation(coor.row, coor.col)) return false;
            if(piece.row === coor.row && piece.col === coor.col)
            {
                if(this.isEnemy(piece))
                {
                    return {isBlocked : true, type: 'enemy', piece: piece}
                }
                else
                {
                    return { isBlocked: true, type: 'ally', piece: piece };
                }   
            }
        }
        return false;
    }

    // Checks if I have a piece on this square (row, col)
    // returns false if none and if enemy
    // returns true if its my piece that is blocking towards 
    // search for my King
    isMyPieceBlocking(row, col, myPieces)
    {
        // if enemy piece is blocking and not KING
        if(row === this.row && col === this.col) return false;
        for(const piece of myPieces)
        {
            if(piece.row === row && piece.col === col) return true;
        }
        return false;
    }

    // Searching for my King
    find(king, myPieces)
    {
        let isFound = false;
        let direction = null;
        let scannedCol = this.col;
        let scannedRow = this.row;

        // scan left
        while (scannedCol >= 0) 
        {
            if(scannedCol === king.col && this.row === king.row) 
            {
                isFound = true;
                direction = 'left';
                return {isFound, direction};
            }
            if(this.isMyPieceBlocking(scannedRow, scannedCol, myPieces)) break;
            scannedCol--;
        }

        // scan right
        scannedCol = this.col;
        while (scannedCol <= 7 && this.row === king.row) 
        {
            if(scannedCol === king.col) 
            {
                isFound = true;
                direction = 'right';
                return {isFound, direction};
            }
            if(this.isMyPieceBlocking(scannedRow, scannedCol, myPieces)) break;
            scannedCol++;
        }

        // scan up
        scannedRow = this.row;
        while (scannedRow >= 0 && this.col === king.col) 
        {
            if(scannedRow === king.row) 
            {
                isFound = true;
                direction = 'up';
                return {isFound, direction};
            }
            if(this.isMyPieceBlocking(scannedRow, scannedCol, myPieces)) break;
            scannedRow--;
        }

        // scan down
        scannedRow = this.row;
        while (scannedRow <= 7 && this.col === king.col) 
        {
            if(scannedRow === king.row) 
            {
                isFound = true;
                direction = 'down';
                return {isFound, direction};
            }
            if(this.isMyPieceBlocking(scannedRow, scannedCol, myPieces)) break;
            scannedRow++;
        }

        // up left
        scannedRow = this.row;
        scannedCol = this.col; 
        while (scannedRow >= 0 && scannedCol >= 0) 
        {
            if(scannedRow === king.row && scannedCol === king.col) 
            {
                isFound = true;
                direction = 'up-left';
                return {isFound, direction};
            }
            if(this.isMyPieceBlocking(scannedRow, scannedCol, myPieces)) break;
            scannedRow--;
            scannedCol--;
        }

        // up right
        scannedRow = this.row;
        scannedCol = this.col; 
        while (scannedRow >= 0 && scannedCol <= 7) 
        {
            if(scannedRow === king.row && scannedCol === king.col) 
            {
                isFound = true;
                direction = 'up-right';
                return {isFound, direction};
            }
            if(this.isMyPieceBlocking(scannedRow, scannedCol, myPieces)) break;
            scannedRow--;
            scannedCol++;
        }

        // down left
        scannedRow = this.row;
        scannedCol = this.col; 
        while (scannedRow <= 7 && scannedCol >= 0) 
        {
            if(scannedRow === king.row && scannedCol === king.col) 
            {
                isFound = true;
                direction = 'down-left';
                return {isFound, direction};
            }
            if(this.isMyPieceBlocking(scannedRow, scannedCol, myPieces)) break;
            scannedRow++;
            scannedCol--;
        }

        // down right
        scannedRow = this.row;
        scannedCol = this.col; 
        while (scannedRow <= 7 && scannedCol <= 7) 
        {
            if(scannedRow === king.row && scannedCol === king.col) 
            {
                isFound = true;
                direction = 'down-right';
                return {isFound, direction};
            }
            if(this.isMyPieceBlocking(scannedRow, scannedCol, myPieces)) break;
            scannedRow++;
            scannedCol++;
        }

        return {isFound, direction};
    }

    isAllowed([row, col], allowedMoveSet)
    {
        for(const allowedMove of allowedMoveSet) {
            const [allowedRow, allowedCol] = allowedMove;
            if(row === allowedRow && col === allowedCol) 
            {
                // console.log(row, col, allowedMove);
                return true;
            }
        }
        return false;
    }

    allowMoveSet(allowedMoveSet)
    {
        const myMovesets = this.move_set;
        let newMoves = [];
        
        myMovesets.forEach(move => {
            const inAllowed = this.isAllowed(move, allowedMoveSet);
            if(inAllowed) {
                newMoves.push(move);
            }
        });
        // console.log(newMoves);
        this.move_set = newMoves;
    }
}