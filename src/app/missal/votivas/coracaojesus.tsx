import { H1 } from "~/components/Headings";
import LinkCard from "~/components/LinkCard";
import PageWrapper from "~/components/Page";
import { isFirstFriday } from "~/lib/utils";
import { useCalendar } from "~/providers/calendar";

import Missa from "./../pentecostes/pent3-0";

export default function PageCoracaojesus() {
  const { date } = useCalendar();

  return (
    <PageWrapper>
      <H1 text="Missa do Santíssimo Coração de Jesus" />

      {isFirstFriday(date) && (
        <LinkCard
          href="/devocionario/oracoes/consagracaosagradocoracaojesus"
          title="Primeira Sexta-feira — Reparação ao Sagrado Coração"
          description="Consagração · Comunhão reparadora"
        />
      )}

      <Missa />
    </PageWrapper>
  );
}
