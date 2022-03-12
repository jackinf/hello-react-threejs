import React, {useState} from 'react';
import {useSphere} from "@react-three/cannon";
import {useFrame} from "@react-three/fiber";

export default function Player(props: { movement: any }) {
    const scale = .2;
    const [ref, {position}] = useSphere(() => ({
        args: [scale],
        type: 'Dynamic',
        position: [0, 0, 0]
    }));
    const [pos, setPos] = useState([0, 0, 0]);

    useFrame(() => {
        const movement = props.movement;
        const step = 0.05;
        const dx = movement.moveLeft ? -step : movement.moveRight ? step : 0;
        const dy = movement.moveForward ? step : movement.moveBackward ? -step : 0;
        const dz = 0;
        const newPos = [pos[0] + dx, pos[1] + dy, pos[2] + dz];
        setPos(newPos)
        position.set(newPos[0], newPos[1], newPos[2]);
    })

    return (
        <mesh castShadow receiveShadow ref={ref}>
            <sphereBufferGeometry args={[scale, 6, 6]}/>
            <meshStandardMaterial color="red"/>
        </mesh>
    )
}