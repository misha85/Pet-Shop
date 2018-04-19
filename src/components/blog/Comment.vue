<template>
	<div>
		<div class="container">
			<div class="row">
				<!-- Button trigger modal -->
				<button v-if="isComments" type="button" class="btn btn-info" data-toggle="modal" data-target="#komentar">
					Ostavite komentar
				</button>
			</div> <!-- .row -->
			<hr>
			<button v-if="isComments" class="btn btn-secondary show-comment" v-on:click="showComments"> {{ showHide }} komentare</button>
			<div v-else class="text-center is-comment">
				Nema objavljenih komentara za ovaj blog <i class="far fa-frown"></i>
				<br><br>
				<button type="button" class="btn btn-info" data-toggle="modal" data-target="#komentar">
					<p>Budite prvi koji ce ostaviti komentar <i class="far fa-smile fa-lg"></i> </p>
				</button>
			</div>
			<div class="row" v-for="comment in comments">
				<div class="card col-12" v-show="show">
					<div class="card-header">
						<span>{{ comment.nickname }}</span>
						<span class="datum">Datum: {{ comment.date | formatDate }}</span>
					</div> <!-- .card-header-->
					<div class="card-body">
						<blockquote class="blockquote mb-0">
							<p>{{ comment.content }}</p>
						</blockquote>
						<div v-if="adminAnswer"></div>
					</div> <!-- .card-body-->
				</div> <!-- .card-->
			</div> <!-- .row -->
		</div> <!-- .container-->

		<!-- =================================  MODAL  ================================= -->
		<div class="modal fade" id="komentar" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalLabel">Ostavite komentar</h5>
						<button type="button" class="close" data-dismiss="modal" aria-label="Close">
							<span aria-hidden="true">&times;</span>
						</button>
					</div> <!-- .modal-header -->
					<div class="modal-body">
						<p v-if="commentSuccess">Vaš komentar je uspešno prosleđen i čeka na odobrenje.</p>
						<p v-if="commentFailed">Niste popunili sva polja!</p>
						<p v-if="serverCrashed">
							Dogodilo se nešto nepredviđeno ali već radimo na otklanjanju greške.
							<br><br>
							Probajte ponovo za neko vreme.
						</p>
						<input v-if="leaveComment" type="text" v-model="nickname" class="form-control" placeholder="Vase ime..">
						<textarea v-if="leaveComment" class="form-control" v-model="content" placeholder="Komentar" rows="6"></textarea>
					</div> <!-- .modal-body -->
					<div class="modal-footer">
						<button v-if="commentSuccess" type="button" class="btn btn-success" @click="sendComment">U redu</button>
						<button v-if="serverCrashed" type="button" class="btn btn-warning" @click="serverCrash">U redu</button>
						<button v-if="commentFailed" type="button" class="btn btn-info" @click="tryAgain">Probaj ponovo</button>
						<button v-if="commentFailed" type="button" class="btn btn-secondary" @click="tryAgain(1)">Drugi put</button>
						<button v-if="leaveComment" type="button" class="btn btn-secondary" data-dismiss="modal">Ponisti</button>
						<button v-if="leaveComment" type="button" class="btn btn-primary" @click="addComment()">Pošalji komentar</button>
					</div> <!-- .modal-footer -->
				</div> <!-- .modal-content -->
			</div> <!-- .modal-dialog -->
		</div> <!-- .modal fade #exampleModal -->

	</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default{
	data() {
		return {
			comments: [],
			showHide: 'Sakrij',
			show: true,
			isComments: true,
			nickname: '',
			content: '',
			adminAnswer: false,
			leaveComment: true,
			commentSuccess: false,
			commentFailed: false,
			serverCrashed: false
		}
	},
	methods: {
		addComment(){
			if (this.nickname.length <= 2 || this.content.length <= 2) {
				this.leaveComment = false;
				this.commentFailed = true;
			} else {
				axios.post('http://praksa3.mars-t.mars-hosting.com/api/comment/insert-comment', {
					id: this.$route.params.id,
					nickname: this.nickname,
					content: this.content
				})
				.then(response => {
					console.log(response.data.res);
					if(response.data.res === 'failed'){
						$('#komentar').modal('show');
						this.leaveComment = false;
						this.commentSuccess = false;
						this.commentFailed = true;
					} else {
						this.leaveComment = false;
						this.commentSuccess = true;
					}
					this.nickname = '';
					this.content = '';
				})
				.catch( error =>{
					this.serverCrashed = true;
					this.leaveComment = false;
				});
			}
		},
		tryAgain(value){
			if (value === 1)
				$('#komentar').modal('hide');
			this.leaveComment = true;
			this.commentFailed = false;
		},
		sendComment(){
			$('#komentar').modal('hide');
			this.leaveComment = true;
			this.commentSuccess = false;
		},
		serverCrash(){
			$('#komentar').modal('hide');
			this.serverCrashed = false;
			this.leaveComment = true;
			this.nickname = '';
			this.content = '';
		},
		showComments() {
			if (this.show == true) {
				this.show = false;
				this.showHide = 'Prikazi';
			} else{
				this.show = true;
				this.showHide = 'Sakrij';
			}
		}
	},
	beforeCreate(){
		let app = this;
		app.comments = [];
    axios.get('http://praksa3.mars-t.mars-hosting.com/api/comment/get-comments', {
    	params: {
    		id: app.$route.params.id
    	}
    }).then(response => {
			for(var i=0; i<response.data.comments.length; i++){
				app.comments.push({
					cmt_id: response.data.comments[i].cmt_id,
					tpc_id: response.data.comments[i].tpc_id,
					nickname: response.data.comments[i].cmt_nickname,
					content: response.data.comments[i].cmt_content,
					date: response.data.comments[i].cmt_date,
					checked: response.data.comments[i].cmt_checked,
				})
			};
			if (app.comments.length > 0) app.isComments = true
				else app.isComments = false;
		})
	},
	filters: {
		formatDate(value){
			if ( !value ) return '';
			return moment(value).locale("sr").fromNow();
		}
	}
}
</script>

<style scoped>
#komentar input[type='text']{ margin: 0 0 10px 0; }
.show-comment{ margin: 0 0 15px  0; }
.col-12{ padding: 0; margin-bottom: 20px; }
.datum{
  color: #9A9999;
  font-size: 13px;
	float: right;
}
.fa-frown{
	color: #17a2b8;
	font-size: 20px;
}
.fa-smile{
	color: #fff;
}
.is-comment{
	margin-bottom: 20px;
}
	button{
		margin-left: 15px;
		/*padding-bottom: 0;*/
	}
</style>
