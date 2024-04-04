<script setup>
import { ref, reactive, onMounted } from "vue";
import VeiculosApi from "@/api/veiculos";
import MarcasApi from "@/api/marcas";
import CoresApi from "@/api/cores";
import CategoriasApi from "@/api/categorias";
import AcessoriosApi from "@/api/acessorios";

const veiculosApi = new VeiculosApi();
const marcasApi = new MarcasApi();
const coresApi = new CoresApi();
const categoriasApi = new CategoriasApi();
const acessoriosApi = new AcessoriosApi();

const defaultVeiculo = {
  id: null,
  marca: null,
  categoria: null,
  cor: null,
  acessorios: [],
};
const veiculos = ref([]);
const marcas = ref([]);
const categorias = ref([]);
const cores = ref([]);
const acessorios = ref([]);

const veiculo = reactive({ ...defaultVeiculo });

onMounted(async () => {
  veiculos.value = await veiculosApi.buscarTodosOsVeiculos();
  marcas.value = await marcasApi.buscarTodasAsMarcas();
  categorias.value = await categoriasApi.buscarTodasAsCategorias();
  cores.value = await coresApi.buscarTodasAsCores();
  acessorios.value = await acessoriosApi.buscarTodosOsAcessorios();
});

function limpar() {
  Object.assign(veiculo, { ...defaultVeiculo });
}

async function salvar() {
  console.log(veiculo)
  if (veiculo.id) {
    await veiculosApi.atualizarVeiculo(veiculo);
  } else {
    await veiculosApi.adicionarVeiculo(veiculo);
  }
  veiculos.value = await veiculosApi.buscarTodosOsVeiculos();
  limpar();
}

function editar(veiculo_para_editar) {
  Object.assign(veiculo, veiculo_para_editar);
}

async function excluir(id) {
  await veiculosApi.excluirVeiculo(id);
  veiculos.value = await veiculosApi.buscarTodosOsVeiculos();
  limpar();
}
</script>

<template>
  <h1>Veículos</h1>
  <hr />
  <div class="form">
    <select name="marcas" id="" v-model="veiculo.marca">
      <option :value="null" disabled>Marca</option>
      <option v-for="marca in marcas" :key="marca.id" :value="marca.id">
        {{ marca.nome }}
      </option>
    </select>
    <select name="categorias" id="" v-model="veiculo.categoria">
      <option :value="null" disabled>Categoria</option>
      <option
        v-for="categoria in categorias"
        :key="categoria.id"
        :value="categoria.id"
      >
        {{ categoria.descricao }}
      </option>
    </select>
    <select name="cores" id="" v-model="veiculo.cor">
      <option :value="null" disabled>Cor</option>
      <option v-for="cor in cores" :key="cor.id" :value="cor.id">
        {{ cor.descricao }}
      </option>
    </select>
    <input type="number" v-model="veiculo.ano" placeholder="Ano" />
    <button @click="salvar">Salvar</button>
    <button @click="limpar">Limpar</button>
  </div>
  <hr />
  <ul>
    <li v-for="veiculo in veiculos" :key="veiculo.id">
      <span @click="editar(veiculo)">
        {{ veiculo.marca.nome }} - {{ veiculo.categoria.descricao }} -
        {{ veiculo.ano }} -
        {{ veiculo.cor.descricao }}
      </span>
      <button @click="excluir(veiculo.id)">X</button>
    </li>
  </ul>
</template>

<style></style>
