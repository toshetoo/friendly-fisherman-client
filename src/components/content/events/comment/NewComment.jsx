import React from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import EventService from '../../../../core/services/event.service';
import BaseService from './../../../../core/services/base-api.service';
import * as moment from 'moment';
import './NewComment.scss';

export default class NewComment extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: '',
            eventId: '',
            creatorId: BaseService.getLoggedUserId(),
            createdOn: '',
            content: '<p>Comment...</p>',
            errors: '',
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
            eventId: this.props.eventId
        }, () => {
            EventService.saveComment(this.state).then((response) => {
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
            <form onSubmit={this.onSubmit.bind(this)}>
                <div className="row mt-2">
                    <div className="col-12 vh-20">
                        <CKEditor
                            editor={ClassicEditor}
                            data="<p>Comment...</p>"
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
        );
    }
}