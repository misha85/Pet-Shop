<template>
	<div class="comment col-12">
		<div class="card col-12" v-for="comment in comments">
			<div class="card-header">
				<span><i class="fas fa-user-circle"></i> {{ comment.cmt_nickname }}</span>
				<span class="datum">Datum: {{ comment.cmt_date | formatDate }}</span>
			</div> <!-- .card-header -->
			<div class="card-body">
				<blockquote class="blockquote mb-0">
					<p>{{ comment.cmt_content }}</p>
				</blockquote>
			</div> <!-- .card-body -->
			<div class="card-footer">
				<button data-toggle="modal" data-target="#allowComment" @click="allowComment(1, comment.cmt_id)" class="btn btn-success">Odobri komentar</button>
				<button data-toggle="modal" data-target="#allowComment" @click="allowComment(0, comment.cmt_id)" class="btn btn-danger">Odbi komentar</button>
			</div> <!-- .card-footer -->
		</div> <!-- .card col-12 -->

		<!-- ==========================  BOOTSTRAP  MODAL  ========================== -->
		<div class="modal fade" id="allowComment" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button> <!-- .close -->
		      </div> <!-- .modal-header -->
		      <div class="modal-body">
		        {{ message }}
		      </div> <!-- .modal-body -->
		      <div class="modal-footer">
		        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
		      </div> <!-- .modal-footer -->
		    </div> <!-- .modal-content -->
		  </div> <!-- .modal-dialog -->
		</div> <!-- .modal fade -->
	</div> <!-- .comment col-12 -->
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import { eventBus } from '../../../main';

export default{
	data() {
		return {
			comments: [],
			message: ''
		}
	},
	methods: {
		allowComment(value, cmt_id) {
			let app = this;
			axios.get('http://praksa3.mars-t.mars-hosting.com/api/comment/allow-comment', {
				params: {
					tpc_id: this.$route.params.id,
					cmt_id: cmt_id,
					allow: value
				}
			}).then( response => {
				console.log(response.data);
				app.comments = response.data.comments;
				app.message = response.data.result;
				eventBus.$emit('commentChanged')
			})
		}
	},
	created(){
		let app = this;
		axios.get('http://praksa3.mars-t.mars-hosting.com/api/admin/get-comments', {
			params: {
				component: 'comments',
				id: this.$route.params.id
			}
		}).then( function (response) {
				app.comments = response.data.comments;
				console.log(app.comments.length);
		})
		if (localStorage.getItem('sid') == undefined) {
	      this.$router.push('/');
	    };
	},
	filters: {
		formatDate(value){
			if ( !value ) return '';
			return moment(value).locale("sr").format('Do MMMM YYYY');
		}
	}
}
</script>

<style scoped>
.card{
	margin: 15px 0;
	padding: 0;
}
.card-header span:nth-of-type(1){
	 text-transform: capitalize;
}
.card-footer button:nth-of-type(2){
	float: right;
}
.fa-user-circle{ color: #1e7e34; }
.datum{
	color: #727171;
	float: right;
}
</style>
