import DirectoryList from "~/components/DirectoryList";
import { H1 } from "~/components/Headings";
import PageWrapper from "~/components/Page";
import { Typography } from "~/components/typography";

export default function PageIndex() {
  return (
    <PageWrapper printable={false}>
      <H1 text="Pequeno Ofício de Nossa Senhora" />

      <Typography className="aside">
        Em conformidade com <Typography className="em">Editio Typica</Typography> do Breviário
        Romano.
      </Typography>

      <DirectoryList slug="devocionario/oficio" />
    </PageWrapper>
  );
}
