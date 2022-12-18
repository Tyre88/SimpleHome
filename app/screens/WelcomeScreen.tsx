import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View, ViewStyle } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { colors, spacing } from "../theme"
import hassEntityStore, { HassEntity } from "../models/hass/hass-entity"
import  { hassEntityService } from "../services/hass/hass-entity-service"
import { HassEntityView } from "../components/hass/HassEntityView"


export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(self
) {
  const entityTypes = [
    "light", 
    // "camera",
    // "climate",
  ];

  const toggle = (entity: HassEntity) => {
    console.log('TOGGLE');
    console.log(entity);
    hassEntityService.toggle(entity).then((e: HassEntity) => {
      console.log(e);
      hassEntityStore.updateEntity(e);
    });
  }

  return (
    <View style={$container}>
      <ScrollView>
        <HassEntityView onEntityPress={toggle} filter="light." name="Simple Home" entities={hassEntityStore.entities} />
      </ScrollView>
    </View>
  )
})

const $container: ViewStyle = {
  backgroundColor: colors.background,
}
