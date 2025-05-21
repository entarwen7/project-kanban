const colorsButton: Record<string, string> = {
    futuro: 'bg-futuro border-2 border-futuro hover:bg-futuro-500 text-white focus:outline-futuro/10',
    proyeccion: 'bg-proyeccion border-2 border-proyeccion hover:bg-proyeccion-600 text-white focus:outline-proyeccion/10',
    cimiento: 'bg-cimiento border-2 border-cimiento hover:bg-cimiento-800 text-white focus:outline-cimiento/10',
    ilusion: 'bg-ilusion border-2 border-cimiento hover:bg-ilusion-dark text-cimiento focus:outline-cimiento/10',
    light: 'bg-futuro-100 border-2 border-futuro-100 hover:bg-futuro-200 hover:border-futuro text-futuro focus:outline-futuro/10',
    transparent: 'bg-transparent border-2 border-futuro hover:bg-futuro-100 text-futuro focus:outline-futuro/10',
    disabled: 'cursor-not-allowed bg-neutral-300 border-2 border-neutral-300 text-neutral-800'
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