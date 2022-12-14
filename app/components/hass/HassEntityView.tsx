import { observer } from "mobx-react-lite";
import React, { FC } from "react"
import { ImageStyle, ScrollView, TextStyle, View, ViewStyle } from "react-native";
import { Icon, Text } from "../../components";
import { HassEntity } from "../../models/hass/hass-entity";
import { HassEntityService } from "../../services/hass/hass-entity-service";
import { HassEntityCard } from "./HassEntityCard";

export interface HassEntityViewProps {
    filter?: string;
    entities?: HassEntity[];
}

export const HassEntityView: FC<HassEntityViewProps> = observer(function HassEntityView(props: HassEntityViewProps) {
    const [cards, setCards] = React.useState([] as React.ReactElement[]);

    const getEntities = () => {
        generateCards(props.entities?.filter((e: HassEntity) => e.entity_id.startsWith(props.filter) && e.state !== "unavailable")
            .sort((a: HassEntity, b: HassEntity) => a.attributes.friendly_name.localeCompare(b.attributes.friendly_name)));

        // hassEntityService.getAll().then((e: HassEntity[]) => {
          
        // });
    }

    const generateCards = (c: HassEntity[]) => {
        const cards = [];
        for(let i = 0; i < c?.length; i++) {
          cards.push(<HassEntityCard hassEntity={c[i]} />);
        }
        setCards(cards);
    }

    React.useEffect(() => {
        getEntities();
    }, []);
    
    return (
        <ScrollView>
            <View style={$hassEntityViewWrapper}>
                {cards}
            </View>
        </ScrollView>
    );
});

const $hassEntityViewWrapper: ViewStyle = {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
}