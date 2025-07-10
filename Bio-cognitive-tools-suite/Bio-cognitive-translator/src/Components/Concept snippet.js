const translateConcept = () => {
  setProcessing(true);

  setTimeout(() => {
    const conceptData = conceptDatabase[concept.toLowerCase()];
    if (!conceptData) {
      setTranslation({ error: 'Concept not found in database' });
      setProcessing(false);
      return;
    }

    const animalTeacher = findBestAnimalMatch(concept);

    const completeTranslation = {
      original_concept: concept,
      difficulty_score: conceptData.difficulty,
      category: conceptData.category,
      animal_teacher: animalTeacher,
      explanation: {
        story: animalTeacher.story_templates[ageGroup],
        keywords: conceptData.keywords.join(', ')
      },
      activity: {
        main_activity: animalTeacher.activities[ageGroup],
        materials_needed: extractMaterials(animalTeacher.activities[ageGroup])
      },
      wow_fact: animalTeacher.wow_facts[ageGroup],
      offline_ready: true
    };

    setTranslation(completeTranslation);
    setProcessing(false);
  }, 1500);
};
