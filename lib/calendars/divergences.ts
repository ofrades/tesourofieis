/**
 * Sanctoral divergences between the pre-55 calendar and Rubrics 1960,
 * generated mechanically by chaining divinum-officium's Kalendaria deltas
 * (1570 -> 1888 -> 1906 -> 1939 -> 1954 -> 1955 -> 1960).
 *
 * This is the authoritative worklist for porting edition data: each entry
 * states what the day holds under each edition, using DO's Latin names and
 * rank scale. Structural divergences (octaves suppressed, vigil reductions,
 * Holy Week reform) are partially visible here via their octave-day lines;
 * tempora-level changes are handled separately.
 *
 * `null` means the observance does not exist in that edition.
 */
export interface KalendarEntry {
  name: string;
  rank: number;
}

export interface Divergence {
  /** Fixed date, "MM-DD". */
  date: string;
  pre55: KalendarEntry | null;
  m1962: KalendarEntry | null;
}

export const SANCTORAL_DIVERGENCES: Divergence[] = [
  {
    date: "01-05",
    pre55: { name: "Vigilia Epiphaniae", rank: 2.0 },
    m1962: { name: "S. Telesphori Papae et Martyris", rank: 1.0 },
  },
  {
    date: "01-18",
    pre55: { name: "Cathedrae S. Petri", rank: 4.0 },
    m1962: { name: "S Priscae Virginis", rank: 1.0 },
  },
  {
    date: "01-25",
    pre55: { name: "In Conversione S. Pauli Apostoli", rank: 3.0 },
    m1962: { name: "In Conversione S. Pauli Apostoli", rank: 4.0 },
  },
  {
    date: "05-01",
    pre55: { name: "SS Philippi et Jacobi Apostolorum", rank: 5.0 },
    m1962: { name: "S. Joseph Opificis", rank: 6.0 },
  },
  {
    date: "05-03",
    pre55: { name: "Inventione Sanctae crucis", rank: 5.0 },
    m1962: { name: "Ss. Alexandri et sociorum Martyrum", rank: 1.0 },
  },
  { date: "05-11", pre55: null, m1962: { name: "Ss. Philippi et Jacobi Apostolorum", rank: 5.0 } },
  { date: "06-17", pre55: null, m1962: { name: "S. Gregorii Barbadici Ep. Conf", rank: 3.0 } },
  {
    date: "06-28",
    pre55: { name: "S. Irenaei Episcopi et Martyris", rank: 3.0 },
    m1962: { name: "Vigilia Ss. Petri et Pauli Apostolorum", rank: 5.0 },
  },
  {
    date: "07-03",
    pre55: { name: "S. Leonis Papae et Confessoris", rank: 2.0 },
    m1962: { name: "S. Irenaei Episcopi et Martyris", rank: 3.0 },
  },
  {
    date: "07-21",
    pre55: { name: "S. Praxedis Virginis", rank: 1.0 },
    m1962: { name: "S. Laurentii de Brundusio Confessoris et Ecclesiae Doctoris", rank: 3.0 },
  },
  {
    date: "07-24",
    pre55: { name: "Vigilia S. Jacobi Apostoli", rank: 1.5 },
    m1962: { name: "S. Christinae Virginis Martyris", rank: 1.0 },
  },
  {
    date: "08-01",
    pre55: { name: "S. Petri ad Vincula", rank: 4.0 },
    m1962: { name: "Ss. Martyrum Machabaeorum", rank: 1.0 },
  },
  {
    date: "08-08",
    pre55: { name: "Ss. Cyriaci, Largi et Smaragdi Martyrum", rank: 2.0 },
    m1962: { name: "S. Joannis Vianney Confessoris", rank: 3.0 },
  },
  {
    date: "08-09",
    pre55: { name: "S. Joannis Vianney Confessoris", rank: 3.0 },
    m1962: { name: "Vigilia S. Laurentii Martyris", rank: 3.0 },
  },
  {
    date: "08-16",
    pre55: { name: "S. Joachim Confessoris, Patris B Mariae Virginis", rank: 5.0 },
    m1962: { name: "S. Joachim Confessoris", rank: 5.0 },
  },
  {
    date: "08-18",
    pre55: { name: "Quarta die infra Octavam S. Assumptionis", rank: 2.0 },
    m1962: { name: "S. Agapiti Martyris", rank: 1.0 },
  },
  {
    date: "08-23",
    pre55: { name: "S. Philippi BenitiConfessoris", rank: 3.0 },
    m1962: { name: "S. Philippi Beniti Confessoris", rank: 3.0 },
  },
  {
    date: "10-07",
    pre55: { name: "Sanctissimi Rosarii Beatae Mariae Virginis", rank: 5.0 },
    m1962: { name: "Festum Beatae Mariae Virginis a Rosario", rank: 5.0 },
  },
  {
    date: "10-23",
    pre55: null,
    m1962: { name: "S. Antonii Mariae Claret Episcopi Confessoris", rank: 3.0 },
  },
  {
    date: "11-08",
    pre55: { name: "In Octava Omnium Sanctorum", rank: 3.0 },
    m1962: { name: "Ss. Quatuor Coronatorum Martyrum", rank: 1.0 },
  },
  {
    date: "11-29",
    pre55: { name: "Vigilia S. Andreas Apostol", rank: 1.5 },
    m1962: { name: "S. Saturnini Martyris", rank: 1.0 },
  },
  {
    date: "12-10",
    pre55: {
      name: "De III die Infra Octavam Immaculatae Concept Beatae Mariae Virgini",
      rank: 2.0,
    },
    m1962: { name: "S. Melchiadis Papae et Mart", rank: 1.0 },
  },
  {
    date: "12-28",
    pre55: { name: "Ss. Innocetium", rank: 5.0 },
    m1962: { name: "Die quarta infra octavam Nativitatis", rank: 5.0 },
  },
  {
    date: "12-29",
    pre55: { name: "S. Thomae Episcopi et Martyris", rank: 3.0 },
    m1962: { name: "Die quinta infra octavam Nativitatis", rank: 5.0 },
  },
  {
    date: "12-31",
    pre55: { name: "S. Silvestri Papae et Conf", rank: 3.0 },
    m1962: { name: "Die septima infra octavam Nativitatis", rank: 5.0 },
  },
];

