export const transformText = (text) => {
  return text?.split('-').map(val => val.charAt(0).toUpperCase() + val.substring(1)).join(' ')
}

export const transformStats = (text) => {
  if (text === 'hp') return 'HP'
  if (text === 'attack') return 'Attack'
  if (text === 'defense') return 'Defense'
  if (text === 'special-attack') return 'Sp. Atk'
  if (text === 'special-defense') return 'Sp. Def'
  if (text === 'speed') return 'Speed'
}
