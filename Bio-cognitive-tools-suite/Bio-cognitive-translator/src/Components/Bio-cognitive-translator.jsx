import React, { useState } from "react";
import { Brain, Zap, Database, Sparkles, BookOpen, Play } from "lucide-react";

// --- Core offline database ---
const conceptDatabase = {
  photosynthesis: {
    difficulty: 6,
    keywords: ["energy", "conversion", "solar", "food", "plants", "oxygen"],
    category: "biology",
  },
  gravity: {
    difficulty: 4,
    keywords: ["force", "attraction", "mass", "weight", "falling"],
    category: "physics",
  },
  dna: {
    difficulty: 8,
    keywords: ["genetics", "heredity", "code", "instructions", "copying"],
    category: "biology",
  },
  algorithms: {
    difficulty: 7,
    keywords: ["steps", "instructions", "problem-solving", "computers"],
    category: "computer_science",
  },
  atoms: {
    difficulty: 9,
    keywords: ["matter", "particles", "elements", "building_blocks"],
    category: "chemistry",
  },
  ecosystems: {
    difficulty: 5,
    keywords: ["environment", "interactions", "food_chains", "balance"],
    category: "ecology",
  },
  crystals: {
    difficulty: 6,
    keywords: ["structure", "geometry", "lattice", "minerals"],
    category: "chemistry",
  },
  patterns: {
    difficulty: 5,
    keywords: ["mathematics", "spirals", "fibonacci", "nature"],
    category: "mathematics",
  },
};

