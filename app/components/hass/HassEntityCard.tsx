import { observer } from "mobx-react-lite";
import React, { FC } from "react"
import { Card, Icon, IconTypes, Text } from "../../components";
import { HassEntity } from "../../models/hass/hass-entity";
import { spacing } from "../../theme";

export interface HassEntityCardProps {
    hassEntity: HassEntity;
    onEntityPress?: (entity: HassEntity) => void;
}

export const HassEntityCard: FC<HassEntityCardProps> = observer(function HassEntityCard(props: HassEntityCardProps) {
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
            return "49%";
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
    
    return (
        <Card key={props.hassEntity.entity_id}
            onPress={toggle()}
            style={{ width: getWidth(), aspectRatio: getAspectRatio(), alignSelf: "flex-start", marginBottom: spacing.extraSmall }}
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
    );
});