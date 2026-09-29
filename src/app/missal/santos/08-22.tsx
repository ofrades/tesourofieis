import { H1, H3 } from "~/components/Headings";
import Language from "~/components/Language";
import LinkCard from "~/components/LinkCard";
import PageWrapper from "~/components/Page";
import { Typography } from "~/components/typography";
import { useCalendar } from "~/providers/calendar";
import { isFirstSaturday } from "~/lib/utils";

export default function Page0822() {
  const { date } = useCalendar();
  const showFirstSaturday = isFirstSaturday(date);

  return (
    <PageWrapper>
      <H1 text="Imaculado Coração da B. Virgem Maria, a 22 de Agosto" />

      {showFirstSaturday && (
        <LinkCard
          href="/devocionario/rosario?anchor=meditacoes-do-rosario"
          title="Primeiro Sábado — Desagravo ao Imaculado Coração"
          description="Rosário · 15 min de meditação · Confissão e Comunhão reparadora"
        />
      )}
      <Typography className="aside">
        Depois de ter em plena guerra consagrado o género humano ao Imaculado Coração de Maria para
        o colocar por este modo debaixo da particular protecção da Mãe do Salvador, Pio XII decretou
        em 1944 que todos os anos se celebrasse doravante na Igreja inteira uma festa especial em
        honra do Imaculado Coração no dia 22 de agosto. É já antiga a devoção ao Coração Imaculado
        de Maria. No século XVII propagou-a muito São João Eudes, juntamente com a do Sagrado
        Coração de Jesus. No século XIX, Pio VII e depois Pio IX concederam a várias Igrejas
        particulares uma festa do "Coração puríssimo de Maria", fixada primeiramente no Domingo
        depois da Assunção e mais tarde no Sábado que se segue à festa do Sagrado Coração. Pio XII
        transferiu-a para 22 de agosto e designou-lhe como principal intenção pedir, por intercessão
        da Santíssima Virgem, a "paz para os povos, a liberdade da Igreja, a conversão dos
        pecadores, o amor da pureza e prática da virtude"
      </Typography>

      <H3 text="Intróito" />

      <Typography className="em">Heb. 4, 16</Typography>

      <Language>
        <Typography className="latin">
          Adeámus cum fidúcia ad thronum grátiæ, ut misericórdiam consequámur, et grátiam inveniámus
          in auxílio opportúno. <Typography className="latin">Ps. 44, 2</Typography> Eructávit cor
          meum verbum bonum: dico ego ópera mea regi.
          <Typography className="versicle"> ℣. </Typography>Gloria Patri...
        </Typography>
        <Typography className="vernacular">
          Acerquemo-nos com confiança do trono da graça, a fim de alcançar misericórdia e encontrar
          graça e sermos auxiliados na ocasião necessária.{" "}
          <Typography className="vernacular">Sl. 44, 2</Typography> Meu coração exprimiu uma
          excelente palavra: «Consagro ao Rei as minhas obras»!
          <Typography className="versicle"> ℣. </Typography>Glória ao Pai...
        </Typography>
      </Language>

      <H3 text="Oração" />

      <Language>
        <Typography className="latin">
          Omnípotens sempitérne Deus, qui in Corde beátæ Maríæ Vírginis dignum Spíritus Sancti
          habitáculum præparásti: concéde propítius; ut ejúsdem immaculáti Cordis festivitátem
          devóta mente recoléntes, secúndum cor tuum vívere valeámus. Per Dóminum...
        </Typography>
        <Typography className="vernacular">
          Omnipotente e sempiterno Deus, que no Coração da B. Virgem Maria preparastes uma digna
          morada do Espírito Santo, concedi-nos propício que, havendo celebrado devotamente a festa
          deste Imaculado Coração, vivamos sempre segundo o vosso Coração. Por nosso Senhor...
        </Typography>
      </Language>

      <H3 text="Epístola" />

      <LinkCard href="/missal/santos/07-16#epístola" title="B. Virgem Maria do Monte Carmelo" />

      <H3 text="Gradual" />

      <Typography className="em">Sl. 12, 6</Typography>

      <Language>
        <Typography className="latin">
          Exsultábit cor meum in salutári tuo: cantábo Dómino, qui bona tríbuit mihi: et psallam
          nómini Dómini altíssimi.
          <Typography className="versicle"> ℣. </Typography>
          <Typography className="latin">Ps. 44, 18</Typography> Mémores erunt nóminis tui in omni
          generatióne et generatiónem: proptérea pópuli confitebúntur tibi in ætérnum.
        </Typography>
        <Typography className="vernacular">
          Exultará o meu coração com a salvação que de Vós virá; cantarei hinos ao Senhor, que me
          concedeu tantos benefícios; entoarei salmos em louvor do nome do altíssimo Senhor.
          <Typography className="versicle"> ℣. </Typography>
          <Typography className="vernacular">Sl. 44, 18</Typography> De geração em geração
          glorificarão o vosso nome: e os povos vos louvarão eternamente.
        </Typography>
        <Typography className="latin">
          Allelúja, allelúja.<Typography className="versicle"> ℣. </Typography>
          <Typography className="latin">Luc. 1, 46, 47</Typography> Magníficat ánima mea Dóminum: et
          exsultávit spíritus meus in Deo salutári meo. Allelúja.
        </Typography>
        <Typography className="vernacular">
          Aleluia, aleluia.<Typography className="versicle"> ℣. </Typography>
          <Typography className="vernacular">Lc. 1, 46, 47</Typography> Minha alma glorifica o
          Senhor e o meu espírito se alegra em Deus, meu Salvador. Aleluia.
        </Typography>
      </Language>

      <H3 text="Evangelho" />

      <Typography className="em">Jo. 19, 25-27</Typography>

      <Language>
        <Typography className="latin">
          <Typography className="cross"> ✠ </Typography> Sequéntia sancti Evangélii secúndum
          Joánnem.
        </Typography>
        <Typography className="vernacular">
          <Typography className="cross"> ✠ </Typography> Continuação do santo Evangelho segundo S.
          João.
        </Typography>
        <Typography className="latin">
          In illo témpore: Stabant juxta crucem Jesu mater ejus, et soror matris ejus María Cléophæ,
          et María Magdaléne. Cum vidísset ergo Jesus matrem, et discípulum stantem, quem diligébat,
          dicit matri suæ: Múlier, ecce fílius tuus. Deinde dicit discípulo: Ecce mater tua. Et ex
          illa hora accépit eam discípulus in sua.
        </Typography>
        <Typography className="vernacular">
          Naquele tempo, estavam, junto à Cruz de Jesus, sua Mãe, a irmã de sua Mãe, Maria, mulher
          de Cléofas, e Maria Madalena. Então, vendo Jesus sua Mãe, e de pé, perto dela, o discípulo
          que Ele preferia, disse a sua Mãe: «Mulher, eis o vosso filho». Em seguida disse ao
          discípulo: «Eis a tua Mãe!». E desde aquela hora o discípulo a levou consigo.
        </Typography>
      </Language>

      <H3 text="Ofertório" />

      <Typography className="em">Lc. 1, 46, 49</Typography>

      <Language>
        <Typography className="latin">
          Exsultávit spíritus meus in Deo salutári meo; quia fecit mihi magna qui potens est, et
          sanctum nomen ejus.
        </Typography>
        <Typography className="vernacular">
          O meu espírito alegra-se em Deus, meu Salvador, porque Aquele que é omnipotente, e o seu
          nome é Santo, operou em mim maravilhas.
        </Typography>
      </Language>

      <H3 text="Secreta" />

      <Language>
        <Typography className="latin">
          Majestáti tuæ, Dómine, Agnum immaculátum offeréntes, quǽsumus: ut corda nostra ignis ille
          divínus accéndat, cui Cor beátæ Maríæ Vírginis ineffabíliter inflammávit. Per eundem
          Dóminum...
        </Typography>
        <Typography className="vernacular">
          Enquanto oferecemos à vossa Majestade, Senhor, o Cordeiro Imaculado, dignai-Vos acender
          nos nossos corações aquele fogo divino que abrasou de uma maneira inefável o Coração da B.
          Virgem Maria. Pelo mesmo nosso Senhor...
        </Typography>
      </Language>

      <H3 text="Comúnio" />

      <Typography className="em">Jo. 19, 27</Typography>

      <Language>
        <Typography className="latin">
          Dixit Jesus matri suæ: Múlier, ecce fílius tuus: deinde dixit discípulo: Ecce mater tua.
          Et ex illa hora accépit eam discípulus in sua.
        </Typography>
        <Typography className="vernacular">
          Disse Jesus a sua Mãe: «Mulher, eis o vosso filho»; depois disse ao discípulo: «Eis a tua
          Mãe». E desde aquela hora o discípulo a levou consigo.
        </Typography>
      </Language>

      <H3 text="Postcomúnio" />

      <Language>
        <Typography className="latin">
          Divínis refécti munéribus te, Dómine, supplíciter exorámus: ut beátæ Maríæ Vírginis
          intercessióne, cujus immaculáti Cordis solémnia venerándo égimus, a præséntibus perículis
          liberáti, ætérnæ vitæ gáudia consequámur. Per Dóminum...
        </Typography>
        <Typography className="vernacular">
          Sustentados com vossas divinas ofertas, Senhor, humildemente Vos imploramos pela
          intercessão da B. Virgem Maria, cujo puríssimo Coração acabamos solenemente de honrar,
          que, sendo livres dos perigos presentes, possamos gozar a alegria da vida eterna. Por
          nosso Senhor...
        </Typography>
      </Language>
    </PageWrapper>
  );
}
