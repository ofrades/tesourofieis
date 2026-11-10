import { H1, H3 } from "~/components/Headings";
import Language from "~/components/Language";
import LinkCard from "~/components/LinkCard";
import PageWrapper from "~/components/Page";
import { Typography } from "~/components/typography";

export default function PageQuad23() {
  return (
    <PageWrapper>
      <H1 text="Quarta-feira da 2.ª Semana da Quaresma" />

      <Typography className="comment">
        A Estação faz-se no santuário onde se acha o corpo da ilustre virgem romana Santa Cecília,
        que aí viveu e foi martirizada. — Desde o século V, esta igreja era mencionada como uma das
        paróquias ou títulos mais célebres de Roma. Está situada no Trastevere.
        {"\n\n"}
        Aí convinha, realmente, que fosse feita a leitura do Evangelho em que Jesus anuncia a uma
        mulher ser necessário beber o seu cálice para participar da sua glória. Lemos na Epístola a
        prece de Mardoqueu em favor do povo judaico, cuja perda resolvera o ímpio Amã. Suplica ao
        Senhor mudar-lhe a tristeza em alegria. O povo cristão também se acha na luta da penitência
        quaresmal e aspira pelas santas alegrias pascais. Mas, para as merecer, diz o Evangelho (2),
        deveremos primeiro beber o cálice d'Aquele que vem derramar o seu sangue por nosso resgate e
        que nos tornará participantes de sua ressurreição, se com ele morrermos aos nossos pecados.
        — Privemo-nos dos alimentos que nutrem o nosso corpo e dos vícios que envenenam a nossa alma
        (Or.).
      </Typography>

      <H3 text="Intróito" />

      <Typography className="em">Sl. 37, 22-23</Typography>

      <Language>
        <Typography className="latin">
          Ne derelínquas me, Dómine, Deus meus, ne discédas a me: inténde in adjutórium meum,
          Dómine, virtus salútis meæ. <Typography className="latin">Ps. ibid., 2</Typography>{" "}
          Dómine, ne in furóre tuo árguas me: neque in ira tua corrípias me.
          <Typography className="versicle"> ℣. </Typography>Gloria Patri...
        </Typography>
        <Typography className="vernacular">
          Não me abandoneis, Senhor, meu Deus; não Vos afasteis de mim. Apressai-Vos em socorrer-me,
          ó Senhor, que sois a minha força e salvação.{" "}
          <Typography className="vernacular">Sl. ibid., 2</Typography> Senhor, não me repreendais
          com furor, nem me castigueis com ira.
          <Typography className="versicle"> ℣. </Typography>Glória ao Pai...
        </Typography>
      </Language>

      <H3 text="Oração" />

      <Language>
        <Typography className="latin">
          Pópulum tuum, quǽsumus, Dómine, propítius réspice: et, quos ab escis carnálibus prǽcipis
          abstinére, a noxiis quoque vítiis cessáre concéde. Per Dóminum...
        </Typography>
        <Typography className="vernacular">
          Olhai propício para o vosso povo, Senhor, Vos suplicamos, e permiti que aqueles a quem
          ordenais a abstinência das carnes se abstenham também dos vícios, que prejudicam as suas
          almas. Por nosso Senhor...
        </Typography>
      </Language>

      <H3 text="Epístola" />

      <Typography className="em">Est. 13, 8-11 & 15-17</Typography>

      <Language>
        <Typography className="latin">Léctio libri Esther.</Typography>
        <Typography className="vernacular">Lição do Livro de Ester.</Typography>
        <Typography className="latin">
          In diébus illis: Orávit Mardochǽus ad Dóminum, dicens: Dómine, Dómine, Rex omnípotens, in
          dicióne enim tua cuncta sunt pósita, et non est, qui possit tuæ resístere voluntáti, si
          decréveris salváre Israël. Tu fecísti cœlum et terram, et quidquid cœli ámbitu continétur.
          Dóminus ómnium es, nec est, qui resístat majestáti tuæ. Et nunc, Dómine Rex, Deus Abraham,
          miserére pópuli tui, quia volunt nos inimíci nostri pérdere, et hereditátem tuam delére.
          Ne despícias partem tuam, quam redemísti tibi de Ægýpto. Exáudi deprecatiónem meam, et
          propítius esto sorti et funículo tuo, et convérte luctum nostrum in gáudium, ut vivéntes
          laudémus nomen tuum, Dómine, et ne claudas ora te canéntium, Dómine, Deus noster.
        </Typography>
        <Typography className="vernacular">
          Naqueles dias, orava Mardoqueu ao Senhor, dizendo: «Senhor, Senhor, Rei omnipotente, todas
          as coisas estão submetidas ao vosso poder. Nada, pois, poderá resistir à vossa vontade, se
          determinardes salvar o povo de Israel. Criastes o céu, a terra e tudo o que encerra o
          âmbito do céu; sois o Senhor de todas as coisas; ninguém pode resistir à vossa majestade.
          Então, agora, Senhor e Rei, Deus de Abraão, tende piedade do vosso povo; pois os nossos
          inimigos querem perder-nos e destruir a vossa herança. Não desprezeis o vosso povo, que
          livrastes do Egipto para ser vosso. Ouvi a minha oração; sede propício à nação que se
          tornou a vossa herança; convertei o nosso luto em alegria, a fim de que, conservando a
          vida, louvemos o vosso nome, Senhor» Não fecheis a boca àqueles que Vos louvam, ó Senhor,
          nosso Deus!».
        </Typography>
      </Language>

      <H3 text="Gradual" />

      <Typography className="em">Sl. 27, 9 & 1</Typography>

      <Language>
        <Typography className="latin">
          Salvum fac pópulum tuum, Dómine, et bénedic hereditáti tuæ.
          <Typography className="versicle"> ℣. </Typography>Ad te, Dómine, clamávi: Deus meus, ne
          síleas a me, et ero símilis descendéntibus in lacum.
        </Typography>
        <Typography className="vernacular">
          Salvai o vosso povo, Senhor, e abençoai a vossa herança. A Vós, Senhor, clamei. Meu Deus,
          não fecheis os ouvidos à minha voz. Se me não escutais, serei semelhante àqueles que
          desceram ao túmulo.
        </Typography>
      </Language>

      <H3 text="Trato" />

      <LinkCard href="/missal/pre-quaresma/quadp3-3#trato" title="Trato Quarta-feira de Cinzas" />

      <H3 text="Evangelho" />

      <Typography className="em">Mt. 20, 17-28</Typography>

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
          In illo témpore: Ascéndens Jesus Jerosólymam, assúmpsit duódecim discípulos secréto, et
          ait illis: Ecce, ascéndimus Jerosólymam, et Fílius hóminis tradétur princípibus
          sacerdótum, et scribis, et condemnábunt eum morte, et tradent eum Géntibus ad illudéndum,
          et flagellándum, et crucifigéndum, et tértia die resúrget. Tunc accéssit ad eum mater
          filiórum Zebedǽi cum fíliis suis, adórans et petens áliquid ab eo. Qui dixit ei: Quid vis?
          Ait illi: Dic, ut sédeant hi duo fílii mei, unus ad déxteram tuam et unus ad sinístram in
          regno tuo. Respóndens autem Jesus, dixit: Nescítis, quid petátis. Potéstis bíbere cálicem,
          quem ego bibitúrus sum? Dicunt ei: Póssumus. Ait illis: Cálicem quidem meum bibétis:
          sedére autem ad déxteram meam vel sinístram, non est meum dare vobis, sed quibus parátum
          est a Patre meo. Et audiéntes decem, indignáti sunt de duóbus frátribus. Jesus autem
          vocávit eos ad se, et ait: Scitis, quia príncipes géntium dominántur eórum: et qui majóres
          sunt, potestátem exércent in eos. Non ita erit inter vos: sed quicúmque volúerit inter vos
          major fíeri, sit vester miníster: et qui volúerit inter vos primus esse, erit vester
          servus. Sicut Fílius hóminis non venit ministrári, sed ministráre, et dare ánimam suam,
          redemptiónem pro multis.
        </Typography>
        <Typography className="vernacular">
          Naquele tempo, subindo Jesus para Jerusalém, chamou de parte os doze discípulos e
          disse-lhes: «Vamos subindo para Jerusalém, onde o Filho do homem será entregue aos
          príncipes dos sacerdotes e aos escribas. E condená-lo-ão à morte e entregá-lo-ão aos
          gentios, para ser escarnecido, flagelado e crucificado; mas ao terceiro dia ressuscitará».
          Então a mãe dos filhos de Zebedeu aproximou-se d’Ele com seus filhos, adorando-O e
          pretendendo pedir-Lhe alguma coisa. Ele disse-lhe: «Que queres?». Respondeu ela: «Ordenai
          que estes meus dois filhos se sentem no vosso reino, um à direita e o outro à esquerda». E
          Jesus disse-lhe: «Não sabeis o que pedis. Podeis beber o cálice que eu hei-de beber».
          Disseram-lhe: «Podemos!». Jesus disse-lhes: «Vós bebereis, certamente, o meu cálice;
          porém, sentar-vos à minha direita ou esquerda, não pertence a mim conceder-vo-lo, pois
          esse lugar será para quem meu Pai o tiver preparado». Ouvindo isto, os outros dez
          indignaram-se contra os dois irmãos. Jesus, porém, chamando-os para junto de si,
          disse-lhes: «Sabeis que os soberanos dominam os seus povos e que os mais importantes
          exercem a sua força contra estes, oprimindo-os. Não será assim entre vós; aquele, pois,
          que quiser ser superior aos outros será seu inferior; e o que quiser ser o primeiro será o
          seu escravo. Assim como o Filho do homem, que não veio para ser servido, mas para servir e
          dar a vida em redenção de muitos».
        </Typography>
      </Language>

      <H3 text="Ofertório" />

      <Typography className="em">Sl. 24, 1-3</Typography>

      <Language>
        <Typography className="latin">
          Ad te, Dómine, levávi ánimam meam: Deus meus, in te confído, non erubéscam: neque
          irrídeant me inimíci mei: étenim univérsi, qui te exspéctant, non confundéntur.
        </Typography>
        <Typography className="vernacular">
          A Vós, Senhor, elevei a minha alma. Ó meu Deus, confio em Vós; não serei confundido, nem
          vencido pelos meus inimigos., porquanto todos aqueles que em Vós confiam não serão
          confundidos.
        </Typography>
      </Language>

      <H3 text="Secreta" />

      <Language>
        <Typography className="latin">
          Hóstias, Dómine, quas tibi offérimus, propítius réspice: et, per hæc sancta commércia,
          víncula peccatórum nostrórum absólve. Per Dóminum...
        </Typography>
        <Typography className="vernacular">
          Olhai propício, Senhor, para as hóstias que Vos oferecemos, e, por este sagrado Cornércio,
          desligai-nos das cadeias dos nossos pecados. Por nosso Senhor...
        </Typography>
      </Language>

      <H3 text="Comúnio" />

      <Typography className="em">Sl. 10, 8</Typography>

      <Language>
        <Typography className="latin">
          Justus Dóminus, et justítiam diléxit: æquitátem vidit vultus ejus.
        </Typography>
        <Typography className="vernacular">
          O Senhor é justo e amou a justiça; seu rosto volta-se benévolo para os justos.
        </Typography>
      </Language>

      <H3 text="Postcomúnio" />

      <Language>
        <Typography className="latin">
          Sumptis, Dómine, sacraméntis: ad redemptiónis ætérnæ, quǽsumus, proficiámus augméntum. Per
          Dóminum...
        </Typography>
        <Typography className="vernacular">
          Havendo nós recebido estes sacramentos, Senhor, concedei-nos, Vos suplicamos, que nos
          sirvam de aumento dos frutos da redenção eterna. Por nosso Senhor...
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
          Deus, innocéntiæ restitútor et amátor, dírige ad te tuórum corda servórum: ut, spíritus
          tui fervóre concépto, et in fide inveniántur stábiles, et in ópere efficáces. Per
          Dóminum...
        </Typography>
        <Typography className="vernacular">
          Ó Deus, reparador e amigo da inocência, encaminhai para Vós os corações dos vossos servos,
          a fim de que, afervorados com vosso Espírito, sejam firmes na fé e activos nas obras. Por
          nosso Senhor...
        </Typography>
      </Language>
    </PageWrapper>
  );
}
