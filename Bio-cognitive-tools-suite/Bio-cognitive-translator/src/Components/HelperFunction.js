const findBestAnimalMatch = (concept) => {
  for (const [key, teacher] of Object.entries(animalTeachers)) {
    if (
      teacher.teaches.includes(concept.toLowerCase()) ||
      teacher.teaches.some(topic => concept.toLowerCase().includes(topic))
    ) {
      return teacher;
    }
  }
  return animalTeachers.sunflower_chef; // fallback
};

const extractMaterials = (activity) => {
  const materials = [];
  if (activity.includes('bag')) materials.push('clear plastic bag');
  if (activity.includes('plant')) materials.push('plant or leaf');
  if (activity.includes('marshmallow')) materials.push('colored marshmallows', 'toothpicks');
  if (activity.includes('paper')) materials.push('paper', 'scissors', 'colored pencils');
  if (activity.includes('blocks')) materials.push('building blocks');
  return materials.length > 0 ? materials : ['basic household items'];
};
