export interface Coin {
    key: string;
    position: [number, number, number]
}

export interface AppState {
    points: number;
    coins: Coin[];

    increasePoints: () => void;
    handleCollectCoin: () => void;
}