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
import { HassEntity } from "../models/hass/hass-entity"
import  { HassEntityService } from "../services/hass/hass-entity-service"
import { $h1 } from "../theme/texts"
import { HassEntityCard } from "../components/hass/HassEntityCard"

const welcomeLogo = require("../../assets/images/logo.png")
const welcomeFace = require("../../assets/images/welcome-face.png")


export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(
) {
  const hassEntityService = new HassEntityService();
  const entityTypes = [
    "light", 
    // "camera",
    // "climate",
  ];

  const [cards, setCards] = React.useState([] as React.ReactElement[]);

  const getStates = () => {
    hassEntityService.getAll().then((e: HassEntity[]) => {
      generateCards(e.filter((e: HassEntity) => entityTypes.includes(e.entity_id.substring(0, e.entity_id.indexOf("."))) 
        && e.state !== "unavailable")
        .sort((a: HassEntity, b: HassEntity) => a.attributes.friendly_name.localeCompare(b.attributes.friendly_name)));
    });
  }

  const toggle = (entity: HassEntity) => () => {
    hassEntityService.toggle(entity).then((e: HassEntity) => {
      console.log(e);
      getStates();
    });
  }

  const getColor = (entity: HassEntity): string => {
    if(entity.state === "on") { 
      if(entity.attributes.rgb_color) {
        return `rgb(${entity.attributes.rgb_color[0]}, ${entity.attributes.rgb_color[1]}, ${entity.attributes.rgb_color[2]})`;
      }
      return "#ffcc00";
    }
    else if (entity.state === "off") {
      return "grey";
    }
  }

  const generateCards = (c: HassEntity[]) => {
    const cards = [];
    for(let i = 0; i < c.length; i++) {
      cards.push(
        <HassEntityCard key={c[i].entity_id} hassEntity={c[i]}></HassEntityCard>
      );
    }
    setCards(cards);
  }

  React.useEffect(() => {
    getStates();
  }, []);

  return (
    <View style={$container}>
      <ScrollView>
        <View style={{ paddingTop: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={$h1}>
            Simple Home
          </Text>
        </View>
        <View style={$cardContainer}>
          {cards}
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
