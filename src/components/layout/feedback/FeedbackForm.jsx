import React from 'react';
import './FeedbackForm.scss';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as moment from 'moment';
import BaseService from './../../../core/services/base-api.service';
import UploadAdapter from './../../../core/shared-components/upload-adapter/UploadAdapter';

export default class FeedbackForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            categoryId: '',
            content: '',
            createdOn: '',
            authorId: BaseService.getLoggedUserId(),
            categories: []
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
            createdOn: moment().format('YYYY-MM-DD HH:mm:ss')
        }, () => {
            // send form here
        });       
    }

    render() {
        return (
            <div className="form-holder">
                <div className="row mb-3">
                    <div className="col-12 text-center">
                        <h3>Send Feedback</h3>
                    </div>
                </div>
               
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="row">
                        <div className="col-12">
                            <input type="text" placeholder="Title" name="title" onChange={this.onChange.bind(this)} />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 vh-20">
                            <CKEditor
                                editor={ClassicEditor}
                                extraPlugins={[UploadAdapter]}
                                data="<p>Write your post here...</p>"
                                onInit={editor => {
                                    editor.plugins.get( 'FileRepository' ).createUploadAdapter = function( loader ) {
                                        return new UploadAdapter( loader );
                                      };
                                 }}
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
                            <button className="btn btn-primary">Send</button>
                        </div>
                    </div>
                </form>

            </div>
        );
    }
}