import React from 'react';
import './CreatePost.scss';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import BaseService from '../../../../core/services/base-api.service';
import PostsService from '../../../../core/services/posts.service';
import * as moment from 'moment';
import history from './../../../../core/history/History';
import CategoriesService from './../../../../core/services/categories.service';
import CustomSelect from './../../../../core/shared-components/CustomSelect';

export default class CreatePost extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            categoryId: '',
            subtitle: '',
            createdOn: '',
            authorId: BaseService.getLoggedUserId(),
            categories: []
        };
    }

    componentDidMount() {
        CategoriesService.getAll().then((response) => {
            this.setState({
                categories: response.data.items.map(cat => {
                    return {
                        value: cat.id,
                        label: cat.name
                    }
                })
            });
        });
    }

    onChange(event) {
        event.persist();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSelectChange = (selectedOption) => {
        this.setState({
            categoryId: selectedOption.value
        });
    }


    onSubmit(event) {
        event.preventDefault();
        this.setState({
            createdOn: moment().format('YYYY-MM-DD HH:mm:ss')
        }, () => {
            const {categories, ...post} = this.state;
            PostsService.save(post).then((response) => {
                if (response.data.error) {
                    this.setState({
                        errors: response.data.error
                    });
                } else {
                    history.push('/home');
                }
            });
        });       
    }

    render() {
        const { selectedOption, categories } = this.state;

        return (
            <div className="form-holder">
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
                                data="<p>Write your post here...</p>"
                                onInit={editor => { }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    this.setState({
                                        subtitle: data
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12">
                            <CustomSelect
                                value={selectedOption}
                                onSelectChange={this.handleSelectChange}
                                options={categories}
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