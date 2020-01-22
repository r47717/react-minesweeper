import React, {useState} from "react";
import classNames from "classnames";
import './index.css';

export type CellContent = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | '' | 'x';

export type CellStatus = 'closed' | 'marked' | 'open';

export interface ICell {
    content: CellContent
    status: CellStatus
}

export interface ICellProps {
    content: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | '' | 'x'
    width: number
    height: number
    onBoom: Function
    done: boolean
}

const Cell: React.FC<ICellProps> = ({content, width, height, onBoom, done}) => {
    const [actualStatus, setActualStatus] = useState<string>('closed');

    const classes = classNames('cell', {
        closed: !done && actualStatus === 'closed',
        open: done || actualStatus === 'open',
        marked: !done && actualStatus === 'marked',
        boom: (actualStatus === 'open' || done) && content === 'x'
    });

    const onClickCell = () => {
        if (actualStatus === 'closed') {
            setActualStatus('open');
            if (content === 'x') {
                onBoom();
            }
        }
    };

    const onRightClick = (event: any) => {
        event.preventDefault();
        if (['closed', 'marked'].includes(actualStatus)) {
            setActualStatus(actualStatusPrev => actualStatusPrev === 'marked' ? 'closed' : 'marked');
        }
    };

    return <div
        className={classes}
        style={{width, height}}
        onClick={onClickCell}
        onContextMenu={(e) => onRightClick(e)}
    >{content}</div>
};

export default Cell;
