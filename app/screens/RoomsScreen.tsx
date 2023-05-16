import { observer } from "mobx-react-lite";
import React, { FC } from "react"
import { useWindowDimensions  } from "react-native";
import { TabView } from 'react-native-tab-view';
import { hassEntityService } from "../services/hass/hass-entity-service";
import { HassEntity } from "../models/hass/hass-entity";
import { HassEntityView } from "../components/hass/HassEntityView";
import { RoomModel } from "../models/core/RoomModel";
import { TabBar } from "../components/hass/TabBar";

export const RoomsScreen: FC<any> = observer(function RoomsScreen() {
    const rooms: RoomModel[] = [
        {
            name: "Matilda",
            filter: "light.matilda",
            entityIds: ["camera.matilda_2"],
            id: "abcd"
        },
        {
            name: "Liam",
            filter: "light.liam",
            entityIds: ["camera.liam_2"],
            id: "efgh"
        },
        {
            name: "Solceller",
            filter: "",
            entityIds: ["sensor.pv_power", "sensor.solaredge_current_power", "sensor.total_solar_power", "sensor.electricity_price_tallgatan_9"],
            id: "ijkl"
        },
        {
            name: "Hallen toa",
            filter: "light.hallen_toa",
            entityIds: [],
            id: "mnop"
        },
        {
            name: "Kontoret",
            filter: "",
            entityIds: ["switch.outlet_1"],
            id: "qrst"
        }
    ];

    const [entities, setEntities] = React.useState([] as HassEntity[]);

    const getEntities = () => {
        hassEntityService.getAll().then((e: HassEntity[]) => {
            setEntities(e);

            initRooms();
        });
    };

    const initRooms = () => {
        const rt = [];

        rooms.forEach(r => {
            rt.push({ key: r.id, title: r.name });
        });

        setRoutes(rt);
    };

    const toggleEntity = (entity: HassEntity) => {

        hassEntityService.toggle(entity).then((ee: HassEntity) => {
            const es = entities?.map((e: HassEntity) => {
                if(e.entity_id === entity.entity_id) {
                    e.state = ee.state;
                }
    
                return e;
            });
    
            setEntities(es);
        });
    };
    
    const renderScene = ({ route }) => {
        const room = rooms.find(r => r.id === route.key);
        return <HassEntityView onEntityPress={toggleEntity} entityIds={room.entityIds} filter={room.filter} name={room.name} entities={entities} />
    };
    
    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes, setRoutes] = React.useState([
    ]);

    React.useEffect(() => {
        getEntities();    
    }, []);


    return (
        <TabView
            renderTabBar={props => <TabBar {...props} />}
            tabBarPosition="bottom"
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    );
});