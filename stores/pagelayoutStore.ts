import { defineStore } from "pinia";

export const usePageLayoutStore = defineStore('pagelayout', () => {
  const pagelayout = ref('main');
  function setLayout(pg: string) {
    pagelayout.value = pg;
  };
  const persist =  true;

  return { pagelayout, setLayout };
})