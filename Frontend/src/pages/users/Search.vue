<script setup>
import Layout from '../../components/Layout.vue'
import { onMounted, ref, watch } from 'vue'
import Fuse from 'fuse.js'
import { useQuasar } from 'quasar';
import backend from '../../services/backend';
import { token, setToken } from '../../services/token'
import resIsOk from '../../utils/resIsOk';
import AccountOptions from '../../components/AccountOptions.vue'

let users = ref([]);
let filters = ref({})

let filteredUsers = ref([]);
let userName = ref('');

let fuse = null;
const dialog = ref({
    dialogOpen: false,
    message: ''
})

const deleteUser = (id) => {
    // list of values from db
    users.value = users.value.filter(user => {
        // check all list and remove the one we selected from the original list
        return user._id != id

    })

    filteredUsers.value = filteredUsers.value.filter(user => {
        // check all list and remove the one we selected from the original list
        return user._id != id

    })

    fuse = new Fuse(users.value, {
        keys: ['name', 'username', 'email']
    })
}


const pageOptions = {
    rowsPerPage: 5
}

const columns = [
    {
        name: 'id',
        required: true,
        label: 'ID',
        align: 'left',
        field: '_id',
        sortable: true
    },
    {
        name: 'name',
        required: true,
        label: 'Full Name',
        align: 'left',
        field: 'name',
        format: val => `${val}`,
        sortable: true
    },
    {
        name: 'username',
        required: true,
        label: 'Username',
        align: 'left',
        field: 'username',
        format: val => `${val}`,
        sortable: true
    },
    {
        name: 'email',
        required: true,
        label: 'Email',
        align: 'left',
        field: 'email',
        format: val => `${val}`,
        sortable: true
    },
    {
        name: 'type',
        required: true,
        label: 'User Type',
        align: 'left',
        field: 'type',
        sortable: true
    },
    {
        name: 'decision',
    }
]

onMounted(async () => {
    let res = await backend.get('/user', {
        headers: {
            'Authorization': `Bearer ${token.value}`
        }
    })
    if (resIsOk) {
        users.value = res.data
        filteredUsers.value = res.data
        fuse = new Fuse(res.data, {
            keys: ['name', 'username', 'email']
        })
    }
})

const showMessage = (message) => {
    dialog.value.message = message
    dialog.value.dialogOpen = true

    setTimeout(() => dialog.value.dialogOpen = false, 3000)
}

const handleSearch = (e) => {
    if (e === '') {
        filteredUsers.value = users.value
        return
    }
    let newFilteredUsers = fuse.search(e)
    newFilteredUsers = newFilteredUsers.map(u => u.item);
    filteredUsers.value = newFilteredUsers;
}

</script>

<template>
    <Layout>
        <q-card class="filter-container">
            <q-input v-model='userName' label="Full Name" outlined :debounce="500" @update:model-value="handleSearch" />
        </q-card>

        <!-- Leave for now -->

        <q-table row-key="_id" class='table shad' title="Users" :rows="filteredUsers" :columns="columns"
            :pagination="pageOptions">

            <template v-slot:body-cell-decision="props">
                <q-td :props="props">
                    <AccountOptions :row="props.row" :deleteSelf="deleteUser" :show-message="showMessage" />
                </q-td>
            </template>

        </q-table>

        <q-dialog v-model="dialog.dialogOpen" position="bottom" seamless>
            <q-card style="width: 300px;">
                <q-card-section style="background-color: #2E2E2E;">
                    <div class="text-weight-bold text-center text-white">The Account has been deleted.</div>
                </q-card-section>
            </q-card>
        </q-dialog>


    </Layout>
</template>

<style scoped>
.table>>>th {
    font-weight: bold !important;
}

.filter-container {
    display: flex;
    gap: 15px;
    margin-bottom: 25px;
    padding: 25px;
    flex-wrap: wrap;
    box-shadow: 10px 20px 50px 6px #1e1d1d ;
}

.filter-container>* {
    width: 250px;
}

.input-field-year {
    width: 125px;

}
.shad{
     box-shadow: 10px 20px 50px 6px #1e1d1d ;

}
</style>
