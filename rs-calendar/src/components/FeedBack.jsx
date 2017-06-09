import React, {Component} from 'react';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      commentValue: ''
    };
  }
  edit(){
    this.setState({editing: true});
  }
  remove(){
    this.props.onRemove(this.props.index);
  }
  save(){
    const commentValue = this.state.commentValue;
    this.props.onChange(commentValue, this.props.index);
    this.setState({editing: false});
  }
  handleChange(e){
    this.setState({
      commentValue: e.target.value
    })
  }
  renderDisplay(){
    return (
      <div className="comment">
        <p>{this.props.children}</p>
        <span>
          <button
            onClick={()=>this.edit()}
            className="btn btn-primary fa fa-pencil"/>
          <button
            onClick={()=>this.remove()}
            className="btn btn-danger fa fa-trash-o"/>
        </span>
      </div>
    );
  }
  renderForm(){
    return (
      <div className="comment">
          <textarea
            defaultValue={this.props.children}
            className="form-control"
            onChange={(e)=>this.handleChange(e)}
          ></textarea>
        <button
            className="btn btn-success btn-sm fa fa-floppy-o"
            onClick={()=>this.save()}
          />
      </div>
    )
  }
  render() {
    if (this.state.editing) {
      return this.renderForm();
    }
    else {
      return this.renderDisplay();
    }
  }
}

class FeedBack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      commentValue: ''
    };
  }
  addComment(text) {
    if (text==='') {
      this.setState({
        comments: [...this.state.comments, 'Empty Comment Field']
      })
    } else {
      this.setState({
        comments: [...this.state.comments, text]
      })
    }
  }
  removeComment(i) {
    this.setState({comments: this.state.comments.filter((comment, index)=> index !== i)});
  }
  updateComment(newText, i) {
    const arr = this.state.comments;
    arr[i] = newText;
    this.setState({comments:arr});
  }
  handleChange(e) {
    this.setState({
      commentValue: e.target.value
    })
  }
  render() {
    return(
      <div className="feedback-field">
        <div className="add-comment">
          <textarea
            defaultValue={this.props.children}
            className="form-control"
            onChange={(e)=>this.handleChange(e)}
            placeholder="Write comment here"
          ></textarea>
          <button
            className="btn btn-success btn-sm"
            onClick={()=>this.addComment(this.state.commentValue)}
          >
            Send Feedback
          </button>
        </div>
        {this.state.comments.map((comment, index) => {
          return (
            <Comment
              key={index}
              index={index}
              onChange={(...args)=>this.updateComment(...args)}
              onRemove={(...args)=>{this.removeComment(...args)}}
            >
              {comment}
            </Comment>
          )
        })}
      </div>
    )
  }
}

export default FeedBack
