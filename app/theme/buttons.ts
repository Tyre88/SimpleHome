import { colors } from "./colors";

export const $button = {
    primary: {
        backgroundColor: colors.palette.primary500,
        borderRadius: 4,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
    },
    secondary: {
        backgroundColor: colors.palette.secondary500,
        borderRadius: 4,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
    },
    tertiary: {
        backgroundColor: colors.palette.accent500,
        borderRadius: 4,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
    },
    disabled: {
        backgroundColor: colors.palette.overlay50,
        borderRadius: 4,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
    },
} as const;