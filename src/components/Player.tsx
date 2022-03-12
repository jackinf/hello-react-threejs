import React from 'react';
import {useSphere} from "@react-three/cannon";
import {useFrame} from "@react-three/fiber";

export default function Player(props: { position: number[] }) {
    const scale = .2;
    const [ref, {position}] = useSphere(() => ({
        args: [scale],
        type: 'Dynamic',
        position: [props.position[0], props.position[1], props.position[2]],
        onCollide: () => {
            console.log('ball collided')
        }
    }));

    useFrame(() =>
        position.set(props.position[0], props.position[1], 0),
    )

    return (
        <mesh castShadow receiveShadow ref={ref}>
            <sphereBufferGeometry args={[scale, 6, 6]}/>
            <meshStandardMaterial wireframe color="red"/>
        </mesh>
    )
}