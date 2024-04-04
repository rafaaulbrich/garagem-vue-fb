import axios from "axios";

export default class AcessoriosApi {
  async buscarTodosOsAcessorios() {
    const { data } = await axios.get("/acessorios/");
    return data;
  }
  async adicionarAcessorio(acessorio) {
    const { data } = await axios.post("/acessorios/", acessorio);
    return data;
  }
  async atualizarAcessorio(acessorio) {
    const { data } = await axios.put(`/acessorios/${acessorio.id}/`, acessorio);
    return data;
  }
  async excluirAcessorio(id) {
    const { data } = await axios.delete(`/acessorios/${id}/`);
    return data;
  }
}