import { H1, H3 } from "~/components/Headings";
import Language from "~/components/Language";
import PageWrapper from "~/components/Page";
import { Typography } from "~/components/typography";

export default function PageNat20() {
  return (
    <PageWrapper>
      <H1 text="Santíssimo Nome de Jesus" />

      <Typography className="comment">
        Depois de nos ter manifestado a Encarnação do Filho de Deus, a Igreja nos revela todas as
        grandezas do seu nome.
        {"\n\n"}
        Por ocasião do rito da Circuncisão é que os Judeus impunham o nome aos filhos; por esse
        motivo a Igreja toma hoje o mesmo Evangelho da festa da Circuncisão, insistindo na segunda
        parte, na qual diz que «o Menino recebeu o nome de Jesus» (Ev.), «como Deus havia ordenado
        que o chamassem» (Or.) (1). Esse nome significa Salvador, pois «nenhum outro nome foi dado
        aos homens pelo qual devamos ser salvos» (Ep.).
        {"\n\n"}
        As primeiras origens desta festa remontam ao século XVI, em que é celebrada na Ordem de São
        Francisco. Em 1721 a Igreja, governada por Inocêncio XIII, estendeu a solenidade ao mundo
        inteiro. Se quisermos «alegrar-nos, vendo os nossos nomes escritos com o de Jesus no céu»
        (Postc.), tenhamo-lo muitas vezes nos lábios durante esta vida. São concedidos vinte dias de
        indulgência aos que inclinam a cabeça com respeito ao pronunciarem ou ouvirem pronunciar os
        nomes de Jesus e Maria, e Pio X concedeu 300 dias aos que os invocarem piedosamente, com os
        lábios ou pelo menos com o coração.
      </Typography>

      <H3 text="Intróito" />

      <Typography className="em">Fl. 2, 10-11</Typography>

      <Language>
        <Typography className="latin">
          In nómine Jesu omne genu flectátur, cœléstium, terréstrium et infernórum: et omnis lingua
          confiteátur, quia Dóminus Jesus Christus in glória est Dei Patris.{" "}
          <Typography className="latin">Ps. 8, 2</Typography> Dómine, Dóminus noster, quam
          admirábile est nomen tuum in univérsa terra!
          <Typography className="versicle"> ℣. </Typography>
          Gloria Patri...
        </Typography>
        <Typography className="vernacular">
          Que ao ser pronunciado o Nome de Jesus se dobrem todos os joelhos dos que estão no céu, na
          terra e no inferno: e que toda a língua humana confesse que o Senhor Jesus Cristo está na
          glória de Deus Pai. <Typography className="vernacular">Ps. 8, 2</Typography> Senhor, nosso
          Senhor, como o vosso Nome é admirável em todo o universo!
          <Typography className="versicle"> ℣. </Typography>Glória ao Pai...
        </Typography>
      </Language>

      <H3 text="Oração" />

      <Language>
        <Typography className="latin">
          Deus, qui unigénitum Fílium tuum constituísti hu máni géneris Salvatórem, ei Jesum vocári
          jussísti: concéde propítius; ut, cujus sanctum nomen venerámur in terris, ejus quoque
          aspéctu perfruámur in cœlis. Per eúndem Dóminum...
        </Typography>
        <Typography className="vernacular">
          Ó Deus, que constituístes o vosso Filho Unigénito Salvador do mundo e ordenastes que fosse
          chamado Jesus, concedei-nos propício que, venerando nós o seu Santo Nome na terra, gozemos
          também a sua presença nos céus. Pelo mesmo nosso Senhor...
        </Typography>
      </Language>

      <H3 text="Epístola" />

      <Typography className="em">Act. 4, 8-12</Typography>

      <Language>
        <Typography className="latin">Léctio Actuum Apostolorum.</Typography>
        <Typography className="vernacular">Lição dos Actos dos Apóstolos.</Typography>
        <Typography className="latin">
          In diébus illis: Petrus, replétus Spíritu Sancto, dixit: Príncipes pópuli et senióres,
          audíte: Si nos hódie dijudicámur in benefácto hóminis infírmi, in quo iste salvus factus
          est, notum sit ómnibus vobis et omni plebi Israël: quia in nómine Dómini nostri Jesu
          Christi Nazaréni, quem vos crucifixístis, quem Deus suscitávit a mórtuis, in hoc iste
          astat coram vobis sanus. Hic est lapis, qui reprobátus est a vobis ædificántibus: qui
          factus est in caput ánguli: et non est in alio áliquo salus. Nec enim aliud nomen est sub
          cœlo datum homínibus, in quo opórteat nos salvos fíeri.
        </Typography>
        <Typography className="vernacular">
          Naqueles dias, Pedro, cheio de Espírito Santo, disse: «Príncipes do povo e anciãos de
          Israel, escutai: Visto que somos hoje julgados por causa dum milagre, concedido a um homem
          enfermo, para saber por quem foi curado, sabei, vós todos e todo o povo de Israel, que foi
          curado pelo Nome de Jesus Cristo Nazareno, a quem crucificastes, e que Deus ressuscitou
          dos mortos. É por Ele que este homem se apresenta diante de vós, plenamente curado. Este
          Jesus é a pedra que vós, querendo edificar, desprezastes, e que se tornou a pedra
          principal do ângulo. Não há salvação em nenhum outro nome, pois não existe debaixo do céu
          outro nome, que tenha sido dado aos homens, pelo qual devamos ser salvos».
        </Typography>
      </Language>

      <H3 text="Gradual" />

      <Typography className="em">Sl. 105, 47</Typography>

      <Language>
        <Typography className="latin">
          Salvos fac nos, Dómine, Deus noster, et cóngrega nos de natiónibus: ut confiteámur nómini
          sancto tuo, et gloriémur in glória tua.
          <Typography className="versicle"> ℣. </Typography>
          <Typography className="latin">Isai. 63, 16</Typography> Tu, Dómine, Pater noster et
          Redémptor noster: a sǽculo nomen tuum.
        </Typography>
        <Typography className="vernacular">
          Salvai-nos, ó Senhor, nosso Deus, e reuni-nos todos no meio das nações, a fim de que
          confessemos o vosso Santo Nome e nos gloriemos com vossos louvores.
          <Typography className="versicle"> ℣. </Typography>
          <Typography className="vernacular">Isai. 63, 16</Typography> Senhor, sois o nosso Pai e
          Redentor! vosso Nome é eterno!
        </Typography>
        <Typography className="latin">
          Allelúja, allelúja.<Typography className="versicle"> ℣. </Typography>
          <Typography className="latin">Ps. 144, 21</Typography> Laudem Dómini loquétur os meum, et
          benedícat omnis caro nomen sanctum ejus. Allelúja.
        </Typography>
        <Typography className="vernacular">
          Aleluia, aleluia.<Typography className="versicle"> ℣. </Typography>
          <Typography className="vernacular">Sl. 144, 21</Typography> Que minha boca anuncie os
          louvores do Senhor: que toda a carne humana bendiga o seu Santo Nome. Aleluia.
        </Typography>
      </Language>

      <H3 text="Evangelho" />

      <Typography className="em">Lc. 2, 21</Typography>

      <Language>
        <Typography className="latin">
          <Typography className="cross"> ✠ </Typography> Sequéntia sancti Evangélii secúndum Lucam.
        </Typography>
        <Typography className="vernacular">
          <Typography className="cross"> ✠ </Typography> Continuação do santo Evangelho segundo S.
          Lucas.
        </Typography>
        <Typography className="latin">
          In illo témpore: Postquam consummáti sunt dies octo, ut circumciderétur Puer: vocátum est
          nomen ejus Jesus, quod vocátum est ab Angelo, priúsquam in útero conciperétur.
        </Typography>
        <Typography className="vernacular">
          Naquele tempo, passados que foram oito dias depois dos quais o Menino devia ser
          circuncidado, foi-Lhe dado o nome de Jesus, que foi aquele que o Anjo Lhe havia dado,
          antes de ser concebido no seio de sua Mãe.
        </Typography>
      </Language>

      <H3 text="Ofertório" />

      <Typography className="em">Sl. 85, 12 & 5</Typography>

      <Language>
        <Typography className="latin">
          Confitébor tibi, Dómine, Deus meus, in toto corde meo, et glorificábo nomen tuum in
          ætérnum: quóniam tu, Dómine, suávis et mitis es: et multæ misericórdiæ ómnibus
          invocántibus te, allelúja.
        </Typography>
        <Typography className="vernacular">
          Louvar-Vos-ei de todo meu coração, ó Senhor, meu Deus: e glorificarei eternamente o vosso
          Nome; pois Vós, ó Senhor, sois cheio de clemência e de bondade: e as vossas misericórdias
          estendem-se a todos quantos Vos invocam. Aleluia.
        </Typography>
      </Language>

      <H3 text="Secreta" />

      <Language>
        <Typography className="latin">
          Benedíctio tua, clementíssime Deus, qua omnis viget creatúra, sanctíficet, quǽsumus, hoc
          sacrifícium nostrum, quod ad glóriam nóminis Fílii tui, Dómini nostri Jesu Christi,
          offérimus tibi: ut majestáti tuæ placére possit ad laudem, et nobis profícere ad salútem.
          Per eúndem Dóminum...
        </Typography>
        <Typography className="vernacular">
          Ó Deus clementíssimo, que a vossa bênção, que dá a vida a todas as criaturas, santifique
          este nosso sacrifício, que oferecemos em glória do Nome do vosso Filho, nosso Senhor Jesus
          Cristo, a fim de que ele possa honrar a vossa majestade, e, agradando-lhe, seja útil à
          nossa salvação. Pelo mesmo nosso Senhor...
        </Typography>
      </Language>

      <H3 text="Comúnio" />

      <Typography className="em">Sl. 85, 9-10</Typography>

      <Language>
        <Typography className="latin">
          Omnes gentes, quascúmque fecísti, vénient et adorábunt coram te, Dómine, et glorificábunt
          nomen tuum: quóniam magnus es tu et fáciens mirabília: tu es Deus solus, allelúja.
        </Typography>
        <Typography className="vernacular">
          Todos os povos, que criastes, virão e se prostrarão diante de Vós, Senhor, adorando-Vos e
          glorificando o vosso Nome; pois sois grande e praticais prodígios. Só Vós sois Deus.
          Aleluia.
        </Typography>
      </Language>

      <H3 text="Postcomúnio" />

      <Language>
        <Typography className="latin">
          Omnípotens ætérae Deus, qui creásti et redemísti nos, réspice propítius vota nostra: et
          sacrifícium salutáris hóstiæ, quod in honórem nóminis Fílii tui, Dómini nostri Jesu
          Christi, majestáti tuæ obtúlimus, plácido et benígno vultu suscípere dignéris; ut grátia
          tua nobis infúsa, sub glorióso nómine Jesu, ætérnæ prædestinatiónis titulo gaudeámus
          nómina nostra scripta esse in cœlis. Per eúndem Dóminu...
        </Typography>
        <Typography className="vernacular">
          Deus omnipotente e eterno, que nos criastes e resgatastes, olhai benignamente para as
          nossas ofertas e dignai-Vos aceitar com ânimo suave e piedoso o sacrifício da Hóstia
          salutar, que oferecemos à vossa majestade em honra do Nome do vosso Filho, nosso Senhor
          Jesus Cristo, a fim de que, infundida a vossa graça em nossas almas, possamos alegrar-nos,
          vendo os nossos nomes escritos nos céus, abaixo do glorioso Nome de Jesus, no livro da
          eterna predestinação. Pelo mesmo Senhor...
        </Typography>
      </Language>
    </PageWrapper>
  );
}
