import { H1 } from "~/components/Headings";
import PageWrapper from "~/components/Page";
import { Typography } from "~/components/typography";

import Missa from "../comum/2martirpontificeforapascal";

export default function Page0218() {
  return (
    <PageWrapper>
      <H1 text="S. Simeão, B. e Mártir, a 18 de Fevereiro" />

      <Typography className="comment">
        S. Simeão, filho de Cleofas e daquela Maria tão intimamente unida pelos laços do sangue à
        Santíssima Virgem, que era chamada sua irmã, «foi ungido com o óleo santo» (Grad.) e nomeado
        bispo de Jerusalém, depois do apóstolo S. Tiago. Discípulo do Cristo, a quem conhecera, foi
        preso por esse motivo e crucificado (Ev.). Não obstante os seus 120 anos, o santo ancião
        suportou com muita constância o rude suplício e recebeu a coroa de vida preparada por Deus
        para os que o amam (Ep.). Seu martírio foi em 106. — Como S. Simeão, neste santo tempo de
        penitência, vivamos unidos a Jesus, morrendo aos nossos pecados.
      </Typography>

      <Missa />
    </PageWrapper>
  );
}
