import { H1, H3 } from "~/components/Headings";
import Language from "~/components/Language";
import PageWrapper from "~/components/Page";
import { Typography } from "~/components/typography";

export default function PagePent10() {
  return (
    <PageWrapper>
      <H1 text="Domingo da Santíssima Trindade" />

      <Typography className="comment">
        A Igreja celebra hoje o mistério fundamental da fé cristã: um só Deus em três Pessoas, Pai,
        Filho e Espírito Santo. Toda a liturgia deste Domingo é um hino de louvor à Santíssima
        Trindade, que nos criou, remiu e santificou. Adoremos o mistério que nos foi revelado por
        Jesus Cristo e peçamos a graça de viver na sua unidade, guardando os seus mandamentos.
      </Typography>

      <H3 text="Intróito" />

      <Typography className="em">Tb. 12, 6</Typography>

      <Language>
        <Typography className="latin">
          Benedícta sit sancta Trínitas atque indivísa Unitas: confitébimur ei, quia fecit nobíscum
          misericórdiam suam. <Typography className="latin">Ps. 8, 2</Typography> Dómine, Dóminus
          noster, quam admirábile est nomen tuum in univérsa terra!
          <Typography className="versicle"> ℣. </Typography>
          Gloria Patri...
        </Typography>
        <Typography className="vernacular">
          Bendita seja a Santíssima Trindade e a indivisível Unidade! Nós A louvamos; pois foi
          misericordiosa para connosco. <Typography className="vernacular">
            Sl. 8, 2
          </Typography>{" "}
          Senhor, nosso Deus, como o vosso nome é admirável em todo o universo!
          <Typography className="versicle"> ℣. </Typography>
          Glória ao Pai...
        </Typography>
      </Language>

      <H3 text="Oração" />

      <Language>
        <Typography className="latin">
          Omnípotens sempitérne Deus, qui dedísti fámulis tuis in confessióne veræ fídei, ætérnæ
          Trinitátis glóriam agnóscere, et in poténtia majestátis adoráre Unitátem: quǽsumus; ut,
          ejúsdem fídei firmitáte, ab ómnibus semper muniámur advérsis. Per Dóminum nostrum...
        </Typography>
        <Typography className="vernacular">
          Ó omnipotente e eterno Deus, que quisestes que os vossos fiéis, acreditando e confessando
          a verdadeira fé, conhecessem a glória da sempiterna Trindade e adorassem a Unidade no
          poder da sua majestade, permiti, Vos imploramos, que, guardando nós firmemente a mesma fé,
          vençamos sempre todas as adversidades. Por nosso Senhor...
        </Typography>
      </Language>

      <H3 text="Epístola" />

      <Typography className="em">Rm. 11, 33-36</Typography>

      <Language>
        <Typography className="latin">Léctio Epístolæ beáti Pauli Apóstoli ad Romános.</Typography>
        <Typography className="vernacular">Lição da Ep.ª do B. Ap.º Paulo aos Romanos.</Typography>
        <Typography className="latin">
          O altitúdo divitiárum sapiéntiae et sciéntiæ Dei: quam incomprehensibília sunt judícia
          ejus, et investigábiles viæ ejus! Quis enim cognovit sensum Dómini? Aut quis consiliárius
          ejus fuit? Aut quis prior dedit illi, et retribuétur ei? Quóniam ex ipso et per ipsum et
          in ipso sunt ómnia: ipsi glória in sǽcula. Amen.
        </Typography>
        <Typography className="vernacular">
          Ó abysmo das riquezas, da sabedoria e da ciência de Deus! Como são incompreensíveis os
          seus juízos e impenetráveis os seus caminhos! Pois quem, porventura, conheceu já os
          desígnios do Senhor? Quem foi seu conselheiro? Quem foi o primeiro a dar-Lhe alguma coisa,
          para depois receber recompensa? Pois tudo quanto existe é d’Ele, para Ele e n’Ele. A Ele,
          pois, seja dada glória em todos os séculos. Amen.
        </Typography>
      </Language>

      <H3 text="Gradual" />

      <Typography className="em">Dn. 3, 55-56</Typography>

      <Language>
        <Typography className="latin">
          Benedíctus es, Dómine, qui intuéris abýssos, et sedes super Chérubim.
          <Typography className="versicle"> ℣. </Typography>Benedíctus es, Dómine, in firmaménto
          cæli, et laudábilis in sǽcula.
        </Typography>
        <Typography className="vernacular">
          Bendito sois, Senhor, que sondais as profundezas dos abysmos e estais assentado sobre os
          Querubins!
          <Typography className="versicle"> ℣. </Typography>Sim, Senhor, sois bendito no firmamento
          do céu; e digno de louvor em todos os séculos.
        </Typography>
        <Typography className="latin">
          Allelúja, allelúja.<Typography className="versicle"> ℣. </Typography>
          <Typography className="latin">ibid., 52</Typography> Benedíctus es, Dómine, Deus patrum
          nostrórum, et laudábilis in sǽcula. Allelúja.
        </Typography>
        <Typography className="vernacular">
          Aleluia, aleluia.<Typography className="versicle"> ℣. </Typography>
          <Typography className="vernacular">ibid., 52</Typography> Bendito sois, Senhor, Deus de
          nossos pais, e digno de louvor em todos os séculos. Aleluia.
        </Typography>
      </Language>

      <H3 text="Evangelho" />

      <Typography className="em">Mt. 28, 18-20</Typography>

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
          In illo témpore: Dixit Jesus discípulis suis: Data est mihi omnis potéstas in cœlo et in
          terra. Eúntes ergo docéte omnes gentes, baptizántes eos in nómine Patris, et Fílii, et
          Spíritus Sancti: docéntes eos serváre ómnia, quæcúmque mandávi vobis. Et ecce, ego
          vobíscum sum ómnibus diébus usque ad consummatiónem sǽculi.
        </Typography>
        <Typography className="vernacular">
          Naquele tempo, disse Jesus aos discípulos: «Todo o poder me foi dado no céu e na terra.
          Ide, pois; ensinai todos os povos, baptizando-os em nome do Pai, e do Filho, e do Espírito
          Santo. Ensinai-os a observar tudo o que vos mandei. E sabei que estou convosco todos os
          dias até à consumação dos séculos».
        </Typography>
      </Language>

      <H3 text="Ofertório" />

      <Typography className="em">Tb. 12, 6</Typography>

      <Language>
        <Typography className="latin">
          Benedíctus sit Deus Pater, unigenitúsque Dei Fílius, Sanctus quoque Spíritus: quia fecit
          nobíscum misericórdiam suam.
        </Typography>
        <Typography className="vernacular">
          Bendito seja Deus Pai, e o Filho Unigénito de Deus, e também o Espírito Santo: pois foi
          misericordioso para connosco.
        </Typography>
      </Language>

      <H3 text="Secreta" />

      <Language>
        <Typography className="latin">
          Sanctífica, quǽsumus, Dómine, Deus noster, per tui sancti nóminis invocatiónem, hujus
          oblatiónis hóstiam: et per eam nosmetípsos tibi pérfice munus ætérnum. Per Dóminum
          nostrum...
        </Typography>
        <Typography className="vernacular">
          Dignai-Vos, Senhor, nosso Deus, Vos suplicamos, pela invocação do vosso santo nome,
          santificar esta hóstia, que Vos oferecemos; e que por ela nos convertamos em dom perpétuo
          de homenagem à vossa majestade. Por nosso Senhor...
        </Typography>
      </Language>

      <H3 text="Comúnio" />

      <Typography className="em">Tb. 12, 6</Typography>

      <Language>
        <Typography className="latin">
          Benedícimus Deum cœli et coram ómnibus vivéntibus confitébimur ei: quia fecit nobíscum
          misericórdiam suam.
        </Typography>
        <Typography className="vernacular">
          Bendizemos Deus do céu e cantamos os seus louvores diante de todos os viventes: pois foi
          misericordioso para connosco.
        </Typography>
      </Language>

      <H3 text="Postcomúnio" />

      <Language>
        <Typography className="latin">
          Profíciat nobis ad salútem córporis et ánimæ, Dómine, Deus noster, hujus sacraménti
          suscéptio: et sempitérnæ sanctæ Trinitátis ejusdémque indivíduæ Unitátis conféssio. Per
          Dóminum...
        </Typography>
        <Typography className="vernacular">
          Que a recepção deste sacramento, assim como a crença, que confessamos, na santa e eterna
          Trindade e indivisível Unidade, nos sirvam, Senhor, de proveito para a salvação da alma e
          do corpo. Por nosso Senhor...
        </Typography>
      </Language>
    </PageWrapper>
  );
}
