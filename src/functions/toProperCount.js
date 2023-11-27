export default function toProperCount(value) {
  const properedValue = value.toString();

  if (properedValue.length > 9) return `${properedValue.slice(0, 3)}.${properedValue[3]}B`;
  if (properedValue.length > 6) return `${properedValue.slice(0, 3)}.${properedValue[3]}M`;
  if (properedValue.length > 3) return `${properedValue.slice(0, 3)}K`;
  
  return properedValue;
};
