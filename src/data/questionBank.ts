import { Question } from '../types';

export const VERIFIED_QUESTIONS: Question[] = [
  {
    "id": "phy-q01",
    "subjectId": "physics",
    "chapterId": "phy-ch01",
    "chapterName": "Electric Charges and Fields",
    "difficulty": "moderate",
    "questionText": "Two point charges +4 μC and -1 μC are separated by a distance of 30 cm in air. At what point on the line joining them (measured from the -1 μC charge) is the net electric field zero?",
    "options": [
      "20 cm from the -1 μC charge, between the charges",
      "30 cm from the -1 μC charge, outside the two charges",
      "15 cm from the -1 μC charge, outside the two charges",
      "10 cm from the -1 μC charge, between the charges"
    ],
    "correctOptionIndex": 1,
    "explanation": "For opposite charges, the net electric field can only be zero on the line outside the charges, closer to the charge of smaller magnitude.",
    "stepByStepSolution": [
      "Step 1: Identify that charges have opposite signs (+4 μC and -1 μC). Between them, their electric field vectors add in the same direction, so E_net cannot be zero between them.",
      "Step 2: Let the null point be at distance r from the smaller magnitude charge (-1 μC), outside the segment. Its distance from +4 μC is (30 + r) cm.",
      "Step 3: Equate magnitudes: k × (4 × 10^-6) / (30 + r)^2 = k × (1 × 10^-6) / r^2.",
      "Step 4: Take square root on both sides: 2 / (30 + r) = 1 / r  =>  2r = 30 + r  =>  r = 30 cm.",
      "Conclusion: The null point lies 30 cm from the -1 μC charge, on the outside."
    ],
    "conceptTakeaway": "The zero field point for unlike charges always lies outside the line segment connecting them and adjacent to the smaller magnitude charge.",
    "formulasUsed": [
      "E = (1 / 4πε₀) × (q / r²)",
      "E_net = E₁ - E₂ = 0"
    ]
  },
  {
    "id": "phy-q02",
    "subjectId": "physics",
    "chapterId": "phy-ch02",
    "chapterName": "Electrostatic Potential and Capacitance",
    "difficulty": "moderate",
    "questionText": "A parallel plate capacitor has a capacitance of C = 12 μF with air between its plates. A dielectric slab of dielectric constant K = 4 and thickness t = d/2 (where d is the plate separation) is introduced between the plates. What is the new capacitance?",
    "options": [
      "16.0 μF",
      "24.0 μF",
      "19.2 μF",
      "48.0 μF"
    ],
    "correctOptionIndex": 2,
    "explanation": "Inserting a dielectric slab of thickness t changes the effective air-equivalent gap to (d - t + t/K).",
    "stepByStepSolution": [
      "Step 1: The standard formula for capacitance with a dielectric slab of thickness t is C' = ε₀A / (d - t + t/K).",
      "Step 2: Substitute t = d/2 and K = 4 into the denominator: d - d/2 + (d/2)/4 = d/2 + d/8 = 5d/8.",
      "Step 3: Hence, C' = ε₀A / (5d/8) = (8/5) × (ε₀A / d) = (8/5) × C.",
      "Step 4: Calculate numerical value: C' = (8/5) × 12 μF = 1.6 × 12 μF = 19.2 μF."
    ],
    "conceptTakeaway": "Partial dielectrics behave as two capacitors in series: an air capacitor of thickness (d - t) and a dielectric capacitor of thickness t.",
    "formulasUsed": [
      "C₀ = ε₀A / d",
      "C = ε₀A / [d - t(1 - 1/K)]"
    ]
  },
  {
    "id": "phy-q03",
    "subjectId": "physics",
    "chapterId": "phy-ch03",
    "chapterName": "Current Electricity",
    "difficulty": "easy",
    "questionText": "In a potentiometer circuit, a standard cell of EMF 1.25 V gives a balance point at 35.0 cm length of wire. When another unknown cell replaces the standard cell, the balance point shifts to 63.0 cm. What is the EMF of the second cell?",
    "options": [
      "0.69 V",
      "1.80 V",
      "2.75 V",
      "2.25 V"
    ],
    "correctOptionIndex": 3,
    "explanation": "The EMF of a cell measured by a potentiometer is directly proportional to its balancing length because no current is drawn at null deflection.",
    "stepByStepSolution": [
      "Step 1: In a potentiometer wire with constant potential gradient k, E = k × l.",
      "Step 2: Comparing two cells gives E₁ / E₂ = l₁ / l₂.",
      "Step 3: Substitute given values: 1.25 / E₂ = 35.0 / 63.0.",
      "Step 4: Simplify ratio 35.0 / 63.0 = 5 / 9.",
      "Step 5: Solve for E₂: E₂ = 1.25 × (9 / 5) = 1.25 × 1.8 = 2.25 V."
    ],
    "conceptTakeaway": "Potentiometer draws zero current at the null point, functioning as an ideal voltmeter with infinite input impedance.",
    "formulasUsed": [
      "E₁ / E₂ = l₁ / l₂"
    ]
  },
  {
    "id": "phy-q04",
    "subjectId": "physics",
    "chapterId": "phy-ch04",
    "chapterName": "Moving Charges and Magnetism",
    "difficulty": "moderate",
    "questionText": "A circular coil consisting of 50 closely wound turns and radius 10 cm carries a steady electric current of 2.0 A. What is the magnitude of the magnetic field at the centre of the coil? (Take μ₀ = 4π × 10⁻⁷ T·m/A)",
    "options": [
      "6.28 × 10⁻⁴ T",
      "3.14 × 10⁻⁴ T",
      "1.26 × 10⁻³ T",
      "6.28 × 10⁻⁵ T"
    ],
    "correctOptionIndex": 0,
    "explanation": "The magnetic field at the centre of a circular loop is B = (μ₀ N I) / (2 R).",
    "stepByStepSolution": [
      "Step 1: Identify parameters: N = 50, R = 10 cm = 0.10 m, I = 2.0 A, μ₀ = 4π × 10⁻⁷ T·m/A.",
      "Step 2: Apply the circular coil formula: B = (μ₀ × N × I) / (2 × R).",
      "Step 3: Substitute values: B = (4π × 10⁻⁷ × 50 × 2.0) / (2 × 0.10).",
      "Step 4: B = (4π × 10⁻⁷ × 100) / 0.20 = (4π × 10⁻⁵) / 0.20 = 20π × 10⁻⁵ T = 2π × 10⁻⁴ T.",
      "Step 5: Using π ≈ 3.1416: B = 2 × 3.1416 × 10⁻⁴ T = 6.283 × 10⁻⁴ T ≈ 6.28 × 10⁻⁴ T."
    ],
    "conceptTakeaway": "At the centre of a flat coil, each turn contributes equally to the axial magnetic field vectors.",
    "formulasUsed": [
      "B = (μ₀ N I) / (2 R)"
    ]
  },
  {
    "id": "phy-q05",
    "subjectId": "physics",
    "chapterId": "phy-ch06",
    "chapterName": "Electromagnetic Induction",
    "difficulty": "challenging",
    "questionText": "A square loop of side 10 cm and resistance 0.5 Ω is placed vertically in the east-west plane. A uniform magnetic field of 0.10 T is set up across the plane in the north-east direction. The magnetic field is decreased to zero in 0.70 s at a steady rate. What is the magnitude of the induced current in this time interval?",
    "options": [
      "1.01 mA",
      "2.02 mA",
      "4.04 mA",
      "0.50 mA"
    ],
    "correctOptionIndex": 1,
    "explanation": "Induced EMF = |ΔΦ/Δt| where Φ = B A cos θ. Normal to east-west plane points North; field is North-East, so θ = 45°.",
    "stepByStepSolution": [
      "Step 1: Normal vector to east-west plane points North. Magnetic field points North-East, so angle θ between normal and B is 45° (cos 45° = 1/√2 ≈ 0.7071).",
      "Step 2: Area of loop A = (0.10 m)² = 0.01 m² = 10⁻² m².",
      "Step 3: Initial flux Φ₁ = B × A × cos 45° = 0.10 × 0.01 × (1/√2) = 10⁻³ / 1.414 ≈ 7.07 × 10⁻⁴ Wb. Final flux Φ₂ = 0.",
      "Step 4: Induced EMF ε = |ΔΦ / Δt| = (7.07 × 10⁻⁴ Wb) / 0.70 s = 1.01 × 10⁻³ V = 1.01 mV.",
      "Step 5: Induced current I = ε / R = (1.01 × 10⁻³ V) / 0.5 Ω = 2.02 × 10⁻³ A = 2.02 mA."
    ],
    "conceptTakeaway": "Faraday-Lenz law requires determining the exact geometric angle between the area normal vector and the magnetic flux density vector.",
    "formulasUsed": [
      "Φ = B · A = B A cos θ",
      "ε = - dΦ/dt",
      "I = ε / R"
    ]
  },
  {
    "id": "phy-q06",
    "subjectId": "physics",
    "chapterId": "phy-ch07",
    "chapterName": "Alternating Currents",
    "difficulty": "moderate",
    "questionText": "A series LCR circuit has R = 20 Ω, L = 1.5 H, and C = 35 μF connected to a variable frequency 220 V AC source. What is the resonant angular frequency ω₀ of the circuit?",
    "options": [
      "50 rad/s",
      "220 rad/s",
      "138 rad/s",
      "314 rad/s"
    ],
    "correctOptionIndex": 2,
    "explanation": "Electrical resonance in a series LCR circuit occurs when inductive reactance equals capacitive reactance: ω₀ = 1 / √(LC).",
    "stepByStepSolution": [
      "Step 1: At resonance, X_L = X_C => ω₀ L = 1 / (ω₀ C) => ω₀ = 1 / √(L C).",
      "Step 2: Calculate product L × C = 1.5 H × (35 × 10⁻⁶ F) = 52.5 × 10⁻⁶ s².",
      "Step 3: √(52.5 × 10⁻⁶) = √(52.5) × 10⁻³ ≈ 7.246 × 10⁻³ s.",
      "Step 4: ω₀ = 1 / (7.246 × 10⁻³) ≈ 138.0 rad/s."
    ],
    "conceptTakeaway": "At resonance, impedance is purely resistive (Z = R) and current amplitude attains its maximum possible value.",
    "formulasUsed": [
      "ω₀ = 1 / √(LC)",
      "Z = √[R² + (X_L - X_C)²]"
    ]
  },
  {
    "id": "phy-q07",
    "subjectId": "physics",
    "chapterId": "phy-ch08",
    "chapterName": "Electromagnetic Waves",
    "difficulty": "moderate",
    "questionText": "In a plane electromagnetic wave traveling in vacuum along the +x direction, the electric field amplitude is E₀ = 60 V/m along the y-axis. What is the magnetic field amplitude B₀ and its direction of oscillation?",
    "options": [
      "6.0 × 10⁻⁷ T along the x-axis",
      "2.0 × 10⁻⁷ T along the y-axis",
      "1.8 × 10¹⁰ T along the z-axis",
      "2.0 × 10⁻⁷ T along the z-axis"
    ],
    "correctOptionIndex": 3,
    "explanation": "In an EM wave, B₀ = E₀ / c, and the vectors E, B, and propagation direction v follow the right-hand rule: E × B points along v.",
    "stepByStepSolution": [
      "Step 1: Calculate amplitude: B₀ = E₀ / c = (60 V/m) / (3.0 × 10⁸ m/s) = 2.0 × 10⁻⁷ T.",
      "Step 2: Direction of propagation is along +x (unit vector î).",
      "Step 3: Electric field oscillates along +y (unit vector ĵ).",
      "Step 4: Since propagation is along E × B, we have ĵ × B̂ = î. From vector cross products, ĵ × k̂ = î.",
      "Conclusion: The magnetic field must oscillate along the z-axis with amplitude 2.0 × 10⁻⁷ T."
    ],
    "conceptTakeaway": "EM waves are strictly transverse; E and B oscillate perpendicular to each other and perpendicular to the direction of energy propagation.",
    "formulasUsed": [
      "c = E₀ / B₀",
      "S = (1 / μ₀) (E × B)"
    ]
  },
  {
    "id": "phy-q08",
    "subjectId": "physics",
    "chapterId": "phy-ch09",
    "chapterName": "Ray Optics and Optical Instruments",
    "difficulty": "challenging",
    "questionText": "A thin convex lens of focal length +20 cm in air is made of glass with refractive index μ_g = 1.5. If the lens is completely immersed in water (μ_w = 4/3), what is its new focal length?",
    "options": [
      "+80 cm",
      "+40 cm",
      "+60 cm",
      "-80 cm"
    ],
    "correctOptionIndex": 0,
    "explanation": "By the Lens Maker’s Formula, the focal length increases when the relative refractive index between lens and surrounding medium decreases.",
    "stepByStepSolution": [
      "Step 1: Lens Maker's formula in air: 1/f_air = (μ_g - 1) × (1/R₁ - 1/R₂).",
      "Step 2: Substitute air values: 1/20 = (1.5 - 1) × K = 0.5 × K  =>  K = (1/R₁ - 1/R₂) = 1/10 cm⁻¹.",
      "Step 3: In water, relative refractive index is μ_rel = μ_g / μ_w = 1.5 / (4/3) = 9/8 = 1.125.",
      "Step 4: 1/f_water = (μ_rel - 1) × K = (9/8 - 1) × (1/10) = (1/8) × (1/10) = 1/80 cm⁻¹.",
      "Step 5: Therefore, f_water = +80 cm."
    ],
    "conceptTakeaway": "When immersed in a medium of higher index than air (but less than glass), a converging lens remains converging but its focal length increases substantially (here by 4x).",
    "formulasUsed": [
      "1/f = (μ_lens / μ_med - 1) × (1/R₁ - 1/R₂)"
    ]
  },
  {
    "id": "phy-q09",
    "subjectId": "physics",
    "chapterId": "phy-ch10",
    "chapterName": "Wave Optics",
    "difficulty": "moderate",
    "questionText": "In Young's double slit experiment, the distance between the two slits is 0.28 mm and the screen is placed 1.4 m away. The distance from the central bright fringe to the fourth bright fringe is 1.2 cm. What is the wavelength of the light used?",
    "options": [
      "500 nm",
      "600 nm",
      "450 nm",
      "650 nm"
    ],
    "correctOptionIndex": 1,
    "explanation": "Position of nth bright fringe is y_n = n (λ D / d).",
    "stepByStepSolution": [
      "Step 1: Fringe position equation: y_n = n × β = n × (λ D / d).",
      "Step 2: Given: n = 4, y₄ = 1.2 cm = 1.2 × 10⁻² m, d = 0.28 mm = 2.8 × 10⁻⁴ m, D = 1.4 m.",
      "Step 3: Rearrange for λ: λ = (y₄ × d) / (n × D).",
      "Step 4: Substitute: λ = (1.2 × 10⁻² × 2.8 × 10⁻⁴) / (4 × 1.4).",
      "Step 5: Numerator = 3.36 × 10⁻⁶; Denominator = 5.6.",
      "Step 6: λ = 3.36 × 10⁻⁶ / 5.6 = 0.60 × 10⁻⁶ m = 600 × 10⁻⁹ m = 600 nm."
    ],
    "conceptTakeaway": "Fringe width β = λ D / d is directly proportional to wavelength and screen separation, and inversely proportional to slit distance.",
    "formulasUsed": [
      "β = λ D / d",
      "y_n = n β"
    ]
  },
  {
    "id": "phy-q10",
    "subjectId": "physics",
    "chapterId": "phy-ch11",
    "chapterName": "Dual Nature of Radiation and Matter",
    "difficulty": "moderate",
    "questionText": "Monochromatic light of wavelength 330 nm falls on a photosensitive metallic surface whose work function is Φ₀ = 2.42 eV. What is the maximum kinetic energy of the emitted photoelectrons? (Take h·c = 1240 eV·nm)",
    "options": [
      "3.76 eV",
      "2.42 eV",
      "1.34 eV",
      "0.98 eV"
    ],
    "correctOptionIndex": 2,
    "explanation": "Einstein's photoelectric equation states K_max = hν - Φ₀ = (hc / λ) - Φ₀.",
    "stepByStepSolution": [
      "Step 1: Energy of incident photon E = hc / λ = (1240 eV·nm) / (330 nm) ≈ 3.758 eV.",
      "Step 2: Surface work function Φ₀ = 2.42 eV.",
      "Step 3: Apply Einstein's equation: K_max = E - Φ₀.",
      "Step 4: K_max = 3.758 eV - 2.42 eV = 1.338 eV ≈ 1.34 eV."
    ],
    "conceptTakeaway": "The maximum kinetic energy of photoelectrons depends strictly on the frequency of incident radiation and metal work function, independent of light intensity.",
    "formulasUsed": [
      "E = hν = hc / λ",
      "K_max = E - Φ₀ = eV₀"
    ]
  },
  {
    "id": "phy-q11",
    "subjectId": "physics",
    "chapterId": "phy-ch13",
    "chapterName": "Nuclei",
    "difficulty": "easy",
    "questionText": "Two nuclei have mass numbers in the ratio 1 : 27. What is the ratio of their nuclear radii and the ratio of their nuclear mass densities, respectively?",
    "options": [
      "1 : 3 and 1 : 27",
      "1 : 27 and 1 : 3",
      "1 : 9 and 1 : 1",
      "1 : 3 and 1 : 1"
    ],
    "correctOptionIndex": 3,
    "explanation": "Nuclear radius scales as A^(1/3). Since volume scales as A and mass scales as A, nuclear density is constant across all nuclei.",
    "stepByStepSolution": [
      "Step 1: Formula for nuclear radius: R = R₀ A^(1/3).",
      "Step 2: Radius ratio: R₁ / R₂ = (A₁ / A₂)^(1/3) = (1 / 27)^(1/3) = 1 / 3.",
      "Step 3: Mass of nucleus M ≈ A × m_u; Volume V = (4/3) π R³ = (4/3) π R₀³ A.",
      "Step 4: Density ρ = M / V = (A × m_u) / ((4/3) π R₀³ A) = m_u / ((4/3) π R₀³), which is independent of mass number A.",
      "Conclusion: Radius ratio is 1 : 3; Density ratio is 1 : 1."
    ],
    "conceptTakeaway": "Nuclear matter is nearly incompressible with an exceptionally high constant density of approximately 2.3 × 10¹⁷ kg/m³.",
    "formulasUsed": [
      "R = R₀ A^(1/3)",
      "ρ = M / V ≈ constant"
    ]
  },
  {
    "id": "phy-q12",
    "subjectId": "physics",
    "chapterId": "phy-ch14",
    "chapterName": "Semiconductor Electronics: Materials, Devices and Simple Circuits",
    "difficulty": "easy",
    "questionText": "In a center-tapped full-wave rectifier circuit powered by an AC mains power supply with a frequency of 50 Hz, what is the fundamental ripple frequency of the output DC voltage across the load resistor?",
    "options": [
      "100 Hz",
      "50 Hz",
      "25 Hz",
      "200 Hz"
    ],
    "correctOptionIndex": 0,
    "explanation": "A full-wave rectifier conducts during both positive and negative half-cycles of the AC input, so the output pulses occur at twice the input frequency.",
    "stepByStepSolution": [
      "Step 1: For a half-wave rectifier, only one half cycle conducts per full period T, so output frequency f_out = f_in = 50 Hz.",
      "Step 2: For a full-wave rectifier, both half-cycles are converted into unidirectional pulses across the load.",
      "Step 3: The period of the rectified wave is T_out = T_in / 2.",
      "Step 4: Output ripple frequency f_ripple = 1 / T_out = 2 × f_in = 2 × 50 Hz = 100 Hz."
    ],
    "conceptTakeaway": "Full-wave rectification doubles the ripple frequency compared to half-wave, making smoothing filters smaller and more efficient.",
    "formulasUsed": [
      "f_ripple(full-wave) = 2 × f_in",
      "f_ripple(half-wave) = f_in"
    ]
  },
  {
    "id": "chem-q01",
    "subjectId": "chemistry",
    "chapterId": "chem-ch01",
    "chapterName": "Solutions",
    "difficulty": "moderate",
    "questionText": "A 5.0% (w/v) solution of cane sugar (molar mass = 342 g/mol) is isotonic with a 0.877% (w/v) solution of an unknown non-electrolyte compound X at the same temperature. What is the molar mass of compound X?",
    "options": [
      "180.0 g/mol",
      "60.0 g/mol",
      "120.0 g/mol",
      "30.0 g/mol"
    ],
    "correctOptionIndex": 1,
    "explanation": "Isotonic solutions possess identical osmotic pressures at the same temperature, implying identical molar concentrations for non-electrolytes.",
    "stepByStepSolution": [
      "Step 1: Isotonic condition: π₁ = π₂ => C₁ R T = C₂ R T => C₁ = C₂.",
      "Step 2: 5.0% (w/v) cane sugar means 5.0 g in 100 mL = 50 g in 1000 mL (1 L).",
      "Step 3: Molarity C₁ = (50 g) / (342 g/mol) ≈ 0.1462 mol/L.",
      "Step 4: 0.877% (w/v) of compound X means 8.77 g in 1 L. Molarity C₂ = 8.77 / M_X.",
      "Step 5: Equate: 8.77 / M_X = 50 / 342  =>  M_X = (8.77 × 342) / 50 = 2999.34 / 50 ≈ 59.99 ≈ 60.0 g/mol."
    ],
    "conceptTakeaway": "Osmotic pressure is a colligative property proportional to molar solute concentration: π = C R T = (w / M) (R T / V).",
    "formulasUsed": [
      "π = C R T",
      "π₁ = π₂ => w₁ / (M₁ V₁) = w₂ / (M₂ V₂)"
    ]
  },
  {
    "id": "chem-q02",
    "subjectId": "chemistry",
    "chapterId": "chem-ch02",
    "chapterName": "Electrochemistry",
    "difficulty": "moderate",
    "questionText": "For the electrochemical cell Zn(s) | Zn²⁺(aq, 0.10 M) || Cu²⁺(aq, 0.01 M) | Cu(s), what is the cell EMF at 298 K? Given: E°(Zn²⁺/Zn) = -0.76 V, E°(Cu²⁺/Cu) = +0.34 V, and 2.303 RT/F = 0.059 V.",
    "options": [
      "1.10 V",
      "1.13 V",
      "1.07 V",
      "0.98 V"
    ],
    "correctOptionIndex": 2,
    "explanation": "Apply Nernst Equation: E_cell = E°_cell - (0.059 / n) log₁₀ Q.",
    "stepByStepSolution": [
      "Step 1: Standard cell potential: E°_cell = E°_cathode - E°_anode = (+0.34 V) - (-0.76 V) = +1.10 V.",
      "Step 2: Overall redox equation: Zn(s) + Cu²⁺(aq) -> Zn²⁺(aq) + Cu(s), where n = 2 electrons transferred.",
      "Step 3: Reaction quotient Q = [Zn²⁺] / [Cu²⁺] = 0.10 / 0.01 = 10.",
      "Step 4: Apply Nernst equation: E_cell = 1.10 - (0.059 / 2) log₁₀(10) = 1.10 - 0.0295 × 1 = 1.0705 V ≈ 1.07 V."
    ],
    "conceptTakeaway": "Decreasing cathode ion concentration or increasing anode ion concentration lowers the cell EMF below standard E°.",
    "formulasUsed": [
      "E°_cell = E°_cathode - E°_anode",
      "E_cell = E°_cell - (0.059/n) log Q"
    ]
  },
  {
    "id": "chem-q03",
    "subjectId": "chemistry",
    "chapterId": "chem-ch03",
    "chapterName": "Chemical Kinetics",
    "difficulty": "moderate",
    "questionText": "A first-order decomposition reaction has a rate constant k = 1.15 × 10⁻³ s⁻¹. How much time is required for 5.0 g of this reactant to be reduced to 3.0 g?",
    "options": [
      "693 s",
      "222 s",
      "888 s",
      "444 s"
    ],
    "correctOptionIndex": 3,
    "explanation": "For a first-order reaction, t = (2.303 / k) log₁₀([R]₀ / [R]).",
    "stepByStepSolution": [
      "Step 1: First-order integrated rate law: t = (2.303 / k) log₁₀([R]₀ / [R]).",
      "Step 2: Given: k = 1.15 × 10⁻³ s⁻¹, [R]₀ = 5.0 g, [R] = 3.0 g.",
      "Step 3: Ratio [R]₀ / [R] = 5.0 / 3.0 = 1.667. Calculate log₁₀(1.667) = 0.2219.",
      "Step 4: Calculate t: t = (2.303 / (1.15 × 10⁻³)) × 0.2219 = 2002.6 × 0.2219 ≈ 444.4 s ≈ 444 s."
    ],
    "conceptTakeaway": "First order kinetics half-life and fractional completion time depend strictly on rate constant k, not initial reactant concentration.",
    "formulasUsed": [
      "k = (2.303 / t) log([R]₀ / [R])",
      "t = (2.303 / k) log([R]₀ / [R])"
    ]
  },
  {
    "id": "chem-q04",
    "subjectId": "chemistry",
    "chapterId": "chem-ch04",
    "chapterName": "The d- and f-Block Elements",
    "difficulty": "easy",
    "questionText": "Which of the following 3d-series transition metal cations is diamagnetic in its ground electronic state?",
    "options": [
      "Zn²⁺",
      "Sc²⁺",
      "Ti³⁺",
      "V²⁺"
    ],
    "correctOptionIndex": 0,
    "explanation": "A species with no unpaired electrons has magnetic moment μ = 0 and is diamagnetic. Zn²⁺ has completely filled 3d¹⁰ configuration.",
    "stepByStepSolution": [
      "Step 1: Write electronic configurations of ions:",
      "- Zn (Z=30): [Ar] 3d¹⁰ 4s² => Zn²⁺: [Ar] 3d¹⁰ (0 unpaired electrons, n=0).",
      "- Sc (Z=21): [Ar] 3d¹ 4s² => Sc²⁺: [Ar] 3d¹ (1 unpaired electron, n=1).",
      "- Ti (Z=22): [Ar] 3d² 4s² => Ti³⁺: [Ar] 3d¹ (1 unpaired electron, n=1).",
      "- V (Z=23): [Ar] 3d³ 4s² => V²⁺: [Ar] 3d³ (3 unpaired electrons, n=3).",
      "Step 2: Calculate spin-only magnetic moment: μ = √[n(n+2)] BM.",
      "Conclusion: For Zn²⁺, n=0, so μ = 0 BM; it is purely diamagnetic."
    ],
    "conceptTakeaway": "Completely filled d¹⁰ or completely empty d⁰ subshells result in diamagnetism and lack of d-d transition color.",
    "formulasUsed": [
      "μ = √[n(n+2)] BM (Bohr Magnetons)"
    ]
  },
  {
    "id": "chem-q05",
    "subjectId": "chemistry",
    "chapterId": "chem-ch05",
    "chapterName": "Coordination Compounds",
    "difficulty": "challenging",
    "questionText": "According to Crystal Field Theory (CFT), what is the crystal field stabilization energy (CFSE) and electronic configuration of a d⁵ high-spin octahedral complex (such as [Fe(H₂O)₆]³⁺ or [Mn(H₂O)₆]²⁺) in terms of Δ₀?",
    "options": [
      "-0.4 Δ₀ with configuration t₂g⁴ eg¹",
      "0 Δ₀ with configuration t₂g³ eg²",
      "-2.0 Δ₀ with configuration t₂g⁵ eg⁰",
      "-1.2 Δ₀ with configuration t₂g³ eg²"
    ],
    "correctOptionIndex": 1,
    "explanation": "In a weak field (high-spin) octahedral complex, pairing energy P > Δ₀. Electrons fill singly according to Hund's rule: t₂g³ eg².",
    "stepByStepSolution": [
      "Step 1: In high-spin d⁵, Δ₀ < P, so electrons do not pair in t₂g orbitals first.",
      "Step 2: Configuration is t₂g³ eg² (3 electrons in t₂g, 2 in eg).",
      "Step 3: Energy change for t₂g is -0.4 Δ₀ per electron; for eg is +0.6 Δ₀ per electron.",
      "Step 4: CFSE = [3 × (-0.4) + 2 × (+0.6)] Δ₀ = [-1.2 + 1.2] Δ₀ = 0 Δ₀."
    ],
    "conceptTakeaway": "Half-filled d⁵ high-spin and completely filled d¹⁰ complexes have zero crystal field stabilization energy in octahedral symmetry.",
    "formulasUsed": [
      "CFSE = [-0.4 × n(t₂g) + 0.6 × n(eg)] Δ₀ + mP"
    ]
  },
  {
    "id": "chem-q06",
    "subjectId": "chemistry",
    "chapterId": "chem-ch06",
    "chapterName": "Haloalkanes and Haloarenes",
    "difficulty": "easy",
    "questionText": "Which of the following alkyl halides undergoes nucleophilic substitution primarily via the S_N1 mechanism at the fastest rate when reacted with aqueous hydroxide ions?",
    "options": [
      "CH₃CH₂-Br (ethyl bromide)",
      "(CH₃)₂CH-Br (isopropyl bromide)",
      "(CH₃)₃C-Br (tert-butyl bromide)",
      "CH₃-Br (methyl bromide)"
    ],
    "correctOptionIndex": 2,
    "explanation": "S_N1 reaction rate is governed by carbocation stability: 3° > 2° > 1° > methyl.",
    "stepByStepSolution": [
      "Step 1: The rate-determining step in S_N1 is heterolytic cleavage of the C-X bond to form a carbocation intermediate.",
      "Step 2: (CH₃)₃C-Br yields the 3° tert-butyl carbocation (CH₃)₃C⁺.",
      "Step 3: The 3° carbocation is stabilized by 9 hyperconjugative α-hydrogens and +I inductive effects of three methyl groups.",
      "Step 4: Hence, tert-butyl bromide ionizes fastest, following S_N1 kinetics: Rate = k[R-X]."
    ],
    "conceptTakeaway": "Tertiary alkyl halides react via S_N1 with racemization, whereas primary alkyl halides favor S_N2 with complete Walden inversion.",
    "formulasUsed": [
      "Rate(S_N1) = k[R-X]",
      "Carbocation stability: 3° > 2° > 1° > methyl"
    ]
  },
  {
    "id": "chem-q07",
    "subjectId": "chemistry",
    "chapterId": "chem-ch07",
    "chapterName": "Alcohols, Phenols and Ethers",
    "difficulty": "moderate",
    "questionText": "When anisole (methoxybenzene, C₆H₅OCH₃) is heated with concentrated hydroiodic acid (HI), what are the principal products formed?",
    "options": [
      "Iodobenzene (C₆H₅I) and Water",
      "Iodobenzene (C₆H₅I) and Methanol (CH₃OH)",
      "Benzene (C₆H₆) and Methyl iodide (CH₃I)",
      "Phenol (C₆H₅OH) and Iodomethane (CH₃I)"
    ],
    "correctOptionIndex": 3,
    "explanation": "The phenoxy C(sp²)-O bond possesses partial double bond character due to resonance with the phenyl ring, preventing nucleophilic attack at the phenyl carbon.",
    "stepByStepSolution": [
      "Step 1: Anisole is protonated by HI to give methylphenyl oxonium ion [C₆H₅-O⁺(H)-CH₃].",
      "Step 2: The bond between oxygen and phenyl carbon (C_aromatic-O) has partial double bond character and cannot undergo nucleophilic cleavage.",
      "Step 3: Iodide ion (I⁻) acts as a nucleophile and attacks the methyl group (C_sp³-O) via an S_N2 displacement pathway.",
      "Step 4: Products formed are Phenol (C₆H₅OH) and Iodomethane (CH₃I)."
    ],
    "conceptTakeaway": "In alkyl aryl ethers, ether cleavage by halogen acids always yields a phenol and an alkyl halide because the Ar-O bond is significantly stronger than the Alkyl-O bond.",
    "formulasUsed": [
      "C₆H₅-O-CH₃ + HI -> C₆H₅OH + CH₃I"
    ]
  },
  {
    "id": "chem-q08",
    "subjectId": "chemistry",
    "chapterId": "chem-ch08",
    "chapterName": "Aldehydes, Ketones and Carboxylic Acids",
    "difficulty": "easy",
    "questionText": "Which of the following organic carbonyl compounds gives a positive iodoform test (yellow precipitate of CHI₃) when warmed with iodine and sodium hydroxide?",
    "options": [
      "Pentan-2-one",
      "Pentan-3-one",
      "Benzaldehyde",
      "Propanal"
    ],
    "correctOptionIndex": 0,
    "explanation": "Only carbonyl compounds containing the methyl ketone group (CH₃-C=O) or alcohols containing CH₃-CH(OH)- give the iodoform reaction.",
    "stepByStepSolution": [
      "Step 1: Structural requirement for haloform/iodoform reaction is presence of CH₃-CO- or CH₃-CH(OH)- group.",
      "Step 2: Inspect options:",
      "- Pentan-2-one: CH₃-CO-CH₂CH₂CH₃ (contains CH₃-CO- group).",
      "- Pentan-3-one: CH₃CH₂-CO-CH₂CH₃ (no CH₃-CO- group).",
      "- Benzaldehyde: C₆H₅-CHO (no methyl ketone group).",
      "Step 3: Reaction of pentan-2-one: CH₃COCH₂CH₂CH₃ + 3 I₂ + 4 NaOH -> CHI₃↓ (yellow ppt) + CH₃CH₂CH₂COONa + 3 NaI + 3 H₂O."
    ],
    "conceptTakeaway": "The iodoform test distinguishes methyl ketones and secondary alcohols of the type R-CH(OH)CH₃ from other ketones, aldehydes, and alcohols.",
    "formulasUsed": [
      "R-CO-CH₃ + 3 I₂ + 4 NaOH -> CHI₃↓ + R-COONa + 3 NaI + 3 H₂O"
    ]
  },
  {
    "id": "chem-q09",
    "subjectId": "chemistry",
    "chapterId": "chem-ch09",
    "chapterName": "Amines",
    "difficulty": "moderate",
    "questionText": "An organic compound A with molecular formula C₃H₇NO reacts with bromine and alcoholic KOH to give compound B. Compound B reacts with nitrous acid (HNO₂) to liberate nitrogen gas and form an aliphatic alcohol. What is the identity of compound A?",
    "options": [
      "Ethanamide (CH₃CONH₂)",
      "Propanamide (CH₃CH₂CONH₂)",
      "Propanenitrile (CH₃CH₂CN)",
      "N-Methylacetamide (CH₃CONHCH₃)"
    ],
    "correctOptionIndex": 1,
    "explanation": "Hoffmann bromamide degradation of propanamide (3 carbons) yields ethanamine (2 carbons), which on treatment with nitrous acid yields ethanol and evolves N₂ gas.",
    "stepByStepSolution": [
      "Step 1: Reaction of compound with Br₂ + alcoholic KOH is Hoffmann Bromamide Degradation, characteristic of primary acid amides (R-CONH₂).",
      "Step 2: Molecular formula C₃H₇NO corresponds to propanamide: CH₃CH₂CONH₂.",
      "Step 3: Hoffmann reaction yields primary amine with one fewer carbon: CH₃CH₂CONH₂ + Br₂ + 4 KOH -> CH₃CH₂NH₂ (B, Ethanamine) + K₂CO₃ + 2 KBr + 2 H₂O.",
      "Step 4: Primary aliphatic amine B reacts with HNO₂: CH₃CH₂NH₂ + HNO₂ -> CH₃CH₂OH + N₂↑ + H₂O.",
      "Conclusion: Compound A is Propanamide."
    ],
    "conceptTakeaway": "Hoffmann degradation is a stepping-down method to synthesize primary amines containing one carbon atom less than the starting primary amide.",
    "formulasUsed": [
      "R-CONH₂ + Br₂ + 4 KOH -> R-NH₂ + K₂CO₃ + 2 KBr + 2 H₂O"
    ]
  },
  {
    "id": "chem-q10",
    "subjectId": "chemistry",
    "chapterId": "chem-ch10",
    "chapterName": "Biomolecules",
    "difficulty": "easy",
    "questionText": "Which of the following statements regarding the structural comparison of DNA and RNA is chemically accurate according to the CBSE syllabus?",
    "options": [
      "Both DNA and RNA contain the exact same four heterocyclic nitrogenous bases (A, G, C, T).",
      "DNA contains β-D-ribose sugar and Uracil, whereas RNA contains 2-deoxyribose and Thymine.",
      "RNA contains β-D-ribose sugar and Uracil instead of Thymine, whereas DNA contains β-D-2-deoxyribose and Thymine.",
      "The primary polynucleotide backbone of DNA is composed of alternating amino acid and peptide linkages."
    ],
    "correctOptionIndex": 2,
    "explanation": "DNA contains 2-deoxyribose sugar and adenine, guanine, cytosine, and thymine. RNA contains ribose sugar and uracil in place of thymine.",
    "stepByStepSolution": [
      "Step 1: Compare pentose sugars: DNA has β-D-2-deoxyribose (lacks -OH at C-2'); RNA has β-D-ribose (has -OH at C-2').",
      "Step 2: Compare pyrimidine bases: DNA has Cytosine and Thymine (5-methyluracil); RNA has Cytosine and Uracil.",
      "Step 3: Both share purine bases: Adenine and Guanine.",
      "Step 4: Polynucleotide backbones consist of alternating sugar and phosphodiester bonds, not peptide linkages."
    ],
    "conceptTakeaway": "The absence of the 2'-hydroxyl group in 2-deoxyribose confers greater chemical and thermodynamic stability to DNA compared to RNA.",
    "formulasUsed": [
      "Nucleotide = Nitrogenous base + Pentose sugar + Phosphoric acid"
    ]
  },
  {
    "id": "chem-q11",
    "subjectId": "chemistry",
    "chapterId": "chem-ch04",
    "chapterName": "The d- and f-Block Elements",
    "difficulty": "moderate",
    "questionText": "What is the fundamental cause of the steady contraction in atomic and ionic radii observed along the 4f lanthanoid series (Lanthanoid Contraction)?",
    "options": [
      "Successive addition of electrons to the outer 6s orbital rather than inner subshells",
      "Exceptionally strong and efficient screening effect of 4f electrons on outer valence electrons",
      "Continuous decrease in nuclear charge across the series from Lanthanum to Lutetium",
      "Imperfect and poor shielding of one 4f electron by another due to diffused f-orbital geometry"
    ],
    "correctOptionIndex": 3,
    "explanation": "Due to the diffuse shape of f-orbitals, 4f electrons exert very poor mutual shielding, so the effective nuclear charge Z_eff increases continuously across the series.",
    "stepByStepSolution": [
      "Step 1: Across the lanthanoid series (La to Lu), with each successive element, both the nuclear charge and the number of 4f electrons increase by one unit.",
      "Step 2: The shielding effect follows the order: s > p > d > f. The 4f orbitals are diffuse in shape and exhibit poorest shielding.",
      "Step 3: Consequently, the increase in nuclear charge is not counterbalanced by shielding, causing Z_eff to increase steadily.",
      "Step 4: This draws the entire electron cloud closer to the nucleus, causing the observed contraction."
    ],
    "conceptTakeaway": "Lanthanoid contraction causes the second and third transition series elements (e.g., Zr and Hf, Nb and Ta) to have nearly identical atomic radii and chemical behaviors.",
    "formulasUsed": [
      "Z_eff = Z - σ (where shielding constant σ for 4f is exceptionally low)"
    ]
  },
  {
    "id": "chem-q12",
    "subjectId": "chemistry",
    "chapterId": "chem-ch08",
    "chapterName": "Aldehydes, Ketones and Carboxylic Acids",
    "difficulty": "moderate",
    "questionText": "Arrange the following chlorinated carboxylic acids in increasing order of their acidic strength (pK_a values from highest to lowest): (I) CH₃COOH, (II) ClCH₂COOH, (III) Cl₂CHCOOH, (IV) Cl₃CCOOH.",
    "options": [
      "I < II < III < IV",
      "IV < III < II < I",
      "II < I < III < IV",
      "I < III < II < IV"
    ],
    "correctOptionIndex": 0,
    "explanation": "Chlorine is an electronegative group that exhibits an electron-withdrawing inductive (-I) effect. Greater number of chlorine atoms increases carboxylate anion stability and acidity.",
    "stepByStepSolution": [
      "Step 1: Carboxylic acid strength depends on stabilization of the carboxylate conjugate base (R-COO⁻).",
      "Step 2: Chlorine is a strong electron-withdrawing group via inductive effect (-I).",
      "Step 3: As the number of electronegative chlorine atoms increases from 0 (acetic) to 3 (trichloroacetic), negative charge is dispersed more effectively.",
      "Step 4: Acidity order: CH₃COOH < ClCH₂COOH < Cl₂CHCOOH < Cl₃CCOOH (I < II < III < IV)."
    ],
    "conceptTakeaway": "Electron-withdrawing substituents (-I, -M) increase carboxylic acidity, whereas electron-donating substituents (+I, +M) decrease acidity.",
    "formulasUsed": [
      "Acidity ∝ -I effect ∝ Ka ∝ 1 / pKa"
    ]
  },
  {
    "id": "math-q01",
    "subjectId": "mathematics",
    "chapterId": "math-ch01",
    "chapterName": "Relations and Functions",
    "difficulty": "easy",
    "questionText": "Let set A = {1, 2, 3}. A relation R on set A is defined as R = {(1, 1), (2, 2), (3, 3), (1, 2), (2, 1), (2, 3)}. Which of the following statements is strictly correct about R?",
    "options": [
      "R is an equivalence relation",
      "R is reflexive, but neither symmetric nor transitive",
      "R is symmetric and transitive, but not reflexive",
      "R is transitive, but not reflexive"
    ],
    "correctOptionIndex": 1,
    "explanation": "Reflexive since (a, a) ∈ R for all a ∈ A. Not symmetric because (2, 3) ∈ R but (3, 2) ∉ R. Not transitive because (1, 2) and (2, 3) ∈ R but (1, 3) ∉ R.",
    "stepByStepSolution": [
      "Step 1: Reflexivity check: For all a ∈ {1, 2, 3}, (1, 1) ∈ R, (2, 2) ∈ R, and (3, 3) ∈ R. Hence, R is reflexive.",
      "Step 2: Symmetry check: (2, 3) ∈ R, but (3, 2) ∉ R. Hence, R is not symmetric.",
      "Step 3: Transitivity check: (1, 2) ∈ R and (2, 3) ∈ R, but (1, 3) ∉ R. Hence, R is not transitive.",
      "Conclusion: R is reflexive, but neither symmetric nor transitive."
    ],
    "conceptTakeaway": "An equivalence relation must simultaneously satisfy reflexivity, symmetry, and transitivity for all elements in the set.",
    "formulasUsed": [
      "Reflexive: ∀a∈A, (a,a)∈R",
      "Symmetric: (a,b)∈R => (b,a)∈R",
      "Transitive: (a,b)∈R ∧ (b,c)∈R => (a,c)∈R"
    ]
  },
  {
    "id": "math-q02",
    "subjectId": "mathematics",
    "chapterId": "math-ch02",
    "chapterName": "Inverse Trigonometric Functions",
    "difficulty": "easy",
    "questionText": "What is the principal value of the expression sin⁻¹[sin(2π/3)]?",
    "options": [
      "-π / 3",
      "2π / 3",
      "π / 3",
      "5π / 6"
    ],
    "correctOptionIndex": 2,
    "explanation": "The principal value branch of sin⁻¹(x) is [-π/2, π/2]. Since 2π/3 lies outside this interval, we rewrite sin(2π/3) as sin(π - π/3) = sin(π/3).",
    "stepByStepSolution": [
      "Step 1: The range of the principal value branch for sin⁻¹ is [-π/2, π/2].",
      "Step 2: The given angle 2π/3 = 120° does not lie in [-90°, 90°].",
      "Step 3: Use trigonometry identity: sin(2π/3) = sin(π - π/3) = sin(π/3).",
      "Step 4: Now π/3 lies in [-π/2, π/2].",
      "Step 5: Therefore, sin⁻¹[sin(π/3)] = π/3."
    ],
    "conceptTakeaway": "Always project trigonometric angles into the principal value branch of the corresponding inverse trigonometric function.",
    "formulasUsed": [
      "Range of sin⁻¹(x) is [-π/2, π/2]",
      "sin(π - θ) = sin θ"
    ]
  },
  {
    "id": "math-q03",
    "subjectId": "mathematics",
    "chapterId": "math-ch03",
    "chapterName": "Matrices and Determinants",
    "difficulty": "moderate",
    "questionText": "If A is a square matrix of order 3 such that its determinant |A| = 4, what are the values of |2A| and |adj(A)|, respectively?",
    "options": [
      "32 and 64",
      "8 and 16",
      "16 and 64",
      "32 and 16"
    ],
    "correctOptionIndex": 3,
    "explanation": "For an n×n square matrix, |k A| = kⁿ |A| and |adj(A)| = |A|ⁿ⁻¹.",
    "stepByStepSolution": [
      "Step 1: Formula for scalar multiplication determinant: |k A| = kⁿ |A|, where n = 3.",
      "Step 2: Here k = 2 and |A| = 4, so |2A| = 2³ × |A| = 8 × 4 = 32.",
      "Step 3: Formula for determinant of adjoint matrix: |adj(A)| = |A|^(n - 1).",
      "Step 4: Here n = 3, so |adj(A)| = |A|^(3 - 1) = |A|² = 4² = 16.",
      "Conclusion: |2A| = 32 and |adj(A)| = 16."
    ],
    "conceptTakeaway": "Multiplying every row of an n×n matrix by a scalar k factors out k from all n rows, resulting in kⁿ.",
    "formulasUsed": [
      "|k A| = kⁿ |A|",
      "|adj(A)| = |A|^(n-1)"
    ]
  },
  {
    "id": "math-q04",
    "subjectId": "mathematics",
    "chapterId": "math-ch05",
    "chapterName": "Continuity and Differentiability",
    "difficulty": "moderate",
    "questionText": "If y = (sin x)^x for 0 < x < π, what is the value of the derivative dy/dx evaluated at x = π/2?",
    "options": [
      "0",
      "1",
      "π / 2",
      "ln(π / 2)"
    ],
    "correctOptionIndex": 0,
    "explanation": "Use logarithmic differentiation: ln y = x ln(sin x). At x = π/2, cot(π/2) = 0 and ln(sin π/2) = ln(1) = 0.",
    "stepByStepSolution": [
      "Step 1: Take natural logarithm on both sides: ln y = ln[(sin x)^x] = x ln(sin x).",
      "Step 2: Differentiate with respect to x: (1/y) (dy/dx) = [1 × ln(sin x)] + [x × (1 / sin x) × cos x].",
      "Step 3: (1/y) (dy/dx) = ln(sin x) + x cot x  =>  dy/dx = (sin x)^x [ln(sin x) + x cot x].",
      "Step 4: Evaluate at x = π/2: sin(π/2) = 1, cot(π/2) = 0, ln(1) = 0.",
      "Step 5: dy/dx = (1)^(π/2) [0 + (π/2)(0)] = 1 × 0 = 0."
    ],
    "conceptTakeaway": "Variable-base variable-exponent functions u(x)^v(x) must be differentiated using logarithmic differentiation.",
    "formulasUsed": [
      "d/dx [ln y] = (1/y) dy/dx",
      "dy/dx = y [v' ln u + v u' / u]"
    ]
  },
  {
    "id": "math-q05",
    "subjectId": "mathematics",
    "chapterId": "math-ch06",
    "chapterName": "Applications of Derivatives",
    "difficulty": "moderate",
    "questionText": "The volume of a spherical balloon is increasing at a constant rate of 8 cm³/s. At what rate is its surface area increasing when the radius of the sphere is 4 cm?",
    "options": [
      "2 cm²/s",
      "4 cm²/s",
      "8 cm²/s",
      "16 cm²/s"
    ],
    "correctOptionIndex": 1,
    "explanation": "Differentiate volume V = (4/3) π r³ and surface area S = 4 π r² with respect to time t.",
    "stepByStepSolution": [
      "Step 1: Formula for volume: V = (4/3) π r³. Differentiate with respect to t: dV/dt = 4π r² (dr/dt).",
      "Step 2: Given dV/dt = 8 cm³/s, so 8 = 4π r² (dr/dt)  =>  dr/dt = 2 / (π r²).",
      "Step 3: Formula for surface area: S = 4π r². Differentiate with respect to t: dS/dt = 8π r (dr/dt).",
      "Step 4: Substitute dr/dt: dS/dt = 8π r × [2 / (π r²)] = 16 / r.",
      "Step 5: When r = 4 cm: dS/dt = 16 / 4 = 4 cm²/s."
    ],
    "conceptTakeaway": "In related rates problems, connect rates of change via the chain rule through the geometric parameter (here radius r).",
    "formulasUsed": [
      "dV/dt = 4π r² (dr/dt)",
      "dS/dt = 8π r (dr/dt)"
    ]
  },
  {
    "id": "math-q06",
    "subjectId": "mathematics",
    "chapterId": "math-ch07",
    "chapterName": "Integrals",
    "difficulty": "easy",
    "questionText": "Evaluate the definite integral: I = ∫₀^(π/2) [sin³(x)] / [sin³(x) + cos³(x)] dx.",
    "options": [
      "1",
      "π / 2",
      "π / 4",
      "0"
    ],
    "correctOptionIndex": 2,
    "explanation": "Apply the standard definite integral property: ∫₀^a f(x) dx = ∫₀^a f(a - x) dx.",
    "stepByStepSolution": [
      "Step 1: Let I = ∫₀^(π/2) [sin³(x)] / [sin³(x) + cos³(x)] dx ... (Equation 1).",
      "Step 2: Use property ∫₀^a f(x) dx = ∫₀^a f(a - x) dx where a = π/2.",
      "Step 3: Replace x with (π/2 - x): sin(π/2 - x) = cos(x) and cos(π/2 - x) = sin(x).",
      "Step 4: I = ∫₀^(π/2) [cos³(x)] / [cos³(x) + sin³(x)] dx ... (Equation 2).",
      "Step 5: Add Eq 1 and Eq 2: 2I = ∫₀^(π/2) [sin³(x) + cos³(x)] / [sin³(x) + cos³(x)] dx = ∫₀^(π/2) 1 dx = [x]₀^(π/2) = π/2.",
      "Step 6: Therefore, 2I = π/2  =>  I = π/4."
    ],
    "conceptTakeaway": "The property ∫₀^a f(x) dx = ∫₀^a f(a - x) dx leads to immediate simplification when numerator and denominator form symmetric pairs.",
    "formulasUsed": [
      "∫₀^a f(x) dx = ∫₀^a f(a - x) dx"
    ]
  },
  {
    "id": "math-q07",
    "subjectId": "mathematics",
    "chapterId": "math-ch08",
    "chapterName": "Applications of the Integrals",
    "difficulty": "moderate",
    "questionText": "What is the total area of the region bounded by the parabola y² = 4x and the vertical line x = 3?",
    "options": [
      "16√3 sq units",
      "4√3 sq units",
      "12 sq units",
      "8√3 sq units"
    ],
    "correctOptionIndex": 3,
    "explanation": "The region is symmetric about the x-axis, extending from x = 0 to x = 3. Area = 2 ∫₀³ y dx.",
    "stepByStepSolution": [
      "Step 1: The parabola y² = 4x is symmetric about the x-axis with vertex at (0, 0).",
      "Step 2: In the upper half plane (y ≥ 0), y = 2√x. Total area = 2 × ∫₀³ 2√x dx = 4 ∫₀³ x^(1/2) dx.",
      "Step 3: Integrate: ∫ x^(1/2) dx = (2/3) x^(3/2).",
      "Step 4: Area = 4 × [(2/3) x^(3/2)]₀³ = (8/3) [3^(3/2) - 0] = (8/3) × 3√3 = 8√3 sq units."
    ],
    "conceptTakeaway": "For curves symmetric about coordinate axes, integrate over one symmetric quadrant/half and multiply by symmetry factor.",
    "formulasUsed": [
      "Area = 2 ∫_a^b y dx = 2 ∫_a^b f(x) dx"
    ]
  },
  {
    "id": "math-q08",
    "subjectId": "mathematics",
    "chapterId": "math-ch09",
    "chapterName": "Differential Equations",
    "difficulty": "moderate",
    "questionText": "What is the Integrating Factor (I.F.) for the linear first-order differential equation: x (dy/dx) + 2y = x² (for x > 0)?",
    "options": [
      "x²",
      "x",
      "2x",
      "e^(2x)"
    ],
    "correctOptionIndex": 0,
    "explanation": "Divide by x to obtain standard linear form dy/dx + P(x) y = Q(x), where P(x) = 2/x. Then I.F. = e^(∫ P(x) dx).",
    "stepByStepSolution": [
      "Step 1: Express in standard form dy/dx + P(x)y = Q(x) by dividing through by x (x > 0): dy/dx + (2/x)y = x.",
      "Step 2: Identify P(x) = 2/x.",
      "Step 3: Evaluate ∫ P(x) dx = ∫ (2/x) dx = 2 ln(x) = ln(x²).",
      "Step 4: Integrating Factor I.F. = e^(∫ P(x) dx) = e^(ln(x²)) = x²."
    ],
    "conceptTakeaway": "Always ensure coefficient of dy/dx is exactly 1 before reading off P(x) for the integrating factor e^(∫ P dx).",
    "formulasUsed": [
      "dy/dx + P y = Q",
      "I.F. = e^(∫ P dx)"
    ]
  },
  {
    "id": "math-q09",
    "subjectId": "mathematics",
    "chapterId": "math-ch10",
    "chapterName": "Vectors",
    "difficulty": "moderate",
    "questionText": "If a⃗ and b⃗ are unit vectors such that |a⃗ + b⃗| = √3, what is the angle θ between a⃗ and b⃗, and what is the value of the scalar product (2a⃗ - 3b⃗) · (a⃗ + b⃗)?",
    "options": [
      "θ = π / 6 and scalar product = 1",
      "θ = π / 3 and scalar product = -3 / 2",
      "θ = π / 4 and scalar product = -1",
      "θ = π / 2 and scalar product = 0"
    ],
    "correctOptionIndex": 1,
    "explanation": "|a⃗ + b⃗|² = |a⃗|² + |b⃗|² + 2 (a⃗ · b⃗) = 1 + 1 + 2 cos θ = 3 => cos θ = 1/2 => θ = π/3.",
    "stepByStepSolution": [
      "Step 1: |a⃗| = 1 and |b⃗| = 1. Expand |a⃗ + b⃗|²: 1² + 1² + 2(a⃗ · b⃗) = (√3)² = 3.",
      "Step 2: 2 + 2 cos θ = 3  =>  2 cos θ = 1  =>  cos θ = 1/2  =>  θ = π/3 (60°).",
      "Step 3: Hence, a⃗ · b⃗ = |a⃗| |b⃗| cos(π/3) = 1 × 1 × (1/2) = 1/2.",
      "Step 4: Expand product (2a⃗ - 3b⃗) · (a⃗ + b⃗) = 2|a⃗|² + 2(a⃗ · b⃗) - 3(a⃗ · b⃗) - 3|b⃗|².",
      "Step 5: = 2(1) - 1(a⃗ · b⃗) - 3(1) = 2 - (1/2) - 3 = -1 - 0.5 = -1.5 = -3/2."
    ],
    "conceptTakeaway": "Vector magnitudes squared are computed using the dot product: |u|² = u · u.",
    "formulasUsed": [
      "|a + b|² = |a|² + |b|² + 2(a · b)",
      "a · b = |a| |b| cos θ"
    ]
  },
  {
    "id": "math-q10",
    "subjectId": "mathematics",
    "chapterId": "math-ch11",
    "chapterName": "Three-Dimensional Geometry",
    "difficulty": "challenging",
    "questionText": "Find the shortest distance between the two parallel lines: r⃗ = (î + 2ĵ - 4k̂) + λ(2î + 3ĵ + 6k̂) and r⃗ = (3î + 3ĵ - 5k̂) + μ(2î + 3ĵ + 6k̂).",
    "options": [
      "7 / √293 units",
      "293 / 49 units",
      "√293 / 7 units",
      "√147 / 7 units"
    ],
    "correctOptionIndex": 2,
    "explanation": "Shortest distance between parallel lines is d = |b⃗ × (a₂ - a₁)| / |b⃗|.",
    "stepByStepSolution": [
      "Step 1: Both lines share parallel direction vector b⃗ = 2î + 3ĵ + 6k̂.",
      "Step 2: Calculate |b⃗| = √(2² + 3² + 6²) = √(4 + 9 + 36) = √49 = 7.",
      "Step 3: Points on lines: a₁ = î + 2ĵ - 4k̂ and a₂ = 3î + 3ĵ - 5k̂.",
      "Step 4: Vector (a₂ - a₁) = (3 - 1)î + (3 - 2)ĵ + (-5 - (-4))k̂ = 2î + ĵ - k̂.",
      "Step 5: Compute cross product b⃗ × (a₂ - a₁):",
      "  î × [3(-1) - 6(1)] - ĵ × [2(-1) - 6(2)] + k̂ × [2(1) - 3(2)]",
      "  = î(-3 - 6) - ĵ(-2 - 12) + k̂(2 - 6) = -9î + 14ĵ - 4k̂.",
      "Step 6: Magnitude |b⃗ × (a₂ - a₁)| = √[(-9)² + 14² + (-4)²] = √(81 + 196 + 16) = √293.",
      "Step 7: Shortest distance d = √293 / 7 units."
    ],
    "conceptTakeaway": "For parallel lines in 3D, distance is the perpendicular height of the parallelogram formed by direction vector b⃗ and vector between points (a₂ - a₁).",
    "formulasUsed": [
      "d = |b × (a₂ - a₁)| / |b|"
    ]
  },
  {
    "id": "math-q11",
    "subjectId": "mathematics",
    "chapterId": "math-ch12",
    "chapterName": "Linear Programming",
    "difficulty": "easy",
    "questionText": "For a linear programming problem, the feasible region determined by linear constraints is bounded with corner points (0, 0), (5, 0), (4, 3), and (0, 4). If the objective function is Z = 4x + 3y, what are the maximum and minimum values of Z, respectively?",
    "options": [
      "Maximum = 16 and Minimum = 0",
      "Maximum = 20 and Minimum = 0",
      "Maximum = 25 and Minimum = 12",
      "Maximum = 25 and Minimum = 0"
    ],
    "correctOptionIndex": 3,
    "explanation": "By the Fundamental Theorem of Linear Programming, optimal values of a linear objective function over a bounded polygon occur at corner points.",
    "stepByStepSolution": [
      "Step 1: Corner point method: Evaluate Z = 4x + 3y at each vertex.",
      "Step 2: At (0, 0): Z = 4(0) + 3(0) = 0.",
      "Step 3: At (5, 0): Z = 4(5) + 3(0) = 20.",
      "Step 4: At (4, 3): Z = 4(4) + 3(3) = 16 + 9 = 25.",
      "Step 5: At (0, 4): Z = 4(0) + 3(4) = 12.",
      "Conclusion: Maximum value of Z is 25 (at (4, 3)) and Minimum value of Z is 0 (at (0, 0))."
    ],
    "conceptTakeaway": "The optimal value of an objective function in a feasible bounded region is guaranteed to occur at one or more corner points.",
    "formulasUsed": [
      "Z_max = max{Z(v_i)}",
      "Z_min = min{Z(v_i)}"
    ]
  },
  {
    "id": "math-q12",
    "subjectId": "mathematics",
    "chapterId": "math-ch13",
    "chapterName": "Probability",
    "difficulty": "moderate",
    "questionText": "A factory operates two machines A and B. Machine A manufactures 60% of total output and Machine B manufactures 40%. Past records show that 2% of items from Machine A are defective, while 1% from Machine B are defective. If a randomly inspected item is found to be defective, what is the probability that it was manufactured by Machine A?",
    "options": [
      "3 / 4 (0.75)",
      "1 / 4 (0.25)",
      "3 / 5 (0.60)",
      "2 / 3 (0.67)"
    ],
    "correctOptionIndex": 0,
    "explanation": "Apply Bayes' Theorem: P(A | D) = [P(A) P(D | A)] / [P(A) P(D | A) + P(B) P(D | B)].",
    "stepByStepSolution": [
      "Step 1: Let E₁ be event item produced by machine A: P(E₁) = 0.60.",
      "Step 2: Let E₂ be event item produced by machine B: P(E₂) = 0.40.",
      "Step 3: Defect probabilities: P(D | E₁) = 0.02 and P(D | E₂) = 0.01.",
      "Step 4: Total probability of defect P(D) = P(E₁) P(D|E₁) + P(E₂) P(D|E₂):",
      "  P(D) = (0.60 × 0.02) + (0.40 × 0.01) = 0.012 + 0.004 = 0.016.",
      "Step 5: Apply Bayes' formula: P(E₁ | D) = [P(E₁) P(D|E₁)] / P(D) = 0.012 / 0.016 = 12 / 16 = 3/4 = 0.75."
    ],
    "conceptTakeaway": "Bayes' theorem revises prior probabilities into posterior probabilities given sample evidence.",
    "formulasUsed": [
      "P(A | D) = [P(A) P(D | A)] / P(D)",
      "P(D) = ∑ P(Eᵢ) P(D | Eᵢ)"
    ]
  }
];
