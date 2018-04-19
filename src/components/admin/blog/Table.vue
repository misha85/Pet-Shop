<template>
  <div class="row">
    <table class="table table-hover table-light">
      <tr>
        <th scope="col">Ukupno blogova</th>
        <td>{{ numBlogs }}</td>
      </tr>
      <tr>
        <th scope="col">Ukupno blogova sa komentarima</th>
        <td>{{ blogsWithComments }}</td>
      </tr>
      <tr>
        <th scope="col">Ukupno komentara</th>
        <td>{{ numComments }}</td>
      </tr>
      <tr>
        <th scope="col">Broj odobrenih komentara</th>
        <td>{{ approvedComments }}</td>
      </tr>
      <tr>
        <th scope="col">Broj odbijenih komentara</th>
        <td>{{ inappropriateComments }}</td>
      </tr>
      <tr>
        <th scope="col">Broj razlicitih komentatora</th>
        <td>{{ diffNicknames }}</td>
      </tr>
    </table>
  </div> <!-- .row -->
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return{
      numBlogs: '',
      numComments: '',
      diffNicknames: '',
      blogsWithComments: '',
      inappropriateComments: '',
      approvedComments: ''
    }
  },
  beforeCreate() {
    axios.get('http://praksa3.mars-t.mars-hosting.com/api/admin/table-data').then(response => {
      for(var i=0; i<response.data.res.length; i++){
        this.numBlogs = response.data.res[i].blogs;
        this.blogsWithComments = response.data.res[i].blogsWithComments;
        this.numComments = response.data.res[i].comments;
        this.diffNicknames = response.data.res[i].diffNicknames;
        this.inappropriateComments = response.data.res[i].inappropriateComments;
        this.approvedComments = response.data.res[i].approvedComments;
      };
    })
  },
  created(){
    if (localStorage.getItem('sid') == undefined) {
      this.$router.push('/');
    };
  }
}
</script>

<style scoped>
  .buttons{
    margin-bottom: 25px;
  }
  tr:nth-of-type(odd){
    background: #F3F3F3;
    border-radius: 20px;
  }
</style>
