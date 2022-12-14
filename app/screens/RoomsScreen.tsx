import { observer } from "mobx-react-lite";
import React, { FC, useEffect } from "react"
import { View, useWindowDimensions  } from "react-native";
import { Text } from "../components";
import { TabView, SceneMap } from 'react-native-tab-view';
import { HassEntityService } from "../services/hass/hass-entity-service";
import { HassEntity } from "../models/hass/hass-entity";
import { HassEntityView } from "../components/hass/HassEntityView";

export const RoomsScreen: FC<any> = observer(function RoomsScreen() {
    const hassEntityService = new HassEntityService();

    const [views, setViews] = React.useState([]);
    const [entities, setEntities] = React.useState([] as HassEntity[]);

    const getEntities = () => {
        hassEntityService.getAll().then((e: HassEntity[]) => {
            setEntities(e);
        });
    };

    const FirstRoute = () => (
        <HassEntityView filter="light.matilda" entities={entities} />
    );
    
    const SecondRoute = () => (
        <HassEntityView filter="light.liam" entities={entities} />
    );

    const ThirdRoute = () => (
        <HassEntityView filter="light.kok" entities={entities} />
    );

    const FourthRoute = () => (
        <HassEntityView filter="light.hall" entities={entities} />
    );
    
    const renderScene = SceneMap({
        first: FirstRoute,
        second: SecondRoute,
        third: ThirdRoute,
        fourth: FourthRoute,
    });
    
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Matilda' },
        { key: 'second', title: 'Liam' },
        { key: 'third', title: 'Kök' },
        { key: 'fourth', title: 'Hall' },
    ]);

    React.useEffect(() => {
        getEntities();
    }, []);


    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    );
});