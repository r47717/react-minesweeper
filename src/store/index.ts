import {CellContent, CellStatus, ICell} from "../components/Cell";
import {action, observable} from "mobx";

export const DIM_X = 10;
export const DIM_Y = 10;

const MINES_NUM = 20;

export class MineSweeperState {
    @observable cells: ICell[][] = [];
    @observable done: boolean = false;

    constructor() {
        this.init();
    }

    init = () => {
        this.done = false;

        this.cells = new Array(DIM_Y);

        for (let y = 0; y < DIM_Y; y++) {
            this.cells[y] = new Array(DIM_X);
            for (let x = 0; x < DIM_X; x++) {
                this.cells[y][x] = {
                    content: "",
                    status: "closed"
                }
            }
        }

        for (let i = 0; i < MINES_NUM; i++) {
            while (true) {
                const x = Math.floor(Math.random() * DIM_X);
                const y = Math.floor(Math.random() * DIM_Y);
                if (this.cells[y][x].content === "") {
                    this.cells[y][x].content = 'x';
                    break;
                }
            }
        }

        for (let y = 0; y < DIM_Y; y++) {
            for (let x = 0; x < DIM_X; x++) {
                const cell = this.cells[y][x];
                if (cell.content === 'x') continue;
                cell.content = this.getNeighborCellValues(x, y).filter((content) => content === 'x').length as CellContent;
            }
        }

    };

    getNeighborCellValues = (x: number, y: number): CellContent[] => {
        const output: Array<CellContent> = [];

        if (this.cells[y - 1] !== undefined && this.cells[y - 1][x - 1] !== undefined) output.push(this.cells[y - 1][x - 1].content);
        if (this.cells[y - 1] !== undefined && this.cells[y - 1][x] !== undefined) output.push(this.cells[y - 1][x].content);
        if (this.cells[y - 1] !== undefined && this.cells[y - 1][x + 1] !== undefined) output.push(this.cells[y - 1][x + 1].content);
        if (this.cells[y] !== undefined && this.cells[y][x - 1] !== undefined) output.push(this.cells[y][x - 1].content);
        if (this.cells[y] !== undefined && this.cells[y][x + 1] !== undefined) output.push(this.cells[y][x + 1].content);
        if (this.cells[y + 1] !== undefined && this.cells[y + 1][x - 1] !== undefined) output.push(this.cells[y + 1][x - 1].content);
        if (this.cells[y + 1] !== undefined && this.cells[y + 1][x] !== undefined) output.push(this.cells[y + 1][x].content);
        if (this.cells[y + 1] !== undefined && this.cells[y + 1][x + 1] !== undefined) output.push(this.cells[y + 1][x + 1].content);

        return output;
    };

    @action setStatus = (x: number, y: number, status: CellStatus) => {
        this.cells[y][x].status = status;
    };

    @action boom = () => {
        this.cells.forEach(row => {
            row.forEach(cell => cell.status = 'open');
        })
    };

    @action reset = () => {
        this.init();
    }
}

export default new MineSweeperState();
