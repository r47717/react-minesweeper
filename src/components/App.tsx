import React, {useState} from 'react';
import './App.css';

interface ICell {
    content: string
    open: boolean
}

const Cell: React.FC<ICell> = ({content, open}) => {
    return <div className="cell">{content}</div>
};

const DIM_X = 10;
const DIM_Y = 10;
const initialCells = new Array(DIM_Y).fill(new Array(DIM_X).fill({
    content: "1",
    open: false,
    x: 0,
    y: 0,
}));

const App: React.FC = () => {
    const [cells, setCells] = useState<any>(initialCells);

    const renderCells = () => {
        for (let y = 0; y < DIM_Y; y++) {
            for (let x = 0; x < DIM_X; x++) {
                return <Cell content={cells[y][x].content} open={cells[y][x].content.open} />;
            }
        }
    };

    return (
        <div className="App">
            <div className="canvas">
                {renderCells()}
            </div>
        </div>
    );
};

export default App;
