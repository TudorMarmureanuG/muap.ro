class Board 
{
    constructor()
    {
        this.board = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];

        this.face_pieces = {
            WHITE: ['♙', '♘', '♗', '♖', '♕', '♔'], 
            BLACK: ['♟︎', '♞', '♝', '♜', '♛', '♚']
        };
    }

    isTeamFace(content, team_name)
    {
        for(let team_face of this.face_pieces[team_name])
        {
            if(content === team_face)
            {
                return true;
            }
        }

        return false;
    }

    isEmpty(row, col)
    {
        const content = this.board[row][col];

        if(content === 0 || content === null)
        {
            return true;
        }

        return false;
    }

    isPawnAtEnd(piece, to)
    {
        if(piece.end_row == to.row)
        {
            return true;
        }

        return false;
    }

    isAnAttack(piece, to)
    {
        if(this.isEmpty(to.row, to.col)) return false;
        
        const content = this.board[to.row][to.col];

        const face_array = this.face_pieces[piece.team];
        const isTeammate = false;

        for (let i = 0; i < face_array.length; i++) {
            const team_face = face_array[i];
            
            if(team_face === content) 
            {
                isTeammate = true;
            }
        }

        if(isTeammate)
        {
            return false;
        }

        return true;
    }

    refreshBoard()
    {
        for (let row_index = 0; row_index < this.board.length; row_index++) {
            const row = this.board[row_index];
            for (let col_index = 0; col_index < row.length; col_index++) {
                this.board[row_index][col_index] = 0;
            }
        }
    }

    insert(piece)
    {
        this.board[piece.row][piece.col] = piece.face;
    }

    remove(row, col)
    {
        this.board[row][col] = 0;
    }

    move(piece, to)
    {
        this.remove(piece.row, piece.col);
        piece.row = to.row;
        piece.col = to.col;
        this.insert(piece);
    }

    pickTileColor(row, column) 
    {
        if(row % 2 === 0 && column % 2 !== 0) return "black";
        if(row % 2 == 0 && column % 2 === 0) return "white";
        if(row % 2 !== 0 && column % 2 === 0) return "black";
        return "white";
    }

    createTile(row_index, col_index, element)
    {
        const tile = document.createElement('div');
        tile.setAttribute('class', 'tile');
        tile.setAttribute('id', `r${row_index}c${col_index}`);
        tile.setAttribute('data-row', row_index);
        tile.setAttribute('data-col', col_index);
        tile.classList.add(this.pickTileColor(row_index, col_index));
        tile.innerHTML = element !== 0 ? element : "";
        return tile;
    }

    renderHTML()
    {
        const div = document.createElement('div');
        div.setAttribute('id', 'chessboard');

        for (let row_index = 0; row_index < this.board.length; row_index++) {
            const row = this.board[row_index];
            for (let col_index = 0; col_index < row.length; col_index++) {
                const element = row[col_index];
                
                const tile = this.createTile(row_index, col_index, element);
                div.appendChild(tile);
            }
        }

        return div;
    }
}