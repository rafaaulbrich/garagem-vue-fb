import axios from "axios";

export default class VeiculosApi {
  async buscarTodosOsVeiculos() {
    const { data } = await axios.get("/veiculos/");
    return data;
  }
  async adicionarVeiculo(veiculo) {
    const { data } = await axios.post("/veiculos/", veiculo);
    return data;
  }
  async atualizarVeiculo(veiculo) {
    const { data } = await axios.put(`/veiculos/${veiculo.id}/`, veiculo);
    return data;
  }
  async excluirVeiculo(id) {
    const { data } = await axios.delete(`/veiculos/${id}/`);
    return data;
  }
}