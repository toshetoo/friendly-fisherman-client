import React from 'react';
import './CreateReply.scss';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import BaseService from './../../../../core/services/base-api.service';
import * as moment from 'moment';
import PostsService from './../../../../core/services/posts.service';

export default class CreateReply extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            threadId: '',
            userId: BaseService.getLoggedUserId(),
            createdOn: '',
            content: '',
        };
    }

    onChange(event) {
        event.persist();
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    onSubmit(event) {
        event.preventDefault();
        this.setState({
            createdOn: moment().format('YYYY-MM-DD HH:mm:ss'),
            threadId: this.props.threadId
        }, () => {            
            PostsService.addReply(this.state).then((response) => {
                if (response.data.error) {
                    this.setState({
                        errors: response.data.error
                    });
                } else {
                    this.props.refresh();
                }
            });
        });       
    }

    render() {
        return (
            <div className="form-holder">
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="row mt-2">
                        <div className="col-12 vh-20">
                            <CKEditor
                                editor={ClassicEditor}
                                data="<p>Write your post here...</p>"
                                onInit={editor => { }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    this.setState({
                                        content: data
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 text-right">
                            <button className="btn btn-primary">Save</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}