import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { Alert, Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import {
  Text,
  Card,
  Button,
  Icon,
  Toggle,
} from "../components"
import { isRTL } from "../i18n"
import { Api } from "../services/api"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"
import { api } from "../services/api/api"
import hassEntityStore, { HassEntity } from "../models/hass/hass-entity"
import  { hassEntityService } from "../services/hass/hass-entity-service"
import { $h1 } from "../theme/texts"
import { HassEntityCard } from "../components/hass/HassEntityCard"


export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(self
) {
  const entityTypes = [
    "light", 
    // "camera",
    // "climate",
  ];

  const toggle = (entity: HassEntity) => () => {
    hassEntityService.toggle(entity).then((e: HassEntity) => {
      console.log(e);
      
    });
  }

  const generateCards = () => {
    let cards = [];
    const entities = hassEntityStore.entities
      .filter((e: HassEntity) => entityTypes.includes(e.entity_id.substring(0, e.entity_id.indexOf("."))) && e.state !== "unavailable")
      .sort((a: HassEntity, b: HassEntity) => a.attributes.friendly_name.localeCompare(b.attributes.friendly_name));

    for(let i = 0; i < entities.length; i++) {
      cards.push(<HassEntityCard key={entities[i].entity_id} hassEntity={entities[i]}></HassEntityCard>);
    }
    return cards;
  };

  return (
    <View style={$container}>
      <ScrollView>
        <View style={{ paddingTop: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={$h1}>
            Simple Home
          </Text>
        </View>
        <View style={$cardContainer}>
          {generateCards()}
          {/* {cards} */}
        </View>
      </ScrollView>
    </View>
  )
})

const $container: ViewStyle = {
  backgroundColor: colors.background,
}

const $cardContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  justifyContent: "space-between",
  flexDirection: "row",
  flexWrap: "wrap",
  paddingHorizontal: spacing.large,
  paddingTop: spacing.large,
}
