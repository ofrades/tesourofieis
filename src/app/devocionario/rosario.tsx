import { H1, H2, H3 } from "~/components/Headings";
import Language from "~/components/Language";
import PageWrapper from "~/components/Page";
import { Typography } from "~/components/typography";
import LadainhaLoreto from "./ladainhas/loreto";
import AveMaria from "./oracoes/avemaria";
import Gloria from "./oracoes/gloria";
import PaiNosso from "./oracoes/painosso";
import PageSimboloapostolos from "./oracoes/simboloapostolos";
import PageSinalCruz from "./oracoes/sinalcruz";

export default function PageRosario() {
  return (
    <PageWrapper>
      <H1 text="Rosário" />
      <PageSinalCruz />
      <H2 text="No Crucifixo" />

      <PageSimboloapostolos />
      <H2 text="Oferecimento do Santo Rosário" />
      <Typography className="vernacular">
        Santíssima Virgem, Mãe de Deus, eu Vos ofereço este rosário em desagravo do Santíssimo
        Coração de Nosso Senhor Jesus Cristo, Vosso Filho, e em desagravo do Vosso Coração
        Imaculado; e pelas intenções que Vos apresento:
      </Typography>
      <Typography className="vernacular">Referir as intenções.</Typography>
      <H2 text="Intenções do Santo Padre" />
      <Language>
        <Typography className="latin">Exaltatio S. Matris Ecclesiæ.</Typography>
        <Typography className="vernacular">Exaltação da Santa Igreja.</Typography>
        <Typography className="latin">Propagatio fidei.</Typography>
        <Typography className="vernacular">Propagação da fé.</Typography>
        <Typography className="latin">Extirpatio hæresum.</Typography>
        <Typography className="vernacular">Extirpação das heresias.</Typography>
        <Typography className="latin">Conversio peccatorum.</Typography>
        <Typography className="vernacular">Conversão dos pecadores.</Typography>
        <Typography className="latin">Pax inter principes christianos.</Typography>
        <Typography className="vernacular">Paz entre os Reis e Príncipes católicos.</Typography>
      </Language>

      <H2 text="Nas contas maiores" />

      <PaiNosso />

      <H2 text="Nas contas menores" />

      <AveMaria />

      <H2 text="No fim das dezenas" />

      <Gloria />

      <H2 text="Nossa Senhora a Santa Catarina Labouré" />

      <Language>
        <Typography className="latin">
          <Typography className="versicle"> ℣. </Typography>O Maria sine labe concepta.
        </Typography>
        <Typography className="vernacular">
          <Typography className="versicle"> ℣. </Typography>Ó Maria concebida sem pecado.
        </Typography>
        <Typography className="latin">
          <Typography className="response"> ℟. </Typography> Ora pro nobis, qui confugimus ad te.
        </Typography>
        <Typography className="vernacular">
          <Typography className="response"> ℟. </Typography> Rogai por nós que recorremos a vós.
        </Typography>
      </Language>
      <H2 text="Nossa Senhora aos Santos Pastorinhos" />
      <Language>
        <Typography className="latin">
          <Typography className="versicle"> ℣. </Typography>Oh mi Jesu, dimitte nobis débita nostra,
          líbera nos ab igne inférni,
        </Typography>
        <Typography className="vernacular">
          <Typography className="versicle"> ℣. </Typography>Ó meu Jesus, perdoai-nos e livrai-nos do
          fogo do inferno,
        </Typography>
        <Typography className="latin">
          <Typography className="response"> ℟. </Typography> Conduc in cælum omnes animas, præsértim
          illas quæ máxime indigent misericórdia tua.
        </Typography>
        <Typography className="vernacular">
          <Typography className="response"> ℟. </Typography> Levai as alminhas todas para o Céu e
          socorrei principalmente as que mais precisarem.
        </Typography>
      </Language>
      <H2 text="Meditações do Rosário" id="meditacoes-do-rosario" />
      <H3 text="Mistérios Gozosos" />
      <Typography className="aside">Segunda-feira e Quinta-feira</Typography>
      <Typography className="bold">Primeiro mistério:</Typography>
      <Typography className="vernacular">
        Meditemos na Anunciação do Arcanjo São Gabriel à Santíssima Virgem, e roguemos a virtude da
        humildade.
      </Typography>
      <Typography className="bold">Segundo mistério:</Typography>
      <Typography className="vernacular">
        Meditemos na Visitação da Santíssima Virgem a Sua Prima, Santa Isabel, e roguemos a caridade
        para com o próximo.
      </Typography>
      <Typography className="bold">Terceiro mistério:</Typography>
      <Typography className="vernacular">
        Meditemos no Nascimento do Menino Jesus, e roguemos o desprendimento dos bens do mundo.
      </Typography>
      <Typography className="bold">Quarto mistério:</Typography>
      <Typography className="vernacular">
        Meditemos na Apresentação do Menino Jesus no Templo e na Purificação de Nossa Senhora, e
        roguemos a obediência e a pureza do espírito e do coração.
      </Typography>
      <Typography className="bold">Quinto mistério:</Typography>
      <Typography className="vernacular">
        Meditemos na Perda e no Encontro do Menino Jesus no Templo, e roguemos o conhecimento das
        coisas divinas e a prontidão no serviço de Deus.
      </Typography>
      <H3 text="Mistérios Dolorosos" />
      <Typography className="aside">Terça-feira e Sexta-feira</Typography>
      <Typography className="bold">Primeiro mistério:</Typography>
      <Typography className="vernacular">
        Meditemos na Agonia de N. S. Jesus Cristo, e roguemos a contrição dos nossos pecados.
      </Typography>
      <Typography className="bold">Segundo mistério:</Typography>
      <Typography className="vernacular">
        Meditemos na flagelação de N. S. Jesus Cristo, e roguemos a mortificação dos sentidos.
      </Typography>
      <Typography className="bold">Terceiro mistério:</Typography>
      <Typography className="vernacular">
        Meditemos na Coroação de Espinhos de N. S. Jesus Cristo, e roguemos a mortificação do
        espírito e do coração.
      </Typography>
      <Typography className="bold">Quarto mistério:</Typography>
      <Typography className="vernacular">
        Meditemos em N. S. Jesus Cristo levando a Cruz para o Calvário, e roguemos a paciência e a
        resignação.
      </Typography>
      <Typography className="bold">Quinto mistério:</Typography>
      <Typography className="vernacular">
        Meditemos na Crucifixão e Morte de N. S. Jesus Cristo, e roguemos o amor a Deus e a salvação
        das almas.
      </Typography>
      <H3 text="Mistérios Gloriosos" />
      <Typography className="aside">
        <Typography className="vernacular">Quarta-feira, Sábado e Domingo</Typography>
      </Typography>
      <Typography className="bold">Primeiro mistério:</Typography>
      <Typography className="vernacular">
        Meditemos na Ressurreição de N. S. Jesus Cristo, e roguemos para recebermos o dom da fé e
        para a conversão dos pecadores.
      </Typography>
      <Typography className="bold">Segundo mistério:</Typography>
      <Typography className="vernacular">
        Meditemos na Ascensão de N. S. Jesus Cristo, e roguemos a esperança e o desejo do céu.
      </Typography>
      <Typography className="bold">Terceiro mistério:</Typography>
      <Typography className="vernacular">
        Meditemos na descida do Divino Espírito Santo, e roguemos o amor a Deus e o zelo da salvação
        das almas.
      </Typography>
      <Typography className="bold">Quarto mistério:</Typography>
      <Typography className="vernacular">
        Meditemos na Assunção da Santíssima Virgem, e roguemos a graça de uma boa morte e a devoção
        a Nossa Senhora.
      </Typography>
      <Typography className="bold">Quinto mistério:</Typography>
      <Typography className="vernacular">
        Meditemos na Coroação da Santíssima Virgem, e roguemos a perseverança final e a confiança em
        Nossa Senhora.
      </Typography>
      <H2 text="Orações no fim do Rosário" />
      <H3 text="Salve Rainha" />
      <Language>
        <Typography className="latin">
          Salve, Regina, Mater misericórdiæ, vita, dulcédo et spes nostra, salve. Ad te clamámus,
          éxsules fílii Hevæ. Ad te suspirámus geméntes et flentes in hac lacrimárum valle. Éia
          ergo, advocáta nostra, illos tuos misericórdes óculos ad nos convérte. Et Jesum benedíctum
          fructum ventris tui, nobis, post hoc exsílium, osténde. O clemens, o pia, o dulcis Virgo
          Maria!
        </Typography>
        <Typography className="vernacular">
          Salvé, Rainha, mãe de misericórdia, vida, doçura, esperança nossa, salve! A Vós bradamos,
          os degredados filhos de Eva. A Vós suspiramos, gemendo e chorando neste vale de lágrimas.
          Eia, pois, advogada nossa, esses Vossos olhos misericordiosos a nós volvei. E, depois
          deste desterro, nos mostrai Jesus, bendito fruto do Vosso ventre. Ó clemente, ó piedosa, ó
          doce Virgem Maria.
        </Typography>
        <Typography className="latin">
          <Typography className="versicle"> ℣. </Typography>Ora pro nobis, Regina Sacratíssimi
          Rosárii.
        </Typography>
        <Typography className="vernacular">
          <Typography className="versicle"> ℣. </Typography>Rogai por nós, Rainha do Santíssimo
          Rosário.
        </Typography>
        <Typography className="latin">
          <Typography className="response"> ℟. </Typography> Ut digni efficiámur promissiónibus
          Christi.
        </Typography>
        <Typography className="vernacular">
          <Typography className="response"> ℟. </Typography> Para que sejamos dignos das promessas
          de Cristo.
        </Typography>
        <Typography className="latin">
          <Typography className="latin">Orémus.</Typography>
        </Typography>
        <Typography className="vernacular">
          <Typography className="vernacular">Oremos.</Typography>
        </Typography>
        <Typography className="latin">
          Deus, cujus Unigénitus per vitam, mortem et resurrectiónem suam nobis salútis ætérnæ
          prǽmia comparávit, concede, quǽsumus: ut hæc mystéria sacratissimo beátæ Maríæ Vírginis
          Rosário recoléntes, et imitémur quod continent, et quod promittunt assequámur. Per eundem
          Christum Dóminum nostrum.
        </Typography>
        <Typography className="vernacular">
          Ó Deus, cujo Filho Unigénito por sua vida, morte e ressurreição nos alcançou os prémios da
          vida eterna, concedei-nos, Vos suplicamos, que, venerando nós estes mistérios do
          Santíssimo Rosário da Virgem Maria, imitemos o que eles contêm, e alcancemos o que eles
          prometem. Pelo mesmo Cristo, nosso Senhor.
        </Typography>
        <Typography className="latin">
          <Typography className="response"> ℟. </Typography> Amen.
        </Typography>
        <Typography className="vernacular">
          <Typography className="response"> ℟. </Typography> Amen.
        </Typography>
      </Language>

      <LadainhaLoreto />
      <PageSinalCruz />
    </PageWrapper>
  );
}
