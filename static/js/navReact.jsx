function AddPostEvent(){
	var event = document.createEvent('Event');
	event.initEvent('addPostNav',true,true);
	document.dispatchEvent(event);
}
var AddPost = React.createClass({
	getInitialState: function(){
	return {showModal:'none'}
	},
	componentDidMount:function(){
		var self = this;
		document.addEventListener('addPostNav',function (e){
			self.showModal();
		}, false);
	},
	showModal: function(){
		this.setState({showModal:'inherit'});
	},
	closeModal:function(){
		this.setState({showModal:'none'});
	},
	addPost: function(){
			var self = this;
			var date = new Date();
			date = date.toISOString();
			var sendData = {author:1,tag:$('#addPostModalTags').val(),title:$('#addPostModalTitle').val(),article:$('#addPostModalArticle').val(),date:date
			};
			$.ajax({
				url:'http://127.0.0.1:8000/post/api/',
				dataType:'json',
				method:'POST',
				data:sendData,
				success: function(data){
					var id = data.id
					window.location.href = "http://127.0.0.1:8000/post/"+id+"/";

				}.bind(this),
				error:function(xhr,status,err){
					console.error("http://127.0.0.1:8000/post/1/",status,err.toString());
				}.bind(this)
			});
		},
		render:function(){
			var style = { display:this.state.showModal};
			var close = <button className="btn btn-default" onClick={this.closeModal}>Close</button>;
			var addPostBody = <div>
								<label>Title:</label>
								<input type="text" className="form-control" id="addPostModalTitle"/>
								<label>Article:</label>
								<textarea className="form-control" style={{height:'350px'}} id="addPostModalArticle"></textarea>
								<label>Tags:</label>
								<input type="text" className="form-control" id="addPostModalTags"/>
								<button style={{marginTop:'20px'}} className="btn btn-primary" onClick={this.addPost}>Add Post </button>
							</div>
			return (
				<div>
					<AddPostModal style={style} title="Add a new post" close={close} body={addPostBody} />
				</div>
			)
		}
});

var AddPostModal = React.createClass({
	render:function(){
		return(
			<div id="addPostModal" className="modal" style={this.props.style}>
				<div className="modal-dialog">
					<div className="modal-content">
					<div className="modal-header">
					<button type="button" className="close"></button>
					<h4 className="modal-title">{this.props.title}</h4>
					</div>
					<div className="modal-body">
						{this.props.body}
						<br/>
						{this.props.matches}
					</div>
					<div className="modal-footer" style={{clear:'both'}}>
						{this.props.close}
					</div>
				</div>
			</div>
		</div>
		)
	}
});
React.render(
	<AddPost/>,
	document.getElementById('addPost')
)