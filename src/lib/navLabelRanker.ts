export function formatInstruction(step: any, nearbyPOIs?: any[]): string {
  if (!step || !step.maneuver) return 'Continue on route';

  const { type, modifier } = step.maneuver;

  if (type === 'arrive') return 'You have arrived';
  if (type === 'roundabout') return 'Enter the roundabout';

  let name = step.name || 'this road';

  if (nearbyPOIs && nearbyPOIs.length > 0) {
    const priority = { shop: 0, building: 1, landuse: 2, highway: 4 };
    const bestPOI = nearbyPOIs.sort((a, b) => (priority[a.class as keyof typeof priority] ?? 99) - (priority[b.class as keyof typeof priority] ?? 99))[0];
    if (bestPOI) name = bestPOI.name;
  }

  const typeMap: Record<string, string> = {
    depart: 'Head',
    turn: 'Turn',
    continue: 'Continue',
    merge: 'Merge',
    fork: 'Keep',
    'on ramp': 'Take the ramp',
    'off ramp': 'Take the exit',
    'new name': 'Continue',
    'exit roundabout': 'Exit the roundabout'
  };

  const action = type ? (typeMap[type] || type) : '';

  let modStr = modifier ? (modifier === 'uturn' ? 'U-turn' : modifier) : '';

  if (type === 'fork') {
    return `${action} ${modStr} at the fork onto ${name}`.replace(/\s+/g, ' ').trim();
  }

  const ontoStr = name === 'this road' && !action && !modStr ? 'onto this road' : `onto ${name}`;

  return `${action} ${modStr} ${ontoStr}`.replace(/\s+/g, ' ').trim() || 'Continue on route';
}
