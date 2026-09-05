import { H1, H3 } from "~/components/Headings";
import Language from "~/components/Language";
import LinkCard from "~/components/LinkCard";
import PageWrapper from "~/components/Page";
import { Typography } from "~/components/typography";
import { isFirstFriday } from "~/lib/utils";
import { useCalendar } from "~/providers/calendar";

export default function PagePent25() {
  const { date } = useCalendar();

  return (
    <PageWrapper>
      <H1 text="Santíssimo Coração de Jesus" />

      {isFirstFriday(date) && (
        <LinkCard
          href="/devocionario/oracoes/consagracaosagradocoracaojesus"
          title="Primeira Sexta-feira — Reparação ao Sagrado Coração"
          description="Consagração · Comunhão reparadora"
        />
      )}

      <H3 text="Intróito" />

      <Typography className="em">Sl. 32, 11 & 19</Typography>

      <Language>
        <Typography className="latin">
          Cogitatiónes Cordis ejus in generatióne et generatiónem: ut éruat a morte ánimas eórum et
          alat eos in fame. (T. P. Allelúja, allelúja.){" "}
          <Typography className="latin">Ps. ibid., 1</Typography> Exsultáte, justi, in Dómino:
          rectos decet collaudátio.
          <Typography className="versicle"> ℣. </Typography>Gloria Patri...
        </Typography>
        <Typography className="vernacular">
          Os pensamentos do seu Coração subsistem de geração em geração, para preservar suas almas
          da morte e alimentá-las quando tiverem fome.{" "}
          <Typography className="vernacular">Sl. ibid., 1</Typography> Exultai no Senhor, ó justos:
          Cantem seus louvores aqueles que possuem o coração recto.
          <Typography className="versicle"> ℣. </Typography>Glória ao Pai...
        </Typography>
      </Language>

      <H3 text="Oração" />

      <Language>
        <Typography className="latin">
          Deus, qui nobis in Corde Fílii tui, nostris vulneráto peccátis, infinítos dilectiónis
          thesáuros misericórditer largíri dignáris: concéde, quǽsumus; ut, illi devótum pietátis
          nostræ præstántes obséquium, dignæ quoque satisfactiónis exhibeámus offícium. Per eúndem
          Dóminum nostrum...
        </Typography>
        <Typography className="vernacular">
          Ó Deus, que no Coração do vosso Filho, ferido pelos nossos pecados, Vos dignastes
          prodigalizar-nos os tesouros infinitos do seu amor, concedei-nos, Vos suplicamos, que,
          rendendo-Lhe a homenagem da nossa filial devoção, Lhe apresentamos também os dons da nossa
          reparação. Pelo mesmo nosso Senhor...
        </Typography>
      </Language>

      <H3 text="Epístola" />

      <Typography className="em">Ef. 3, 8 19</Typography>

      <Language>
        <Typography className="latin">Léctio Epístolæ beáti Pauli Apóstoli ad Ephésios.</Typography>
        <Typography className="vernacular">Lição da Ep.ª do B. Ap. Paulo aos Efésios.</Typography>
        <Typography className="latin">
          Fratres: Mihi, ómnium sanctórum mínimo, data est grátia hæc, in géntibus evangelizáre
          investigábiles divítias Christi, et illumináre omnes, quæ sit dispensátio sacraménti
          abscónditi a sǽculis in Deo, qui ómnia creávit: ut innotéscat principátibus et
          potestátibus in cœléstibus per Ecclésiam multifórmis sapiéntia Dei, secúndum præfinitiónem
          sæculórum, quam fecit in Christo Jesu, Dómino nostro, in quo habémus fidúciam et accéssum
          in confidéntia per fidem ejus. Hujus rei grátia flecto génua mea ad Patrem Dómini nostri
          Jesu Christi, ex quo omnis patérnitas in cœlis ei in terra nominátur, ut det vobis,
          secúndum divítias glóriæ suæ, virtúte corroborári per Spíritum ejus in interiórem hóminem,
          Christum habitáre per fidem in córdibus vestris: in caritáte radicáti et fundáti, ut
          póssitis comprehéndere cum ómnibus sanctis, quæ sit latitúdo, et longitúdo, et sublímitas,
          et profúndum: scire étiam supereminéntem sciéntiæ caritátem Christi, ut impleámini in
          omnem plenitúdinem Dei.
        </Typography>
        <Typography className="vernacular">
          Meus irmãos: Fui eu, que sou o mínimo de todos os santos, quem recebeu esta graça de
          anunciar aos povos as riquezas incompreensíveis de Jesus Cristo e de esclarecer todos os
          homens, revelando-lhes a economia do mystério, que desde tantos séculos está oculto em
          Deus, criador de todas as coisas, a fim de que, por meio da Igreja, os potentados e as
          potestades nos céus conheçam a sabedoria infinitamente variada de Deus, segundo o desígnio
          eterno que Ele realizou por Jesus Cristo, nosso Senhor, em quem, pela fé que n’Ele
          depositamos, temos a franca segurança de nos aproximarmos de Deus com confiança. Por este
          motivo ajoelho diante do Pai de nosso Senhor Jesus Cristo, que é o princípio desta grande
          família no céu e na terra, para que, segundo as riquezas da sua glória, sejais
          fortificados pelo seu Espírito e revestidos com a graça de homens interiores. Permita Ele
          que Jesus Cristo habite pela fé nos vossos corações, de modo que, enraizados e imbuídos na
          caridade, possais compreender com todos os santos a largura, o comprimento, a altura e a
          profundidade deste mystério e conhecer o amor de Jesus Cristo, o qual ultrapassa toda a
          ciência; e, assim, fiqueis repletos de plenitude dos dons de Deus.
        </Typography>
      </Language>

      <H3 text="Gradual" />

      <Typography className="em">Sl. 24, 8-9</Typography>

      <Language>
        <Typography className="latin">
          Dulcis et rectus Dóminus: propter hoc legem dabit delinquéntibus in via.
          <Typography className="versicle"> ℣. </Typography>Díriget mansúetos in judício, docébit
          mites vias suas.
        </Typography>
        <Typography className="vernacular">
          O Senhor é bom e recto: eis porque dá uma lei aos delinquentes.
          <Typography className="versicle"> ℣. </Typography>
          Ele guia os pacíficos pela justiça e manifesta os seus caminhos aos humildes.
        </Typography>
        <Typography className="latin">
          Allelúja, allelúja.<Typography className="versicle"> ℣. </Typography>
          <Typography className="latin">Matth. 11, 29</Typography> Tóllite jugum meum super vos, et
          díscite a me, quia mitis sum et húmilis Corde, et inveniétis réquiem animábus vestris.
          Allelúja.
        </Typography>
        <Typography className="vernacular">
          Aleluia, aleluia.<Typography className="versicle"> ℣. </Typography>
          <Typography className="vernacular">Mt. 11, 29</Typography> Tomai o meu jugo sobre vós e
          aprendei de mim, que sou manso e humilde de Coração, e achareis paz para as vossas almas.
          Aleluia.
        </Typography>
      </Language>

      <Typography className="aside">
        Após a Septuagésima omite-se o Aleluia e o seguinte e diz-se:
      </Typography>

      <H3 text="Trato" />

      <Typography className="em">Sl. 102, 8-10</Typography>

      <Language>
        <Typography className="latin">
          Miséricors et miserátor Dóminus, longánimis, et multum miséricors.
          <Typography className="versicle"> ℣. </Typography>Non in perpétuum irascétur, neque in
          ætérnum comminábitur.
          <Typography className="versicle"> ℣. </Typography>
          Non secúndum peccáta nostra fecit nobis, neque secúndum iniquitátes nostras retríbuit
          nobis.
        </Typography>
        <Typography className="vernacular">
          O Senhor é terno e compassivo, compadecente e misericordiosíssimo:
          <Typography className="versicle"> ℣. </Typography>Não se irará perpetuamente, nem ameaçará
          eternamente.
          <Typography className="versicle"> ℣. </Typography>Não nos tratará segundo os nossos
          pecados, nem nos castigará segundo as nossas iniquidades.
        </Typography>
      </Language>

      <Typography className="aside">
        No Tempo Pascal, em vez do Gradual e do Trato diz-se:
      </Typography>

      <Language>
        <Typography className="latin">
          Allelúja, allelúja.<Typography className="versicle"> ℣. </Typography>
          <Typography className="latin">Matth. 11, 29 et 28</Typography> Tóllite jugum meum super
          vos, et díscite a me, quia mitis sum et húmilis Corde: et inveniétis réquiem animábus
          vestris. Allelúja.
          <Typography className="versicle"> ℣. </Typography>Veníte ad me, omnes qui laborátis, et
          oneráti estis, et ego refíciam vos. Allelúja.
        </Typography>
        <Typography className="vernacular">
          Aleluia, aleluia.<Typography className="versicle"> ℣. </Typography>
          <Typography className="vernacular">Mt. 11, 29 et 28</Typography> Tomai o meu jugo sobre
          vós e aprendei de mim, que sou manso e humilde de Coração, e achareis paz para as vossas
          almas. Aleluia.
          <Typography className="versicle"> ℣. </Typography>Vinde a mim, vós todos, que sofreis e
          estais sobrecarregados, e vos aliviarei. Aleluia.
        </Typography>
      </Language>

      <H3 text="Evangelho" />

      <Typography className="em">Jo. 19 ,11-37</Typography>

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
          In illo témpore: Judǽi (quóniam Parascéve erat), ut non remanérent in cruce córpora
          sábbato (erat enim magnus dies ille sábbati), rogavérunt Pilátum, ut frangeréntur eórum
          crura, et tolleréntur. Venérunt ergo mílites: et primi quidem fregérunt crura et alteríus,
          qui crucifíxus est cum eo. Ad Jesum autem cum veníssent, ut vidérunt eum jam mórtuum, non
          fregérunt ejus crura, sed unus mílitum láncea latus ejus apéruit, et contínuo exívit
          sanguis et aqua. Et qui vidit, testimónium perhíbuit: et verum est testimónium ejus. Et
          ille scit quia vera dicit, ut et vos credátis. Facta sunt enim hæc ut Scriptúra
          implerétur: Os non comminuétis ex eo. Et íterum alia Scriptúra dicit: Vidébunt in quem
          transfixérunt.
        </Typography>
        <Typography className="vernacular">
          Naquele tempo, os judeus (porque era o dia da preparação da Páscoa), não desejando que os
          corpos ficassem na cruz para o sábado (pois o sábado era solene), pediram a Pilatos
          consentisse que partissem as pernas aos crucificados e os descessem da cruz. Os soldados
          vieram, pois, e quebraram as pernas do primeiro e do outro que haviam sido crucificados
          com Jesus. Tendo vindo a Jesus, como O vissem já morto, Lhe não quebraram as pernas, mas
          um dos soldados abriu-Lhe o lado com a lança, do qual saiu sangue e água imediatamente. E
          quem isto viu dá testemunho disso, e o seu testemunho é verdadeiro, pois sabe que diz a
          verdade, para que também vós acrediteis. Aconteceram estas coisas para se cumprir o que
          dizia a Escritura: «Não quebrareis nenhum dos meus ossos». E ainda a Escritura diz em
          outro lugar: «Contemplarão aquele que traspassaram».
        </Typography>
      </Language>

      <H3 text="Ofertório" />

      <Typography className="em">Sl. 68, 21</Typography>

      <Language>
        <Typography className="latin">
          Impropérium exspectávi Cor meum et misériam: et sustínui, qui simul mecum contristarétur,
          et non fuit: consolántem me quæsívi, et non invéni.
        </Typography>
        <Typography className="vernacular">
          Impropérios e misérias afrontaram o meu coração: E procurei quem compartilhasse a minha
          tristeza, mas não achei; Procurei alguém que me consolasse, mas não encontrei.
        </Typography>
      </Language>

      <Typography className="aside">No Tempo Pascal diz-se o seguinte:</Typography>

      <H3 text="Ofertório" />

      <Typography className="em">Sl. 39, 7-9</Typography>

      <Language>
        <Typography className="latin">
          Holocáustum et pro peccáto non postulásti; tunc dixi: Ecce, vénio. In cápite libri
          scriptum est de me ut fácerem voluntátem tuam: Deus meus, volui, et legem tuam in médio
          Cordis mei, allelúja.
        </Typography>
        <Typography className="vernacular">
          Não pedistes holocaustos nem sacrifícios pelo pecado; e logo dissestes: «Eis que eu venho.
          No princípio do livro está escrito a meu respeito que vim para fazer a vossa vontade. E
          Eu, ó meu Deus, assim o quis; a vossa lei está no íntimo do meu coração».
        </Typography>
      </Language>

      <H3 text="Secreta" />

      <Language>
        <Typography className="latin">
          Réspice, quǽsumus, Dómine, ad ineffábilem Cordis dilécti Fílii tui caritátem: ut quod
          offérimus sit tibi munus accéptum et nostrórum expiátio delictórum. Per eúndem Dóminum...
        </Typography>
        <Typography className="vernacular">
          Senhor, Vos suplicamos, atendei benigno à caridade inefável do Coração do vosso amado
          Filho, a fim de que a oferta, que Vos apresentamos, por Vós seja recebida, e nos sirva de
          expiação dos nossos pecados. Pelo mesmo Senhor...
        </Typography>
      </Language>

      <H3 text="Comúnio" />

      <Typography className="em">Jo. 19, 34</Typography>

      <Language>
        <Typography className="latin">
          Unus mílitum láncea latus ejus apéruit, et contínuo exívit sanguis et aqua.
        </Typography>
        <Typography className="vernacular">
          Um dos soldados abriu-Lhe o lado com uma lança, e logo saiu sangue e água.
        </Typography>
      </Language>

      <Typography className="aside">
        No Tempo Pascal diz-se o seguinte, em vez do Precedente:
      </Typography>

      <H3 text="Comúnio" />

      <Typography className="em">Jo. 7, 37</Typography>

      <Language>
        <Typography className="latin">
          Si quis sitit, véniat ad me et bibat, allelúja, allelúja.
        </Typography>
        <Typography className="vernacular">
          Se alguém tem sede, venha a mim e beba. Aleluia, aleluia.
        </Typography>
      </Language>

      <H3 text="Postcomúnio" />

      <Language>
        <Typography className="latin">
          Prǽbeant nobis, Dómine Jesu, divínum tua sancta fervórem: quo dulcíssimi Cordis tui
          suavitáte percépta; discámus terréna despícere, et amáre cœléstia: Qui vivis et regnas...
        </Typography>
        <Typography className="vernacular">
          Que os vossos sacrossantos mystérios nos comuniquem, ó Senhor Jesus, o divino fervor, a
          fim de que, sentindo as suavidades do vosso dulcíssimo Coração, aprendamos a desprezar as
          coisas terrenas e a amar as celestiais. Ó Vós, que, sendo Deus...
        </Typography>
      </Language>
    </PageWrapper>
  );
}
