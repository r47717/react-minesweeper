import React from "react";
import {observer} from "mobx-react";
import classNames from "classnames";

import './index.css';
import {MineSweeperState} from "../../store";

export type CellContent = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | '' | 'x';

export type CellStatus = 'closed' | 'marked' | 'open';

export interface ICell {
    content: CellContent
    status: CellStatus
}

export interface ICellProps {
    width: number
    height: number
    store: MineSweeperState
    x: number
    y: number
}

const Cell: React.FC<ICellProps> = observer(({width, height, store, x, y}) => {
    const {cells, done} = store;
    const {content, status} = cells[y][x];

    const classes = classNames('cell', {
        closed: !done && status === 'closed',
        open: done || status === 'open',
        marked: !done && status === 'marked',
        boom: (status === 'open' || done) && content === 'x'
    });

    const onClickCell = () => {
        if (status === 'closed') {
            store.setStatus(x, y, 'open');
            if (content === 'x') {
                store.boom();
            }
        }
    };

    const onRightClick = (event: any) => {
        event.preventDefault();
        if (['closed', 'marked'].includes(status)) {
            store.setStatus(x, y, status === 'marked' ? 'closed' : 'marked');
        }
    };

    return <div
        className={classes}
        style={{width, height}}
        onClick={onClickCell}
        onContextMenu={(e) => onRightClick(e)}
    >{content}</div>
});

export default Cell;
