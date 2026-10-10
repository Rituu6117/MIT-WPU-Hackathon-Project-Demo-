export const sampleCropsData = [
  {
    id: "tomato-blight",
    cropName: "Tomato (टोमॅटो / टमाटर)",
    cropKey: "Tomato",
    qualityGrade: "Grade B (Moderate Severity)",
    diseaseName: "Early Blight (Alternaria solani)",
    diseaseKey: "Early Blight",
    confidence: 94,
    imageUrl: "https://images.unsplash.com/photo-1592417817098-8f3d6eb1b7a5?auto=format&fit=crop&w=800&q=80",
    symptoms: "Concentric dark brown spots on lower foliage surrounded by yellow halo ring.",
    treatment: {
      chemical: "Spray Copper Oxychloride 50% WP @ 2.5g per liter of water OR Mancozeb 75% WP @ 2g/L.",
      organic: "Apply 5% Neem Seed Kernel Extract (NSKE) or Pseudomonas fluorescens @ 5g/L.",
      dosage: "Spray every 10-12 days at early morning or late evening.",
      safetyPeriod: "Waiting period before harvest: 7 days."
    },
    fertilizer: {
      category: "NPK 19:19:19 + Calcium Boron Spray",
      explanation: "Nitrogen aids foliage recovery; Calcium builds leaf cell wall resistance against fungal penetration."
    },
    soilAdvice: "Optimal Soil pH: 6.0 - 6.8. Maintain uniform drip irrigation; avoid overhead sprinkler watering to reduce leaf moisture duration."
  },
  {
    id: "cotton-bollworm",
    cropName: "Cotton (कापूस / कपास)",
    cropKey: "Cotton",
    qualityGrade: "Grade C (Pest Attack Alert)",
    diseaseName: "Pink Bollworm (Pectinophora gossypiella)",
    diseaseKey: "Bollworm",
    confidence: 96,
    imageUrl: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&w=800&q=80",
    symptoms: "Rosetted flowers, bored holes in green bolls with frass extrusions.",
    treatment: {
      chemical: "Install Pheromone traps @ 5 per acre. Spray Chlorantraniliprole 18.5% SC @ 0.3ml/L.",
      organic: "Release Trichogramma chilonis egg parasitoids @ 60,000/acre at 7-day intervals.",
      dosage: "Ensure complete canopy coverage during peak moth emergence.",
      safetyPeriod: "Waiting period before harvest: 14 days."
    },
    fertilizer: {
      category: "Potash (MOP) + Magnesium Sulphate",
      explanation: "Potassium enhances crop immunity and strengthens boll rind thickness against larvae entry."
    },
    soilAdvice: "Keep fields weed-free. Avoid excessive nitrogen applications which create dense lush foliage favoring moth oviposition."
  },
  {
    id: "paddy-blast",
    cropName: "Paddy / Rice (भात / धान)",
    cropKey: "Rice",
    qualityGrade: "Grade B (Fungal Blast)",
    diseaseName: "Paddy Blast Disease (Magnaporthe oryzae)",
    diseaseKey: "Rice Blast",
    confidence: 92,
    imageUrl: "https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=800&q=80",
    symptoms: "Spindle-shaped eye spots with dark brown margins and grey centers on leaves.",
    treatment: {
      chemical: "Foliar spray of Tricyclazole 75% WP @ 0.6g/L or Isoprothiolane 40% EC @ 1.5ml/L.",
      organic: "Seed treatment with Trichoderma viride @ 10g/kg seed + foliar spray of Panchagavya 3%.",
      dosage: "Apply first spray at initiation of leaf blast spots; repeat at neck blast emergence.",
      safetyPeriod: "Waiting period: 10 days."
    },
    fertilizer: {
      category: "Silicate Fertilization + Split Nitrogen",
      explanation: "Silicon deposition hardens epidermal cells; split nitrogen prevents soft tissue vulnerability."
    },
    soilAdvice: "Maintain shallow standing water layer (2-5cm). Avoid draining field completely during disease spread."
  },
  {
    id: "wheat-rust",
    cropName: "Wheat (गहू / गेहूं)",
    cropKey: "Wheat",
    qualityGrade: "Grade A- (Early Stage)",
    diseaseName: "Yellow / Stripe Rust (Puccinia striiformis)",
    diseaseKey: "Wheat Rust",
    confidence: 97,
    imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
    symptoms: "Bright yellow pustules arranged in linear stripes parallel to leaf veins.",
    treatment: {
      chemical: "Spray Propiconazole 25% EC @ 1.0ml/L or Tebuconazole 50% + Trifloxystrobin 25% WG @ 0.7g/L.",
      organic: "Spray Cow urine 10% solution + Fermenting buttermilk extract (2-3 days old).",
      dosage: "Single timely spray at first detection halts rust spore multiplication.",
      safetyPeriod: "Waiting period: 15 days."
    },
    fertilizer: {
      category: "NPK 12:32:16 + Zinc Sulphate",
      explanation: "Zinc improves enzyme activation and photosynthesis recovery in damaged leaf cells."
    },
    soilAdvice: "Apply recommended irrigation at crown root initiation and flowering stages."
  },
  {
    id: "sugarcane-redrot",
    cropName: "Sugarcane (ऊस / गन्ना)",
    cropKey: "Sugarcane",
    qualityGrade: "Grade C (Internal Rot)",
    diseaseName: "Red Rot Disease (Colletotrichum falcatum)",
    diseaseKey: "Red Rot",
    confidence: 91,
    imageUrl: "https://images.unsplash.com/photo-1595855759920-86582396756a?auto=format&fit=crop&w=800&q=80",
    symptoms: "Yellowing of top leaves, longitudinal reddening of internal pith tissues with white transverse patches.",
    treatment: {
      chemical: "Soak seed setts in Carbendazim 50% WP @ 2g/L water for 15-20 minutes before planting.",
      organic: "Soil application of Bio-agent Trichoderma harzianum @ 2.5kg/acre mixed with 100kg FYM.",
      dosage: "Drench infected clump basins immediately.",
      safetyPeriod: "Preventive sett treatment is most effective."
    },
    fertilizer: {
      category: "Bio-fertilizers (Azotobacter & PSB) + Bio-Potash",
      explanation: "Enhances soil microbial diversity to suppress soil-borne fungal inoculum."
    },
    soilAdvice: "Ensure good field drainage. Avoid ratoon cropping in infected patches."
  },
  {
    id: "potato-blight",
    cropName: "Potato (बटाटा / आलू)",
    cropKey: "Potato",
    qualityGrade: "Grade B (Late Stage Blight)",
    diseaseName: "Late Blight (Phytophthora infestans)",
    diseaseKey: "Late Blight",
    confidence: 95,
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
    symptoms: "Water-soaked dark lesions on leaf margins with white cottony fungal growth on underside.",
    treatment: {
      chemical: "Prophylactic spray with Mancozeb 75% WP @ 2.5g/L; curative spray with Cymoxanil + Mancozeb @ 3g/L.",
      organic: "Spray 1% Bordeaux Mixture or Copper Hydroxide @ 2g/L.",
      dosage: "Apply prior to overcast rainy weather or at first signal.",
      safetyPeriod: "Waiting period: 7 days."
    },
    fertilizer: {
      category: "Potassium Sulphate (SOP) + Boron",
      explanation: "Potassium improves tuber skin toughness and prevents post-harvest storage rots."
    },
    soilAdvice: "Earthing up soil to cover tubers completely to prevent spore washed down from leaves."
  }
];
