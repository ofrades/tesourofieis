import { Star, Flame, Sprout, Cross, Bird, Baby, Heart } from "lucide-react-native";
import { createElement } from "react";
import type { LiturgicalSeason as Season } from "~/lib/domain";

import { View } from "react-native";
import { useAppTheme } from "~/theme";
import { useCalendar } from "~/providers/calendar";
import PageLinkCard from "./LinkCard";
import { Typography } from "./typography";
import { getSeasonPalette } from "~/theme/seasons";

type Prayer = {
  title: string;
  href: string;
  description?: string;
};

const TEMPORAS_PRAYERS = {
  Advento: [
    {
      title: "Rorate Caeli",
      href: "/canticos/sacros/roratecaeli",
      description: "Hino de invocação ao Messias",
    },
    {
      title: "Alma Redemptoris Mater",
      href: "/devocionario/antifonas/almaredemptorismater",
      description: "Antífona Nossa Senhora",
    },
    {
      title: "O Antífonas",
      href: "/devocionario/oracoes/antifonasdoo",
      description: "Antífonas do Advento",
    },
    {
      title: "Ave Maris Stella",
      href: "/canticos/sacros/avemarisstella",
      description: "Hino",
    },
    {
      title: "Benedictus",
      href: "/canticos/sacros/benedictus",
      description: "Cântico de Zacarias",
    },
    {
      title: "Ladainha de Loreto",
      href: "/devocionario/ladainhas/loreto",
      description: "Invocação à Virgem Maria",
    },
    {
      title: "Ave Maria",
      href: "/devocionario/oracoes/avemaria",
      description: "Oração",
    },
  ],
  Natal: [
    {
      title: "Alma Redemptoris Mater",
      href: "/devocionario/antifonas/almaredemptorismater",
      description: "Antífona Nossa Senhora",
    },
    {
      title: "Adeste Fideles",
      href: "/canticos/sacros/adeste",
      description: "Hino de Natal",
    },
    {
      title: "Puer Natus Est",
      href: "/missal/santos/12-25-1",
      description: "Introito da Missa do Natal",
    },
    {
      title: "Magnificat",
      href: "/canticos/sacros/magnificat",
      description: "Cântico de Maria",
    },
    {
      title: "O Gloriosa Virginum",
      href: "/canticos/sacros/ogloriosavirginum",
      description: "Hino",
    },
    {
      title: "Ladainha de São José",
      href: "/devocionario/ladainhas/jose",
      description: "Invocação ao padroeiro da Igreja",
    },
    {
      title: "Oração a São José",
      href: "/devocionario/oracoes/jose",
      description: "Invocação a São José",
    },
  ],
  Epifania: [
    {
      title: "Alma Redemptoris Mater",
      href: "/devocionario/antifonas/almaredemptorismater",
      description: "Antífona Nossa Senhora",
    },
    {
      title: "Nunc Dimittis",
      href: "/canticos/sacros/nuncdimittis",
      description: "Cântico de Simeão",
    },
    {
      title: "Quem Terra, Pontus, Aethera",
      href: "/canticos/sacros/quemterra",
      description: "Hino mariano",
    },
    {
      title: "Ladainha do Nome de Jesus",
      href: "/devocionario/ladainhas/nomejesus",
      description: "Invocação ao Nome de Jesus",
    },
    {
      title: "Conversão dos Infiéis",
      href: "/devocionario/oracoes/conversaoinfieis",
      description: "Oração",
    },
  ],
  Septuagésima: [
    {
      title: "Ave Regina Caelorum",
      href: "/devocionario/antifonas/avereginacaelorum",
      description: "Antífona Nossa Senhora",
    },
    {
      title: "Miserere (Salmo 50)",
      href: "/devocionario/salterio/050",
      description: "Salmo penitencial",
    },
    {
      title: "Parce Domine",
      href: "/canticos/sacros/parcedomine",
      description: "Hino penitencial",
    },
    {
      title: "Acto de Contrição",
      href: "/devocionario/oracoes/actocontricao",
      description: "Oração penitencial",
    },
    {
      title: "Concede Mihi",
      href: "/devocionario/oracoes/concedemihi",
      description: "Oração pela pureza",
    },
  ],
  Quaresma: [
    {
      title: "Via Sacra",
      href: "/devocionario/viasacra",
      description: "Meditação da Paixão",
    },
    {
      title: "Stabat Mater",
      href: "/missal/santos/09-15/#sequência",
      description: "Hino à Virgem Dolorosa",
    },
    {
      title: "Attende Domine",
      href: "/canticos/sacros/attendedomine",
      description: "Hino penitencial",
    },
    {
      title: "Parce Domine",
      href: "/canticos/sacros/parcedomine",
      description: "Hino penitencial",
    },
    {
      title: "Ladainha do Preciosíssimo Sangue",
      href: "/devocionario/ladainhas/sanguejesus",
      description: "Invocação ao Sangue de Cristo",
    },
    {
      title: "Acto de Reparação",
      href: "/devocionario/oracoes/actoreparacao",
      description: "Oração",
    },
    {
      title: "Confesso",
      href: "/devocionario/oracoes/confesso",
      description: "Acto penitencial",
    },
  ],
  Paixão: [
    {
      title: "Via Sacra",
      href: "/devocionario/viasacra",
      description: "Meditação da Paixão",
    },
    {
      title: "Vexilla Regis",
      href: "/canticos/sacros/vexillaregis",
      description: "Hino da Cruz",
    },
    {
      title: "Crux Fidelis",
      href: "/missal/quaresma/quad6-5#veníte-adorémus",
      description: "Hino da Sexta-feira Santa",
    },
    {
      title: "Pange Lingua",
      href: "/canticos/sacros/pangelingua",
      description: "Hino",
    },
    {
      title: "Tantum Ergo",
      href: "/canticos/sacros/tantumergo",
      description: "Hino",
    },
    {
      title: "Ladainha do Preciosíssimo Sangue",
      href: "/devocionario/ladainhas/sanguejesus",
      description: "Invocação ao Sangue de Cristo",
    },
    {
      title: "Senhor dos Passos",
      href: "/devocionario/oracoes/senhorpassos",
      description: "Oração da Paixão",
    },
  ],
  "Semana Santa": [
    {
      title: "Via Sacra",
      href: "/devocionario/viasacra",
      description: "Meditação da Paixão",
    },
    {
      title: "Vexilla Regis",
      href: "/canticos/sacros/vexillaregis",
      description: "Hino da Cruz",
    },
    {
      title: "Crux Fidelis",
      href: "/missal/quaresma/quad6-5#veníte-adorémus",
      description: "Hino da Sexta-feira Santa",
    },
    {
      title: "Pange Lingua",
      href: "/canticos/sacros/pangelingua",
      description: "Hino",
    },
    {
      title: "Tantum Ergo",
      href: "/canticos/sacros/tantumergo",
      description: "Hino",
    },
    {
      title: "Ladainha do Preciosíssimo Sangue",
      href: "/devocionario/ladainhas/sanguejesus",
      description: "Invocação ao Sangue de Cristo",
    },
    {
      title: "Senhor dos Passos",
      href: "/devocionario/oracoes/senhorpassos",
      description: "Oração da Paixão",
    },
  ],
  Páscoa: [
    {
      title: "Regina Coeli",
      href: "/devocionario/antifonas/reginacaeli",
      description: "Antífona Nossa Senhora",
    },
    {
      title: "Adoro Te Devote",
      href: "/canticos/sacros/adorote",
      description: "Hino",
    },
    {
      title: "O Salutaris Hostia",
      href: "/canticos/sacros/salutaris",
      description: "Hino",
    },
    {
      title: "Jesus Misericordioso",
      href: "/devocionario/oracoes/jesusmisericordioso",
      description: "Oração",
    },
    {
      title: "Alma de Cristo",
      href: "/devocionario/oracoes/almacristo",
      description: "Oração",
    },
  ],
  Pentecostes: [
    {
      title: "Veni Creator Spiritus",
      href: "/canticos/sacros/venicreator",
      description: "Hino ao Espírito Santo",
    },
    {
      title: "Veni Sancte Spiritus",
      href: "/missal/sequencias/venisanctespiritus",
      description: "Sequência de Pentecostes",
    },
    {
      title: "Salve Regina",
      href: "/devocionario/antifonas/salveregina",
      description: "Antífona Nossa Senhora",
    },
    {
      title: "Te Deum",
      href: "/canticos/sacros/tedeum",
      description: "Hino de louvor",
    },
    {
      title: "Oração ao Espírito Santo",
      href: "/devocionario/oracoes/espiritosanto",
      description: "Invocação ao Espírito Santo",
    },
    {
      title: "Magnificat",
      href: "/canticos/sacros/magnificat",
      description: "Cântico de Maria",
    },
    {
      title: "Ave Verum Corpus",
      href: "/canticos/sacros/aveverum",
      description: "Hino",
    },
    {
      title: "Ecce Panis Angelorum",
      href: "/canticos/sacros/eccepanisangelorum",
      description: "Hino",
    },
    {
      title: "Te Lucis Ante Terminum",
      href: "/canticos/sacros/telucis",
      description: "Hino vespertino",
    },
    {
      title: "Ladainha do Sagrado Coração",
      href: "/devocionario/ladainhas/coracaojesus",
      description: "Invocação ao Coração de Jesus",
    },
    {
      title: "Ladainha de Todos os Santos",
      href: "/devocionario/ladainhas/santos",
      description: "Invocação aos santos",
    },
    {
      title: "Coroa de São Miguel",
      href: "/devocionario/oracoes/coroasaomiguel",
      description: "Devoção angélica",
    },
    {
      title: "Exercício pelas Almas",
      href: "/devocionario/oracoes/exercitoalmas",
      description: "Oração pelas almas",
    },
  ],
} satisfies Record<Season, Prayer[]>;

