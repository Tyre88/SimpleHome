import { observer } from "mobx-react-lite";
import React, { FC } from "react"
import { ImageStyle, TextStyle, View, ViewStyle } from "react-native";
import { Card, Icon, Text } from "../../components";
import { HassEntity } from "../../models/hass/hass-entity";
import { HassEntityService } from "../../services/hass/hass-entity-service";
import { spacing } from "../../theme";

export interface HassEntityCardProps {
    hassEntity: HassEntity
}

export const HassEntityCard: FC<HassEntityCardProps> = observer(function HassEntityCard(props: HassEntityCardProps) {
    const hassEntityService = new HassEntityService();
    const [color, setColor] = React.useState("black");

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

    const toggle = () => () => {
        hassEntityService.toggle(props.hassEntity).then((e: HassEntity) => {
            setColor(getColor(e.state));
        });
    }

    React.useEffect(() => {
        setColor(getColor(props.hassEntity.state));
    }, [props.hassEntity.state]);
    
    return (
        <Card key={props.hassEntity.entity_id}
            onPress={toggle()}
            style={{ width: "32%", aspectRatio: 1, alignSelf: "flex-start", marginBottom: spacing.extraSmall }}
            verticalAlignment="space-between"
            HeadingComponent={
            <Icon icon="lightbulb" color={color} style={{ alignSelf: "center" }} />
            }
            footer={props.hassEntity.attributes.friendly_name}
            footerStyle={{ alignSelf: "center" }}
            FooterTextProps={{ weight: "light", size: "xxs" }} />
    );
});