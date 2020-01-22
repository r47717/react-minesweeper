import React from 'react';
import {observer} from "mobx-react";

import './index.css';
import Cell from '../Cell';
import {DIM_X, DIM_Y, MineSweeperState} from "../../store";

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
const CELL_WIDTH = CANVAS_WIDTH / DIM_X;
const CELL_HEIGHT = CANVAS_HEIGHT / DIM_Y;

const App: React.FC<{ store: MineSweeperState }> = observer(({store}) => {
    const renderCells = () => {
        const arr = [];
        for (let y = 0; y < DIM_Y; y++) {
            for (let x = 0; x < DIM_X; x++) {
                arr.push(
                    <Cell
                        key={y * DIM_X + x}
                        store={store}
                        x={x}
                        y={y}
                        width={CELL_WIDTH}
                        height={CELL_HEIGHT}
                    />
                );
            }
        }

        return arr;
    };

    return (
        <div className="App">
            <div className="canvas" style={{width: CANVAS_WIDTH, height: CANVAS_HEIGHT}}>
                {renderCells()}
            </div>
            <div className="reset-btn">
                <button onClick={() => store.reset()}>Reset</button>
            </div>
        </div>
    );
});

export default App;
