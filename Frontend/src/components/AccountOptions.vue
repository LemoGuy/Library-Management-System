<script setup>

import { useRouter } from 'vue-router'
import backend from '../services/backend';
import { ref } from 'vue'
import { token, setToken } from '../services/token.js'
import { useQuasar } from 'quasar';


const confirm = ref(false)

const props = defineProps(['row', 'deleteSelf', 'showMessage'])

const router = useRouter()

async function deleteUser(id) {
  let res = await backend.delete(`/user/${id}`, {
    headers: {
      Authorization: `Bearer ${token.value}`,
    }
  })
  if (res.status === 200) {
    props.showMessage('Account Deleted')
    props.deleteSelf(id)
  }
}
</script>

<template>
  <div id="q-app">
    <div class="q-pa-md">
      <q-dialog v-model="confirm">
        <q-card>
          <q-card-section class="row items-center">
            <span class="q-ml-sm">Do you want to remove this account <b>{{ props.row.username }}</b> ? this action cannot be
              undone.</span>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Delete!" color="red" v-close-popup @click="deleteUser(props.row._id)" />
          </q-card-actions>
        </q-card>
      </q-dialog>






      <q-btn-dropdown color="black" dropdown-icon="more_vert" dense flat>
        <q-list>
          <q-item clickable v-close-popup @click="confirm = true">
            <q-item-section>
              <q-item-label>Remove Account</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable v-close-popup :href="`/#/users/create?id=${row._id}`">
            <q-item-section>
              <q-item-label>Edit Account</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </div>
  </div>
</template>