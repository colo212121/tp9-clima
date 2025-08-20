export function convertTemperature(value, fromUnits, toUnits) {
  if (fromUnits === toUnits) return value
  if (fromUnits === 'metric' && toUnits === 'imperial') {
    // C -> F
    return value * 9 / 5 + 32
  }
  if (fromUnits === 'imperial' && toUnits === 'metric') {
    // F -> C
    return (value - 32) * 5 / 9
  }
  return value
}

export function convertSpeed(value, fromUnits, toUnits) {
  if (fromUnits === toUnits) return value
  if (fromUnits === 'metric' && toUnits === 'imperial') {
    // m/s -> mph
    return value * 2.23694
  }
  if (fromUnits === 'imperial' && toUnits === 'metric') {
    // mph -> m/s
    return value / 2.23694
  }
  return value
}


