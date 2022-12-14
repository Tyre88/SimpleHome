/**
  Use these spacings for margins/paddings and other whitespace throughout your app.
 */
export const spacing = {
  micro: 2,
  tiny: 4,
  extraSmall: 8,
  small: 12,
  medium: 16,
  large: 24,
  extraLarge: 32,
  huge: 48,
  massive: 64,
} as const

export type Spacing = keyof typeof spacing

export const $margin = {
  bottom: {
    micro: { marginBottom: spacing.micro },
    tiny: { marginBottom: spacing.tiny },
    extraSmall: { marginBottom: spacing.extraSmall },
    small: { marginBottom: spacing.small },
    medium: { marginBottom: spacing.medium },
    large: { marginBottom: spacing.large },
    extraLarge: { marginBottom: spacing.extraLarge },
    huge: { marginBottom: spacing.huge },
    massive: { marginBottom: spacing.massive },
  },
  left: {
    micro: { marginLeft: spacing.micro },
    tiny: { marginLeft: spacing.tiny },
    extraSmall: { marginLeft: spacing.extraSmall },
    small: { marginLeft: spacing.small },
    medium: { marginLeft: spacing.medium },
    large: { marginLeft: spacing.large },
    extraLarge: { marginLeft: spacing.extraLarge },
    huge: { marginLeft: spacing.huge },
    massive: { marginLeft: spacing.massive },
  },
  right: {
    micro: { marginRight: spacing.micro },
    tiny: { marginRight: spacing.tiny },
    extraSmall: { marginRight: spacing.extraSmall },
    small: { marginRight: spacing.small },
    medium: { marginRight: spacing.medium },
    large: { marginRight: spacing.large },
    extraLarge: { marginRight: spacing.extraLarge },
    huge: { marginRight: spacing.huge },
    massive: { marginRight: spacing.massive },
  },
  top: {
    micro: { marginTop: spacing.micro },
    tiny: { marginTop: spacing.tiny },
    extraSmall: { marginTop: spacing.extraSmall },
    small: { marginTop: spacing.small },
    medium: { marginTop: spacing.medium },
    large: { marginTop: spacing.large },
    extraLarge: { marginTop: spacing.extraLarge },
    huge: { marginTop: spacing.huge },
    massive: { marginTop: spacing.massive },
  },
} as const;
