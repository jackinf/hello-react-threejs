import React, {Suspense, useState} from 'react'
import {useFrame} from '@react-three/fiber'
import {Html} from '@react-three/drei'
import CardText from "./components/CardText";
import {Physics} from '@react-three/cannon'
import Skybox from "./components/Skybox";
import Collectible from "./components/Collectible";
import {useKeyboardControls} from "./hooks/useKeyboardControls";
import Player from "./components/Player";

export default function App() {
    const {movement, movementText} = useKeyboardControls();
    const [pos, setPos] = useState([0, 0, 0]);
    const [points, setPoints] = useState(0);

    const [coin01, setCoin01] = useState<string | null>('1');
    const [coin02, setCoin02] = useState<string | null>('2');
    const [coin03, setCoin03] = useState<string | null>('3');

    useFrame(() => {
        const step = 0.05;
        const dx = movement.moveLeft ? -step : movement.moveRight ? step : 0;
        const dy = movement.moveForward ? step : movement.moveBackward ? -step : 0;
        const dz = 0;
        setPos([pos[0] + dx, pos[1] + dy, pos[2] + dz])
    });

    const handleCollectCoin = (setter: React.Dispatch<React.SetStateAction<string | null>>) => {
        setPoints(points + 1);
        setter(null);
    };

    return (
        <>
            <Suspense fallback={<Html center>Loading...</Html>}>
                <ambientLight/>
                <color attach="background" args={['#414d57']}/>
                <pointLight position={[1, 2, 2]}/>

                <CardText position={[-3, 3, 0]} text={`Points: ${points}`}/>
                <CardText position={[3, 3, 0]} text={movementText}/>

                <Physics>
                    <Player position={pos}/>

                    {coin01 && <Collectible position={[1, 1, 0]} name={coin01}
                                             handleCollect={() => handleCollectCoin(setCoin01)}/>}
                    {coin02 && <Collectible position={[-1, 1, 0]} name={coin02}
                                             handleCollect={() => handleCollectCoin(setCoin02)}/>}
                    {coin03 && <Collectible position={[1, -1, 0]} name={coin03}
                                             handleCollect={() => handleCollectCoin(setCoin03)}/>}
                </Physics>

            </Suspense>

            <Skybox/>
        </>
    )
}