const CATEGORY_ICONS = {
  Epifania: "star",
  Advento: "flame",
  Septuagésima: "sprout",
  Quaresma: "cross",
  Paixão: "cross",
  "Semana Santa": "cross",
  Páscoa: "bird",
  Natal: "baby",
  Pentecostes: "flame",
} satisfies Record<Season, string>;

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "star":
      return Star;
    case "flame":
      return Flame;
    case "sprout":
      return Sprout;
    case "cross":
      return Cross;
    case "bird":
      return Bird;
    case "baby":
      return Baby;
    case "heart":
      return Heart;
    default:
      return Star;
  }
};

export default function LiturgicalSeason() {
  const { isDark } = useAppTheme();
  const { season } = useCalendar();
  const seasonPalette = getSeasonPalette(season, isDark);

  const prayers = TEMPORAS_PRAYERS[season] || [];

  if (prayers.length === 0) {
    return null;
  }

  const iconColor = seasonPalette.accent;
  const iconElement = createElement(getIconComponent(CATEGORY_ICONS[season]), {
    size: 18,
    color: iconColor,
  });

  return (
    <View className="mt-2 gap-3 flex-1">
      <View className="flex-row items-center gap-2">
        {iconElement}
        <Typography className="font-display text-xl" style={{ color: seasonPalette.accent }}>
          {season}
        </Typography>
      </View>

      <View className="gap-2">
        {prayers.map((prayer) => (
          <PageLinkCard
            key={prayer.title}
            title={prayer.title}
            description={prayer.description}
            href={prayer.href}
          />
        ))}
      </View>
    </View>
  );
}
