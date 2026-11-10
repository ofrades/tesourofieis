import { H1, H3 } from "~/components/Headings";
import Language from "~/components/Language";
import PageWrapper from "~/components/Page";
import { Typography } from "~/components/typography";

export default function PageQuad12() {
  return (
    <PageWrapper>
      <H1 text="Terça-feira da l.ª Semana da Quaresma" />

      <Typography className="comment">
        A Estação tem lugar na antiga igreja que, no século IV, era a única paróquia do centro e dos
        quarteirões ricos de Roma. Construída ao pé do Palatino, é consagrada a Santa Anastácia,
        piedosa viúva romana que foi morta sob Diocleciano em Sirmium (Níria). A tradição diz que
        este «título» mencionado num sínodo de 499 se refere à casa da Santa Mártir. Talvez se trate
        de simples identidade de nome entre a fundadora da basílica e a santa titular.
        {"\n\n"}A Quaresma é o momento em que «Deus está próximo de nós e pronto a perdoar-nos, se
        deixarmos os nossos pensamentos injustos e o caminho da impiedade» (Ep.). Para isso, é
        mister expulsarmos o pecado de nosso coração, como Jesus expulsou os vendedores do Templo
        (Ev.), e recebermos os ensinamentos de Cristo com a simplicidade dos filhos de Deus (2).
        Então ele poderá curar-nos as almas como curou os coxos e os cegos que dele se aproximavam.
        — Repelindo a orgulhosa sabedoria do mundo, aproveitemos o santo Tempo da Quaresma para que,
        «castigando-se com a mortificação, a nossa alma se encha de santos desejos» (Or.).
      </Typography>

      <H3 text="Intróito" />

      <Typography className="em">Sl. 89, 1 & 2</Typography>

      <Language>
        <Typography className="latin">
          Dómine, refúgium factus es nobis a generatióne et progénie: a sǽculo et in sǽculum tu es.{" "}
          <Typography className="latin">Ps. ibid., 2</Typography> Priúsquam montes fíerent, aut
          formarétur terra et orbis: a sǽculo et usque in sǽculum tu es Deus.
          <Typography className="versicle"> ℣. </Typography>
          Gloria Patri...
        </Typography>
        <Typography className="vernacular">
          Senhor, tendes sido o nosso refúgio de geração em geração. Vós existis desde toda a
          eternidade e existireis sempre!{" "}
          <Typography className="vernacular">Sl. ibid., 2</Typography> Antes que os montes fossem
          criados e que criásseis a terra e o mundo, Vós éreis já o nosso Deus, desde a eternidade
          até à eternidade.
          <Typography className="versicle"> ℣. </Typography>
          Glória ao Pai...
        </Typography>
      </Language>

      <H3 text="Oração" />

      <Language>
        <Typography className="latin">
          Réspice, Dómine, famíliam tuam: et præsta; ut apud te mens nostra tuo desidério fúlgeat,
          quæ se carnis maceratióne castígat. Per Dóminum nostrum...
        </Typography>
        <Typography className="vernacular">
          Olhai benigno para a vossa família, Senhor, e fazei que a nossa alma, que se castiga com a
          maceração da carne, suspire ardentemente em desejos de Vos possuir. Por nosso Senhor...
        </Typography>
      </Language>

      <H3 text="Epístola" />

      <Typography className="em">Is. 55, 6-11</Typography>

      <Language>
        <Typography className="latin">Léctio Isaíæ Prophétæ.</Typography>
        <Typography className="vernacular">Lição do Profeta Isaías.</Typography>
        <Typography className="latin">
          In diébus illis: Locútus est Isaías Prophéta, dicens: Quǽrite Dóminum, dum inveníri
          potest: invocáte eum, dum prope est. Derelínquat ímpius viam suam, et vir iníquus
          cogitatiónes suas, et revertátur ad Dóminum: et miserébitur ejus, et ad Deum nostrum:
          quóniam multus est ad ignoscéndum. Non enim cogitationes meæ cogitatiónes vestræ: neque
          viæ vestræ viæ meæ, dicit Dóminus. Quia sicut exaltántur cœli a terra, sic exaltátæ sunt
          viæ meæ a viis vestris, et cogitatiónes meæ a cogitatiónibus vestris. Et quómodo descéndit
          imber et nix de cœlo, et illuc ultra non revértitur, sed inébriat terram, et infúndit eam,
          et germináre eam facit, et dat semen serénti, et panem comedénti: sic erit verbum meum,
          quod egrediétur de ore meo: non revertétur ad me vácuum, sed fáciet quæcúmque volui, et
          prosperábitur in his, ad quæ misi illud: ait Dóminus omnípotens.
        </Typography>
        <Typography className="vernacular">
          Naqueles dias, o Profeta Isaías falou assim: «Procurai o Senhor, enquanto pode ser
          encontrado; invocai-O, enquanto está perto. Que o ímpio abandone o seu caminho e o homem
          iníquo os seus pensamentos. Que se convertam ao Senhor, nosso Deus, o qual se apiedará
          deles e lhes perdoará generosamente. Na Verdade, os meus pensamentos não são os vossos;
          Meus caminhos não são os vossos, diz o Senhor. Porquanto, assim como os céus são elevados
          acima da terra, assim os meus caminhos são elevados acima dos vossos e os meus pensamentos
          acima dos vossos. Assim como a chuva e a neve caem do céu, e lá não voltam mais sem regar
          a terra e fazê-la produzir, dando a semente ao lavrador e o pão ao que come, assim também
          será a palavra, que sai da minha boca: não tornará a mim sem produzir efeito, e fará tudo
          o que eu quiser, tornando prósperas as coisas para que a destinei: diz o Senhor
          omnipotente».
        </Typography>
      </Language>

      <H3 text="Gradual" />

      <Typography className="em">Sl. 140, 2</Typography>

      <Language>
        <Typography className="latin">
          Dirigátur orátio mea sicut incénsum in conspéctu tuo, Dómine,
          <Typography className="versicle"> ℣. </Typography>
          Elevátio mánuum meárum sacrifícium vespertínum.
        </Typography>
        <Typography className="vernacular">
          Eleve-se a minha oração, Senhor, até à vossa presença, como o incenso.
          <Typography className="versicle"> ℣. </Typography>Que a elevação das minhas mãos Vos seja
          agradável, como o sacrifício vespertino.
        </Typography>
      </Language>

      <H3 text="Evangelho" />

      <Typography className="em">Mt. 21, 10-17</Typography>

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
          In illo témpore: Cum intrásset Jesus Jerosólymam, commóta est univérsa cívitas, dicens:
          Quis est hic? Pópuli autem dicébant: Hic est Jesus Prophéta a Názareth Galilǽæ. Et
          intrávit Jesus in templum Dei, et ejiciébat omnes vendéntes, et eméntes in templo; et
          mensas nummulariórum et cáthedras vendéntium colúmbas evértit: et dicit eis: Scriptum est:
          Domus mea domus oratiónis vocábitur: vos autem fecístis illam spelúncam latrónum. Et
          accessérunt ad eum cæci et claudi in templo: et sanávit eos. Vidéntes autem príncipes
          sacerdótum et scribæ mirabília, quæ fecit, et púeros clamantes in templo, et dicéntes:
          Hosánna fílio David: indignáti sunt, et dixérunt ei: Audis, quid isti dicunt? Jesus autem
          dixit eis: Utique. Numquam legístis: Quia ex ore infántium et lacténtium perfecísti
          laudem? Et relíctis illis, ábiit foras extra civitátem in Bethániam: ibíque mansit.
        </Typography>
        <Typography className="vernacular">
          Naquele tempo, entrando Jesus em Jerusalém, toda a cidade se alvoroçou, dizendo: «Quem é
          este?». E o povo respondia: «É Jesus, o profeta de Nazaré, de Galileia». E Jesus entrou no
          templo de Deus, expulsando todos os que lá vendiam e compravam e deitando por terra as
          mesas dos que negociavam e as cadeiras dos que vendiam os pombos, dizendo: «Minha casa é
          chamada casa de oração; e vós tornaste-la em um covil de ladrões!...». Então vieram ao
          templo ter com Ele cegos e coxos, curando-os. Porém, os príncipes dos sacerdotes e os
          escribas, ouvindo narrar os milagres que Ele fazia e os meninos a cantar louvores,
          dizendo: «Hosana ao Filho de David», indignaram-se e disseram-Lhe: «Ouvis o que dizem?».
          Jesus respondeu-lhes: «Sim; pois não lestes: «Da boca dos meninos e das crianças de peito
          sairão louvores perfeitos?» E, tendo-os deixado, saiu da cidade e foi para Betânia, onde
          permaneceu.
        </Typography>
      </Language>

      <H3 text="Ofertório" />

      <Typography className="em">Sl. 30, 15-16</Typography>

      <Language>
        <Typography className="latin">
          In te sperávi, Dómine; dixi: Tu es Deus meus, in mánibus tuis témpora mea.
        </Typography>
        <Typography className="vernacular">
          Em Vós, Senhor, pus a minha confiança. Eu disse: Vós sois o meu Deus; nas vossas mãos
          ponho o meu futuro.
        </Typography>
      </Language>

      <H3 text="Secreta" />

      <Language>
        <Typography className="latin">
          Oblátis, quǽsumus, Dómine, placáre munéribus: et a cunctis nos defénde perículis. Per
          Dóminum...
        </Typography>
        <Typography className="vernacular">
          Senhor, Vos suplicamos, deixai-Vos aplacar com estas ofertas e livrai-nos de todos os
          perigos. Por nosso Senhor...
        </Typography>
      </Language>

      <H3 text="Comúnio" />

      <Typography className="em">Sl. 4, 2</Typography>

      <Language>
        <Typography className="latin">
          Cum invocárem te, exaudísti me, Deus justítiæ meæ: in tribulatióne dilatásti me: miserére
          mihi, Dómine, et exáudi oratiónem meam.
        </Typography>
        <Typography className="vernacular">
          Quando Vos invoquei, ó Deus da minha justiça, atendestes-me: e consolastes-me na angústia.
          Tende piedade de mim, Senhor, e ouvi a minha oração.
        </Typography>
      </Language>

      <H3 text="Postcomúnio" />

      <Language>
        <Typography className="latin">
          Quǽsumus, omnípotens Deus: ut illíus salutáris capiámus efféctum, cujus per hæc mystéria
          pignus accépimus. Per Dóminum...
        </Typography>
        <Typography className="vernacular">
          Deus omnipotente, Vos suplicamos, concedei-nos a salvação, de que já alcançámos o penhor
          nestes mystérios. Por nosso Senhor...
        </Typography>
      </Language>

      <H3 text="Oração sobre o povo" />

      <Language>
        <Typography className="latin">
          <Typography className="latin">Orémus.</Typography>
        </Typography>
        <Typography className="vernacular">
          <Typography className="vernacular">Oremos.</Typography>
        </Typography>
        <Typography className="latin">Humiliáte cápita vestra Deo.</Typography>
        <Typography className="vernacular">Inclinai as vossas cabeças diante de Deus.</Typography>
        <Typography className="latin">
          Acéndant ad te, Dómine, preces nostræ: et ab Ecclésia tua cunctam repélle nequítiam. Per
          Dóminum nostrum...
        </Typography>
        <Typography className="vernacular">
          Que as nossas orações, Senhor, subam até Vós e que toda a espécie do mal seja afastada da
          vossa Igreja. Por nosso Senhor...
        </Typography>
      </Language>
    </PageWrapper>
  );
}