/**
 * Feasts whose liturgical grade differs between pre-55 rubrics and Rubrics
 * 1960, extracted from divinum-officium's per-rubrica [Rank] sections
 * (missa/Latin/Sancti). These map directly onto Mass.rankVariants.
 */
export interface RankDivergence {
  /** Fixed date, "MM-DD". */
  date: string;
  feast: string;
  variants: { rubrics: string; name: string; precedence: number }[];
}

export const RANK_DIVERGENCES: RankDivergence[] = [
  {
    date: "01-07",
    feast: "Semiduplex",
    variants: [
      { rubrics: "*", name: "Semiduplex", precedence: 5.6 },
      { rubrics: "R1960", name: "Feria", precedence: 1.2 },
    ],
  },
  {
    date: "01-08",
    feast: "Semiduplex",
    variants: [
      { rubrics: "*", name: "Semiduplex", precedence: 5.6 },
      { rubrics: "R1960", name: "Feria", precedence: 1.2 },
    ],
  },
  {
    date: "01-09",
    feast: "Semiduplex",
    variants: [
      { rubrics: "*", name: "Semiduplex", precedence: 5.6 },
      { rubrics: "R1960", name: "Feria", precedence: 1.2 },
    ],
  },
  {
    date: "01-10",
    feast: "Semiduplex",
    variants: [
      { rubrics: "*", name: "Semiduplex", precedence: 5.6 },
      { rubrics: "R1960", name: "Feria", precedence: 1.2 },
    ],
  },
  {
    date: "01-11",
    feast: "Semiduplex",
    variants: [
      { rubrics: "*", name: "Semiduplex", precedence: 5.6 },
      { rubrics: "R1960", name: "Feria", precedence: 1.2 },
    ],
  },
  {
    date: "01-12",
    feast: "Semiduplex",
    variants: [
      { rubrics: "*", name: "Semiduplex", precedence: 5.6 },
      { rubrics: "R1960", name: "Feria", precedence: 1.8 },
    ],
  },
  {
    date: "01-13",
    feast: "Duplex majus",
    variants: [
      { rubrics: "*", name: "Duplex majus", precedence: 4.0 },
      { rubrics: "R1960", name: "Duplex II. classis", precedence: 5.0 },
    ],
  },
  {
    date: "02-11",
    feast: "Duplex majus",
    variants: [
      { rubrics: "*", name: "Duplex majus", precedence: 4.0 },
      { rubrics: "R1960", name: "Duplex", precedence: 2.1 },
    ],
  },
  {
    date: "03-17",
    feast: "Duplex",
    variants: [
      { rubrics: "*", name: "Duplex", precedence: 3.0 },
      { rubrics: "R1960", name: "Duplex", precedence: 2.0 },
    ],
  },
  {
    date: "09-14",
    feast: "Duplex majus",
    variants: [
      { rubrics: "*", name: "Duplex majus", precedence: 4.0 },
      { rubrics: "R1960", name: "Duplex II classis", precedence: 5.5 },
      { rubrics: '"rubrica cisterciensis"', name: "Duplex II classis", precedence: 3.0 },
    ],
  },
];
