import { MissalRefLink as Link } from "~/components/MissalRefLink";
import { H1, H3 } from "~/components/Headings";
import Language from "~/components/Language";
import PageWrapper from "~/components/Page";
import { Typography } from "~/components/typography";

export default function PagePasc74() {
  return (
    <PageWrapper>
      <H1 text="Quinta-feira de Pentecostes" />

      <Typography className="comment">
        O Espírito Santo, que desceu sobre os Apóstolos, continua a vivificar a Igreja. A liturgia
        de hoje celebra os seus dons e pede que ele nos ensine toda a verdade e nos faça perseverar
        na caridade. «Não vos deixarei órfãos», diz o Senhor; «tornarei a vós».
      </Typography>

      <Typography className="aside">
        Como no dia da{" "}
        <Link className="link" href="/missal/pascoa/pasc7-0">
          Festa de Pentecostes
        </Link>{" "}
        , excepto:
      </Typography>

      <H3 text="Epístola" />

      <Typography className="em">Act. 8, 5-8</Typography>

      <Language>
        <Typography className="latin">Léctio Actuum Apostolórum.</Typography>
        <Typography className="vernacular">Lição dos Actos dos Apóstolos.</Typography>
        <Typography className="latin">
          In diébus illis: Philíppus descéndens in civitátem Samaríæ, prædicábat illis Christum.
          Intendébant autem turbæ his, quæ a Philíppo dicebántur, unanímiter audiéntes et vidéntes
          signa, quæ faciébat. Multi enim eórum, qui habébant spíritus immúndos, clamántes voce
          magna, exíbant. Multi autem paralýtici et claudi curáti sunt. Factum est ergo gáudium
          magnum in illa civitáte.
        </Typography>
        <Typography className="vernacular">
          Naqueles dias, descendo Filipe à cidade de Samaria, pregava Cristo aos seus habitantes. As
          multidões estavam atentas ao que dizia, escutando-o unanimemente e vendo os milagres que
          operava. Muitos espíritos imundos saíam de várias pessoas, que estavam possessas, gritando
          em voz alta. E também muitos paralíticos e coxos eram curados, havendo grande alegria
          naquela cidade.
        </Typography>
      </Language>

      <H3 text="Evangelho" />

      <Typography className="em">Lc. 9, 1-6</Typography>

      <Language>
        <Typography className="latin">
          <Typography className="cross"> ✠ </Typography> Sequéntia sancti Evangélii secúndum Lucam.
        </Typography>
        <Typography className="vernacular">
          <Typography className="cross"> ✠ </Typography> Continuação do santo Evangelho segundo S.
          Lucas.
        </Typography>
        <Typography className="latin">
          In illo témpore: Convocátis. Jesus duódecim Apóstolis, dedit illis virtútem et potestátem
          super ómnia dæmónia, et ut languóres curárent. Et misit illos prædicáre regnum Dei et
          sanáre infírmos. Et ait ad illos: Nihil tuléritis in via, neque virgam, neque peram, neque
          panem, neque pecúniam, neque duas túnicas habeátis. Et in quamcúmque domum intravéritis,
          ibi manéte et inde ne exeátis. Et quicúmque non recéperint vos: exeúntes de civitáte illa,
          etiam púlverem pedum vestrórum excútite in testimónium supra illos. Egréssi autem
          circuíbant per castélla, evangelizántes et curántes ubíque.
        </Typography>
        <Typography className="vernacular">
          Naquele tempo, havendo Jesus reunido os Doze Apóstolos, deu-lhes poder e autoridade sobre
          todos os demónios e também o poder de curar os enfermos. Depois, mandou-os pregar o reino
          de Deus e curar os enfermos, e disse-lhes: «Não leveis nada pelo caminho: nem bordão, nem
          saco, nem pão, nem dinheiro; não tenhais duas túnicas; em qualquer casa em que entrardes,
          permanecei aí e não queirais sair; quando encontrardes pessoas que não queiram
          receber-vos, saí dessa cidade e sacudi até o pó dos vossos pés, a fim de que isso sirva de
          testemunho contra elas». Então partiram; e andavam de aldeia em aldeia, evangelizando e
          curando os enfermos em toda a parte.
        </Typography>
      </Language>
    </PageWrapper>
  );
}
