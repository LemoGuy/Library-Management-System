<script setup>

</script>

<template>
   <head>
  <meta charset="UTF-8" />
  <title>Get In Touch Section</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <link rel="stylesheet" href="style.css" />
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<body>
  <section class="footer_get_touch_outer ">
    <div class="container">
      <div class="footer_get_touch_inner grid-70-30">
        <div class="colmun-70 get_form">
          <div class="get_form_inner ">
             <h3 class="pp">Get In Touch</h3>
             <h5 class="pp">Way To Recover Your Password </h5>
            <div class=" layout">
             
            </div>
            <form action="#">
             
              <div class="grid-full ">
              </div>
            </form>
          </div>
        </div>
        <div class="colmun-30 get_say_form">
          <h5>Say Hi!</h5>
          <ul class="get_say_info_sec">
            <li>
              <i class="fa fa-envelope"></i>
              <a href="mailto:">admissions@ukh.edu.krd</a>
            </li>
            <li>
              <i class="fa fa-whatsapp"></i>
              <a href="tel:">+964 750 857 8833</a>
            </li>
            <li>
              <i class="fa fa-address-card-o"></i>
              <a >Office Adress: UKH, Library Building   8:30AM-8:00PM </a> 
            </li>
          </ul>  
          <ul class="get_say_social-icn">
            <li><a href="https://www.facebook.com/UKH.Official"><i class="fa fa-facebook"></i></a></li>
            <li><a href="https://www.instagram.com/ukh.official/?hl=en"><i class="fa fa-instagram"></i></a></li>
            <li><a href="https://twitter.com/UKH_official"><i class="fa fa-twitter"></i></a></li>
          </ul>          
        </div>        
      </div>
    </div>
  </section>
</body>
    
</template>
<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}
body {
  background: #f2f4f6;
}
.pp{
    margin-bottom: 15px;
}
.layout {
    min-height: 300px;
    background-image: url(./img/h.jpg);
    background-repeat: no-repeat;
    background-size: cover;
}

.footer_get_touch_outer {
  margin-top: 80px;
}
.container {
  width: 95%;
  max-width: 1140px;
  margin: auto;
}
.grid-70-30 {
  display: grid;
  grid-template-columns: 70% 30%;
}
.get_form_inner {
  display: block;
  padding: 50px 40px;
  background: #fff;
  box-shadow: -4px -2px 20px -7px #cfd5df;
}
input[type="text"], input[type="text"], input[type="email"], input[type="tel"] {
  border: 1px solid #dbdbdb;
  border-radius: 2px;
  color: #333;
  height: 42px;
  padding: 0 0 0 20px;
  width: 100%;
  outline: 0;
}
.grid-50-50 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}
.grid-full {
  margin: 20px 0;
}
textarea {
  border: 1px solid #dbdbdb;
  border-radius: 2px;
  color: #333;
  padding: 12px 0 0 20px;
  width: 100%;
  outline: 0;
  margin-bottom: 20px;
}
.get_form_inner_text h3 {
  color: #333;
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 40px;
}
input[type="submit"] {
  display: inline-block;
  font-size: 16px;
  text-transform: uppercase;
  background: transparent;
  border: 2px solid;
  font-weight: 500;
  padding: 10px 20px;
  outline: 0;
  cursor: pointer;
  color: #103e65;
  transition: all 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  -webkit-transition: all 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  -moz-transition: all 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  -ms-transition: all 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  -o-transition: all 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}
input[type="submit"]:hover {
  background-color: #538eb1;
  border-color: #4096c8;
  color: #fff;
}
.get_say_form {
  display: inline-block;
  padding: 45px 0 25px 30px;
  background: #80b8d8;
  position: relative;
}
.get_say_form h5 {
  color: #fff;
  font-size: 26px;
  margin: 0 0 40px;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.get_say_social-icn {
  display: flex;
  position: absolute;
  bottom: 40px;
}
.get_say_social-icn a {
  font-size: 22px;
  color: #fff;
  padding: 0 20px 0 0;
}
.get_say_info_sec i {
  color: #fff;
  font-size: 32px;
}
.get_say_info_sec > li {
  display: grid;
  grid-template-columns: 40px auto;
  align-items: center;
  margin-bottom: 40px;
}
.get_say_info_sec > li a {
  width: 100%;
  display: block;
  padding: 15px 25px;
  color: #fff;
  font-size: 16px;
  text-decoration: unset;
  font-weight: 500;
  background: #4ca4d3;
  border-radius: 5px 0 0 5px;
  transition: background 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  -webkit-transition: background 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  -moz-transition: background 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  -ms-transition: background 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
  -o-transition: background 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19);
}
.get_say_info_sec > li a:hover {
  background-color: #377da6;
}
</style>