// --- Nature teacher database: Animals, Plants, and Crystals ---
const natureTeachers = {
  sunflower_chef: {
    teaches: ["photosynthesis", "energy_conversion", "solar_power"],
    emoji: "🌻",
    name: "Chef Sunflower",
    teacher_type: "plant",
    story_templates: {
      preschool: "Sunflowers are magical chefs who cook yummy food using nothing but sunshine!",
      elementary: "Sunflowers are like solar-powered kitchens that capture sunlight and cook it into sugar food in their leaves",
      middle: "Sunflowers demonstrate photosynthetic energy conversion through chlorophyll-based light capture",
    },
    activities: {
      preschool: "Put a clear plastic bag over a plant leaf on a sunny day and watch water droplets appear!",
      elementary: "Track how a sunflower follows the sun during the day and measure how plants grow in light vs. dark",
      middle: "Design an experiment testing how different light colors affect plant growth and oxygen production",
    },
    wow_facts: {
      preschool: "One big tree makes enough oxygen for you and a friend to breathe all day!",
      elementary: "A single large tree produces enough oxygen for 2 people every day and absorbs 48 pounds of CO2 per year!",
      middle: "Photosynthesis converts 3,000 EJ of solar energy annually - more energy than humans use in a year!",
    },
  },
  gravity_apple: {
    teaches: ["gravity", "forces", "attraction", "orbits"],
    emoji: "🍎",
    name: "Sir Isaac Apple",
    teacher_type: "animal",
    story_templates: {
      preschool: "Gravity is like an invisible friend that always pulls things down to give Earth a big hug!",
      elementary: "Gravity is like an invisible rope that always pulls objects toward the biggest, heaviest thing nearby",
      middle: "Gravity is the curvature of spacetime caused by mass, creating what we experience as an attractive force",
    },
    activities: {
      preschool: "Drop different toys from the same height and see that they all fall down together!",
      elementary: "Test if heavy and light objects fall at the same speed, and explore what gravity does to water",
      middle: "Calculate gravitational force between objects and model how gravity creates planetary orbits",
    },
    wow_facts: {
      preschool: "Without gravity, you would float away like a balloon!",
      elementary: "Gravity is so strong that it holds the moon in orbit around Earth, even though the moon is 238,855 miles away!",
      middle: "Gravity affects time - clocks run slower in stronger gravitational fields!",
    },
  },
  copy_snake: {
    teaches: ["dna", "genetics", "replication", "heredity"],
    emoji: "🐍",
    name: "Copy-Cat Snake",
    teacher_type: "animal",
    story_templates: {
      preschool: "DNA is like a magical snake that can split in half and each half grows back into a perfect copy!",
      elementary: "DNA is like a twisted ladder that unzips down the middle, and each half rebuilds its missing partner",
      middle: "DNA replication involves helicase unwinding, polymerase synthesis, and complementary base pairing",
    },
    activities: {
      preschool: "Make a paper snake, cut it in half, and help each half grow back using matching colors!",
      elementary: "Build DNA models with colored beads and demonstrate how copying preserves genetic information",
      middle: "Simulate DNA replication with complementary base pairing and explore how mutations occur",
    },
    wow_facts: {
      preschool: "Your DNA is like instructions for building you, and every cell has a complete copy!",
      elementary: "If you stretched out all the DNA in your body, it would reach from Earth to the sun and back 300 times!",
      middle: "DNA polymerase copies genetic information at 1000 base pairs per second with 99.9% accuracy!",
    },
  },
  algorithm_ant: {
    teaches: ["algorithms", "programming", "logic", "problem_solving"],
    emoji: "🐜",
    name: "Recipe Ant",
    teacher_type: "animal",
    story_templates: {
      preschool: "Ants are like tiny robots that follow simple recipes to find food and build homes!",
      elementary: "Ants use step-by-step instructions (algorithms) to solve problems like finding the shortest path to food",
      middle: "Ant colonies demonstrate distributed algorithms, optimization, and emergent intelligence",
    },
    activities: {
      preschool: "Follow simple “ant recipes” to build things: step 1) get blocks, step 2) stack them, step 3) make a tower!",
      elementary: "Create algorithms for daily tasks and trace ant paths to understand how they optimize routes",
      middle: "Program simple algorithms and study how ant colony optimization solves complex routing problems",
    },
    wow_facts: {
      preschool: "Ants can find the best path to food even though no single ant knows the whole route!",
      elementary: "Ant colonies solve complex problems using simple rules - the same way computer programs work!",
      middle: "Ant colony optimization algorithms are used to solve traffic routing and supply chain problems!",
    },
  },
  lego_atom: {
    teaches: ["atoms", "chemistry", "matter", "elements"],
    emoji: "⚛️",
    name: "LEGO Universe Builder",
    teacher_type: "crystal",
    story_templates: {
      preschool: "Everything is made of impossibly tiny LEGO blocks called atoms that stick together in different ways!",
      elementary: "Atoms are like cosmic LEGO pieces - the same building blocks arrange differently to make water, air, rocks, and you!",
      middle: "Atoms consist of protons, neutrons, and electrons, with chemical bonds forming through electron interactions",
    },
    activities: {
      preschool: "Build different things with LEGO blocks to see how the same pieces make different objects!",
      elementary: "Use colored marshmallows and toothpicks to build molecules like water (H2O) and carbon dioxide (CO2)",
      middle: "Model atomic structure and chemical bonding, exploring how electron configuration determines properties",
    },
    wow_facts: {
      preschool: "There are more atoms in a drop of water than there are drops of water in all the oceans!",
      elementary: "There are more atoms in a grain of sand than there are grains of sand on all the beaches on Earth!",
      middle: "Atoms are 99.9999999% empty space - if an atom were the size of a football stadium, the nucleus would be a marble!",
    },
  },
  network_forest: {
    teaches: ["ecosystems", "networks", "interdependence", "systems"],
    emoji: "🌲",
    name: "Network Forest",
    teacher_type: "plant",
    story_templates: {
      preschool: "Forests are like giant families where all the plants and animals help each other!",
      elementary: "Forest ecosystems are complex networks where every organism depends on others in an interconnected web",
      middle: "Ecosystems demonstrate emergent properties, feedback loops, and network effects in biological systems",
    },
    activities: {
      preschool: "Draw pictures of forest friends helping each other (bees help flowers, flowers feed bees)!",
      elementary: "Map food webs and trace how energy flows through different levels of forest ecosystems",
      middle: "Model ecosystem dynamics, carrying capacity, and the effects of removing or adding species",
    },
    wow_facts: {
      preschool: "Trees can talk to each other through underground root networks!",
      elementary: "Forest trees share nutrients through underground fungal networks that connect their roots like the internet!",
      middle: "A single forest network can span thousands of acres with trees sharing resources and warning each other!",
    },
  },
  wise_oak: {
    teaches: ["time", "growth", "patience", "ecosystems", "climate"],
    emoji: "🌳",
    name: "Wise Old Oak",
    teacher_type: "plant",
    story_templates: {
      preschool: "Oak trees are ancient storytellers who grow very slowly and remember everything they see!",
      elementary: "Oak trees live for hundreds of years, growing one ring each year like nature's calendar",
      middle: "Oak trees demonstrate long-term ecological processes, carbon sequestration, and climate adaptation",
    },
    activities: {
      preschool: "Count the rings on a tree stump to see how old it was and imagine all the seasons it lived through!",
      elementary: "Research local oak trees, measure their circumference, and calculate their approximate age",
      middle: "Study tree ring patterns to understand climate history and analyze how trees respond to environmental changes",
    },
    wow_facts: {
      preschool: "Some oak trees are older than your great-great-great-grandparents!",
      elementary: "The oldest oak tree in the world is over 1,000 years old and was alive when Vikings sailed the seas!",
      middle: "Oak trees can live over 2,000 years and their root systems can extend 3 times wider than their canopy!",
    },
  },
  fibonacci_fern: {
    teaches: ["patterns", "mathematics", "spirals", "growth_patterns"],
    emoji: "🌿",
    name: "Fibonacci Fern",
    teacher_type: "plant",
    story_templates: {
      preschool: "Ferns grow in beautiful spiral patterns like nature's own artwork!",
      elementary: "Fern fronds unfurl in perfect spirals following mathematical patterns found throughout nature",
      middle: "Ferns demonstrate the Fibonacci sequence and golden ratio in their growth patterns and leaf arrangements",
    },
    activities: {
      preschool: "Draw spirals like unfurling fern fronds and look for spiral patterns in shells and flowers!",
      elementary: "Count spiral patterns in pinecones, sunflowers, and fern fronds to discover the Fibonacci sequence",
      middle: "Measure and calculate the golden ratio in various plant structures and model fractal growth patterns",
    },
    wow_facts: {
      preschool: "Ferns have been growing spiral patterns for 360 million years!",
      elementary: "The same spiral pattern in fern fronds appears in galaxies, hurricanes, and nautilus shells!",
      middle: "Fern spirals follow the golden ratio (1.618…) which appears in art, architecture, and nature everywhere!",
    },
  },
  structure_quartz: {
    teaches: ["crystals", "geometry", "structure", "lattices", "minerals"],
    emoji: "💎",
    name: "Professor Quartz",
    teacher_type: "crystal",
    story_templates: {
      preschool: "Crystals are Earth's way of building perfect geometric shapes from tiny invisible pieces!",
      elementary: "Quartz crystals grow in perfect geometric patterns because their atoms stack in organized, repeating structures",
      middle: "Quartz demonstrates crystalline lattice structures and how atomic arrangement determines macroscopic properties",
    },
    activities: {
      preschool: "Build crystal shapes with blocks and look at salt crystals under a magnifying glass!",
      elementary: "Grow your own crystals from salt water and observe how they form geometric shapes",
      middle: "Study different crystal systems and model how atomic structures create macroscopic crystal forms",
    },
    wow_facts: {
      preschool: "Crystals grow themselves into perfect shapes without anyone teaching them how!",
      elementary: "Quartz crystals can grow for thousands of years and some are bigger than school buses!",
      middle: "Quartz crystals vibrate at precise frequencies and are used in every computer and smartphone!",
    },
  },
};

