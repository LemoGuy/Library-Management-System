
<script setup>
import Layout from '../components/Layout.vue'
</script>

<template>
<Layout>

    <q-card class="container">
          
    <div class="one">
  <h1>UKH Library</h1>
</div>
            <div class="input-container">
                <div>
            <div>
              <p class="responsive-paragraph shad">Everything you need for better future and success has alread been written.
                                      And guess what? All you have to do is visit the library system.
                              </p>
                              <p class="responsive-paragraph shad">BAD LIBRARIES BUILD
                              COLLECTIONS, GOOD LIBRARIES BUILD SERVICES, GREAT LIBRARIES BUILD COMMUNITIES.
                              </p>
                              <p class="responsive-paragraph shad">R. David Lankes
                              </p>
            </div>
        </div>
            </div>
        </q-card>
    
</Layout>

</template>
<style scoped>
h1 {
  position: relative;
  padding: 0;
  margin: 0;
  font-family: "Raleway", sans-serif;
  font-weight: 300;
  font-size: 40px;
  color: #080808;
  -webkit-transition: all 0.4s ease 0s;
  -o-transition: all 0.4s ease 0s;
  transition: all 0.4s ease 0s;
}

h1 span {
  display: block;
  font-size: 0.5em;
  line-height: 1.3;
}
h1 em {
  font-style: normal;
  font-weight: 600;
}

/* === HEADING STYLE #1 === */
.one h1 {
  text-align: center;
  text-transform: uppercase;
  padding-bottom: 5px;
}
.one h1:before {
  width: 48px;
  height: 5px;
  display: block;
  content: "";
  position: absolute;
  bottom: 3px;
  left: 50%;
  margin-left: -14px;
  background-color: #5f83c2;
}
.one h1:after {
  width: 300px;
  height: 1px;
  display: block;
  content: "";
  position: relative;
  margin-top: 25px;
  left: 35%;
  margin-left: -50px;
  background-color: #5f83c2;
}
.shad{

    margin-top: 20px;
}
P {
font-family: "trebuchet MS";
color: #222222; 
font-size: 12pt;
text-align: justify;  
line-height: 28px;  
padding: 10px;
margin-top: 10px;
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
    width: 50%;
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

</style>