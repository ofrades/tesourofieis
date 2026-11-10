import { H1, H3 } from "~/components/Headings";
import Language from "~/components/Language";
import LinkCard from "~/components/LinkCard";
import PageWrapper from "~/components/Page";
import { Typography } from "~/components/typography";

export default function Page0605() {
  return (
    <PageWrapper>
      <H1 text="S. Bonifácio, B. e Mártir, a 5 de Junho" />

      <Typography className="comment">
        Bonifácio nasceu na Inglaterra, nos fins do século VII, e é uma das grandes glórias da Ordem
        de São Bento. Gregório II enviou-o à Alemanha, onde, com um escol de monges, anunciou, como
        Jesus ressuscitado pedira aos Apóstolos, a boa Nova aos povos de Hesse, Saxe e Turíngia
        (Or.). Nomeado por Gregório II legado da Sé apostólica, reuniu vários sínodos, entre os
        quais o memorável Concílio de Leptines, na diocese de Cambrai. Criado arcebispo de Magonça
        pelo Papa Zacarias, sagrou, por sua ordem, a Pepino, rei dos Francos. Depois da morte de S.
        Vilibrordo, foi-lhe confiada a igreja de Utrecht, na Frísia. Aí os Frísios o mataram, em
        Dokkum, com trinta de seus monges, em Junho de 755. Seu corpo foi colocado na célebre abadia
        de Fulda, por ele fundada.
      </Typography>

      <H3 text="Intróito" />

      <Typography className="em">Is. 65, 19 & 23</Typography>

      <Language>
        <Typography className="latin">
          Exsultábo in Jerúsalem et gaudébo in pópulo meo: et non audiétur in eo ultra vos fletus et
          vox clamóris. Elécti mei non laborábunt frustra neque generábunt in conturbatióne: quia
          semen benedictórum Dómini est, et nepótes eórum cum eis. (T.P. Allelúja, allelúja.){" "}
          <Typography className="latin">Ps. 43, 2</Typography> Deus, áuribus nostris audívimus:
          patres nostri narravérunt opus, quod operátus es in diébus eórum.
          <Typography className="versicle"> ℣. </Typography>Gloria Patri...
        </Typography>
        <Typography className="vernacular">
          Exultarei tem Jerusalém e alegrar-me-ei com meu povo: e nunca mais se ouvirá a voz das
          lágrimas, nem do clamor. Meus eleitos não trabalharão baldadamente, nem frutificarão na
          perturbação, pois constituem a geração bendita do Senhor: e os seus netos serão abençoados
          com eles. (T. P. Aleluia, aleluia.){" "}
          <Typography className="vernacular">Sl. 43, 2</Typography> Ó Deus, ouvimos com os nossos
          ouvidos; os nossos pais contaram-nos o que fizestes nos seus dias.
          <Typography className="versicle"> ℣. </Typography>Glória ao Pai...
        </Typography>
      </Language>

      <H3 text="Oração" />

      <Language>
        <Typography className="latin">
          Deus, qui multitúdinem populórum, beáti Bonifátii Mártyris tui atque Pontíficis zelo, ad
          agnitiónem tui nóminis vocáre dignátus es: concéde propítius; ut, cujus sollémnia cólimus,
          étiam patrocínia sentiámus. Per Dóminum nostrum...
        </Typography>
        <Typography className="vernacular">
          Ó Deus, que Vos dignastes chamar uma multidão de povos ao conhecimento do vosso nome pelo
          zelo do B. Bonifácio, vosso Mártir e Pontífice, concedei-nos propício que alcancemos o
          Patrocínio daquele cuja festa celebramos. Por nosso Senhor...
        </Typography>
      </Language>

      <H3 text="Epístola" />

      <LinkCard href="/missal/santos/02-12#epístola" title="Os Fundadores da Ordem dos Servitas" />

      <H3 text="Gradual" />

      <Typography className="em">1 Pe. 4, 13-14</Typography>

      <Language>
        <Typography className="latin">
          Communicántes Christi passiónibus gaudéte, ut in revelatióne glóriæ ejus gaudeátis
          exsultántes.
          <Typography className="versicle"> ℣. </Typography>Si exprobrámini in nómine Christi, beáti
          éritis: quóniam, quod est honóris, glóriæ et virtútis Dei, et qui est ejus Spíritus, super
          vos requiéscet.
        </Typography>
        <Typography className="vernacular">
          Havendo tomado parte nos sofrimentos de Cristo, regozijai-vos, a fim de que, quando a sua
          glória seja manifestada, sejais cumulados de alegria.
          <Typography className="versicle"> ℣. </Typography>Se sois ultrajados por causa do nome de
          Cristo, sereis bem-aventurados; pois a honra, a glória e a virtude de Deus e o seu
          Espírito repousarão sobre vós.
        </Typography>
        <Typography className="latin">
          Allelúja, allelúja.<Typography className="versicle"> ℣. </Typography>
          <Typography className="latin">Is. 66, 12</Typography> Declinábo super eum quasi flúvium
          pacis, et quasi torréntem inundántem glóriam. Allelúja.
        </Typography>
        <Typography className="vernacular">
          Aleluia, aleluia.<Typography className="versicle"> ℣. </Typography>
          <Typography className="vernacular">Is. 66, 12</Typography> Farei correr sobre ele como que
          um rio de paz, e como que uma torrente a trasbordar de glória. Aleluia.
        </Typography>
      </Language>

      <Typography className="aside">No T. Pascal omite-se o Gradual, e diz-se:</Typography>

      <Language>
        <Typography className="latin">
          Allelúja, allelúja.<Typography className="versicle"> ℣. </Typography>
          <Typography className="latin">Is. 66, 10 & 14</Typography> Lætámini cum Jerúsalem, et
          exsultáte in ea, omnes, qui dilígitis Dóminum. Allelúja.
          <Typography className="versicle"> ℣. </Typography>Vidébitis, et gaudébit cor vestrum:
          cognoscétur manus Dómini servis ejus. Allelúja.
        </Typography>
        <Typography className="vernacular">
          Aleluia, aleluia.<Typography className="versicle"> ℣. </Typography>
          <Typography className="vernacular">Is. 66, 10 & 14</Typography> Alegrai-vos e exultai com
          Jerusalém, ó vós, que amais o Senhor. Aleluia.
          <Typography className="versicle"> ℣. </Typography>Vereis e alegrar-se-á o vosso coração. A
          mão do Senhor manifestar-se-á nos seus servos. Aleluia.
        </Typography>
      </Language>

      <H3 text="Evangelho" />

      <Typography className="em">Mt. 5, 1-12</Typography>

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
          In illo témpore: Videns Jesus turbas, ascéndit in montem, et cum sedísset, accessérunt ad
          eum discípuli ejus, et apériens os suum, docébat eos, dicens: Beáti páuperes spíritu:
          quóniam ipsórum est regnum cœlórum. Beáti mites: quóniam ipsi possidébunt terram. Beáti,
          qui lugent: quóniam ipsi consolabúntur. Beáti, qui esúriunt et sítiunt justítiam: quóniam
          ipsi saturabúntur. Beáti misericórdes: quóniam ipsi misericórdiam consequántur. Beáti
          mundo corde: quóniam ipsi Deum vidébunt. Beáti pacífici: quóniam fílii Dei vocabúntur.
          Beáti, qui persecutiónem patiúntur propter justítiam: quóniam ipsórum est regnum cœlórum.
          Beáti estis, cum maledíxerint vobis et persecúti vos fúerint, et díxerint omne malum
          advérsum vos, mentiéntes, propter me: gaudete et exsultáte, quóniam merces vestra copiósa
          est in cœlis.
        </Typography>
        <Typography className="vernacular">
          Naquele tempo, vendo Jesus as turbas do povo que O seguiam, subiu para uma montanha. Então
          assentou-se, aproximando-se d’Ele os discípulos. Depois, tomando a palavra, pregou assim
          aos seus discípulos: «Bem-aventurados os pobres de espírito, porque deles é o reino dos
          céus. Bem-aventurados os mansos, porque possuirão a terra. Bem-aventurados os que choram,
          porque serão consolados. Bem-aventurados os que têm fome e sede de justiça, porque serão
          saciados. Bem-aventurados os misericordiosos, porque serão tratados com misericórdia.
          Bem-aventurados os que possuem o coração puro, porque verão Deus. Bem-aventurados os
          pacíficos, porque serão chamados filhos de Deus. Bem-aventurados os que sofrem perseguição
          por amor da justiça, porque lhes pertencerá o reino dos céus. Bem-aventurados, vós, quando
          os homens vos amaldiçoarem, perseguirem e caluniarem Dor minha causa: regozijai-vos,
          então, e exultai de alegria, pois uma copiosa recompensa vos está preparada nos céus».
        </Typography>
      </Language>

      <H3 text="Ofertório" />

      <Typography className="em">Sl. 15, 7 & 8</Typography>

      <Language>
        <Typography className="latin">
          Benedícam Dóminum, qui tríbuit mihi intelléctum: providébam Deum in conspéctu meo semper,
          quóniam a dextris est mihi ne commóvear. (T.P. Allelúja.)
        </Typography>
        <Typography className="vernacular">
          Bendirei o Senhor, que me deu a inteligência. Tenho os meus olhos voltados constantemente
          para Deus; e, visto que Ele está à minha dextra, não serei abalado. (T. P. Aleluia.)
        </Typography>
      </Language>

      <H3 text="Secreta" />

      <Language>
        <Typography className="latin">
          Super has hóstias. Dómine, quæsumus, benedíctio copiósa descéndat: quæ et sanctificatiónem
          nostram misericórditer operátur; et de sancti Bonifátii Mártyris tui atque Pontíficis
          fáciat sollemnitáte gaudére. Per Dóminum nostrum...
        </Typography>
        <Typography className="vernacular">
          Senhor, Vos rogamos, fazei descer sobre estas hóstias abundantes bênçãos, a fim de que
          pela vossa misericórdia operem a nossa santificação e nos alegrem na solenidade de S.
          Bonifácio, vosso Mártir e Pontífice. Por nosso Senhor...
        </Typography>
      </Language>

      <H3 text="Comúnio" />

      <Typography className="em">Ap. 3, 21</Typography>

      <Language>
        <Typography className="latin">
          Qui vícerit, dabo ei sedére mecum in throno meo: sicut et ego vici et sedi cum Patre meo
          in throno ejus. (T.P. Allelúja.)
        </Typography>
        <Typography className="vernacular">
          Aquele que houver vencido tomará lugar comigo no meu trono, assim como Eu, que também
          venci, estou assentado com meu Pai no seu trono. (T. P. Aleluia.)
        </Typography>
      </Language>

      <H3 text="Postcomúnio" />

      <Language>
        <Typography className="latin">
          Sanctificati, Dómine, salutári mysterio: quæsumus; ut nobis sancti Bonifátii Martyris tui
          atque Pontíficis pia non desit orátio, cujus nos donásti patrocínio gubernari. Per
          Dóminum...
        </Typography>
        <Typography className="vernacular">
          Senhor, santificados com estes salutares mystérios, Vos suplicamos, não permitais que nos
          faltem as piedosas orações daquele que nos concedestes como nosso protector e guia. Por
          nosso Senhor...
        </Typography>
      </Language>
    </PageWrapper>
  );
}
