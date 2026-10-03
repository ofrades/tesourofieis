import { ChevronLeft, ChevronRight } from "lucide-react-native";
import { addDays, format, getYear, isWithinInterval } from "date-fns";
import { pt } from "date-fns/locale";
import { Platform, Pressable, ScrollView, useWindowDimensions, View } from "react-native";
import { useEffect, useState } from "react";
import LandingCard from "~/components/LandingCard";
import ExternalLinks from "~/components/External";
import { DatePicker } from "~/components/DatePicker";
import { EditionSummary } from "~/components/EditionSummary";
import LinkCard from "~/components/LinkCard";
import LiturgicalSeason from "~/components/LiturgicalSeason";
import Novenas from "~/components/Novenas";
import Office from "~/components/Office";
import { LiturgicalDateHeader } from "~/components/LiturgicalDateHeader";
import { Typography } from "~/components/typography";
import { COLORS } from "~/constants/Colors";
import { useCalendar } from "~/providers/calendar";
import { useCalendarEdition } from "~/providers/edition";
import { useTodaysIndulgences } from "~/hooks/useTodaysIndulgences";
import { isFirstFriday, isFirstSaturday, stMichaelLentDay, yyyyMMDD } from "~/lib/utils";
import { useAppTheme } from "~/theme";

export default function PageRender() {
  return <LandingPage />;
}

