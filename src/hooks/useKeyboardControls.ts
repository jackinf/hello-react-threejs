import React from "react";

function actionByKey(key: KeyboardEvent["key"]) {
    const keys: any = {
        KeyW: 'moveForward',
        KeyS: 'moveBackward',
        KeyA: 'moveLeft',
        KeyD: 'moveRight'
    }
    return keys[key];
}

export const useKeyboardControls = () => {
    const [movement, setMovement] = React.useState({
        moveForward: false,
        moveBackward: false,
        moveLeft: false,
        moveRight: false
    })

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (actionByKey(e.code)) {
                setMovement((state) => ({...state, [actionByKey(e.code)]: true}));
            }
        }
        const handleKeyUp = (e: any) => {
            if (actionByKey(e.code)) {
                setMovement((state) => ({...state, [actionByKey(e.code)]: false}));
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        }
    }, [])

    const movementText = movement.moveForward ? 'Up' : movement.moveLeft ? 'Left' : movement.moveRight ? 'Right' : movement.moveBackward ? 'Down' : 'Stading';
    return {movement, movementText}
}
