import { Image } from "~/components/ReadingImage";
import { useWindowDimensions } from "react-native";
import { MissalRefLink as Link } from "~/components/MissalRefLink";
import { H1 } from "~/components/Headings";
import Language from "~/components/Language";
import PageWrapper from "~/components/Page";
import { Typography } from "~/components/typography";

export default function PageAngelus() {
  const { height, width } = useWindowDimensions();
  return (
    <PageWrapper>
      <H1 text="Angelus" />

      <Image
        source={require("../../../../assets/images/angelus.jpg")}
        contentFit="contain"
        accessibilityLabel="Anunciação do Anjo à Virgem Maria"
        style={{ height: width < 768 ? Math.min(240, (height || 844) * 0.25) : 400 }}
      />

      <Typography className="aside">
        Desde a Santíssima Trindade até à Páscoa. No tempo Pascal substitui-se o Angelus pela{" "}
        <Link className="link" href="/devocionario/antifonas/reginacaeli">
          Regina Caeli
        </Link>{" "}
        .
      </Typography>

      <Language>
        <Typography className="latin">Angelus Dómini nuntiávit Maríæ.</Typography>
        <Typography className="vernacular">O Anjo do Senhor anunciou a Maria.</Typography>
        <Typography className="latin">
          <Typography className="response"> ℟. </Typography> Et concépit de Spíritu Sancto.
        </Typography>
        <Typography className="vernacular">
          <Typography className="response"> ℟. </Typography> E Ela concebeu do Espírito Santo.
        </Typography>
        <Typography className="latin">
          <Typography className="versicle"> ℣. </Typography>Ave, María, grátia plena, Dóminus tecum;
          benedícta tu in muliéribus, et benedíctus fructus ventris tui, Jesus.
        </Typography>
        <Typography className="vernacular">
          <Typography className="versicle"> ℣. </Typography>Ave, Maria, Cheia de graça, o Senhor é
          convosco; bendita sois Vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus.
        </Typography>
        <Typography className="latin">
          <Typography className="response"> ℟. </Typography> Sancta María, Mater Dei, ora pro nobis
          peccatóribus, nunc, et in hora mortis nostræ. Amen.
        </Typography>
        <Typography className="vernacular">
          <Typography className="response"> ℟. </Typography> Santa Maria, Mãe de Deus, rogai por
          nós, pecadores, agora e na hora da nossa morte. Amen.
        </Typography>
        <Typography className="latin">
          <Typography className="versicle"> ℣. </Typography> Ecce ancílla Dómini.
        </Typography>
        <Typography className="vernacular">
          <Typography className="versicle"> ℣. </Typography>Eis a escrava do Senhor.
        </Typography>
        <Typography className="latin">
          <Typography className="response"> ℟. </Typography> Fiat mihi secúndum verbum tuum.
        </Typography>
        <Typography className="vernacular">
          <Typography className="response"> ℟. </Typography> Faça-se em mim segundo a vossa Palavra.
        </Typography>
        <Typography className="latin">
          <Typography className="versicle"> ℣. </Typography>Ave, María, grátia plena, Dóminus tecum;
          benedícta tu in muliéribus, et benedíctus fructus ventris tui, Jesus.
        </Typography>
        <Typography className="vernacular">
          <Typography className="versicle"> ℣. </Typography>Ave, Maria, Cheia de graça, o Senhor é
          convosco; bendita sois Vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus.
        </Typography>
        <Typography className="latin">
          <Typography className="response"> ℟. </Typography> Sancta María, Mater Dei, ora pro nobis
          peccatóribus, nunc, et in hora mortis nostræ. Amen.
        </Typography>
        <Typography className="vernacular">
          <Typography className="response"> ℟. </Typography> Santa Maria, Mãe de Deus, rogai por
          nós, pecadores, agora e na hora da nossa morte. Amen.
        </Typography>
        <Typography className="latin">
          <Typography className="versicle"> ℣. </Typography>Et Verbum caro factum est.
        </Typography>
        <Typography className="vernacular">
          <Typography className="versicle"> ℣. </Typography>E o Verbo divino encarnou.
        </Typography>
        <Typography className="latin">
          <Typography className="response"> ℟. </Typography> Et habitávit in nobis.
        </Typography>
        <Typography className="vernacular">
          <Typography className="response"> ℟. </Typography> E habitou no meio de nós.
        </Typography>
        <Typography className="latin">
          <Typography className="versicle"> ℣. </Typography>Ave, María, grátia plena, Dóminus tecum;
          benedícta tu in muliéribus, et benedíctus fructus ventris tui, Jesus.
        </Typography>
        <Typography className="vernacular">
          <Typography className="versicle"> ℣. </Typography>Ave, Maria, Cheia de graça, o Senhor é
          convosco; bendita sois Vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus.
        </Typography>
        <Typography className="latin">
          <Typography className="response"> ℟. </Typography> Sancta María, Mater Dei, ora pro nobis
          peccatóribus, nunc, et in hora mortis nostræ. Amen.
        </Typography>
        <Typography className="vernacular">
          <Typography className="response"> ℟. </Typography> Santa Maria, Mãe de Deus, rogai por
          nós, pecadores, agora e na hora da nossa morte. Amen.
        </Typography>
        <Typography className="latin">
          <Typography className="versicle"> ℣. </Typography>Ora pro nobis, sancta Dei Génetríx.
        </Typography>
        <Typography className="vernacular">
          <Typography className="versicle"> ℣. </Typography>Rogai por nós Santa Mãe de Deus.
        </Typography>
        <Typography className="latin">
          <Typography className="response"> ℟. </Typography> Ut digni efficiámur promissionibus
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
          Grátiam tuam, quǽsumus, Dómine, méntibus nostris infúnde: ut qui, Angelo nuntiánte,
          Christi Fílii tui incarnatiónem cognóvimus, per passiónem ejus et crucem ad resurrectiónis
          glóriam perducámur. Per eumdem Christum, Dóminum nostrum.{" "}
          <Typography className="response"> ℟. </Typography> Amen.
        </Typography>
        <Typography className="vernacular">
          Infundi, Senhor, Vos suplicamos, a vossa graça em nossas almas, para que nós, que pela
          anunciação do Anjo conhecemos a Incarnação do vosso Filho, sejamos conduzidos à glória da
          ressurreição pela sua Paixão e Cruz. Pelo mesmo Jesus Cristo Senhor Nosso.{" "}
          <Typography className="response"> ℟. </Typography> Amen.
        </Typography>
      </Language>
    </PageWrapper>
  );
}