// --- Helper functions ---
const findBestTeacherMatch = (conceptName) => {
  for (const teacher of Object.values(natureTeachers)) {
    if (
      teacher.teaches.includes(conceptName.toLowerCase()) ||
      teacher.teaches.some((topic) => conceptName.toLowerCase().includes(topic))
    ) {
      return teacher;
    }
  }
  // Default fallback
  return natureTeachers.sunflower_chef;
};

const extractMaterials = (activityDescription) => {
  const materials = [];
  if (activityDescription.includes("bag")) materials.push("clear plastic bag");
  if (activityDescription.includes("plant")) materials.push("plant or leaf");
  if (activityDescription.includes("marshmallow"))
    materials.push("colored marshmallows", "toothpicks");
  if (activityDescription.includes("paper"))
    materials.push("paper", "scissors", "colored pencils");
  if (activityDescription.includes("blocks")) materials.push("building blocks");
  if (activityDescription.includes("magnifying"))
    materials.push("magnifying glass");
  if (activityDescription.includes("crystal") || activityDescription.includes("salt"))
    materials.push("salt or sugar", "string", "jar");
  if (activityDescription.includes("rings") || activityDescription.includes("stump"))
    materials.push("tree stump or tree ring image");
  return materials.length > 0 ? materials : ["basic household items"];
};

