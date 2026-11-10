import { MissalRefLink as Link } from "~/components/MissalRefLink";
import { H1, H3 } from "~/components/Headings";
import Language from "~/components/Language";
import PageWrapper from "~/components/Page";
import { Typography } from "~/components/typography";

export default function Page0205() {
  return (
    <PageWrapper>
      <H1 text="Santa Águeda, Virgem e Márt., a 5 de Fevereiro" />

      <Typography className="comment">
        Santa Águeda, Virgem Mártir (Or.), nasceu na Sicília de pais nobres, mas julgou ser a sua
        maior nobreza o pertencer a Jesus, a quem tomou por Esposo (Ev.). Dotada de notável beleza,
        teve que resistir às solicitações do governador Quintiano, o qual, não podendo chegar aos
        seus fins pela persuasão, empregou a violência, mandando dilacerar o peito da Santa, a qual
        foi curada pelo Apóstolo S. Pedro que lhe apareceu na prisão (Comm.). Em seguida, o corpo da
        Santa foi revolvido sobre cacos e carvões ardentes; voltando à prisão, ali expirou no meio
        da prece. Isto passou-se em Catana, no ano de 251, sob a perseguição do imperador Décio.
        Deus, concedendo por sua omnipotência a vitória do martírio a essa frágil mulher (Or.), quis
        mostrar que só Ele é o nosso Redentor e por isso «escolhe o que é fraco no mundo para
        aniquilar os que confiam em suas próprias forças» (Ep.). Diversas vezes, o véu virginal que
        cobria o túmulo de Santa Águeda fez parar a lava que se precipitava em torrentes de fogo do
        Etna, ameaçando destruir a cidade. Deste modo Deus honrava a resistência oposta pela sua
        puríssima alma contra os assaltos das paixões. O seu nome está escrito no Canon da Missa
        (2.ª lista, p. 93). Já no século VI a sua festa era celebrada em Roma. Invoquemos a Santa
        Águeda para preservar as nossas casas dos incêndios e extinguir, pelo espírito de
        penitência, as chamas impuras que abrasam os nossos corpos e as nossas almas.
      </Typography>

      <Typography className="aside">
        Como na{" "}
        <Link className="link" href="/missal/comum/17virgensmartires1">
          Missa Loquébar
        </Link>{" "}
        , excepto:
      </Typography>

      <H3 text="Intróito" />

      <Language>
        <Typography className="latin">
          Gaudeámus omnes in Dómino, diem festum celebrántes sub honóre beátæ Agathæ Vírginis et
          Martyris: de cujus passióne gaudent Angeli et colláudant Fílium Dei.{" "}
          <Typography className="latin">Ps. 44, 2</Typography> Eructávit cor meum verbum bonum: dico
          ego ópera mea Regi.
          <Typography className="versicle"> ℣. </Typography>Gloria Patri...
        </Typography>
        <Typography className="vernacular">
          Alegremo-nos todos no Senhor, celebrando neste dia a festividade em honra da B. Águeda,
          Virgem e Mártir, de cujo martírio se regozijam os Anjos, que louvam o Filho de Deus.{" "}
          <Typography className="vernacular">Sl. 44, 2</Typography> Meu coração exprimiu uma
          excelente palavra: «Consagro ao Rei as minhas obras!».
          <Typography className="versicle"> ℣. </Typography>Glória ao Pai...
        </Typography>
      </Language>

      <H3 text="Epístola" />

      <Typography className="em">1 Cor. 1, 26-31</Typography>

      <Language>
        <Typography className="latin">
          Léctio Epístolæ beáti Pauli Apóstoli ad Corinthios.
        </Typography>
        <Typography className="vernacular">
          Lição da Ep.ª do B. Ap.º Paulo aos Coríntios.
        </Typography>
        <Typography className="latin">
          Fratres: Vidéte vocatiónem vestram: quia non multi sapiéntes secúndum carnem, non multi
          poténtes, non multi nóbiles: sed quæ stulta sunt mundi elégit Deus, ut confúndat
          sapiéntes: et infírma mundi elégit Deus, ut confúndat fórtia: et ignobília mundi et
          contemptibília elégit Deus, et ea quæ non sunt, ut ea quæ sunt destrúeret: ut non
          gloriétur omnis caro in conspéctu ejus. Ex ipso autem vos estis in Christo Jesu, qui
          factus est nobis sapiéntia a Deo, et justítia, et sanctificátio, et redémptio: ut,
          quemádmodum scriptum est: Qui gloriátur, in Dómino gloriétur.
        </Typography>
        <Typography className="vernacular">
          Examinai a vossa vocação, porque não há, segundo a carne, nem muitos sábios, nem muitos
          poderosos, nem muitos nobres; mas Deus escolheu aquele que o mundo julga insensato, para
          confundir os sábios; e aquele que o mundo considera fraco, para confundir os fortes; e
          aquele que o mundo considera vil e desprezível e o que não vale nada, para destruir o que
          tem valor, a fim de que nenhuma criatura humana se glorie diante d’Ele. É por Ele que
          estais em Jesus Cristo, que nos foi dado por Deus para ser nossa sabedoria, justiça,
          santificação e redenção, para que se cumpra o que está escrito: «O que se gloria,
          glorie-se no Senhor».
        </Typography>
      </Language>

      <H3 text="Gradual" />

      <Typography className="em">Sl. 45, 6 & 5</Typography>

      <Language>
        <Typography className="latin">
          Adjuvábit eam Deus vultu suo: Deus in médio ejus, non commovébitur.
          <Typography className="versicle"> ℣. </Typography>Flúminis impetus lætíficat civitátem
          Dei: sanctificávit tabernáculum suum Altíssimus.
        </Typography>
        <Typography className="vernacular">
          O Senhor a auxiliará com seu olhar: Deus está no meio dela e a não deixará vacilar.
          <Typography className="versicle"> ℣. </Typography>Um rio com suas águas alegra a cidade de
          Deus. O Altíssimo santificou o seu tabernáculo.
        </Typography>
        <Typography className="latin">
          Allelúja, allelúja.<Typography className="versicle"> ℣. </Typography>
          <Typography className="latin">Ps. 118, 46</Typography> Loquébar de testimóniis tuis in
          conspéctu regum, et non confundébar. Allelúja.
        </Typography>
        <Typography className="vernacular">
          Aleluia, aleluia.<Typography className="versicle"> ℣. </Typography>
          <Typography className="vernacular">Sl. 118, 46</Typography> Perante os reis, publicarei os
          vossos testemunhos e não me envergonharei. Aleluia.
        </Typography>
      </Language>

      <Typography className="aside">
        Após a Septuagésima, omite-se o Aleluia e o Verso, e diz-se o:
      </Typography>

      <H3 text="Trato" />

      <Typography className="em">Sl. 125, 5-6</Typography>

      <Language>
        <Typography className="latin">
          Qui séminant in lácrimis, in gáudio metent.
          <Typography className="versicle"> ℣. </Typography>Eúntes ibant et fiébant, mitténtes
          semina sua.
          <Typography className="versicle"> ℣. </Typography>
          Veniéntes autem vénient cum exsultatióne, portántes manípulos suos.
        </Typography>
        <Typography className="vernacular">
          Aqueles que semearam com lágrimas colherão com alegria.
          <Typography className="versicle"> ℣. </Typography>Iam, caminhavam e lançavam a semente à
          terra, chorando.
          <Typography className="versicle"> ℣. </Typography>
          Mas regressaram com alegria, transportando os seus molhos de trigo.
        </Typography>
      </Language>

      <H3 text="Evangelho" />

      <Typography className="em">Mt. 19, 3-12</Typography>

      <Language>
        <Typography className="latin">
          <Typography className="cross"> ✠ </Typography> Sequéntia sancti Evangélii secúndum
          Matthǽum.
        </Typography>
        <Typography className="vernacular">
          <Typography className="cross"> ✠ </Typography> Continuação do santo Evangelho segundo S.
          Mateus.
        </Typography>
        <Typography className="latin">
          In illo témpore: Accessérunt ad Jesum pharisǽi, tentántes eum et dicéntes: Si licet hómini
          dimíttere uxórem suam quacúmque ex causa? Qui respóndens, ait eis: Non legístis, quia, qui
          fecit hóminem ab inítio, másculum et féminam fecit eos? et dixit: Propter hoc dimíttet
          homo patrem, et matrem, et adhærébit uxóri suæ, et erunt duo in carne una. Itaque jam non
          sunt duo, sed una caro. Quod ergo Deus conjúnxit, homo non séparet. Dicunt illi: Quid ergo
          Móyses mandávit dare libéllum repúdii, et dimíttere? Ait illis: Quóniam Móyses ad durítiam
          cordis vestri permísit vobis dimíttere uxóres vestras: ab inítio autem non fuit sic. Dico
          autem vobis, quia, quicúmque dimíserit uxórem suam, nisi ob fornicatiónem, et áliam
          dúxerit, mœchátur: et qui dimíssam duxerit, mœchátur. Dicunt ei discípuli ejus: Si ita est
          causa hóminis cum uxore, non expedit nubere. Qui dixit illis: Non omnes cápiunt verbum
          istud, sed quibus datum est. Sunt enim eunúchi, qui de matris útero sic nati sunt; et sunt
          eunúchi, qui facti sunt ab homínibus; et sunt eunúchi, qui seípsos castravérunt propter
          regnum cœlórum. Qui potest cápere, cápiat.
        </Typography>
        <Typography className="vernacular">
          Naquele tempo, aproximaram-se os fariseus de Jesus para O tentar e disseram-Lhe: «É lícito
          ao homem repudiar sua mulher por qualquer causa?». Respondendo Jesus, disse-lhes: «Não
          lestes: «Aquele que criou o homem no Princípio do mundo criou um homem e uma mulher, e
          disse que por causa disto o homem deixará seu pai e sua mãe, e se unirá com sua mulher; e
          serão dois em uma só carne?». Assim, não serão mais dois, mas uma só carne. Que o homem,
          pois, não separe o que Deus uniu». Eles disseram-Lhe: «Porque mandou, então, Moisés dar
          carta de repúdio e deixá-la?». Ele respondeu: «Foi por causa da dureza do vosso coração
          que Moisés permitiu que repudiásseis vossas mulheres; mas no princípio não foi assim. E Eu
          vos digo: todo aquele que deixar sua mulher, a não ser por adultério, e casar com outra,
          comete adultério; e aquele que casar com uma mulher repudiada, também comete adultério».
          Disseram-Lhe, então, os discípulos: «Se tal é a situação do homem diante da mulher, melhor
          é não se casar». E Ele disse-lhes: «Nem todos são capazes de compreender estas palavras,
          mas só aqueles a quem isso é dado; pois há eunucos que já assim vieram do seio de sua mãe;
          há outros que foram feitos pelos homens; e há ainda outros que se fizeram a si mesmo, por
          causa do reino dos céus. Quem pode compreender isto, compreenda».
        </Typography>
      </Language>

      <H3 text="Comúnio" />

      <Language>
        <Typography className="latin">
          Qui me dignátus est ab omni plaga curáre et mamíllam meam meo péctori restitúere, ipsum
          ínvoco Deum vivum.
        </Typography>
        <Typography className="vernacular">
          Invoco como Deus vivo Aquele que se dignou curar as minhas chagas e restituir o meu seio
          ao meu peito!
        </Typography>
      </Language>
    </PageWrapper>
  );
}
