export const allProducts = [
  {
    id: 1,
    name: "BPC-157",
    priceRange: "$35.00 – $55.00",
    sizes: [{ size: "5MG", price: 35 }, { size: "10MG", price: 55 }],
    contents: "Lyophilized Powder in 3ml vial",
    requiresReconstitution: true,
    concentration: "≥99%",
    batchNumber: "NV-P-BPC5",
    coaLink: "#",
    description: "BPC-157 (Body Protection Compound-157) is a synthetic pentadecapeptide that has been studied for its effects on wound healing and tissue regeneration.",
    specs: {
      formula: "C62H98N16O22",
      pubChemCid: "Not Available",
      casNumber: "137525-51-0",
      molecularWeight: "1419.56 g/mol",
      synonyms: "PL 14736, PLD-116",
      storage: "Store at ≤-20°C, sealed, away from heat, light, and moisture.",
      appearance: "Solid, white powder in 3mL glass ampule",
      application: "Research peptide evaluated in wound healing and tissue regeneration studies."
    }
  },
  {
    id: 2,
    name: "TB-500",
    priceRange: "$35.00 – $60.00",
    sizes: [{ size: "5MG", price: 35 }, { size: "10MG", price: 60 }],
    contents: "Lyophilized Powder in 3ml vial",
    requiresReconstitution: true,
    concentration: "≥99%",
    batchNumber: "NV-P-TB50",
    coaLink: "#",
    description: "TB-500 is a synthetic version of Thymosin Beta-4, a protein that has been studied for its role in wound healing and tissue repair.",
    specs: {
      formula: "C212H350N56O78S2",
      pubChemCid: "16132417",
      casNumber: "885340-08-9",
      molecularWeight: "4963.44 g/mol",
      synonyms: "Thymosin Beta-4",
      storage: "Store at ≤-20°C, sealed, away from heat, light, and moisture.",
      appearance: "Solid, white powder in 3mL glass ampule",
      application: "Research peptide evaluated in wound healing and tissue repair studies."
    }
  }
];

export default allProducts;
