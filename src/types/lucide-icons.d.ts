// Per-icon deep imports resolved by the Metro resolver in `metro.config.cjs`.
// The package root barrels the entire icon set, which Metro cannot tree-shake.
declare module "lucide-react-native/dist/esm/icons/*" {
  import type { LucideIcon } from "lucide-react-native";

  const Icon: LucideIcon;
  export default Icon;
}
