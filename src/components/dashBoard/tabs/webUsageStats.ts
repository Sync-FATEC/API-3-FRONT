export const desktopOS = [
    {
      label: 'Concluidos',
      value: 72.72,
    },
    {
      label: 'Em andamento',
      value: 27.28,
    },
  ];
  
  
  export const projetos = [
    {
      label: 'Projetos',
      value: 100,
    },
    {
     label:'Projetos em andamento',
     value: 0,
    },
  ];
  
  const normalize = (v: number, v2: number) => Number.parseFloat(((v * v2) / 100).toFixed(2));
  
  export const mobileAndDesktopOS = [
    ...desktopOS.map((v) => ({
      ...v,
      label: v.label === 'Other' ? 'Other (Desktop)' : v.label,
      value: normalize(v.value, projetos[1].value),
    })),
  ];
  
  export const valueFormatter = (item: { value: number }) => `${item.value}%`;