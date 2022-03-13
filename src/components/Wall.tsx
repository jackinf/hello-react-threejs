import React from "react";
import {useBox} from "@react-three/cannon";

export default function Wall(props: { position: [number, number, number], size: [number, number, number]}) {
    const [ref,] = useBox(() => ({
        args: props.size,
        type: 'Static',
        position: props.position,
    }));

    return (
        <mesh ref={ref} name="wall">
            <boxGeometry args={props.size}/>
            <meshStandardMaterial color="gray"/>
        </mesh>
    )
}