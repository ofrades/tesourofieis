import type { ViewProps } from "react-native";
import Animated, { FadeInDown, ReduceMotion } from "react-native-reanimated";

export interface LandingCardProps extends ViewProps {
  entranceOrder?: number;
}

const entrances = Array.from({ length: 5 }, (_, index) =>
  FadeInDown.duration(240)
    .delay(index * 40)
    .withInitialValues({ opacity: 0, transform: [{ translateY: 10 }] })
    .reduceMotion(ReduceMotion.System),
);

export default function LandingCard({ entranceOrder, ...props }: LandingCardProps) {
  const entering = entranceOrder === undefined ? undefined : entrances[Math.min(entranceOrder, 4)];
  return <Animated.View {...props} entering={entering} />;
}
