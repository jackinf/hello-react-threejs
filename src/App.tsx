import React, {Suspense} from 'react';
import {Html} from '@react-three/drei';
import {Physics} from '@react-three/cannon';

import Label from "./components/Label";
import Skybox from "./components/Skybox";
import Collectible from "./components/Collectible";
import {useKeyboardControls} from "./hooks/useKeyboardControls";
import Player from "./components/Player";
import useAppStore from "./hooks/useAppStore";
import Wall from "./components/Wall";

export default function App() {
    const {movement, movementText} = useKeyboardControls();

    const points = useAppStore(state => state.points);
    const coins = useAppStore(state => state.coins);
    const handleCollectCoin = useAppStore(state => state.handleCollectCoin);

    const defaultWallSize = .2;

    return (
        <>
            <Suspense fallback={<Html center>Loading...</Html>}>
                <ambientLight/>
                <color attach="background" args={['#414d57']}/>
                <pointLight position={[1, 2, 2]}/>

                <Label position={[-3, 3, 0]} text={`Points: ${points}`}/>
                <Label position={[3, 3, 0]} text={movementText}/>

                <Physics>
                    <Player movement={movement}/>

                    <Wall position={[0, 2, 0]} size={[3, defaultWallSize, defaultWallSize]} />
                    <Wall position={[-1.4, 0, 0]} size={[defaultWallSize, 4, defaultWallSize]} />
                    <Wall position={[1.6, 1, 0]} size={[defaultWallSize, 4, defaultWallSize]} />
                    <Wall position={[0, -2, 0]} size={[3, defaultWallSize, defaultWallSize]} />

                    {coins.map(coin => (
                        <Collectible
                            key={coin.key}
                            position={coin.position} name={coin.key}
                            handleCollect={() => handleCollectCoin(coin.key)}
                        />
                    ))}
                </Physics>
            </Suspense>
            <Skybox/>
        </>
    )
}
