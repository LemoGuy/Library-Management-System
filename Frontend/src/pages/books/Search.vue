<script setup>
import jwt_decode from 'jwt-decode'
import Fuse from 'fuse.js'
import dateFormat from "dateformat";
import Layout from '../../components/Layout.vue';
import { onMounted, ref, watch } from 'vue';
import backend from '../../services/backend';
import { token, setToken } from '../../services/token';
import resIsOk from '../../utils/resIsOk';

const backendUrl = import.meta.env.VITE_BACKEND_URL

let decodedToken = jwt_decode(token.value)

let books = ref([]);
let filteredBooks = ref([]);
let bookName = ref('');

let fuse = null;

const pageOptions = {
    rowsPerPage: 7
}

const columns = [
    // {
    //     name: 'id',
    //     required: true,
    //     label: 'ID',
    //     align: 'left',
    //     field: '_id',
    //     sortable: true
    // },
    {
        name: 'name',
        required: true,
        label: 'Book Name',
        align: 'left',
        field: 'name',
        format: val => `${val}`,
        sortable: true
    },


    {
        name: 'uploadedBy',
        required: true,
        label: 'Uploaded By',
        align: 'left',
        field: f => f.uploadedBy.name,
        sortable: true
    },

    {
        name: 'uploadDate',
        required: true,
        label: 'Uploaded Date',
        align: 'left',
        field: 'uploadDate',
        sortable: true
    },
    {
        name: 'open',
    },
    {
        name: 'delete',
    }

]

onMounted(async () => {
    let res = await backend.get('/book', {
        headers: {
            'Authorization': `Bearer ${token.value}`
        }
    })
    if (resIsOk) {
        let data = res.data
        for (let i = 0; i < data.length; i++) {
            let formatedDate = new Date(data[i].uploadDate)
            formatedDate = dateFormat(formatedDate, 'dddd, mmmm dS, yyyy, h:MM:ss TT')
            data[i].uploadDate = formatedDate
        }
        books.value = data
        filteredBooks.value = data
        fuse = new Fuse(data, {
            keys: ['name', 'uploadedBy.name']
        });
    }
})

const handleSearch = (e) => {
    if (e === '') {
        filteredBooks.value = books.value
        return
    }
    let newFilteredBooks = fuse.search(e)
    newFilteredBooks = newFilteredBooks.map(book => book.item);
    filteredBooks.value = newFilteredBooks;
}

const getFileUrl = (row) => {
    return `${backendUrl}file/${row.randomToken}-${row.bookHash}.${row.bookFileType}`
}


async function deleteBook(id) {
    let res = await backend.delete(`/book/${id}`, {
        headers: {
            'Authorization': `Bearer ${token.value}`
        }
    })
    if (res.status === 200) {
        books.value = books.value.filter(book => book._id !== id)
        filteredBooks.value = filteredBooks.value.filter(book => book._id !== id)
        fuse = new Fuse(books.value, {
            keys: ['name', 'uploadedBy.name']
        });
    }

}

const openFile = async (url) => {
    try {
        let res = await backend.get('/login/tempauth', {
            headers: {
                'Authorization': `Bearer ${token.value}`
            }
        })
        console.log(res.data)
        window.open(url + `?auth=${res.data.token}`, '_blank').focus()
    } catch (e) {
        console.log('failed')
    }

}

</script>

<template>
    <Layout>
        <q-card class="filter-container">
            <q-input v-model='bookName' label="Search" outlined :debounce="500" @update:model-value="handleSearch">
                <template v-slot:append>
                    <q-icon name="search" />
                </template>
            </q-input>
        </q-card>

        <q-table row-key="_id" class='table shad' title="Books" :rows="filteredBooks" :columns="columns"
            :pagination="pageOptions">
            <template v-slot:body-cell-open="props">
                <q-td :props="props">
                    <q-btn @click="openFile(getFileUrl(props.row))">
                        <q-icon left name="menu_book" />
                        <div>Read</div>
                    </q-btn>
                    <!-- <a :href="getFileUrl(props.row)">{{props.row.name}}</a> -->
                </q-td>
            </template>
            <template v-slot:body-cell-delete="props" v-if="decodedToken.role === 'Admin'">
                <q-td :props="props">
                    <q-btn @click="deleteBook(props.row._id)" icon="delete_forever" color="red" />
                    <!-- <a :href="getFileUrl(props.row)">{{props.row.name}}</a> -->
                </q-td>
            </template>
        </q-table>
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
