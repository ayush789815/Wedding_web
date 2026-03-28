export function CurveArrow({ color = 'white' }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 0V6C0.999976 7 1.1 8.5 3.5 8.5C5.9 8.5 10.5 8.5 11.5 8.5" stroke={color} />
      <path d="M8 4L12.5 8.5L8 13" stroke={color} />
    </svg>
  )
}

export function BlankArrow({ color = 'white' }: { color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3.47705 4.0459H9.84101L9.84101 10.4099" stroke={color} />
      <line x1="9.35355" y1="4.49027" x2="0.353553" y2="13.4903" stroke={color} />
    </svg>
  )
}
