import create, {SetState} from "zustand";
import {Coin, AppState} from "../types";

const defaultCoins = [
    {key: '1', position: [1, 1, 0]},
    {key: '2', position: [-1, 1, 0]},
    {key: '3', position: [1, -1, 0]},
    {key: '4', position: [0, 2.4, 0]},
];

export default create((set: SetState<AppState>) => ({
    points: 0,
    coins: defaultCoins,

    increasePoints: () => set((state: AppState) => ({ points: state.points + 1 })),
    handleCollectCoin: (key: string) => {
        set((state: AppState) => ({ coins: state.coins.filter((coin: Coin) => coin.key !== key) }));
        set((state: AppState) => state.increasePoints());
    },
}));