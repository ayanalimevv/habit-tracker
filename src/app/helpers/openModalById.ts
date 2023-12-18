export const openModalById = (id: string) => {
  setTimeout(() => {
    let dialog = document.getElementById(id) as HTMLDialogElement;
    if (dialog) {
      dialog.showModal();
    } else {
      console.error(`Element with id '${id}' not found.`);
    }
  }, 100);
};
