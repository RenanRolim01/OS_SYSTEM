<template>
    <div class="os-container">
      <h2>Manutenção de Ordem de Serviço</h2>
      <button @click="logout">Sair</button>
      <form @submit.prevent="submitOS">
        <textarea v-model="description" placeholder="Descrição das atividades" required></textarea>
        <div class="checklist">
          <h3>Checklist</h3>
          <div v-for="(item, index) in checklist" :key="index">
            <input type="checkbox" v-model="item.checked" /> {{ item.item }}
          </div>
        </div>
        <input type="file" @change="handleFileUpload" accept="image/*" />
        <button type="submit">Salvar OS</button>
      </form>
      <div v-if="osList.length">
        <h3>Ordens Registradas</h3>
        <ul>
          <li v-for="os in osList" :key="os._id">
            {{ os.description }} - {{ os.createdAt }}
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { useAuthStore } from '../stores/auth';
  import axios from 'axios';
  
  export default {
    name: 'OSView',
    data() {
      return {
        description: '',
        checklist: [
          { item: 'Verificar equipamento', checked: false },
          { item: 'Realizar manutenção', checked: false },
        ],
        photo: null,
        osList: [],
      };
    },
    setup() {
      const authStore = useAuthStore();
      return { authStore };
    },
    methods: {
      async submitOS() {
        const formData = new FormData();
        formData.append('description', this.description);
        formData.append('checklist', JSON.stringify(this.checklist));
        if (this.photo) formData.append('photo', this.photo);
  
        try {
          await axios.post(`${import.meta.env.VITE_API_URL}/os`, formData, {
            headers: { Authorization: `Bearer ${this.authStore.token}` },
          });
          this.description = '';
          this.checklist.forEach((item) => (item.checked = false));
          this.photo = null;
          this.fetchOS();
        } catch (err) {
          console.error('Erro ao salvar OS:', err);
        }
      },
      async fetchOS() {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/os`, {
          headers: { Authorization: `Bearer ${this.authStore.token}` },
        });
        this.osList = response.data;
      },
      handleFileUpload(event) {
        this.photo = event.target.files[0];
      },
      logout() {
        this.authStore.logout();
        this.$router.push('/login');
      },
    },
    mounted() {
      this.fetchOS();
    },
  };
  </script>
  
  <style scoped>
  .os-container {
    max-width: 600px;
    margin: 20px auto;
    padding: 20px;
  }
  textarea {
    width: 100%;
    height: 100px;
    margin: 10px 0;
  }
  .checklist {
    margin: 10px 0;
  }
  button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
  }
  </style>