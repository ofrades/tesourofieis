import { View } from "react-native";
import type { LandingCardProps } from "./LandingCard";
import "./LandingCard.web.css";

const delayClasses = [
  "landing-card-delay-0",
  "landing-card-delay-1",
  "landing-card-delay-2",
  "landing-card-delay-3",
  "landing-card-delay-4",
];

export default function LandingCard({ entranceOrder, className, ...props }: LandingCardProps) {
  const entranceClass =
    entranceOrder === undefined
      ? ""
      : `landing-card-enter ${delayClasses[Math.min(entranceOrder, 4)]}`;
  return <View {...props} className={`${className ?? ""} ${entranceClass}`} />;
}
