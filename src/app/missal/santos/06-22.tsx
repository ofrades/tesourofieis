import { H1, H3 } from "~/components/Headings";
import Language from "~/components/Language";
import LinkCard from "~/components/LinkCard";
import PageWrapper from "~/components/Page";
import { Typography } from "~/components/typography";

export default function Page0622() {
  return (
    <PageWrapper>
      <H1 text="S. Paulino, B. e Conf., a 22 de Junho" />

      <Typography className="comment">
        Paulino nasceu em 353, de família romana muito importante, em Bordéus, na Aquitânia. Fez
        brilhantes estudos, sendo senador aos vinte e cinco anos. Em seguida, foi cônsul,
        estabelecendo sua residência em Nola, na Campânia. Perto do túmulo de S. Félix, sacerdote
        mártir, festejado pela Igreja a 14 de Janeiro (2), a graça o tocou, recebendo ele, em breve,
        o baptismo. A exemplo do Cristo «que de rico se fez pobre» (Ep.) e que aconselhou a prática
        da virtude de pobreza (Ev.), abandonou as inúmeras riquezas que possuía, comprando assim o
        reino dos céus. Deixa sua esposa, que igualmente se dá a Deus, e torna-se padre, depois
        bispo de Nola (Intr., Grad., Al., Off., Comm.). Seus amigos de outrora o censuravam, porém,
        a «aprovação de Jesus lhe bastava» (3). Em breve, sobrevêm os Godos que devastam a Campânia,
        e, enquanto arrancam, sem mérito algum para eles, os bens aos ricos de Roma, Paulino,
        voluntariamente, dá os seus pelo Cristo, recebe o centuplo e, no outro mundo, a vida eterna.
        Morreu com setenta e cinco anos, em 431, sendo sepultado perto de S. Félix, em Nola.
      </Typography>

      <H3 text="Intróito" />

      <LinkCard
        href="/missal/comum/12confessorespontifices2#intróito"
        title="Confessores Pontífices - Missa Sacerdótes tui"
      />

      <H3 text="Oração" />

      <Language>
        <Typography className="latin">
          Deus, qui ómnia pro te in hoc sǽculo relinquéntibus, céntuplum in futúro et vitam ætérnam
          promisísti: concéde propítius; ut, sancti Pontíficis Paulíni vestígiis inhæréntes,
          valeámus terréna despícere et sola cœléstia desideráre: Qui vivis...
        </Typography>
        <Typography className="vernacular">
          Ó Deus, que àqueles que tudo abandonaram neste mundo para Vos seguirem prometestes o
          cêntuplo e a vida eterna, concedei-nos propício que, seguindo os exemplos do santo
          Pontífice Paulino, desprezemos sempre as coisas terrenas e aspiremos somente às
          celestiais. Ó Vós, que viveis...
        </Typography>
      </Language>

      <H3 text="Epístola" />

      <Typography className="em">2 Cor. 8, 9-15</Typography>

      <Language>
        <Typography className="latin">
          Lectio Epístolæ beati Pauli Apostoli ad Corinthios.
        </Typography>
        <Typography className="vernacular">
          Lição da Ep.ª do B. Ap.º Paulo aos Coríntios.
        </Typography>
        <Typography className="latin">
          Fratres: Scitis grátiam Dómini nostri Jesu Christi, quóniam propter vos egénus factus est,
          cum esset dives, ut illíus inópia vos dívites essétis. Et consílium in hoc do: hoc enim
          vobis útile est, qui non solum fácere, sed et velle coepistis ab anno prióre: nunc vero et
          facto perfícite: ut, quemádmodum promptus est ánimus voluntátis, ita sit et perficiéndi ex
          eo quod habétis. Si enim volúntas prompta est, secúndum id quod habet, accépta est, non
          secúndum id quod non habet. Non enim ut áliis sit remíssio, vobis autem tribulátio, sed ex
          æqualitáte. In præsénti témpore vestra abundántia illórum inópiam súppleat: ut et illórum
          abundántia vestræ inópiæ sit suppleméntum, ut fiat æquálitas, sicut scriptum est: Qui
          multum, non abundávit: et qui módicum, non minorávit.
        </Typography>
        <Typography className="vernacular">
          Meus irmãos: Conheceis a bondade de nosso Senhor Jesus Cristo, que, sendo rico, se fez
          pobre, por causa de vos tornar ricos pela sua pobreza. A este respeito dou-vos um
          conselho, que vos é tanto mais útil quanto começastes, não somente agora a praticar esta
          virtude, mas já o fazeis desde o último ano. Agora, pois, completai a vossa obra, a fim de
          que, tal como tem estado pronta a vossa vontade para querer, tal esteja também para
          cumprir o que quereis, segundo os meios que possuís; pois, quando a vontade está pronta,
          segundo o que possui, ela é agradável a Deus, mas não segundo o que se não possui. Não
          digo isto para que eles sintam alívio, e fiqueis atribulados; mas para que haja igualdade.
          Nas circunstâncias presentes a vossa abundância supra as necessidades dos outros, de sorte
          que haja igualdade, assim como está escrito: «Àquele que recolheu muito lhe não sobejou; e
          àquele que recolheu pouco lhe não faltou».
        </Typography>
      </Language>

      <H3 text="Gradual" />

      <Typography className="em">Ecl. 44, 16</Typography>

      <Language>
        <Typography className="latin">
          Ecce sacérdos magnus, qui in diébus suis plácuit Deo.
          <Typography className="versicle"> ℣. </Typography>
          <Typography className="latin">ibid., 20</Typography> Non est invéntus símilis illi, qui
          conserváret legem Excélsi.
        </Typography>
        <Typography className="vernacular">
          Eis o grande sacerdote que nos dias da sua vida agradou a Deus.
          <Typography className="versicle"> ℣. </Typography>
          <Typography className="vernacular">ibid., 20</Typography> Ninguém o igualou na observância
          das leis do Altíssimo.
        </Typography>
        <Typography className="latin">
          Allelúja, allelúja.<Typography className="versicle"> ℣. </Typography>
          <Typography className="latin">Ps. 109, 4</Typography> Tu es sacérdos in ætérnum, secúndum
          órdinem Melchísedech. Allelúja.
        </Typography>
        <Typography className="vernacular">
          Aleluia, aleluia.<Typography className="versicle"> ℣. </Typography>
          <Typography className="vernacular">Sl. 109, 4</Typography> Tu és sacerdote para sempre,
          segundo a ordem de Melquisedeque.
        </Typography>
      </Language>

      <H3 text="Evangelho" />

      <LinkCard
        href="/missal/comum/15confessoresnaopontifices2#evangelho"
        title="Confessores não Pontífices - Missa Justus ut palma"
      />

      <H3 text="Ofertório" />

      <Typography className="em">Sl. 88, 21-22</Typography>

      <Language>
        <Typography className="latin">
          Invéni David servum meum, óleo sancto meo unxi eum: manus enim mea auxiliábitur ei, et
          bráchium meum confortábit eum.
        </Typography>
        <Typography className="vernacular">
          Encontrei o seu servo David e ungi-o com meu óleo sagrado. Minha mão o socorrerá e o meu
          braço o fortalecerá.
        </Typography>
      </Language>

      <H3 text="Secreta" />

      <Language>
        <Typography className="latin">
          Da nobis, Dómine, perféctæ caritátis sacrifícium, exémplo sancti Pontíficis Paulíni, cum
          altáris oblatióne conjúngere: et beneficéntiæ stúdio sempitérnam misericórdiam promeréri.
          Per Dóminum nostrum...
        </Typography>
        <Typography className="vernacular">
          Concedei-nos, Senhor, que, imitando o exemplo do Santo Pontífice Paulino, juntemos à
          oferta do altar o sacrifício da caridade perfeita; e permiti que, aplicando-nos ao
          exercício da beneficência, mereçamos alcançar o perdão. Por nosso Senhor...
        </Typography>
      </Language>

      <H3 text="Comúnio" />

      <Typography className="em">Lc. 12, 42</Typography>

      <Language>
        <Typography className="latin">
          Fidélis servus et prudens, quem constítuit dóminus super famíliam suam: ut det illis in
          témpore trítici mensúram.
        </Typography>
        <Typography className="vernacular">
          Eis o servo fiel e prudente que o Senhor estabeleceu acima da sua família para distribuir,
          oportunamente, a cada um a sua medida de trigo.
        </Typography>
      </Language>

      <H3 text="Postcomúnio" />

      <Language>
        <Typography className="latin">
          Tríbue nobis per hæc sancta, Dómine, illum pietátis et humilitátis afféctum, quem ex hoc
          divíno fonte hausit sanctus Póntifex tuus Paulínus: et, ipsíus intercessióne, in omnes,
          qui te deprecántur, grátiæ tuæ divítias benígnus effúnde. Per Dóminum...
        </Typography>
        <Typography className="vernacular">
          Concedei-nos, Senhor, em virtude destes sacramentos aqueles sentimentos de piedade e de
          humildade que o vosso Santo Pontífice Paulino auria nesta fonte divina; e pela sua
          intercessão infundi benigno as riquezas da vossa graça naqueles que Vo-las suplicam. Por
          nosso Senhor...
        </Typography>
      </Language>
    </PageWrapper>
  );
}
