import React from 'react';
import './UserProfile.scss';
import UsersService from './../../../core/services/users.service';
import ImageUploader from 'react-images-upload';
import history from './../../../core/history/History';
import { API_BASE } from '../../../core/services/Constants';
import { NO_IMAGE_URL } from './../../../core/services/Constants';
import { NewsList } from './../../content/news/list/NewsList';
import { BookmarkedThreads } from './../../content/posts/bookmarked-threads/BookmarkedThreads';

export class UserProfile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            id: ''
        };
    }

    componentDidMount() {
        UsersService.getById().then((data) => {
            this.setState({ ...data.item });
        });
    }

    onChange(event) {
        event.persist();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onDrop(pictureFiles, pictureDataURLs) {
        debugger;
        if (pictureFiles.length > 0 && pictureDataURLs.length > 0) {
            UsersService.uploadProfilePicture({ source: pictureDataURLs[0].split(',')[1], name: pictureFiles[0].name }).then((resp) => {
                console.log(resp);
                this.setState({ imagePath: resp.data.item.imageSource });
            });
        } else {
            this.setState({ imagePath: '/images/placeholder-face-big.png' });
        }
    }

    onSubmit(event) {
        event.preventDefault();
        UsersService.save(this.state).then(() => {
            history.push('/home');
        });
    }

    render() {
        const imageSrc = () => {
            if (this.state.imagePath !== undefined) {
                return API_BASE + this.state.imagePath;
            } else {
                return NO_IMAGE_URL;
            }
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-8">
                        <div className="profile-holder">
                            <div className="header">
                                <h5>Profile</h5>
                                <div className="divider"></div>
                                <div className="row mt-4">
                                    <div className="col-2">
                                        <div className="profile-image image-holder">
                                            <img src={imageSrc()} alt="profile-img" />
                                        </div>
                                        <ImageUploader
                                            singleImage={true}
                                            withPreview={true}
                                            withIcon={false}
                                            buttonText='Upload'
                                            onChange={this.onDrop.bind(this)}
                                            imgExtension={['.jpg', '.gif', '.png']}
                                            maxFileSize={5242880}
                                        />
                                    </div>
                                    <div className="col-10">
                                        <form onSubmit={this.onSubmit.bind(this)}>
                                            <div className="row mb-2">
                                                <div className="col-6">
                                                    <input type="text" name="username" id="username" placeholder="Username" onChange={this.onChange.bind(this)} value={this.state.userName} required />
                                                </div>
                                                <div className="col-6">
                                                    <input type="email" name="email" id="email" placeholder="Email" onChange={this.onChange.bind(this)} value={this.state.email} required />
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-6">
                                                    <input type="text" name="firstName" id="firstName" placeholder="First Name" onChange={this.onChange.bind(this)} value={this.state.firstName} required />
                                                </div>
                                                <div className="col-6">
                                                    <input type="text" name="lastName" id="lastName" placeholder="Last Name" onChange={this.onChange.bind(this)} value={this.state.lastName} required />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="offset-6 col-6 text-right">
                                                    <button type="submit" className="btn btn-primary">Save</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-sm-4">
                        <NewsList />
                        <BookmarkedThreads />
                    </div>
                </div>
            </div>
        );
    }
}