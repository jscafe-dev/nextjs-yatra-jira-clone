export interface NavGroupInterface {
  id: number;
  items: NavItemInterface[];
}
enum NavTypes {
  LOGO = "logo",
  ITEM = "item",
  AVATAR = "avatar",
  THEME_TOGGLE = "themToggle",
}
export interface NavItemInterface {
  id: number;
  type: NavTypes;
  content: string;
}

export type NavDataType = NavGroupInterface[];
