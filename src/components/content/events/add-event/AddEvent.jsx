import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ImageUploader from 'react-images-upload';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

import EventService from '../../../../core/services/event.service';
import { GOOGLE_MAP_API_KEY } from '../../../../core/services/Constants';
import './AddEvent.scss';
import history from '../../../../core/history/History';

class AddEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: 'Description...',
            imageCover: '',
            eventStatus: 'Pending',
            startDate: '',
            endDate: '',
            imageName: '',
            imageData: '',
            lng: '',
            lat: '',
            errors: '',
        }

        this.onDrop = this.onDrop.bind(this);
    }

    onChange(event) {
        event.persist();
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        EventService.save(this.state).then((response) => {
            history.push('/events');
        });
    }

    onDrop(pictureFiles, pictureDataURLs) {
        if (pictureFiles.length > 0 && pictureDataURLs.length > 0) {
            this.setState({ imageData: pictureDataURLs[0], imageName: pictureFiles[0].name });
        } else {
            this.setState({ imageData: '', imageName: '' });
        }
    }

    onMapClicked(mapProps, map, clickEvent) {
        let lat = clickEvent.latLng.lat();
        let lng = clickEvent.latLng.lng();

        this.setState({ lat, lng });
    }

    render() {
        return (
            <div className="form-holder">
                <div className="errors text-center">
                    <span className="text-danger">{this.state.errors}</span>
                </div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <div className="row">
                        <div className="col-4">
                            <input type="text" placeholder="Title" name="title" onChange={this.onChange.bind(this)} required />
                        </div>
                        <div className="col-4">
                            <DatePicker
                                name="startDate"
                                placeholderText="Start date"
                                selected={this.state.startDate}
                                selectsStart
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                onChange={(date) => this.setState({ startDate: date })}
                                required
                            />
                        </div>

                        <div className="col-4">
                            <DatePicker
                                name="endDate"
                                placeholderText="End date"
                                selected={this.state.endDate}
                                selectsEnd
                                startDate={this.state.startDate}
                                endDate={this.state.endDate}
                                onChange={(date) => this.setState({ endDate: date })}
                                required
                            />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 vh-20">
                            <CKEditor
                                editor={ClassicEditor}
                                data={this.state.description}
                                onInit={editor => { }}
                                onChange={(event, editor) => {
                                    const data = editor.getData();
                                    this.setState({
                                        description: data
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <div className="row mt-2 event-map">
                        <Map
                            style={{ maxWidth: '100%', maxHeight: '250px' }}
                            google={this.props.google}
                            zoom={15}
                            onClick={this.onMapClicked.bind(this)}
                            initialCenter={{
                                lat: 42.135350422841604,
                                lng: 24.745428584791625
                            }}
                        >
                            <Marker
                                title={'Event location'}
                                position={{ lat: this.state.lat, lng: this.state.lng }} />
                        </Map>
                    </div>
                    <div className="row mt-2">
                        <ImageUploader
                            singleImage={true}
                            withPreview={true}
                            withIcon={false}
                            buttonText='Choose images'
                            onChange={this.onDrop}
                            imgExtension={['.jpg', '.gif', '.png']}
                            maxFileSize={5242880}
                        />
                    </div>

                    <div className="row mt-2">
                        <div className="col-12 text-right">
                            <button className="btn btn-primary">Create</button>
                        </div>
                    </div>
                </form>

            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (GOOGLE_MAP_API_KEY)
})(AddEvent)