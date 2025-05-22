const colorsButton: Record<string, string> = {

  pendiente: "bg-gray-300 text-black",
  proceso: "bg-warning text-white",
  completado: "bg-success text-white",
  futuro: "bg-info text-white",
  error: "bg-error text-white",
}





const colorsCard: Record<string, string> = {
  futuro: 'bg-futuro text-white',
  proyeccion: 'bg-proyeccion text-white',
  cimiento: 'bg-cimiento text-ilusion',
  ilusion: 'bg-ilusion text-cimiento',
  warning: 'bg-warning text-white',
  warningLight: 'bg-warning-light text-warning',
  light: 'bg-futuro-100 text-cimiento',
  transparent: 'bg-transparent text-black',
  white: 'bg-white text-black',
  error: 'bg-error text-white',
  errorLight: 'bg-error-light text-error',
  gradientLight: 'bg-gradient-to-b from-[#6684F3] to-[#BBCAFF]'
}

export {
  colorsButton,
  colorsCard
}