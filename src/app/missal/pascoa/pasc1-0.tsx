import { H1, H3 } from "~/components/Headings";
import Language from "~/components/Language";
import PageWrapper from "~/components/Page";
import { Typography } from "~/components/typography";

export default function PagePasc10() {
  return (
    <PageWrapper>
      <H1 text="Domingo In Albis" />

      <Typography className="comment">
        Este Domingo é chamado Quasimodo — das primeiras palavras do Introito — ou in Albis, porque
        os neófitos acabam de depor suas vestes brancas, ou terminação da Páscoa, porque hoje acaba
        a Oitava da Páscoa (Or.).
        {"\n\n"}
        Para ensinar aos que acabam de nascer pelo baptismo à vida de Deus (Intr.) com que
        generosidade devem prestar testemunho a Jesus, a Igreja os conduz à basílica de S. Pancrácio
        mártir, que na idade de 12 anos deu ao Cristo testemunho do sangue (1). Assim devem agir os
        baptizados ante a perseguição tenaz de que são continuamente vítimas. Devem resistir,
        apoiando-se na fé em Jesus, o Filho de Deus, ressuscitado. É essa fé, diz S. João, que nos
        faz vencer o mundo, pois ela nos leva a rejeitar todas as suas tentações de nos fazer cair
        (Ep.). Essa fé, portanto, deve ter uma base sólida. A Igreja no-la dá na Missa de hoje.
      </Typography>

      <H3 text="Intróito" />

      <Typography className="em">1 Pe. 2, 2</Typography>

      <Language>
        <Typography className="latin">
          Quasi modo géniti infántes, allelúja: rationabiles, sine dolo lac concupíscite, allelúja,
          allelúja allelúja. <Typography className="latin">Ps. 80, 2</Typography> Exsultáte Deo,
          adjutóri nostro: jubiláte Deo Jacob.
          <Typography className="versicle"> ℣. </Typography>
          Gloria Patri...
        </Typography>
        <Typography className="vernacular">
          Como meninos recém-nascidos, aleluia, e raciocinando convenientemente, desejai com ardor
          beber o leite puro, aleluia, aleluia, aleluia.{" "}
          <Typography className="vernacular">Sl. 80, 2</Typography> Aclamai a Deus, que é o nosso
          Sustentáculo: cantai hinos de júbilo em honra de Deus de Jacob.
          <Typography className="versicle"> ℣. </Typography>
          Glória ao Pai...
        </Typography>
      </Language>

      <H3 text="Oração" />

      <Language>
        <Typography className="latin">
          Præsta, quǽsumus, omnípotens Deus: ut, qui paschália festa perégimus, hæc, te largiénte,
          móribus et vita teneámus. Per Dóminum...
        </Typography>
        <Typography className="vernacular">
          Ó Deus omnipotente, Vos suplicamos, agora, que celebrámos as festas pascais, concedei-nos
          a graça de conservarmos sempre o seu espírito, tanto nos nossos costumes, como na nossa
          vida. Por nosso Senhor...
        </Typography>
      </Language>

      <H3 text="Epístola" />

      <Typography className="em">1 Jo. 5, 4-10</Typography>

      <Language>
        <Typography className="latin">Léctio Epístolæ beáti Joannis Apóstoli.</Typography>
        <Typography className="vernacular">Lição da Ep.ª do B. Ap.º S. João.</Typography>
        <Typography className="latin">
          Caríssimi: Omne, quod natum est ex Deo, vincit mundum: et hæc est victoria, quæ vincit
          mundum, fides nostra. Quis est, qui vincit mundum, nisi qui credit, quóniam Jesus est
          Fílius Dei? Hic est, qui venit per aquam et sánguinem, Jesus Christus: non in aqua solum,
          sed in aqua et sánguine. Et Spíritus est, qui testificátur, quóniam Christus est véritas.
          Quóniam tres sunt, qui testimónium dant in cœlo: Pater, Verbum, et Spíritus Sanctus: et hi
          tres unum sunt. Et tres sunt, qui testimónium dant in terra: Spíritus, et aqua, et
          sanguis: et hi tres unum sunt. Si testimónium hóminum accípimus, testimónium Dei majus
          est: quóniam hoc est testimónium Dei, quod majus est: quóniam testificátus est de Fílio
          suo. Qui credit in Fílium Dei, habet testimónium Dei in se.
        </Typography>
        <Typography className="vernacular">
          Caríssimos: Todo aquele que nasceu de Deus é vencedor do mundo. O que alcança vitória
          contra o mundo é a nossa fé. Quem é que vence o mundo, senão o que crê que Jesus Cristo é
          o Filho de Deus? Este mesmo Jesus Cristo é que veio com a água e o sangue: não somente com
          a água, mas com a água e o sangue. E é o Espírito quem atesta que Jesus Cristo é a
          verdade. Porquanto são três os que dão testemunho do céu: o Pai, o Verbo, e o Espírito
          Santo: e estes três são um só. E três são os que dão testemunho na terra: o espírito, a
          água e o sangue: e estes três são um só. Se aceitamos o testemunho dos homens, muito maior
          é o testemunho de Deus. Este testemunho de Deus, que é maior, foi por Ele dado a respeito
          do seu Filho. Aquele que crê no Filho de Deus tem este testemunho de Deus em si mesmo.
        </Typography>
      </Language>

      <Language>
        <Typography className="latin">
          Allelúja, allelúja.<Typography className="versicle"> ℣. </Typography>
          <Typography className="latin">Matth. 28, 7</Typography> In die resurrectiónis meæ, dicit
          Dóminus, præcédam vos in Galilǽam. Allelúja.
          <Typography className="versicle"> ℣. </Typography>
          <Typography className="em">Joann. 20, 26</Typography> Post dies octo, jánuis clausis,
          stetit Jesus in médio discipulórum suórum, et dixit: Pax vobis. Allelúja.
        </Typography>
        <Typography className="vernacular">
          Aleluia, aleluia.<Typography className="versicle"> ℣. </Typography>
          <Typography className="vernacular">Mt. 28, 7</Typography> No dia da minha ressurreição,
          diz o Senhor, irei adiante de vós para a Galileia, aleluia.
          <Typography className="versicle"> ℣. </Typography>
          <Typography className="em">Jo. 20, 26</Typography> Oito dias depois, estando as portas
          fechadas, Jesus veio e, estando no meio dos seus discípulos, disse: «A paz seja convosco»,
          aleluia.
        </Typography>
      </Language>

      <H3 text="Evangelho" />

      <Typography className="em">Jo. 20, 19-31</Typography>

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
          In illo témpore: Cum sero esset die illo, una sabbatórum, et fores essent clausæ, ubi
          erant discípuli congregáti propter metum Judæórum: venit Jesus, et stetit in médio, et
          dixit eis: Pax vobis. Et cum hoc dixísset, osténdit eis manus et latus. Gavísi sunt ergo
          discípuli, viso Dómino. Dixit ergo eis íterum: Pax vobis. Sicut misit me Pater, et ego
          mitto vos. Hæc cum dixísset, insufflávit, et dixit eis: Accípite Spíritum Sanctum: quorum
          remiseritis peccáta, remittúntur eis; et quorum retinuéritis, reténta sunt. Thomas autem
          unus ex duódecim, qui dícitur Dídymus, non erat cum eis, quando venit Jesus. Dixérunt ergo
          ei alii discípuli: Vídimus Dóminum. Ille autem dixit eis: Nisi vídero in mánibus ejus
          fixúram clavórum, et mittam dígitum meum in locum clavórum, et mittam manum meam in latus
          ejus, non credam. Et post dies octo, íterum erant discípuli ejus intus, et Thomas cum eis.
          Venit Jesus, jánuis clausis, et stetit in médio, et dixit: Pax vobis. Deinde dicit Thomæ:
          Infer dígitum tuum huc et vide manus meas, et affer manum tuam et mitte in latus meum: et
          noli esse incrédulus, sed fidélis. Respóndit Thomas et dixit ei: Dóminus meus et Deus
          meus. Dixit ei Jesus: Quia vidísti me, Thoma, credidísti: beáti, qui non vidérunt, et
          credidérunt. Multa quidem et alia signa fecit Jesus in conspéctu discipulórum suórum, quæ
          non sunt scripta in libro hoc. Hæc autem scripta sunt, ut credátis, quia Jesus est
          Christus, Fílius Dei: et ut credéntes vitam habeátis in nómine ejus.
        </Typography>
        <Typography className="vernacular">
          Naquele tempo, chegada a tarde daquele dia, que era o primeiro da semana, encontrando-se
          os discípulos reunidos em um lugar, cujas portas estavam fechadas, por causa do medo que
          tinham dos judeus, veio Jesus, e, estando no meio deles, disse: «A paz seja convosco!».
          Depois de dizer isto, mostrou as suas mãos e o seu lado. E alegraram-se os discípulos,
          vendo o Senhor. E disse-lhes novamente: «A paz seja convosco! Assim como meu Pai me
          enviou, assim também vos envio». Ditas estas palavras, soprou sobre eles, dizendo:
          «Recebei o Espírito Santo. Àqueles a quem perdoardes os pecados, ser-lhes-ão perdoados, e
          àqueles a quem os retiverdes, ser-lhes-ão retidos». Porém Tomé, um dos Doze, que era
          chamado Dídimo, não estava com eles. Disseram-lhe, então, os outros discípulos: «Vimos o
          Senhor!». Ele respondeu-lhes: «Se não vir nas suas mãos o sinal dos cravos, se não meter o
          meu dedo no lugar dos cravos e não meter a minha mão no seu lado, não acreditarei».
          Passados oito dias, encontravam-se os discípulos outra vez, no mesmo lugar, estando Tomé
          com eles. E veio Jesus, estando as portas fechadas; e, pondo-se no meio deles, disse: «A
          paz seja convosco». Em seguida disse a Tomé: «Mete aqui o teu dedo e vê as minhas mãos;
          aproxima, também, a tua mão e mete-a no meu lado; e não sejas incrédulo, mas fiel».
          Respondeu Tomé: «Meu Senhor e meu Deus!». Disse-lhe Jesus: «Porque me viste, ó Tomé,
          acreditaste: bem-aventurados aqueles que não viram e acreditaram». Jesus fez ainda na
          presença de seus discípulos muitos outros milagres, que não foram escritos neste livro;
          mas estes foram, a fim de que acrediteis que Jesus Cristo é Filho de Deus; e, acreditando,
          alcanceis a vida eterna em seu nome.
        </Typography>
      </Language>

      <H3 text="Ofertório" />

      <Typography className="em">Mt. 28, 2, 5 & 6</Typography>

      <Language>
        <Typography className="latin">
          Angelus Dómini descéndit de cœlo, et dixit muliéribus: Quem quǽritis, surréxit, sicut
          dixit, allelúja.
        </Typography>
        <Typography className="vernacular">
          Um anjo do Senhor desceu do céu e disse às mulheres: «Aquele a quem procurais ressuscitou,
          como havia anunciado», aleluia.
        </Typography>
      </Language>

      <H3 text="Secreta" />

      <Language>
        <Typography className="latin">
          Suscipe múnera, Dómine, quǽsumus, exsultántis Ecclésiæ: et, cui causam tanti gáudii
          præstitísti, perpétuæ fructum concéde lætítiæ. Per Dóminum...
        </Typography>
        <Typography className="vernacular">
          Aceitai, Senhor, Vos suplicamos, as ofertas que a vossa Igreja alegremente Vos consagra;
          e, assim como lhe proporcionastes a graça de tão grande gozo; concedei-lhe, também o fruto
          da eterna alegria. Por nosso Senhor...
        </Typography>
      </Language>

      <H3 text="Comúnio" />

      <Typography className="em">Jo. 20, 27</Typography>

      <Language>
        <Typography className="latin">
          Mitte manum tuam, et cognósce loca clavórum, allelúja: et noli esse incrédulus, sed
          fidélis, allelúja, allelúja.
        </Typography>
        <Typography className="vernacular">
          Mete aqui o teu dedo e toca no lugar dos cravos, aleluia; não sejas incrédulo, mas fiel,
          aleluia, aleluia.
        </Typography>
      </Language>

      <H3 text="Postcomúnio" />

      <Language>
        <Typography className="latin">
          Quǽsumus, Dómine, Deus noster: ut sacrosáncta mystéria, quæ pro reparatiónis nostræ
          munímine contulísti; et præsens nobis remédium esse fácias et futúrum. Per Dóminum...
        </Typography>
        <Typography className="vernacular">
          Vos suplicamos, Senhor, nosso Deus, permiti que estes sacrossantos mystérios, que
          instituístes para alcançarmos a regeneração, sejam nosso remédio salutar no presente e no
          futuro. Por nosso Senhor...
        </Typography>
      </Language>
    </PageWrapper>
  );
}
