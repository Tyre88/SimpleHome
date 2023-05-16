import { observer } from "mobx-react-lite";
import React, { FC, useEffect, useState } from "react";
import { Dimensions, Slider, StyleSheet, View } from 'react-native';
import { DialogComponentProps } from "./dialog-component-props";
import ColorPicker, { Panel3, Swatches, Preview, colorKit } from 'reanimated-color-picker';
import { hassEntityService } from "../../services/hass/hass-entity-service";

export const LightDialogComponent: FC<DialogComponentProps> = observer(function LightDialogComponent(props: DialogComponentProps) {    
    const [color, setColor] = useState<string>("#FFFFFF");
    const [brightness, setBrightness] = useState<number>(0);

    console.log(props.hassEntity)

    const onColorChange = (color: any) => {
        setColor(color.hex);
    }

    const onColorChangeComplete = () => {
        console.log(color);
        console.log(colorKit.RGB(color).array());
        const rgba = colorKit.RGB(color).array();
        const rgb = [rgba[0], rgba[1], rgba[2]];

        hassEntityService.setState({
            entity_id: props.hassEntity.entity_id,
            state: "on",
            attributes: {
                ...props.hassEntity.attributes,
                rgb_color: rgb,
                brightness: brightness,
                hs_color: null,
                xy_color: null
            }
        }).then((d) => {
            console.log('CHANGED COLOR');
            console.log(d);
        });
    }

    useEffect(() => {
        if(props.hassEntity.attributes.rgb_color) {
            setColor(colorKit.HEX(`rgba(${props.hassEntity.attributes.rgb_color[0]}, ${props.hassEntity.attributes.rgb_color[1]}, ${props.hassEntity.attributes.rgb_color[2]}, 1)`));
        }

        if(props.hassEntity.attributes.brightness) {
            setBrightness(props.hassEntity.attributes.brightness);
        }
    }, []);

    const updateBrightness = (value: number) => {
        console.log('UPDATE BRIGHTNESS', value);
        setBrightness(value);
    }

    return (
        <View>
            <ColorPicker style={{ width: 300 }} value={color} onChange={onColorChange} onComplete={onColorChangeComplete}>
                <Preview hideInitialColor={true} />
                <Panel3 style={{marginTop: 15}} />
                <Swatches style={{marginTop: 15}} />
            </ColorPicker>
            <Slider minimumValue={0} maximumValue={255} step={1} value={brightness} onValueChange={updateBrightness}></Slider>
        </View>
    );
});
