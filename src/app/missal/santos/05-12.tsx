import { H1, H3 } from "~/components/Headings";
import Language from "~/components/Language";
import LinkCard from "~/components/LinkCard";
import PageWrapper from "~/components/Page";
import { Typography } from "~/components/typography";

export default function Page0512() {
  return (
    <PageWrapper>
      <H1 text="S.S. Nereu, Achileu, Domitila, Virgem e Pancracio, Mártires" />

      <Typography className="comment">
        Nereu e Aquiles, oficiais da casa de Flávia Domitila, sobrinha dos imperadores Tito e
        Domiciano, foram baptizados por S. Pedro. O Evangelho louva-lhes a fé, na pessoa do oficial
        que, obtendo a cura do filho, creu em Jesus. Os Santos inspiraram a Domitila a resolução de
        consagrar a Deus a sua virgindade. Aureliano, seu noivo, acusou-os como sendo cristãos; por
        ódio ao Cristo, foram os três condenados à morte no império de Domiciano em Terracena (pelo
        ano 100). Seus corpos descansam em Roma na igreja dos SS. Nereu e Aquiles (2). S. Pancrácio,
        preso em Roma, aos quatorze anos, foi martirizado cerca do ano de 275 sob Diocleciano, por
        recusar sacrificar aos deuses. Sua constância o colocou entre os Santos cuja alegria
        compartilha (Ep., Comm.).
      </Typography>

      <H3 text="Intróito" />

      <Typography className="em">Sl 32:18-20</Typography>

      <Language>
        <Typography className="latin">
          Ecce, óculi Dómini super timéntes eum, sperántes in misericórdia ejus, allelúja: ut
          erípiat a morte ánimas eórum: quóniam adjútor et protéctor noster est, allelúja, allelúja.{" "}
          <Typography className="latin">Ps 32:1</Typography> Exsultáte, justi, in Dómino: rectos
          decet collaudátio.
          <Typography className="versicle"> ℣. </Typography>Gloria Patri...
        </Typography>
        <Typography className="vernacular">
          Eis que os olhos do Senhor se dirigem aos que o temem, e esperam na sua misericórdia,
          aleluia: para livrar as suas almas da morte: porque Ele é o nosso socorro e o nosso
          protector, aleluia, aleluia. <Typography className="vernacular">Sl. 32, 1</Typography>{" "}
          Justos, alegrai-vos no Senhor: aos rectos convém que o louvem.
          <Typography className="versicle"> ℣. </Typography>
          Glória ao Pai...
        </Typography>
      </Language>

      <H3 text="Oração" />

      <Language>
        <Typography className="latin">
          Semper nos, Dómine, Mártyrum tuórum Nérei, Achillei, Domitíllæ atque Pancrátii fóveat,
          quǽsumus, beáta sollémnitas: et tuo dignos reddat obséquio. Per Dóminium nostrum...
        </Typography>
        <Typography className="vernacular">
          Fazei, Senhor, Vos suplicamos, que a feliz solenidade dos vossos Mártires Néreo, Aquiles,
          Domitila e Pancrácio nos reanime e nos torne dignos de Vos servirmos. Por nosso Senhor...
        </Typography>
      </Language>

      <H3 text="Epístola" />

      <LinkCard
        title="Epístola da Missa de S. Filipe e S. Tiago"
        href="/missal/santos/05-01#epístola"
      />

      <Language>
        <Typography className="latin">
          Allelúja, allelúja.<Typography className="versicle"> ℣. </Typography>
          Hæc est vera fratérnitas, quæ vicit mundi crímina: Christum secuta est, ínclita tenens
          regna cœléstia. Allelúja.
        </Typography>
        <Typography className="vernacular">
          Aleluia, aleluia.<Typography className="versicle"> ℣. </Typography>
          Esta é a verdadeira fraternidade que venceu os crimes do mundo: Ela seguiu Cristo,
          possuindo gloriosamente o reino celestial. Aleluia.
        </Typography>
      </Language>

      <H3 text="Evangelho" />

      <LinkCard
        title="Evangelho do Vigésimo Domingo depois de Pentecostes"
        href="/missal/pentecostes/20-0#evangelho"
      />

      <H3 text="Ofertório" />

      <LinkCard title="Ofertório Missa Protexísti me" href="/missal/comum/9martir#ofertório" />

      <H3 text="Secreta" />

      <Language>
        <Typography className="latin">
          Sanctórum Martyrum tuórum, quǽsumus. Dómine, Nérei, Achíllei, Domitíllæ atque Pancrátii
          sit tibi grata conféssio: quæ et múnera nostra comméndet, et tuam nobis indulgéntiam
          semper implóret. Per Dóminum...
        </Typography>
        <Typography className="vernacular">
          Dignai-Vos receber, Senhor, com ânimo agradável a confissão dos vossos Santos Mártires
          Néreo, Aquiles, Domitila e Pancrácio; e que ela Vos disponha a aceitardes as nossas
          ofertas e elas nos tornem sempre merecedores da vossa indulgência. Por nosso Senhor...
        </Typography>
      </Language>

      <H3 text="Comúnio" />

      <LinkCard title="Comúnio Missa Sancti tui" href="/missal/comum/10martires#comúnio" />

      <H3 text="Postcomúnio" />

      <Language>
        <Typography className="latin">
          Quǽsumus, Dómine: ut beatórum Mártyrum tuórum Nérei, Achíllei, Domitíllæ atque Pancrátii
          deprecatiónibus, sacraménta sancta, quæ súmpsimus, ad tuæ nobis profíciant placatiónis
          augméntum. Per Dóminum...
        </Typography>
        <Typography className="vernacular">
          Vos pedimos, Senhor, fazei que pelas preces dos vossos Mártires Néreo, Aquiles, Domitila e
          Pancrácio os sagrados mystérios, que recebemos, Vos tornem cada vez mais propício para
          connosco. Por nosso Senhor...
        </Typography>
      </Language>
    </PageWrapper>
  );
}
