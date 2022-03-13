import React, {useState} from 'react';
import {useSphere} from "@react-three/cannon";
import {useFrame} from "@react-three/fiber";

export default function Player(props: { movement: any }) {
    const mainScale = .2;
    const collisionDetectorScale = .23;
    const [lastDelta, setLastDelta] = useState({dx: 0, dy: 0})
    const [currPos, setCurrPos] = useState([0, 0, 0]);
    const [wallHit, setWallHit] = useState(false);

    const [ref1, {position: mainPosition}] = useSphere(() => ({
        args: [mainScale],
        type: 'Dynamic',
        position: [0, 0, 0]
    }));

    const [ref2, {position: collisionDetectorPosition}] = useSphere(() => ({
        args: [collisionDetectorScale],
        type: 'Dynamic',
        position: [0, 0, 0],

        onCollideBegin: (e) => {
            if (e.body.name === 'wall') {
                setWallHit(true);
            }
        },
        onCollideEnd: () => {
            setWallHit(false);
        }
    }));

    const updatePosition = (dx: number, dy: number) => {
        const newPos = [currPos[0] + dx, currPos[1] + dy, 0];
        setCurrPos(newPos)
        mainPosition.set(newPos[0], newPos[1], 0);
        collisionDetectorPosition.set(newPos[0], newPos[1], 0);
    }

    useFrame(() => {
        if (wallHit) {
            updatePosition(-lastDelta.dx, -lastDelta.dy); // reverse till exits the wall
            return;
        }

        // Calculate travel distance based on the movement direction
        const movement = props.movement;
        const step = 0.05;
        const dx = movement.moveLeft ? -step : movement.moveRight ? step : 0;
        const dy = movement.moveForward ? step : movement.moveBackward ? -step : 0;
        if (Math.abs(dx) > 0 || Math.abs(dy) > 0) {
            setLastDelta({ dx, dy });
        }

        updatePosition(dx, dy);
    });

    return (
        <>
            <mesh castShadow ref={ref1} name="player">
                <sphereBufferGeometry args={[mainScale, 6, 6]}/>
                <meshStandardMaterial color="red"/>
            </mesh>

            <mesh castShadow visible={false} ref={ref2}>
                <sphereBufferGeometry args={[collisionDetectorScale, 6, 6]}/>
                <meshStandardMaterial wireframe color="blue"/>
            </mesh>
        </>
    )
}