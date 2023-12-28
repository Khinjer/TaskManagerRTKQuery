export const themeSettings = (mode) => {
  if (mode === 'dark') {
    return {
      palette: {
        primary: {
          main: '#00296b',
          contrastText: '#fff',
        },
        secondary: {
          main: '#ffd500',
          dark: '#ffc700',
          contrastText: '#000',
        },
        background: {
          default: '#001940',
          alt: '#3540aa',
          contrastText: '#fff',
        },
        text: {
          primary: '#fff',
        },
      },
      typography: {
        allVariants: {
          color: '#fff',
        },
      },
    };
  } else {
    return {
      palette: {
        primary: {
          main: '#00296b',
          contrastText: '#fff',
        },
        secondary: {
          main: '#ffd500',
          dark: '#ffc700',
          contrastText: '#000',
        },
        background: {
          default: '#eeeeee',
          alt: '#fcfcfc',
          contrastText: '#fff',
        },
        text: {
          primary: '#000',
        },
      },
      typography: {
        allVariants: {
          color: '#000',
        },
      },
    };
  }
};
