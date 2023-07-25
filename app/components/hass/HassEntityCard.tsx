import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react"
import { Card, Icon, IconTypes, Text, Toggle } from "../../components";
import hassEntityStore, { HassEntity } from "../../models/hass/hass-entity";
import { spacing } from "../../theme";
import { hassEntityService } from "../../services/hass/hass-entity-service";
import { Switch, View } from "react-native";
import Dialog from "react-native-dialog";
import { SwitchDialogComponent } from "../DialogComponents/switch-dialog-component";
import { LightDialogComponent } from "../DialogComponents/light-dialog-component";
import {Dimensions} from 'react-native';
import { CameraDialogComponent } from "../DialogComponents/camera-dialog-component";

export interface HassEntityCardProps {
    hassEntity: HassEntity;
    onEntityPress?: (entity: HassEntity) => void;
}

export const HassEntityCard: FC<HassEntityCardProps> = observer(function HassEntityCard(props: HassEntityCardProps) {
    const [showDialog, setShowDialog] = React.useState<boolean>(false);

    const getInfoText = (entity: HassEntity): string => {
        if(entity.entity_id.startsWith("climate.")) {
            return entity.attributes.current_temperature + "°C";
        }
        else {
            return entity.state;
        }
    }

    const getColor = (state: string): string => {
        const entity = props.hassEntity;
        if(state === "on") { 
          if(entity.attributes.rgb_color) {
            return `rgb(${entity.attributes.rgb_color[0]}, ${entity.attributes.rgb_color[1]}, ${entity.attributes.rgb_color[2]})`;
          }
          return "#ffcc00";
        }
        else if (state === "off") {
          return "grey";
        }
    }

    const getWidth = (): string => {
        if(props.hassEntity.entity_id.startsWith("camera.")) {
            return "100%";
        }
        else {
            if(Dimensions.get('window').width > 500) {
                return "24%";
            }
            else {
                return "49%";
            }
        }
    }

    const getAspectRatio = (): number => {
        if(props.hassEntity.entity_id.startsWith("camera.")) {
            return 1.85;
        }
        else {
            return 1.3;
        }
    }

    const getIcon = (): IconTypes => {
        if(props.hassEntity.entity_id.startsWith("light.")) {
            return "lightbulb";
        }
        else if(props.hassEntity.entity_id.startsWith("camera.")) {
            
        }
    }

    const toggle = () => () => {
        if(props.onEntityPress) props.onEntityPress(props.hassEntity);
    }

    const longPress = () => { 
        setShowDialog(true);
    }

    const cancelDialog = () => {
        setShowDialog(false);
        hassEntityStore.fetchEntities();
    }
    
    function getDialogComponent(hassEntity: HassEntity): React.ReactNode {
        console.log('SHOW DIALOG', hassEntity);
        switch(hassEntity.entity_id.split(".")[0]) {
            case "light":
                return <LightDialogComponent hassEntity={props.hassEntity} toggle={props.onEntityPress}></LightDialogComponent>
            case "switch":
                return <SwitchDialogComponent hassEntity={props.hassEntity} toggle={props.onEntityPress}></SwitchDialogComponent>
            case "camera":
                return <CameraDialogComponent hassEntity={props.hassEntity} toggle={props.onEntityPress}></CameraDialogComponent>
            default: 
                return <Text>Not implemented</Text>
        }
    }

    return (
        <View style={{ width: getWidth(), aspectRatio: getAspectRatio(), alignSelf: "flex-start", marginBottom: spacing.extraSmall }}>
            <Card key={props.hassEntity.entity_id}
                onPress={toggle()}
                onLongPress={() => longPress()}
                style={{ width: "100%", aspectRatio: getAspectRatio(), alignSelf: "flex-start", marginBottom: spacing.extraSmall }}
                verticalAlignment="space-between"
                HeadingComponent={
                <Icon icon={getIcon()} color={getColor(props.hassEntity.state)} style={{ alignSelf: "center" }} />
                }
                content={props.hassEntity.attributes.friendly_name}
                contentStyle={{ alignSelf: "center" }}
                ContentTextProps={{ weight: "light", size: "xxs" }} 
                footer={getInfoText(props.hassEntity)}
                footerStyle={{ color: "#a511dc", textTransform: "capitalize" }}
                FooterTextProps={{ weight: "light", size: "xxs" }} 
                />
            <Dialog.Container visible={showDialog}>
                <Dialog.Title>{props.hassEntity.attributes.friendly_name}</Dialog.Title>
                <Dialog.Description>
                    { getDialogComponent(props.hassEntity) }
                </Dialog.Description>
                <Dialog.Button label="Ok" onPress={cancelDialog} />
            </Dialog.Container>
        </View>
    );
});