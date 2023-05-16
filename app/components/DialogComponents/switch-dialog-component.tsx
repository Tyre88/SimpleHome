import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import { HassEntity } from "../../models/hass/hass-entity";
import { Switch } from "react-native";
import { DialogComponentProps } from "./dialog-component-props";

export const SwitchDialogComponent: FC<DialogComponentProps> = observer(function SwitchDialogComponent(props: DialogComponentProps) {
    const toggle = () => {
        if(props.toggle) {
            props.toggle(props.hassEntity);
        }
    };

    return (
        <Switch
            onValueChange={toggle}
            value={props.hassEntity.state === "on"}>
        </Switch>
    );
});