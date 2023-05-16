import { observer } from "mobx-react-lite";
import React, { FC } from "react"
import { ImageStyle, ScrollView, TextStyle, View, ViewStyle } from "react-native";
import { Icon, Text } from "../../components";
import { HassEntity } from "../../models/hass/hass-entity";
import { $h2, spacing } from "../../theme";
import { HassEntityCard } from "./HassEntityCard";

export interface HassEntityViewProps {
    filter?: string;
    entityIds?: string[];
    entities?: HassEntity[];
    name?: string;

    onEntityPress?: (entity: HassEntity) => void;
}

export const HassEntityView: FC<HassEntityViewProps> = observer(function HassEntityView(props: HassEntityViewProps) {
    const getFilteredEntities = (): HassEntity[] => {
        return props.entities?.filter((e: HassEntity) => 
        ((e.entity_id.startsWith(props.filter) && props.filter?.length > 0) || props.entityIds?.includes(e.entity_id))
        && e.state !== "unavailable")
        .sort((a: HassEntity, b: HassEntity) => a.entity_id.localeCompare(b.entity_id));
    };
    
    return (
        <ScrollView>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={[$h2, $entityViewHeader]}>{props.name}</Text>
            </View>
            <View style={$hassEntityViewWrapper}>
                {getFilteredEntities()?.map((e: HassEntity) => 
                    <HassEntityCard onEntityPress={props.onEntityPress} key={e.entity_id} hassEntity={e} />)}
            </View>
        </ScrollView>
    );
});

const $hassEntityViewWrapper: ViewStyle = {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.large,
    paddingTop: spacing.medium
}

const $entityViewHeader: TextStyle = {
    paddingTop: spacing.huge,
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
}