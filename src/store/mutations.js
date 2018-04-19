export default{
  'SET_BLOGS' (state, blogs) {
		state.blogs = blogs;
	},
  'SET_SINGLE_BLOG' (state, singleBlog) {
    state.singleBlog = singleBlog;
  },
  'SET_COMMENTS' (state, comments){
  	state.comments = comments;
  }
}
