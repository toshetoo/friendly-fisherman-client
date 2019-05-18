import React from 'react';
import './CreatePost.scss';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default class CreatePost extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div className="form-holder">
                <div className="row">
                    <div className="col-12">
                        <input type="text" placeholder="Title"/> 
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-12">
                        <CKEditor
                            editor={ClassicEditor}
                            data="<p>Hello from CKEditor 5!</p>"
                            onInit={editor => {
                                // You can store the "editor" and use when it is needed.
                                console.log('Editor is ready to use!', editor);
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                console.log({ event, editor, data });
                            }}
                        />
                    </div>                                     
                </div>    
                <div className="row mt-2">
                        <div className="col-12 text-right">
                            <button class="btn btn-primary">Save</button>
                        </div>
                    </div>              
            </div>
        );
    }
}