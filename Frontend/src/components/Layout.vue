
<script setup>
import { ref } from 'vue'
import SideBar from '../components/SideBar.vue'
// import { slot } from 'vue';
const drawer = ref(true)
</script>


<template>
    <q-layout view="lHh LPr lff" class="shadow-2 rounded-borders layout ">
        <SideBar v-model:open="drawer" />
        <q-page-container>
            <q-page padding class="page">
                <slot></slot>
            </q-page>
        </q-page-container>
    </q-layout>
</template>

<style scoped>
.layout {
    min-height: 300px;
    background-image: url(./images/hh.jpg);
    background-repeat: no-repeat;
    background-size: cover;
}

</style>