import { H1, H3 } from "~/components/Headings";
import Language from "~/components/Language";
import PageWrapper from "~/components/Page";
import { Typography } from "~/components/typography";

export default function PagePent30() {
  return (
    <PageWrapper>
      <H1 text="Terceiro Domingo depois de Pentecostes" />

      <Typography className="comment">
        A liturgia de hoje canta a misericórdia divina para com os homens. Como Jesus, que tinha
        vindo chamar não os justos, mas os pecadores, o Espírito Santo, que continua a acção de
        Cristo nos corações, vem estabelecer o reino de Deus nas almas pecadoras.
        {"\n\n"}
        As lições do Breviário são hoje consagradas à história de Saul. Saul, mandado pelo pai à
        procura das jumentas perdidas, é a figura de Jesus, enviado por seu Pai à procura das almas
        que estavam perdidas. Deus revela-se aos humildes e esconde-se aos soberbos. A misericórdia
        divina acolhe os pecadores arrependidos, como o pastor que procura a ovelha perdida e se
        alegra ao encontrá-la.
      </Typography>

      <H3 text="Intróito" />

      <Typography className="em">Sl. 24, 16 & 18</Typography>

      <Language>
        <Typography className="latin">
          Réspice in me et miserére mei, Dómine: quóniam únicus et pauper sum ego: vide humilitátem
          meam et labórem meum: et dimítte ómnia peccáta mea, Deus meus.{" "}
          <Typography className="latin">Ps. ibid., 1-2</Typography> Ad te, Dómine, levávi ánimam
          meam: Deus meus, in te confído, non erubéscam.
          <Typography className="versicle"> ℣. </Typography>Gloria Patri...
        </Typography>
        <Typography className="vernacular">
          Volvei propício vossos olhos para mim e tende compaixão de mim, pois estou só e sou pobre.
          Vede a minha miséria e as minhas dores, ó meu Deus, e perdoai-me todos os pecados.{" "}
          <Typography className="vernacular">Sl. ibid., 1-2</Typography> A Vós, Senhor, elevei a
          minha alma. Ó meu Deus, confio em Vós: não permitireis que fique envergonhado.
          <Typography className="versicle"> ℣. </Typography>
          Glória ao Pai...
        </Typography>
      </Language>

      <H3 text="Oração" />

      <Language>
        <Typography className="latin">
          Protéctor in te sperántium, Deus, sine quo nihil est válidum, nihil sanctum: multíplica
          super nos misericórdiam tuam; ut, te rectóre, te duce, sic transeámus per bona temporália,
          ut non amittámus ætérna. Per Dóminum...
        </Typography>
        <Typography className="vernacular">
          Ó Deus, protector daqueles que esperam em Vós, e sem o qual nada existe, nem sólido nem
          santo, multiplicai a vossa misericórdia sobre nós, de maneira que, sendo sempre governados
          e guiados por Vós, transitemos de tal modo pelos bens terrenos que não deixemos de gozar
          os eternos. Por nosso Senhor...
        </Typography>
      </Language>

      <H3 text="Epístola" />

      <Typography className="em">1 Pe. 5, 6-11</Typography>

      <Language>
        <Typography className="latin">Léctio Epístolæ beáti Petri Apóstoli.</Typography>
        <Typography className="vernacular">Lição da Ep.ª do B. Ap.º Pedro.</Typography>
        <Typography className="latin">
          Caríssimi: Humiliámini sub coténti manu Dei, ut vos exáltet in témpore visitatiónis: omnem
          sollicitúdinem vestram projiciéntes in eum, quóniam ipsi cura est de vobis. Sóbrii estote
          et vigiláte: quia adversárius vester diábolus tamquam leo rúgiens circuit, quærens, quem
          dévoret: cui resístite fortes in fide: sciéntes eándem passiónem ei, quæ in mundo est,
          vestræ fraternitáti fíeri. Deus autem omnis grátiæ, qui vocávit nos in ætérnam suam
          glóriam in Christo Jesu, módicum passos ipse perfíciet, confirmábit solidabítque. Ipsi
          glória et impérium in sǽcula sæculórum. Amen.
        </Typography>
        <Typography className="vernacular">
          Caríssimos: Humilhai-vos sob a mão poderosa de Deus, para que Ele vos exalte no tempo da
          sua visita. Confiai a Deus todas as inquietações, porque tomará cuidado delas. Sede
          sóbrios e vigilantes, pois o vosso adversário, que é o demónio, andará em torno de vós,
          como um leão, procurando a quem devorar. Resisti-lhe, sendo sempre firmes na fé e sabendo
          que os vossos irmãos, que estão dispersos pelo mundo, sofrem as mesmas aflições. Deus de
          toda a graça (que nos chamou à sua glória por meio de Jesus Cristo) depois de haverdes
          padecido alguns sofrimentos vos aperfeiçoará, confirmará e fortificará. A Ele seja dada
          glória e soberania em todos os séculos dos séculos! Amen.
        </Typography>
      </Language>

      <H3 text="Gradual" />

      <Typography className="em">Sl. 54, 23, 17 & 19</Typography>

      <Language>
        <Typography className="latin">
          Jacta cogitátum tuum in Dómino: et ipse te enútriet.
          <Typography className="versicle"> ℣. </Typography>Dum clamárem ad Dóminum, exaudívit vocem
          meam ab his, qui appropínquant mihi.
        </Typography>
        <Typography className="vernacular">
          Confiai ao Senhor vossas inquietações: Ele vos sustentará.
          <Typography className="versicle"> ℣. </Typography>Logo que invoquei o Senhor, ouviu Ele a
          minha voz, livrando-me daqueles que me cercavam.
        </Typography>
        <Typography className="latin">
          Allelúja, allelúja.<Typography className="versicle"> ℣. </Typography>
          <Typography className="latin">Ps. 7, 12</Typography> Deus judex justus, fortis et pátiens,
          numquid iráscitur per síngulos dies? Allelúja.
        </Typography>
        <Typography className="vernacular">
          Aleluia, aleluia.<Typography className="versicle"> ℣. </Typography>
          <Typography className="vernacular">Sl. 7, 12</Typography> Deus é juiz justo, forte e
          paciente: sua ira manifesta-se, porventura, todos os dias? Aleluia.
        </Typography>
      </Language>

      <H3 text="Evangelho" />

      <Typography className="em">Lc. 15, 1-10</Typography>

      <Language>
        <Typography className="latin">
          <Typography className="cross"> ✠ </Typography> Sequéntia sancti Evangélii secúndum Lucam.
        </Typography>
        <Typography className="vernacular">
          <Typography className="cross"> ✠ </Typography> Continuação do santo Evangelho segundo S.
          Lucas.
        </Typography>
        <Typography className="latin">
          In illo témpore: Erant appropinquántes ad Jesum publicáni et peccatóres, ut audírent
          illum. Et murmurábant pharisǽi et scribæ, dicéntes: Quia hic peccatóres recipit et
          mandúcat cum illis. Et ait ad illos parábolam istam, dicens: Quis ex vobis homo, qui habet
          centum oves: et si perdíderit unam ex illis, nonne dimíttit nonagínta novem in desérto, et
          vadit ad illam, quæ períerat, donec invéniat eam? Et cum invénerit eam, impónit in húmeros
          suos gaudens: et véniens domum, cónvocat amícos et vicínos, dicens illis: Congratulámini
          mihi, quia invéni ovem meam, quæ períerat? Dico vobis, quod ita gáudium erit in cœlo super
          uno peccatóre pœniténtiam agénte, quam super nonagínta novem justis, qui non índigent
          pœniténtia. Aut quæ múlier habens drachmas decem, si perdíderit drachmam unam, nonne
          accéndit lucérnam, et evérrit domum, et quærit diligénter, donec invéniat? Et cum
          invénerit, cónvocat amícas et vicínas, dicens: Congratulámini mihi, quia invéni drachmam,
          quam perdíderam? Ita dico vobis: gáudium erit coram Angelis Dei super uno peccatóre
          pœniténtiam agénte.
        </Typography>
        <Typography className="vernacular">
          Naquele tempo, aproximaram-se de Jesus os publicanos e os pecadores para O ouvirem. E os
          fariseus e os escribas murmuravam, dizendo: «Este homem recebe os pecadores e come com
          eles». E Jesus propôs-lhes esta parábola e disse-lhes: «Qual é de vós o que, possuindo cem
          ovelhas, e, perdendo uma, não deixa as noventa e nove no deserto e não vai em procura da
          que se perdera até achá-la? E, achando-a, a não põe aos ombros com alegria, e, vindo para
          a sua casa, não reúne os amigos e vizinhos, dizendo-lhes: «congratulai-vos comigo, pois
          achei a minha ovelha, que se perdera»? Digo-vos que do mesmo modo haverá mais alegria no
          céu por um pecador que faça penitência do que por noventa e nove justos que não necessitem
          de fazer penitência. Ou, ainda, que mulher haverá que, possuindo dez dracmas, e, perdendo
          uma, não acende a candeia, varre a casa e procura a dracma com cuidado até achá-la? E,
          encontrando-a, não reúne as amigas e vizinhas, dizendo-lhes: «congratulai-vos comigo, pois
          encontrei a dracma que perdera?». Assim, vos digo: «Haverá muita alegria perante os Anjos
          de Deus por um só pecador que faça penitência».
        </Typography>
      </Language>

      <H3 text="Ofertório" />

      <Typography className="em">Sl. 9, 11-12 & 13</Typography>

      <Language>
        <Typography className="latin">
          Sperent in te omnes, qui novérunt nomen tuum, Dómine: quóniam non derelínquis quæréntes
          te: psállite Dómino, qui hábitat in Sion: quóniam non est oblítus oratiónem páuperum.
        </Typography>
        <Typography className="vernacular">
          Confiem em Vós, Senhor, aqueles que conhecem o vosso nome; porque nunca abandonais os que
          a Vós recorrem. Cantai hinos ao Senhor, que habita em Sião. Ele se não esqueceu da oração
          dos pobres.
        </Typography>
      </Language>

      <H3 text="Secreta" />

      <Language>
        <Typography className="latin">
          Réspice, Dómine, múnera supplicántis Ecclésiæ: et salúti credéntium perpétua
          sanctificatióne suménda concéde. Per Dóminum...
        </Typography>
        <Typography className="vernacular">
          Olhai benignamente, Senhor, para estas ofertas da Igreja suplicante, e concedei aos fiéis
          a graça de as receberem sempre santamente, e com fruto para a sua santificação. Por nosso
          Senhor...
        </Typography>
      </Language>

      <H3 text="Comúnio" />

      <Typography className="em">Lc. 15, 10</Typography>

      <Language>
        <Typography className="latin">
          Dico vobis: gáudium est Angelis Dei super uno peccatóre pœniténtiam agénte.
        </Typography>
        <Typography className="vernacular">
          Vos digo: há muita alegria perante os Anjos de Deus por um só pecador que faça penitência.
        </Typography>
      </Language>

      <H3 text="Postcomúnio" />

      <Language>
        <Typography className="latin">
          Sancta tua nos, Dómine, sumpta vivíficent: et misericórdiæ sempitérnæ prǽparent expiátos.
          Per Dóminum nostrum...
        </Typography>
        <Typography className="vernacular">
          Senhor, que a recepção dos vossos sacramentos nos vivifique, e que, servindo de expiação
          dos nossos pecados, nos torne dignos da misericórdia eterna. Por nosso Senhor...
        </Typography>
      </Language>
    </PageWrapper>
  );
}
