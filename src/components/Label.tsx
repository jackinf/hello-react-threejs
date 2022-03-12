import React, {useRef} from "react";
import { Text } from "@react-three/drei";
import {useFrame} from "@react-three/fiber";

export default function Label(props: any) {
    // This element handles text elements that can then be rendered within our animation
    const ref = useRef<Text>();
    useFrame(() => {
        if (ref.current) {
            ref.current.textContent = props.text;
        }
    });

    return (
        <Text
            rotation={props.rotation}
            position={props.position}
            color={"black"}
            fontSize={props.fontSize}
            // font="https://fonts.gstatic.com/s/courierprime/v5/u-450q2lgwslOqpF_6gQ8kELaw9pWt_-.woff2"
            anchorX="left"
            anchorY="middle"
        >
            {props.text}
        </Text>
    );
}
