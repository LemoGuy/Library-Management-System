<script setup>
import jwt_decode from 'jwt-decode'
import { token, setToken } from '../services/token'
import { useRouter } from 'vue-router'

const router = useRouter()

let decodedToken = jwt_decode(token.value)

const props = defineProps(["open"])
defineEmits(['open'])

function logout() {
    setToken('')
    router.push('/login')
}

</script>
<template>
    <q-drawer v-model="props.open" show-if-above :width="235" :breakpoint="400">
        <q-img class="absolute-top logo" src="../../public/images/logo.png" style="height: 200px">
            <div class="absolute-top  bg-transparent">
                <q-avatar size="150px" class="row q-ml-auto q-mr-auto">
                </q-avatar>
            </div>
        </q-img>
      

        <q-scroll-area style="height: 400px; margin-top: 200px; border-right: 1px solid #ddd">
            <q-list class="top" padding>

                <q-item>
                    <q-item-section avatar>
                        <q-icon name="person" />
                    </q-item-section>

                    <q-item-section>
                        {{decodedToken.sub }}
                    </q-item-section>
                </q-item>


                <q-item clickable v-ripple to="/dashboard">
                    <q-item-section avatar>
                        <q-icon name="home" />
                    </q-item-section>

                    <q-item-section>
                        Home
                    </q-item-section>
                </q-item>
                <q-expansion-item v-if="decodedToken.role=='Admin'" icon="group" label="Users" :content-inset-level="0.5">
                    <q-item clickable v-ripple to="/users/create">

                        <q-item-section avatar>
                            <q-icon name="add" />
                        </q-item-section>

                        <q-item-section>
                            Create
                        </q-item-section>
                    </q-item>
                    <q-item clickable v-ripple to="/users/search">
                        <q-item-section avatar>
                            <q-icon name="search" />
                        </q-item-section>

                        <q-item-section>
                            Search
                        </q-item-section>
                    </q-item>

                </q-expansion-item>
                <q-expansion-item icon="library_books" label="Books" :content-inset-level="0.5">

                    <q-item clickable v-ripple to="/books/create">

                        <q-item-section avatar>
                            <q-icon name="add" />
                        </q-item-section>

                        <q-item-section>
                            Upload
                        </q-item-section>

                    </q-item>

                    <q-item clickable v-ripple to="/books/search">
                        <q-item-section avatar>
                            <q-icon name="search" />
                        </q-item-section>

                        <q-item-section>
                            Search
                        </q-item-section>
                    </q-item>



                    <q-item clickable v-ripple to="/books/my_books">

                        <q-item-section avatar>
                            <q-icon name="list" />
                        </q-item-section>

                        <q-item-section>
                            My books
                        </q-item-section>

                    </q-item>
                </q-expansion-item>

            </q-list>


        </q-scroll-area>
        <q-item class="absolute-bottom shad" clickable v-ripple @click="logout()">
            <q-item-section avatar>
                <q-icon name="logout" />
            </q-item-section>

            <q-item-section>
                Logout
            </q-item-section>
        </q-item>
    </q-drawer>
</template>

<style scoped>
.logout-btn {
    margin-left: auto;
    margin-top: auto;
}
.shad{
    box-shadow: inset -10px -10px 15px rgba(255, 255, 255, 0.5), 
           inset 10px 10px 15px rgba(70, 70, 70, 0.12);

       }
       .logo{

margin-top: 20px;
}
.top{

margin-top: 30px;
}
</style>