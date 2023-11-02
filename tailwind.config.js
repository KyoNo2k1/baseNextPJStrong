/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './shared/components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors:{
        primary : '#006884',
        lightPrimary:"#E0F1F8",
        secondary : '#DBA40E',
        lightSecondary:"#FBE89A",
        danger : "#DB221F",
        lightDanger:"#FFE6D4",
        navy900 : "#1B2132",
        navy400:"#535E71",
        base500:"#005E80"
      },
      transitionProperty:{
        'height': 'height',
      },
      // screens: {
      //   mobile: { min: '350px', max: '767px' },
      //   // => @media (min-width: 350px and max-width: 767px) { ... }
      //
      //   ipad: { min: '768px', max: '1023px' },
      //   // => @media (min-width: 768px and max-width: 1023px) { ... }
      //
      //   tablet: { min: '1024px', max: '1279px' },
      //   // => @media (min-width: 1024px and max-width: 1279px) { ... }
      //
      //   desktop: { min: '1280px' },
      //   // => @media (min-width: 1280px and max-width: 1535px) { ... }
      //
      //   // monitor: { min: '1536px' },
      //   // // => @media (min-width: 1536px) { ... }
      // },
      keyframes:{
        'change-step-color':{
          '0%':{backgroundColor: '#ffffff',borderColor:'#a0a4ac',color:'#a0a4ac'},
          '100%':{backgroundColor: '#f5f5f5',borderColor:'#040404',color:'#040404'}
        }
      },
      animation:{
        'change-step-color': 'change-step-color 0.8s linear',
      }
    },
  },
  plugins: [],
  important : true,
  corePlugins: {
    preflight: false,
  },
};
