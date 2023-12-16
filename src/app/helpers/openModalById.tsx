export const openModalById = (id: string) => {
  return (document.getElementById(id) as any).showModal();
};
