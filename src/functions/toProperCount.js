export default function toProperCount(value) {
  if (value.toString().length > 9) return `${value.slice(0, 3)}.${value[3]}B`;
  if (value.toString().length > 6) return `${value.slice(0, 3)}.${value[3]}M`;
  if (value.toString().length > 3) return `${value.slice(0, 3)}K`;
  
  return value.toString();
};
