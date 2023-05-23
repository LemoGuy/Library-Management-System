<script setup>
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar'
import Layout from '@/components/Layout.vue'
import backend from '../../services/backend'
import resIsOk from '../../utils/resIsOk'
import { useRouter, useRoute } from 'vue-router'
import userOptions from '../../constants/userOptions'
import { token, setToken } from '../../services/token.js'

const props = defineProps(['userId'])
const $q = useQuasar()
const router = useRouter()
const route = useRoute()
const data = ref({})


async function create() {
    let req = route.query.id ? backend.put : backend.post
    let reqUrl = route.query.id ? `/user/${route.query.id}` : `/user`
    let res
    try {

        res = await req(reqUrl, data.value, {
            headers: {
                Authorization: `Bearer ${token.value}`,
            }
        })
        router.push('/users/search')
    } catch (e) {
        if (e.response.data.message) $q.notify(e.response.data.message)
    }
}

onMounted(async () => {
    if (!route.query.id) return

    let res = await backend.get(`/user/${route.query.id}`, {
        headers: {
            Authorization: `Bearer ${token.value}`,
        }
    })
    data.value = res.data
})

</script>

<template>
    <Layout>
        <q-card class="container">
            <p class="title">
                Create an account
            </p>
            <div class="input-container">

                <q-input outlined class="input-field" v-model="data.name" label="Full Name"
                    :rules="[val => !!val || 'Field is required']" />

                <q-input outlined class="input-field" v-model="data.username" label="Username"
                    :rules="[val => !!val || 'Field is required']" />
                <q-input outlined class="input-field" v-model="data.email" label="Email"
                    :rules="[val => !!val || 'Field is required']" />

                <q-select outlined class='input-field' v-model='data.type' label='User Type' :options="userOptions"
                    emit-value :rules="[val => !!val || 'Field is required']" />

                <q-input outlined class="input-field" v-model="data.password" label="Password" type="password"
                    :rules="[val => !!val || 'Field is required']" />
                <q-input outlined class="input-field" v-model="data.password2" label="Re-write password" type="password"
                    :rules="[val => !!val || 'Field is required']" />


                <!-- <q-file outlined v-model="data.photo" label="Upload Photo" class="input-field" clearable /> -->

            </div>
            <q-btn class='create-btn' :label='route.query.id ? "Update" : "Create"' @click='create()' />
        </q-card>

    </Layout>
</template>
<style scoped>
.address {
    width: 520px;
}

.title {
    font-size: 15pt;
}

.container {
    display: flex;
    flex-direction: column;
    box-shadow: 10px 20px 50px 6px #1e1d1d ;


    /* border: 1px solid grey; */
    /* border-radius: 10px; */
    padding: 25px;
    width: 40%;
    min-width: 300px;
    margin-inline: auto;
}

.input-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    width: 100%;
    gap: 20px
}

.gender-select {
    display: flex;
    align-items: center;
    height: 56px;
}

.birthdate-input {
    padding: 0;
}

.gender-select>p {
    margin: 0;
    font-size: 12pt;
}

.create-btn {
    margin-left: auto;
    margin-top: 50px;
    width: 100px;
}

.input-field {
    width: 400px;
    margin-left: auto;
    margin-right: auto;

}</style>