function LandingPage() {
  const [animateEntrance, setAnimateEntrance] = useState(true);
  useEffect(() => {
    // Only the first render enters; later date/clock changes remain immediate.
    const timer = setTimeout(() => setAnimateEntrance(false), 500);
    return () => clearTimeout(timer);
  }, []);
  const cardEntrance = (order: number) => (animateEntrance ? order : undefined);

  const { day, date, setDate, resetToToday, isCustomDate } = useCalendar();
  const { edition } = useCalendarEdition();
  const { isDark, colors } = useAppTheme();
  const todaysIndulgences = useTodaysIndulgences();

  function getPrayer(date: Date) {
    const hour = date.getHours();
    const isMorning = hour >= 5 && hour < 10;
    const isNight = hour >= 20 || (hour >= 0 && hour <= 3);
    const isAngelus = hour === 6 || hour === 12 || hour === 18;

    return { isMorning, isNight, isAngelus };
  }

  const currentPrayer = getPrayer(date);
  const lentDay = stMichaelLentDay(date);

  const { width } = useWindowDimensions();
  const isCompactLayout = width < 420;
  const sectionInset = isCompactLayout ? 20 : 20;
  const headerPaddingTop = isCompactLayout ? 6 : 8;
  const headerPaddingBottom = isCompactLayout ? 8 : 10;
  const dateFontSize = isCompactLayout ? 28 : 32;
  const dateTextColor = isCustomDate ? colors.accentStrong : colors.textSecondary;
  const chevronColor = isDark ? colors.textMuted : COLORS["500"];
  const sectionLabelColor = colors.accent;

  const stepDay = (delta: number) => () => setDate(addDays(date, delta));

  const prayerItems: {
    key: string;
    href: string;
    title: string;
    description: string;
  }[] = [
    {
      key: "rosario",
      href: "/devocionario/rosario",
      title: "Rosário",
      description: "Orações do dia",
    },
  ];
  if (currentPrayer.isAngelus) {
    prayerItems.push({
      key: "angelus",
      href: "/devocionario/dia/angelus",
      title: "Angelus",
      description: "Hora do Angelus",
    });
  }
  if (currentPrayer.isMorning) {
    prayerItems.push({
      key: "oracaomanha",
      href: "/devocionario/dia/oracaomanha",
      title: "Oração da Manhã",
      description: "Orações do dia",
    });
  }
  if (currentPrayer.isNight) {
    prayerItems.push({
      key: "oracaonoite",
      href: "/devocionario/dia/oracaonoite",
      title: "Oração da Noite",
      description: "Orações do dia",
    });
  }

  return (
    <ScrollView
      nativeID="reading-content"
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={Platform.OS !== "web"}
    >
      <View className="extreme-background w-full">
        <View
          className="flex-1 w-full web:lg:max-w-3xl web:lg:mx-auto py-5 px-3"
          style={{
            backgroundColor: colors.screen,
          }}
        >
          <LiturgicalDateHeader
            overline={format(date, "EEEE", { locale: pt })}
            paddingHorizontal={sectionInset}
            paddingTop={headerPaddingTop}
            paddingBottom={headerPaddingBottom}
            titleSize={dateFontSize}
            leftControl={
              <Pressable
                onPress={stepDay(-1)}
                hitSlop={6}
                accessibilityRole="button"
                accessibilityLabel="Dia anterior"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 17,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  borderColor: colors.divider,
                }}
              >
                <ChevronLeft size={18} color={chevronColor} strokeWidth={1.7} />
              </Pressable>
            }
            titleContent={
              <DatePicker date={date} onDateChange={setDate}>
                <View style={{ flexShrink: 1 }}>
                  <Typography
                    className="font-display leading-none"
                    style={{
                      fontSize: dateFontSize,
                      color: dateTextColor,
                      paddingHorizontal: 10,
                      paddingVertical: 2,
                    }}
                    numberOfLines={1}
                  >
                    {format(date, "d 'de' MMMM", { locale: pt })}
                  </Typography>
                </View>
              </DatePicker>
            }
            rightControl={
              <Pressable
                onPress={stepDay(1)}
                hitSlop={6}
                accessibilityRole="button"
                accessibilityLabel="Dia seguinte"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 17,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 1,
                  borderColor: colors.divider,
                }}
              >
                <ChevronRight size={18} color={chevronColor} strokeWidth={1.7} />
              </Pressable>
            }
            footer={
              isCustomDate ? (
                <Pressable onPress={resetToToday} accessibilityLabel="Voltar a hoje">
                  <Typography
                    printable={false}
                    className="font-italic"
                    style={{ fontSize: 11, marginTop: 6, color: colors.accent }}
                  >
                    † voltar ao dia de hoje
                  </Typography>
                </Pressable>
              ) : undefined
            }
          />

          {/* Only landing-page cards enter; the date controls stay still. */}
          <View className="pt-2 pb-4 gap-3" style={{ paddingHorizontal: sectionInset }}>
            <EditionSummary date={yyyyMMDD(date)} edition={edition} />
            {day.mass?.map((item, index) => (
              <LandingCard key={item.id} entranceOrder={cardEntrance(index)}>
                <LinkCard mass={item} variant="featured" />
              </LandingCard>
            ))}
            {day.alternatives?.map((item, index) => (
              <LandingCard key={item.id} entranceOrder={cardEntrance(day.mass.length + index)}>
                <LinkCard mass={item} variant="featured" />
              </LandingCard>
            ))}
            {isFirstFriday(date) && (
              <LandingCard entranceOrder={cardEntrance(2)}>
                <LinkCard
                  href="missal/votivas/coracaojesus"
                  title="❤️ Primeira Sexta-feira — Sagrado Coração de Jesus"
                  description="Missa e Comunhão reparadora"
                />
              </LandingCard>
            )}
            {isFirstSaturday(date) && (
              <LandingCard entranceOrder={cardEntrance(2)}>
                <LinkCard
                  href="missal/santos/08-22"
                  title="💙 Primeiro Sábado — Imaculado Coração de Maria"
                  description="Rosário e Comunhão reparadora"
                />
              </LandingCard>
            )}
            {lentDay !== null && (
              <LandingCard entranceOrder={cardEntrance(3)}>
                <LinkCard
                  href="/devocionario/oracoes/coroasaomiguel"
                  title="⚔️ Quaresma de São Miguel"
                  description="Coroa de São Miguel"
                />
              </LandingCard>
            )}
          </View>

          <View
            style={{
              height: 1,
              backgroundColor: colors.divider,
              marginHorizontal: sectionInset,
            }}
          />

          <View className="flex flex-col pt-6 pb-4" style={{ paddingHorizontal: sectionInset }}>
            <Typography
              className="font-ui"
              style={{
                fontSize: 11,
                letterSpacing: 1.2,
                color: sectionLabelColor,
                marginBottom: 14,
              }}
            >
              {`${format(date, "HH:mm", { locale: pt })} · Orações`}
            </Typography>

            <View style={{ flexDirection: "row", flexWrap: "wrap", marginHorizontal: -6 }}>
              {prayerItems.map((item, index) => (
                <LandingCard
                  key={item.key}
                  entranceOrder={cardEntrance(index + 2)}
                  style={{ paddingHorizontal: 6, marginBottom: 12, minWidth: 0 }}
                  className="w-full web:md:w-1/2"
                >
                  <LinkCard
                    oratio={{
                      link: item.href,
                      name: item.title,
                    }}
                    description={item.description}
                  />
                </LandingCard>
              ))}
            </View>

            <View style={{ flexDirection: "row", flexWrap: "wrap", marginHorizontal: -6 }}>
              <LandingCard
                entranceOrder={cardEntrance(3)}
                style={{ paddingHorizontal: 6, marginBottom: 12, minWidth: 0 }}
                className="w-full web:md:w-1/2"
              >
                <Office />
              </LandingCard>
              <LandingCard
                entranceOrder={cardEntrance(4)}
                style={{ paddingHorizontal: 6, marginBottom: 12, minWidth: 0 }}
                className="w-full web:md:w-1/2"
              >
                <Novenas />
              </LandingCard>
            </View>

            <View style={{ flexDirection: "row", flexWrap: "wrap", marginHorizontal: -6 }}>
              {todaysIndulgences.map((indulgence, index) => (
                <LandingCard
                  key={`indulgence-${index}`}
                  entranceOrder={cardEntrance(4)}
                  style={{ paddingHorizontal: 6, marginBottom: 12, minWidth: 0 }}
                  className="w-full web:md:w-1/2"
                >
                  <LinkCard
                    indulgence={{
                      prayer: indulgence.prayer,
                      body: indulgence.body,
                      link: indulgence.link,
                    }}
                    description="Indulgência Plenária"
                  />
                </LandingCard>
              ))}
            </View>

            {isWithinInterval(date, {
              start: new Date(getYear(date), 11, 17),
              end: new Date(getYear(date), 11, 23),
            }) && (
              <LandingCard entranceOrder={cardEntrance(4)}>
                <LinkCard
                  href="/devocionario/oracoes/antifonasdoo"
                  title="Nossa Senhora do Ó"
                  description="Antifonas"
                />
              </LandingCard>
            )}
          </View>

          <View
            style={{
              height: 1,
              backgroundColor: colors.divider,
              marginHorizontal: sectionInset,
            }}
          />

          <View className="pb-4" style={{ paddingHorizontal: sectionInset }}>
            <LiturgicalSeason />
          </View>

          <View
            style={{
              height: 1,
              backgroundColor: colors.divider,
              marginHorizontal: sectionInset,
            }}
          />

          <ExternalLinks />
        </View>
      </View>
    </ScrollView>
  );
}