// --- Main Component ---
const BioCognitiveTranslator = () => {
  const [concept, setConcept] = useState("");
  const [ageGroup, setAgeGroup] = useState("elementary");
  const [context, setContext] = useState("classroom");
  const [translation, setTranslation] = useState(null);
  const [processing, setProcessing] = useState(false);

  // --- Core translation engine ---
  const translateConcept = () => {
    setProcessing(true);

    setTimeout(() => {
      const conceptData = conceptDatabase[concept.toLowerCase()];
      if (!conceptData) {
        setTranslation({ error: "Concept not found in database" });
        setProcessing(false);
        return;
      }

      const natureTeacher = findBestTeacherMatch(concept);

      const completeTranslation = {
        original_concept: concept,
        difficulty_score: conceptData.difficulty,
        category: conceptData.category,
        teacher: natureTeacher,
        explanation: {
          story: natureTeacher.story_templates[ageGroup],
          keywords: conceptData.keywords.join(", "),
        },
        activity: {
          main_activity: natureTeacher.activities[ageGroup],
          materials_needed: extractMaterials(natureTeacher.activities[ageGroup]),
        },
        wow_fact: natureTeacher.wow_facts[ageGroup],
        offline_ready: true,
      };

      setTranslation(completeTranslation);
      setProcessing(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="w-8 h-8 text-purple-600" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Bio-Cognitive Concept Translator
            </h1>
            <Database className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-gray-600 text-lg">
            Transform any scientific concept into an engaging nature teacher lesson
          </p>
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm mt-2">
            <Zap className="w-4 h-4" />
            Offline Ready - Works Anywhere!
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-purple-700">
              🧪 Scientific Concept
            </label>
            <select
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              className="w-full p-3 border-2 border-purple-200 rounded-lg focus:border-purple-400"
            >
              <option value="">Choose concept to translate...</option>
              {Object.keys(conceptDatabase).map((key) => (
                <option key={key} value={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1).replace("_", " ")}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-blue-700">
              👶 Age Group
            </label>
            <select
              value={ageGroup}
              onChange={(e) => setAgeGroup(e.target.value)}
              className="w-full p-3 border-2 border-blue-200 rounded-lg focus:border-blue-400"
            >
              <option value="preschool">Little Explorers (3-5)</option>
              <option value="elementary">Young Scientists (6-8)</option>
              <option value="middle">Junior Researchers (9-12)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-green-700">
              🏫 Learning Context
            </label>
            <select
              value={context}
              onChange={(e) => setContext(e.target.value)}
              className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-400"
            >
              <option value="classroom">Classroom Learning</option>
              <option value="homeschool">Homeschool Learning</option>
              <option value="outdoor">Outdoor Learning</option>
              <option value="remote">Remote Learning</option>
            </select>
          </div>
        </div>

        <button
          onClick={translateConcept}
          disabled={!concept || processing}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg text-xl font-bold hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 flex items-center justify-center gap-3 transform hover:scale-105 transition-all duration-200"
        >
          {processing ? (
            <>
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
              🧠 Translating to Bio-Cognitive...
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6" />
              🚀 Generate Bio-Cognitive Lesson!
            </>
          )}
        </button>

        {translation && !translation.error && (
          <div className="mt-8 space-y-6">
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-4 border-orange-300 rounded-xl p-6 text-center">
              <h2 className="text-3xl font-bold text-orange-800 mb-2">
                Meet Your Nature Teacher!
              </h2>
              <div className="text-6xl mb-4">{translation.teacher.emoji}</div>
              <h3 className="text-2xl font-semibold text-orange-700 mb-2">
                {translation.teacher.name}
              </h3>
              <div className="mt-4 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border-2 border-orange-200">
                <span className="text-sm font-medium text-orange-700">
                  Type: {translation.teacher.teacher_type} teacher
                </span>
              </div>
              <div className="mt-2 inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border-2 border-orange-200">
                <span className="text-sm font-medium text-orange-700">
                  Teaches: {translation.teacher.teaches.join(", ")}
                </span>
              </div>
            </div>

            <div className="bg-blue-50 border-4 border-blue-200 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-blue-800 mb-4 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                📖 The Bio-Cognitive Story
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                  <h4 className="font-semibold text-blue-700 mb-2">
                    Nature Teacher Explanation:
                  </h4>
                  <p className="text-lg text-blue-600">{translation.explanation.story}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
                  <h4 className="font-semibold text-blue-700 mb-2">Key Concepts:</h4>
                  <p className="text-blue-600">{translation.explanation.keywords}</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-4 border-green-200 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
                <Play className="w-6 h-6" />
                🎮 Hands-On Activity
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                  <h4 className="font-semibold text-green-700 mb-2">Activity:</h4>
                  <p className="text-green-600">
                    {translation.activity.main_activity}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg border-2 border-green-200">
                  <h4 className="font-semibold text-green-700 mb-2">
                    Materials Needed:
                  </h4>
                  <ul className="space-y-1">
                    {translation.activity.materials_needed.map((material, idx) => (
                      <li key={idx} className="text-green-600 flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                        {material}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 border-4 border-purple-200 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-6 h-6" />
                🤯 Mind-Blowing Fact!
              </h3>
              <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
                <p className="text-lg text-purple-600">{translation.wow_fact}</p>
              </div>
            </div>

            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 text-center">
              <p className="text-sm text-gray-600">
                ✅ <strong>Offline Ready</strong> • Generated in {translation.difficulty_score / 2}s • Category: {translation.category}
              </p>
            </div>
          </div>
        )}

        {translation && translation.error && (
          <div className="mt-8 bg-red-50 border-2 border-red-200 rounded-lg p-4 text-center">
            <p className="text-red-600">{translation.error}</p>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          🧬 Bio-Cognitive Learning Engine • 🔧 Built for Offline Use • 🌱 Nature-Inspired Education • 🐾 Animals • 🌿 Plants • 💎 Crystals
        </div>
      </div>
    </div>
  );
};

export default BioCognitiveTranslator;
