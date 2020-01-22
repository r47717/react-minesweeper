import React, {useState} from 'react';
import './index.css';
import Cell, {CellContent, ICell} from '../Cell';

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
const DIM_X = 10;
const DIM_Y = 10;
const CELL_WIDTH = CANVAS_WIDTH / DIM_X;
const CELL_HEIGHT = CANVAS_HEIGHT / DIM_Y;
const MINES_NUM = 20;

let initialCells: ICell[][] = new Array(DIM_Y);

for (let y = 0; y < DIM_Y; y++) {
    initialCells[y] = new Array(DIM_X);
    for (let x = 0; x < DIM_X; x++) {
        initialCells[y][x] = {
            content: "",
            status: "closed"
        }
    }
}

for (let i = 0; i < MINES_NUM; i++) {
    while (true) {
        const x = Math.floor(Math.random() * DIM_X);
        const y = Math.floor(Math.random() * DIM_Y);
        if (initialCells[y][x].content === "") {
            initialCells[y][x].content = 'x';
            break;
        }
    }
}

function getNeighborCellValues(cells: ICell[][], x: number, y: number): CellContent[] {
    const output: Array<CellContent> = [];

    if (cells[y - 1] !== undefined && cells[y - 1][x - 1] !== undefined) output.push(cells[y - 1][x - 1].content);
    if (cells[y - 1] !== undefined && cells[y - 1][x    ] !== undefined) output.push(cells[y - 1][x    ].content);
    if (cells[y - 1] !== undefined && cells[y - 1][x + 1] !== undefined) output.push(cells[y - 1][x + 1].content);
    if (cells[y    ] !== undefined && cells[y    ][x - 1] !== undefined) output.push(cells[y    ][x - 1].content);
    if (cells[y    ] !== undefined && cells[y    ][x + 1] !== undefined) output.push(cells[y    ][x + 1].content);
    if (cells[y + 1] !== undefined && cells[y + 1][x - 1] !== undefined) output.push(cells[y + 1][x - 1].content);
    if (cells[y + 1] !== undefined && cells[y + 1][x    ] !== undefined) output.push(cells[y + 1][x    ].content);
    if (cells[y + 1] !== undefined && cells[y + 1][x + 1] !== undefined) output.push(cells[y + 1][x + 1].content);

    return output;
}

for (let y = 0; y < DIM_Y; y++) {
    for (let x = 0; x < DIM_X; x++) {
        const cell = initialCells[y][x];
        if (cell.content === 'x') continue;
        cell.content = getNeighborCellValues(initialCells, x, y).filter((content) => content === 'x').length as CellContent;
    }
}

console.log(initialCells);


const App: React.FC = () => {
    const [cells, setCells] = useState<any>(initialCells);
    const [done, setDone] = useState<boolean>(false);

    const renderCells = () => {
        const arr = [];
        for (let y = 0; y < DIM_Y; y++) {
            for (let x = 0; x < DIM_X; x++) {
                arr.push(
                    <Cell
                        key={y * DIM_X + x}
                        content={cells[y][x].content}
                        width={CELL_WIDTH}
                        height={CELL_HEIGHT}
                        onBoom={() => setDone(true)}
                        done={done}
                    />
                );
            }
        }

        return arr;
    };

    return (
        <div className="App">
            <div className="canvas" style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}>
                {renderCells()}
            </div>
        </div>
    );
};

export default App;
