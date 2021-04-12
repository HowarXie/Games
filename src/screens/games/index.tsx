import TicTacToe from "./tic-tac-toe/tic-tac-toe";
import Game2048 from "./game-2048/game-2048";
import BlackWhiteChess from "./black-white-chess/black-white-chess";

import tictactoe from "./../../content/pictures/tictactoe.png";
import game2048 from "./../../content/pictures/game2048.png";
import blackWhiteChess from "./../../content/pictures/blackWhiteChess.png";

const gamePath = "/games";

//should config the game info after adding a new game
const gameConfigurations: GameConfiguration[] = [
    {
        title: "Tic-Tac-Toe",
        name: "tictactoe",
        imagePath: tictactoe,
        discription: "PVE game",
        to: gamePath + "/tictactoe",
        component: (props: any) => <TicTacToe {...props}></TicTacToe>
    },
    {
        title: "2048",
        name: "game2048",
        imagePath: game2048,
        to: gamePath + "/game2048",
        component: (props: any) => <Game2048 {...props}></Game2048>
    },
    {
        title: "Black White Chess",
        name: "blackWhiteChess",
        imagePath: blackWhiteChess,
        discription: "PVP game",
        to: gamePath + "/blackWhiteChess",
        component: (props: any) => <BlackWhiteChess {...props}></BlackWhiteChess>
    }
];

export default gameConfigurations;

interface GameConfiguration {
    title: string;
    name: string;
    component: (props: any) => JSX.Element;
    imagePath: string;
    discription?: string;
    to: string;
}