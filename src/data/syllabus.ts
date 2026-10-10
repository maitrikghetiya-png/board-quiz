import { Chapter, SubjectId, MarkingSchemeDetails } from '../types';

export interface SubjectMeta {
  id: SubjectId;
  name: string;
  code: string;
  totalTheoryMarks: number;
  totalPracticalMarks: number;
  durationHours: number;
  description: string;
  color: string;
  accentColor: string;
  badgeBg: string;
}

export const SUBJECTS: Record<SubjectId, SubjectMeta> = {
  physics: {
    id: 'physics',
    name: 'Physics',
    code: '042',
    totalTheoryMarks: 70,
    totalPracticalMarks: 30,
    durationHours: 3,
    description: 'Mechanics, Electrodynamics, Optics, Modern Physics & Semiconductor Electronics',
    color: 'from-blue-600 to-indigo-700',
    accentColor: 'text-blue-600',
    badgeBg: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  chemistry: {
    id: 'chemistry',
    name: 'Chemistry',
    code: '043',
    totalTheoryMarks: 70,
    totalPracticalMarks: 30,
    durationHours: 3,
    description: 'Physical Chemistry, Inorganic Coordination Chemistry & Organic Functional Groups',
    color: 'from-emerald-600 to-teal-700',
    accentColor: 'text-emerald-600',
    badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  mathematics: {
    id: 'mathematics',
    name: 'Mathematics',
    code: '041',
    totalTheoryMarks: 80,
    totalPracticalMarks: 20,
    durationHours: 3,
    description: 'Calculus, Vectors & 3D Geometry, Linear Algebra, Probability & Optimization',
    color: 'from-purple-600 to-indigo-800',
    accentColor: 'text-purple-600',
    badgeBg: 'bg-purple-50 text-purple-700 border-purple-200'
  }
};

export const CHAPTERS: Chapter[] = [
  // --- PHYSICS (14 Chapters) ---
  {
    id: 'phy-ch01',
    name: 'Electric Charges and Fields',
    unitNumber: 1,
    unitName: 'Electrostatics',
    subjectId: 'physics',
    weightageMarks: 8,
    topicsSummary: ["Coulomb's Law", "Electric field lines", "Electric flux", "Gauss's Law and applications", "Dipole in uniform field"]
  },
  {
    id: 'phy-ch02',
    name: 'Electrostatic Potential and Capacitance',
    unitNumber: 1,
    unitName: 'Electrostatics',
    subjectId: 'physics',
    weightageMarks: 8,
    topicsSummary: ["Equipotential surfaces", "Potential energy of dipoles", "Capacitors in series/parallel", "Dielectrics", "Energy stored in capacitor"]
  },
  {
    id: 'phy-ch03',
    name: 'Current Electricity',
    unitNumber: 2,
    unitName: 'Current Electricity',
    subjectId: 'physics',
    weightageMarks: 7,
    topicsSummary: ["Drift velocity & Ohm's Law", "Resistivity vs temperature", "Kirchhoff's rules", "Wheatstone bridge", "Cell EMF and internal resistance"]
  },
  {
    id: 'phy-ch04',
    name: 'Moving Charges and Magnetism',
    unitNumber: 3,
    unitName: 'Magnetic Effects of Current & Magnetism',
    subjectId: 'physics',
    weightageMarks: 9,
    topicsSummary: ["Biot-Savart Law", "Ampere's Circuital Law", "Torque on current loop", "Moving Coil Galvanometer", "Lorentz force"]
  },
  {
    id: 'phy-ch05',
    name: 'Magnetism and Matter',
    unitNumber: 3,
    unitName: 'Magnetic Effects of Current & Magnetism',
    subjectId: 'physics',
    weightageMarks: 4,
    topicsSummary: ["Bar magnet as equivalent solenoid", "Magnetic field lines", "Diamagnetism, paramagnetism, ferromagnetism", "Curie's Law"]
  },
  {
    id: 'phy-ch06',
    name: 'Electromagnetic Induction',
    unitNumber: 4,
    unitName: 'Electromagnetic Induction & Alternating Currents',
    subjectId: 'physics',
    weightageMarks: 6,
    topicsSummary: ["Faraday's experiments & law", "Lenz's Law & conservation of energy", "Motional EMF", "Self and mutual inductance"]
  },
  {
    id: 'phy-ch07',
    name: 'Alternating Currents',
    unitNumber: 4,
    unitName: 'Electromagnetic Induction & Alternating Currents',
    subjectId: 'physics',
    weightageMarks: 8,
    topicsSummary: ["Peak and RMS values", "LCR series circuit & resonance", "Power factor", "Wattless current", "AC generator & transformer"]
  },
  {
    id: 'phy-ch08',
    name: 'Electromagnetic Waves',
    unitNumber: 5,
    unitName: 'Electromagnetic Waves',
    subjectId: 'physics',
    weightageMarks: 3,
    topicsSummary: ["Displacement current", "Characteristics of EM waves", "Transverse nature", "Electromagnetic spectrum and applications"]
  },
  {
    id: 'phy-ch09',
    name: 'Ray Optics and Optical Instruments',
    unitNumber: 6,
    unitName: 'Optics',
    subjectId: 'physics',
    weightageMarks: 10,
    topicsSummary: ["Total internal reflection & optical fibres", "Refraction at spherical surfaces & Lens Maker's formula", "Prism dispersion", "Astronomical telescope & compound microscope"]
  },
  {
    id: 'phy-ch10',
    name: 'Wave Optics',
    unitNumber: 6,
    unitName: 'Optics',
    subjectId: 'physics',
    weightageMarks: 8,
    topicsSummary: ["Huygens' Principle", "Interference of light & Young's Double Slit Experiment", "Fringe width expression", "Single slit diffraction"]
  },
  {
    id: 'phy-ch11',
    name: 'Dual Nature of Radiation and Matter',
    unitNumber: 7,
    unitName: 'Dual Nature of Radiation & Matter',
    subjectId: 'physics',
    weightageMarks: 6,
    topicsSummary: ["Photoelectric effect observations", "Einstein's photoelectric equation", "Threshold frequency & work function", "de Broglie wavelength"]
  },
  {
    id: 'phy-ch12',
    name: 'Atoms',
    unitNumber: 8,
    unitName: 'Atoms and Nuclei',
    subjectId: 'physics',
    weightageMarks: 4,
    topicsSummary: ["Alpha-particle scattering & Rutherford model", "Bohr model postulates & energy levels", "Hydrogen spectrum series (Lyman, Balmer, etc.)"]
  },
  {
    id: 'phy-ch13',
    name: 'Nuclei',
    unitNumber: 8,
    unitName: 'Atoms and Nuclei',
    subjectId: 'physics',
    weightageMarks: 4,
    topicsSummary: ["Nuclear composition, density & size", "Mass defect and binding energy per nucleon", "Nuclear fission and fusion"]
  },
  {
    id: 'phy-ch14',
    name: 'Semiconductor Electronics: Materials, Devices and Simple Circuits',
    unitNumber: 9,
    unitName: 'Electronic Devices',
    subjectId: 'physics',
    weightageMarks: 7,
    topicsSummary: ["Energy bands in solids", "Intrinsic and extrinsic semiconductors (p-type, n-type)", "p-n junction formation", "p-n diode as half/full wave rectifier"]
  },

  // --- CHEMISTRY (10 Chapters - Rationalized CBSE 2026-27) ---
  {
    id: 'chem-ch01',
    name: 'Solutions',
    unitNumber: 1,
    unitName: 'Solutions',
    subjectId: 'chemistry',
    weightageMarks: 7,
    topicsSummary: ["Henry's Law", "Raoult's Law & ideal/non-ideal solutions", "Colligative properties (ΔTb, ΔTf, osmotic pressure)", "van 't Hoff factor & abnormal molar masses"]
  },
  {
    id: 'chem-ch02',
    name: 'Electrochemistry',
    unitNumber: 2,
    unitName: 'Electrochemistry',
    subjectId: 'chemistry',
    weightageMarks: 9,
    topicsSummary: ["Nernst equation & EMF of cells", "Kohlrausch's law of independent migration", "Molar conductivity vs concentration", "Faraday's laws of electrolysis", "Fuel cells & batteries"]
  },
  {
    id: 'chem-ch03',
    name: 'Chemical Kinetics',
    unitNumber: 3,
    unitName: 'Chemical Kinetics',
    subjectId: 'chemistry',
    weightageMarks: 7,
    topicsSummary: ["Rate law, order & molecularity", "Integrated rate equations (zero and first order)", "Half-life of reaction", "Arrhenius equation & activation energy"]
  },
  {
    id: 'chem-ch04',
    name: 'The d- and f-Block Elements',
    unitNumber: 4,
    unitName: 'Inorganic Chemistry',
    subjectId: 'chemistry',
    weightageMarks: 7,
    topicsSummary: ["Transition elements electronic configurations", "Variable oxidation states & magnetic properties", "Lanthanoid contraction", "Preparation & properties of KMnO4 and K2Cr2O7"]
  },
  {
    id: 'chem-ch05',
    name: 'Coordination Compounds',
    unitNumber: 5,
    unitName: 'Coordination Chemistry',
    subjectId: 'chemistry',
    weightageMarks: 7,
    topicsSummary: ["IUPAC nomenclature of complexes", "Werner's coordination theory", "Valence Bond Theory (inner/outer orbital)", "Crystal Field Theory (octahedral & tetrahedral splitting)"]
  },
  {
    id: 'chem-ch06',
    name: 'Haloalkanes and Haloarenes',
    unitNumber: 6,
    unitName: 'Organic Chemistry I',
    subjectId: 'chemistry',
    weightageMarks: 6,
    topicsSummary: ["SN1 and SN2 reaction mechanisms", "Optical isomerism & stereochemical inversion", "Electrophilic substitution in haloarenes", "Grignard reagent & Wurtz-Fittig reaction"]
  },
  {
    id: 'chem-ch07',
    name: 'Alcohols, Phenols and Ethers',
    unitNumber: 7,
    unitName: 'Organic Chemistry II',
    subjectId: 'chemistry',
    weightageMarks: 6,
    topicsSummary: ["Hydroboration-oxidation & acid-catalyzed hydration", "Acidity of phenols vs alcohols", "Reimer-Tiemann & Kolbe's reactions", "Williamson ether synthesis & cleavage with HI"]
  },
  {
    id: 'chem-ch08',
    name: 'Aldehydes, Ketones and Carboxylic Acids',
    unitNumber: 8,
    unitName: 'Organic Chemistry III',
    subjectId: 'chemistry',
    weightageMarks: 8,
    topicsSummary: ["Nucleophilic addition to carbonyl group", "Aldol condensation & Cannizzaro reaction", "Tollens' and Fehling's tests", "Hell-Volhard-Zelinsky (HVZ) reaction & acidity of carboxylic acids"]
  },
  {
    id: 'chem-ch09',
    name: 'Amines',
    unitNumber: 9,
    unitName: 'Organic Chemistry IV',
    subjectId: 'chemistry',
    weightageMarks: 6,
    topicsSummary: ["Gabriel phthalimide synthesis", "Hoffmann bromamide degradation", "Basicity order in gaseous vs aqueous phases", "Hinsberg test", "Diazonium salts coupling reactions"]
  },
  {
    id: 'chem-ch10',
    name: 'Biomolecules',
    unitNumber: 10,
    unitName: 'Biomolecules',
    subjectId: 'chemistry',
    weightageMarks: 7,
    topicsSummary: ["Classification of carbohydrates (reducing vs non-reducing)", "Structure of D-glucose & cyclic form", "Peptide bond, denaturation of proteins", "DNA vs RNA structure & nucleic acids", "Vitamins & deficiencies"]
  },

  // --- MATHEMATICS (13 Chapters - CBSE 2026-27) ---
  {
    id: 'math-ch01',
    name: 'Relations and Functions',
    unitNumber: 1,
    unitName: 'Relations and Functions',
    subjectId: 'mathematics',
    weightageMarks: 5,
    topicsSummary: ["Reflexive, symmetric, transitive relations", "Equivalence relations", "One-one (injective) and onto (surjective) functions", "Bijective mappings"]
  },
  {
    id: 'math-ch02',
    name: 'Inverse Trigonometric Functions',
    unitNumber: 1,
    unitName: 'Relations and Functions',
    subjectId: 'mathematics',
    weightageMarks: 3,
    topicsSummary: ["Definition, range, domain, principal value branches", "Graphs of inverse trigonometric functions", "Elementary properties"]
  },
  {
    id: 'math-ch03',
    name: 'Matrices',
    unitNumber: 2,
    unitName: 'Algebra',
    subjectId: 'mathematics',
    weightageMarks: 5,
    topicsSummary: ["Matrix operations & non-commutativity of multiplication", "Transpose & symmetric/skew-symmetric matrices", "Invertible matrices and uniqueness of inverse"]
  },
  {
    id: 'math-ch04',
    name: 'Determinants',
    unitNumber: 2,
    unitName: 'Algebra',
    subjectId: 'mathematics',
    weightageMarks: 5,
    topicsSummary: ["Determinant of square matrix (up to 3x3)", "Minors and cofactors", "Adjoint and inverse of matrix", "Solving system of linear equations using matrix method"]
  },
  {
    id: 'math-ch05',
    name: 'Continuity and Differentiability',
    unitNumber: 3,
    unitName: 'Calculus',
    subjectId: 'mathematics',
    weightageMarks: 8,
    topicsSummary: ["Continuity at a point and in an interval", "Chain rule & implicit differentiation", "Logarithmic differentiation", "Parametric form derivatives & second order derivatives"]
  },
  {
    id: 'math-ch06',
    name: 'Applications of Derivatives',
    unitNumber: 3,
    unitName: 'Calculus',
    subjectId: 'mathematics',
    weightageMarks: 6,
    topicsSummary: ["Rate of change of quantities", "Strictly increasing and decreasing functions", "Maxima and minima (first & second derivative tests)", "Practical optimization problems"]
  },
  {
    id: 'math-ch07',
    name: 'Integrals',
    unitNumber: 3,
    unitName: 'Calculus',
    subjectId: 'mathematics',
    weightageMarks: 9,
    topicsSummary: ["Integration by substitution, partial fractions & parts", "Definite integrals as limit of a sum", "Fundamental Theorem of Calculus", "Basic properties of definite integrals"]
  },
  {
    id: 'math-ch08',
    name: 'Applications of the Integrals',
    unitNumber: 3,
    unitName: 'Calculus',
    subjectId: 'mathematics',
    weightageMarks: 4,
    topicsSummary: ["Area under simple curves (circles, parabolas, ellipses)", "Area bounded between curves and coordinate axes"]
  },
  {
    id: 'math-ch09',
    name: 'Differential Equations',
    unitNumber: 3,
    unitName: 'Calculus',
    subjectId: 'mathematics',
    weightageMarks: 6,
    topicsSummary: ["Order and degree of differential equation", "General and particular solutions", "Variable separable method", "Homogeneous & Linear differential equations (dy/dx + Py = Q)"]
  },
  {
    id: 'math-ch10',
    name: 'Vectors',
    unitNumber: 4,
    unitName: 'Vectors and Three-Dimensional Geometry',
    subjectId: 'mathematics',
    weightageMarks: 7,
    topicsSummary: ["Direction cosines and direction ratios", "Dot (scalar) product and its geometrical projection", "Cross (vector) product and area of triangle/parallelogram"]
  },
  {
    id: 'math-ch11',
    name: 'Three-Dimensional Geometry',
    unitNumber: 4,
    unitName: 'Vectors and Three-Dimensional Geometry',
    subjectId: 'mathematics',
    weightageMarks: 7,
    topicsSummary: ["Equation of a line in vector and Cartesian form", "Angle between two lines", "Shortest distance between two skew lines", "Coplanar lines"]
  },
  {
    id: 'math-ch12',
    name: 'Linear Programming',
    unitNumber: 5,
    unitName: 'Linear Programming',
    subjectId: 'mathematics',
    weightageMarks: 5,
    topicsSummary: ["Formulation of linear programming problems", "Graphical method of solution for two variables", "Feasible and infeasible regions", "Corner point method for optimal values"]
  },
  {
    id: 'math-ch13',
    name: 'Probability',
    unitNumber: 6,
    unitName: 'Probability',
    subjectId: 'mathematics',
    weightageMarks: 8,
    topicsSummary: ["Conditional probability & multiplication rule", "Independent events", "Total Probability Theorem & Bayes' Theorem", "Probability distribution of random variables"]
  }
];

export const MARKING_SCHEMES: Record<string, MarkingSchemeDetails> = {
  practice_standard: {
    id: 'practice_standard',
    name: 'Standard Practice Mode (+4 / -1)',
    correct: 4,
    incorrect: -1,
    unanswered: 0,
    description: 'High-stake competitive simulation (+4 for correct, -1 for incorrect penalty). Builds calculated decision-making.'
  },
  board_mcq: {
    id: 'board_mcq',
    name: 'Board Single-Mark Pattern (+1 / 0)',
    correct: 1,
    incorrect: 0,
    unanswered: 0,
    description: 'Direct CBSE Section-A style: 1 mark per correct answer with zero negative marking. Ideal for pure syllabus mastery.'
  },
  no_negative: {
    id: 'no_negative',
    name: 'Balanced Practice (+4 / 0)',
    correct: 4,
    incorrect: 0,
    unanswered: 0,
    description: 'Encourages attempting conceptual questions without score deduction for wrong choices.'
  }
};
