import React, { type ReactElement, type ReactNode, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Typography } from "./typography";

interface TabItemProps {
  label: string;
  children: ReactNode;
}

export function Tabs({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = React.Children.toArray(children).filter(
    (child): child is ReactElement<TabItemProps> =>
      React.isValidElement(child) && child.type === TabItem,
  );

  return (
    <View className="mt-4 pb-2">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View className="flex flex-row border-b border-sepia">
          {tabs.map((tab, index) => (
            <Pressable
              key={tab.props.label}
              onPressOut={() => setActiveTab(index)}
              className={`px-4 py-2 mr-2 ${
                activeTab === index
                  ? "medium-background border-b-2 border-sepia active:bg-sepia-200 dark:active:bg-sepia-800"
                  : "border-b-2 border-transparent"
              }`}
            >
              <Typography
                printable={false}
                className={`text-pretty font-ui-medium ${
                  activeTab === index ? "text-sepia-600 dark:text-sepia-400" : "text-sepia-500"
                }`}
              >
                {tab.props.label}
              </Typography>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <View className="mt-2">{tabs[activeTab]}</View>
    </View>
  );
}

export function TabItem({ label, children }: { label: string; children: ReactNode }) {
  return <>{children}</>;
}
