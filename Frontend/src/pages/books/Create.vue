<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar'
import Layout from '@/components/Layout.vue'
import backend from '../../services/backend'
import resIsOk from '../../utils/resIsOk'
import { useRouter } from 'vue-router'
import { token, setToken } from '../../services/token.js'

const router = useRouter()

const data = ref({})
const $q = useQuasar()



async function create() {

    const formData = new FormData();

    if (!data.value.name || !data.value.bookData) {
        $q.notify('Both fields must be filled!')
        return
    }

    formData.append('name', data.value.name || '')
    formData.append('bookData', data.value.bookData)


    let dataEntered
    try {
        dataEntered = await backend.post(`/book`, formData, {
            headers: {
                Authorization: `Bearer ${token.value}`,
            }
        })
        router.push('/books/search')

    } catch (e) {
        if (e.response.data.message) $q.notify(e.response.data.message)

    }


}


</script>

<template>
    <Layout>
        <q-card class="container">
            <p class="title">
                Upload a book
            </p>
            <div class="input-container">

                <q-input outlined class="input-field" v-model="data.name" label="Book Name"
                    :rules="[val => !!val || 'Field is required']" />

                <q-file outlined v-model="data.bookData" label="Upload Book" class="input-field" clearable
                    :rules="[val => !!val || 'Field is required']" accept=".pdf" />

            </div>
            <q-btn class='create-btn' label='Upload' @click='create()' />
        </q-card>

        <div class="container pp whitten m">
          
          <div>

      </div>
                  <div class="input-container">
                      <div>
                        <div class="note ppp"><p class="text-h6">Note:</p><p class="text-weight-bold">Please be informed that no user has the authority to conclude any legally binding agreement without the
                explicit written consent from the University of Kurdistan Hewler. Our University accepts no liability for
                the content of the files uploaded here, or for the consequences of any actions taken on the basis of the information
                provided, unless that information is subsequently confirmed in writing. If you are not accepting the agreenment, you are notified that disclosing, copying, distributing or taking any action in reliance on the
                contents of this information is strictly prohibited.</p>
        </div>
              </div>
                  </div>
                </div>

        

    </Layout>
</template>
<style scoped>
.address {
    width: 520px;
}
.whitten {
  box-shadow: inset 2000px 0 0 0 rgba(255, 255, 255, 0.3);
  background:  rgba(255, 255, 255, 0.5);
  border-color: rgba(255, 255, 255, 1);
  padding-top: 0px;
  font-size: 12pt;
}
.note {
    margin-top: 50px;
}

.title {
    font-size: 15pt;
}
.pp{
    width: 70% !important;
}
.ppp{
    margin-top: 0px;
}
.m{
    margin-top: 32px !important;
}
.container {
    display: flex;
    flex-direction: column;
    box-shadow: 10px 20px 50px 6px #1e1d1d ;
    margin-top: 20px;


    /* border: 1px solid grey; */
    /* border-radius: 10px; */
    padding: 25px;
    width: 30%;
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

.password-container {
    display: flex;
    align-items: stretch;
    gap: 20px
}

.password-container>* {
    flex: 1
}

.create-btn {
    margin-left: auto;
    margin-top: 50px;
    width: 100px;
}

.input-field {
    width: 315px;
}</style>