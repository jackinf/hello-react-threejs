import React from 'react';
import {useBox} from "@react-three/cannon";

export default function Collectible(props: { position: number[], name: string, handleCollect: () => void }) {
    const scale = .2;
    const [ref] = useBox(() => ({
        args: [scale, scale, scale],
        type: 'Dynamic',
        position: [props.position[0], props.position[1], props.position[2]],
        onCollide: () => {
            props.handleCollect();
            console.log(`coll ${props.name} collected`);
        },

    }));

    return (
        <mesh ref={ref}>
            <boxGeometry args={[scale, scale, scale]}/>
            <meshStandardMaterial wireframe color="orange"/>
        </mesh>
    )
}