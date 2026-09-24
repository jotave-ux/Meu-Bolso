export const CATEGORIES = [
  { id: 'moradia', label: 'Moradia', color: '#5B7A9D' },
  { id: 'alimentacao', label: 'Alimentação', color: '#C97B4A' },
  { id: 'transporte', label: 'Transporte', color: '#8A6BAF' },
  { id: 'saude', label: 'Saúde', color: '#4E8C6B' },
  { id: 'lazer', label: 'Lazer', color: '#C4A23A' },
  { id: 'outros', label: 'Outros', color: '#8C8577' },
];

export function categoryLabel(id) {
  return CATEGORIES.find((c) => c.id === id)?.label ?? 'Outros';
}

export function categoryColor(id) {
  return CATEGORIES.find((c) => c.id === id)?.color ?? '#8C8577';
}
