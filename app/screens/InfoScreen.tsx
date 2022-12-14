import { observer } from "mobx-react-lite";
import React, { FC } from "react"
import { Text } from "../components";

export const InfoScreen: FC<any> = observer(function InfoScreen() {
    return (<Text>INFO</Text>);
});