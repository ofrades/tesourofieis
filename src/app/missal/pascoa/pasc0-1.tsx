import { H1, H3 } from "~/components/Headings";
import Language from "~/components/Language";
import PageWrapper from "~/components/Page";
import { Typography } from "~/components/typography";

export default function PagePasc01() {
  return (
    <PageWrapper>
      <H1 text="Segunda-feira Pascal" />

      <Typography className="comment">
        Outrora, durante toda a Oitava de Páscoa não se trabalhava: era festa contínua. A missa
        estacional reunia todos os neófitos à mesa da Comunhão. À tarde, iam ao túmulo do Chefe da
        Igreja, São João de Latrão, para o Ofício de Vésperas.
        {"\n\n"}O Evangelho, depois de haver descrito a manifestação de Jesus ressuscitado aos
        discípulos de Emaús, fala de sua aparição a Pedro, no próprio dia da Ressurreição (2). Os
        neófitos, e o mesmo devemos fazer, atestavam neste dia a fé em Jesus e na Igreja, recebendo
        nestas festas da Páscoa o leite de nossas almas, nascidas à vida na terra de promissão da
        Igreja (Intr.), formando todos um só coração e uma só alma, por um mesmo Sacramento, que é o
        de Deus, para afirmarmos unânimes a nossa fé em Jesus ressuscitado (Postcomm.).
      </Typography>

      <H3 text="Intróito" />

      <Typography className="em">Ex. 13, 5 & 9</Typography>

      <Language>
        <Typography className="latin">
          Introdúxit vos Dóminus in terram fluéntem lac et mel, allelúja: et ut lex Dómini semper
          sit in ore vestro, allelúja, allelúja.{" "}
          <Typography className="latin">Ps. 104, 1</Typography> Confitémini Dómino et invocáte nomen
          ejus: annuntiáte inter gentes ópera ejus.
          <Typography className="versicle"> ℣. </Typography>Gloria Patri...
        </Typography>
        <Typography className="vernacular">
          O Senhor vos introduziu em um país onde correm leite e mel, aleluia: para que a Lei do
          Senhor esteja sempre na vossa boca, aleluia, aleluia.{" "}
          <Typography className="vernacular">Sl. 104, 1</Typography> Louvai o Senhor, invocai o seu
          nome e anunciai as suas obras em todos os povos.
          <Typography className="versicle"> ℣. </Typography>Glória ao Pai...
        </Typography>
      </Language>

      <H3 text="Oração" />

      <Language>
        <Typography className="latin">
          Deus, qui sollemnitáte pascháli, mundo remédia contulísti: pópulum tuum, quǽsumus, cœlésti
          dono proséquere; ut et perféctam libertátem consequi mereátur, et ad vitam profíciat
          sempitérnam. Per Dóminum...
        </Typography>
        <Typography className="vernacular">
          Ó Deus, que nesta solenidade pascal trouxestes ao mundo os remédios eficazes, continuai a
          espalhar, Vos suplicamos, os dons celestiais sobre o vosso povo, para que mereça alcançar
          a perfeita liberdade e consiga a vida eterna. Por nosso Senhor...
        </Typography>
      </Language>

      <H3 text="Epístola" />

      <Typography className="em">Act. 10, 37-43</Typography>

      <Language>
        <Typography className="latin">Léctio Actuum Apostólorum.</Typography>
        <Typography className="vernacular">Lição dos Actos dos Apóstolos.</Typography>
        <Typography className="latin">
          In diébus illis: Stans Petrus in médio plebis, dixit: Viri fratres, vos scitis, quod
          factum est verbum per universam Judǽam: incípiens enim a Galilǽa, post baptísmum, quod
          prædicávit Joánnes, Jesum a Názareth: quómodo unxit eum Deus Spíritu Sancto et virtúte,
          qui pertránsiit benefaciéndo, et sanándo omnes oppréssos a diábolo, quóniam Deus erat cum
          illo. Et nos testes sumus ómnium, quæ fecit in regióne Judæórum et Jerúsalem, quem
          occidérunt suspendéntes in ligno. Hunc Deus suscitávit tértia die, et dedit eum maniféstum
          fíeri, non omni pópulo, sed téstibus præordinátis a Deo: nobis, qui mandticávimus et
          bíbimus cum illo, postquam resurréxit a mórtuis. Et præcépit nobis prædicáre populo et
          testificári, quia ipse est, qui constitútus est a Deo judex vivórum et mortuórum. Huic
          omnes Prophétæ testimónium pérhibent, remissiónem peccatórum accípere per nomen ejus
          omnes, qui credunt in eum.
        </Typography>
        <Typography className="vernacular">
          Naqueles dias, estando Pedro no meio do povo, disse: «Meus irmãos: Sabeis o que se passou
          em toda a Judeia, a começar pela Galileia, a respeito de Jesus de Nazaré, desde, o
          baptismo, que João pregou; como Deus O ungiu com o Espírito Santo e com o poder; como Ele
          passou pela terra, praticando o bom e curando os que estavam possessos pelo demónio, pois
          Deus estava com Ele. Nós somos testemunhas de tudo o que praticou na região dos judeus em
          Jerusalém, onde O mataram, pregando-O numa cruz. Mas Deus ressuscitou-O ao terceiro dia e
          quis que Ele se manifestasse, não a todo o povo, mas às testemunhas que antecipadamente
          escolhera, entre as quais nós, que comemos e bebemos com Ele, após a sua ressurreição dos
          mortos. Ele nos mandou pregar ao povo e afirmar que foi estabelecido por Deus como Juiz
          dos vivos e dos mortos. É a Ele que todos os Profetas se referem quando testemunham: «que
          todos os que acreditaram n’Ele alcançarão em virtude do seu nome a remissão de seus
          pecados».
        </Typography>
      </Language>

      <H3 text="Gradual" />

      <Typography className="em">Sl. 117, 24 & 2</Typography>

      <Language>
        <Typography className="latin">
          Hæc dies, quam fecit Dóminus: exsultémus et lætémur in ea.
          <Typography className="versicle"> ℣. </Typography>
          Dicat nunc Israël, quóniam bonus: quóniam in sǽculum misericórdia ejus.
        </Typography>
        <Typography className="vernacular">
          Eis o dia que o -Senhor fez: exultemos e alegremo-nos nele. Diga, agora, Israel: Deus é
          bom; a sua misericórdia é eterna.
        </Typography>
        <Typography className="latin">
          Allelúja, allelúja.<Typography className="versicle"> ℣. </Typography>
          <Typography className="latin">Matth. 28, 2</Typography> Angelus Dómini descéndit de cœlo:
          et accédens revólvit lápidem, et sedébat super eum.
        </Typography>
        <Typography className="vernacular">
          Aleluia, aleluia.<Typography className="versicle"> ℣. </Typography>
          <Typography className="vernacular">Mt. 28, 2</Typography> Um anjo do Senhor desceu do céu,
          e, chegando-se, revolveu a pedra e assentou-se sobre ela.
        </Typography>
      </Language>

      <H3 text="Evangelho" />

      <Typography className="em">Lc. 24, 13-35</Typography>

      <Language>
        <Typography className="latin">
          <Typography className="cross"> ✠ </Typography> Sequéntia sancti Evangélii secúndum Lucam.
        </Typography>
        <Typography className="vernacular">
          <Typography className="cross"> ✠ </Typography> Continuação do santo Evangelho segundo S.
          Lucas.
        </Typography>
        <Typography className="latin">
          In illo témpore: Duo ex discípulis Jesu ibant ipsa die in castéllum, quod erat in spátio
          stadiórum sexagínta ab Jerúsalem, nómine Emmaus. Et ipsi loquebántur ad ínvicem de his
          ómnibus, quæ accíderant. Et factum est, dum fabularéntur et secum quǽrerent: et ipse Jesus
          appropínquans ibat cum illis: óculi autem illórum tenebántur, ne eum agnóscerent. Et ait
          ad illos: Qui sunt hi sermónes, quos confértis ad ínvicem ambulántes, et estis tristes? Et
          respóndens unus, cui nomen Cléophas, dixit ei: Tu solus peregrínus es in Jerúsalem, et non
          cognovísti, quæ facta sunt in illa his diébus? Quibus ille dixit: Quæ? Et dixérunt: De
          Jesu Nazaréno, qui fuit vir Prophéta potens in ópere et sermóne, coram Deo et omni pópulo:
          et quómodo eum tradidérunt summi sacerdótes et príncipes nostri in damnatiónem mortis, et
          crucifixérunt eum. Nos autem sperabámus, quia ipse esset redemptúrus Israël: et nunc super
          hæc ómnia tértia dies est hódie, quod hæc facta sunt. Sed et mulíeres quædam ex nostris
          terruérunt nos, quæ ante lucem fuérunt ad monuméntum, et, non invénto córpore ejus,
          venérunt, dicéntes se étiam visiónem Angelórum vidísse, qui dicunt eum vívere. Et abiérunt
          quidam ex nostris ad monuméntum: et ita invenérunt, sicut mulíeres dixérunt, ipsum vero
          non invenérunt. Et ipse dixit ad eos: O stulti et tardi corde ad credéndum in ómnibus, quæ
          locúti sunt Prophétæ! Nonne hæc opórtuit pati Christum, et ita intráre in glóriam suam? Et
          incípiens a Móyse et ómnibus Prophétis, interpretabátur illis in ómnibus Scriptúris, quæ
          de ipso erant. Et appropinquavérunt castéllo, quo ibant: et ipse se finxit lóngius ire. Et
          coëgérunt illum, dicéntes: Mane nobiscum, quóniam advesperáscit et inclináta est jam dies.
          Et intrávit cum illis. Et factum est, dum recúmberet cum eis, accépit panem, et benedíxit,
          ac fregit, et porrigébat illis. Et apérti sunt óculi eórum, et cognovérunt eum: et ipse
          evánuit ex óculis eórum. Et dixérunt ad ínvicem: Nonne cor nostrum ardens erat in nobis,
          dum loquerétur in via, et aperíret nobis Scriptúras? Et surgéntes eádem hora regréssi sunt
          in Jerúsalem: et invenérunt congregátas úndecim, et eos, qui cum illis erant, dicéntes:
          Quod surréxit Dóminus vere, et appáruit Simóni. Et ipsi narrábant, quæ gesta erant in via:
          et quómodo cognovérunt eum in fractióne panis.
        </Typography>
        <Typography className="vernacular">
          Naquele tempo, iam dois discípulos, naquele mesmo dia, para uma aldeia chamada Emaús,
          distante de Jerusalém sessenta estádios, os quais iam conversando nas coisas que haviam
          sucedido. Ora aconteceu que, enquanto falavam e discutiam, aproximou-se Jesus e
          acompanhou-os; mas os olhos deles estavam tão entenebrecidos que O não conheceram. Jesus
          disse-lhes, então: «Que assuntos são esses em que vos entretendes, mesmo pelo caminho, e
          que vos mostram tão tristes?». Respondendo um deles, chamado Cléofas, disse-Lhe: «Só Vós
          sois tão alheio a Jerusalém, que ignorais o que se passou durante estes dias?». Ele disse:
          «Que foi?». E responderam: «O que diz respeito a Jesus Nazareno, que era um Profeta
          poderoso em obras e em palavras, diante de Deus e de todo o povo: e como os nossos
          príncipes dos sacerdotes e magistrados O entregaram, para ser condenado à morte, e O
          crucificaram. Nós esperávamos que fosse Ele quem resgatasse Israel, mas com tudo isto já
          hoje é o terceiro dia, depois que estas coisas aconteceram. É verdade que algumas
          mulheres, que são da nossa grei, nos causaram espanto, dizendo que, havendo ido de
          madrugada ao sepulcro, não tinham encontrado o corpo de Jesus; e vieram dizer que tinham
          visto um Anjo que lhes dissera estar Ele vivo. Alguns dos nossos foram ao sepulcro e
          encontraram as coisas como as mulheres haviam dito: mas O não viram». Então Jesus
          disse-lhes: «Ó insensatos, cujo coração é lento em acreditar o que os Profetas anunciaram!
          Porventura não convinha que Cristo padecesse essas coisas e que entrasse na sua glória?».
          E, começando em Moisés e percorrendo todos os Profetas, explicou-lhes tudo o que as
          Escrituras continham a seu respeito. Quando já estavam perto da aldeia para onde se
          dirigiam, Jesus deu a entender que ia mais longe. Porém, eles suplicaram-Lhe: «Ficai
          connosco, pois faz-se tarde e anoitece». Então, Jesus entrou com eles. Ora, aconteceu que,
          enquanto estava à mesa com eles, tomou o pão, benzeu-o e, partindo-o, apresentou-lho.
          Então abriram-se-lhes os olhos e reconhceram-n’O: mas Ele desapareceu da sua vista. E
          disseram um ao outro: «Porventura, enquanto Ele nos falava no caminho e explicava as
          Escrituras os nossos corações não pulsavam ardentemente?». E, erguendo-se imediatamente,
          voltaram a Jerusalém, onde estavam reunidos os Onze e os que estavam com estes, os quais
          lhes disseram: «O Senhor ressuscitou, verdadeiramente; já apareceu a Simão». E eles
          contaram o que se havia passado no caminho e, como O tinham reconhecido pela fracção do
          pão.
        </Typography>
      </Language>

      <H3 text="Ofertório" />

      <Typography className="em">Mt. 28, 2, 5 & 6</Typography>

      <Language>
        <Typography className="latin">
          Angelus Dómini descéndit de cœlo, et dixit muliéribus: Quem quǽritis, surréxit, sicut
          dixit, allelúja.
        </Typography>
        <Typography className="vernacular">
          Um Anjo do Senhor desceu do céu e disse às mulheres: «Aquele a quem buscais ressuscitou,
          como Ele havia dito», aleluia.
        </Typography>
      </Language>

      <H3 text="Secreta e Postcomúnio" />

      <Typography className="aside">Como no dia precedente</Typography>

      <H3 text="Comúnio" />

      <Typography className="em">Lc. 24, 34</Typography>

      <Language>
        <Typography className="latin">Surréxit Dóminus, et appáruit Petro, allelúja.</Typography>
        <Typography className="vernacular">
          Ressuscitou o Senhor e apareceu a Pedro, aleluia.
        </Typography>
      </Language>
    </PageWrapper>
  );
}
