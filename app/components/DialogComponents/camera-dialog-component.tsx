import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { HassEntity } from "../../models/hass/hass-entity";
import { Text } from "react-native";
import { DialogComponentProps } from "./dialog-component-props";

export const CameraDialogComponent: FC<DialogComponentProps> = observer(function CameraDialogComponent(props: DialogComponentProps) {
    return (
        <Text>CAMERA STREAM COMMING SOON...</Text>
    );
});