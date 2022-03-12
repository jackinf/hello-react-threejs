import React from 'react'
import {DoubleSide} from 'three';

export default function BackDrop({position, rotation, opacity}: any) {
    // This element is one wall (used to make up the sides of the skybox background)
    return (
        <mesh receiveShadow position={position} rotation={rotation}>
            <planeBufferGeometry attach="geometry" args={[101, 101]}/>
            <meshStandardMaterial
                side={DoubleSide}
                attach="material"
                color="#eeeeee"
                opacity={opacity}
            />
        </mesh>
    );
}