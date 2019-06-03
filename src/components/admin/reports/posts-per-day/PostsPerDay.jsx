import React from 'react';
import './PostsPerDay.scss';
import ReportsService from './../../../../core/services/reports.service';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import * as moment from 'moment';

export default class PostsPerDay extends React.Component {
    constructor(props) {
        super(props);

        this.timeout = null;
        this.state = {
            limit: 5,
            startDate: moment().subtract(7, 'd').format('YYYY-MM-DD'),
            endDate: moment().format('YYYY-MM-DD'),
            reportData: null
        };
    }

    componentDidMount() {
        this.getReportData();
    }

    onChange(event) {
        event.persist();
        this.setState({
            [event.target.name]: event.target.value
        }, () => this.refreshReport());
    }

    getReportData() {
        ReportsService.getPostsPerDayReport(this.state).then((resp) => {
            const data = [];

            for (const key in resp.item.items) {
                if (resp.item.items.hasOwnProperty(key)) {
                    const element = resp.item.items[key];
                    data.push({ name: moment(key).format('YYYY-MM-DD'), count: element })
                }
            }
            data.sort((a, b) => new Date(a.name) - new Date(b.name));
            this.setState({
                reportData: data
            })
        });
    }

    refreshReport() {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => this.getReportData(), 3000);
    }

    render() {
        return (
            <div className="posts-per-day">
                <div className="row header-row">
                    <div className="col-12">
                        <h4>Posts Per day report</h4>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-3">
                        <div className="row ml-3">
                            <h6>Report parameters</h6>
                        </div>
                        <div className="row ml-3">
                            <div className="col-12">
                                <div className="form-group">
                                    <label>Limit</label>
                                    <input type="number"
                                        className="form-control"
                                        name="limit"
                                        value={this.state.limit}
                                        onChange={this.onChange.bind(this)} />
                                </div>
                            </div>
                        </div>
                        <div className="row ml-3">
                            <div className="col-12">
                                <div className="form-group">
                                    <label>Start date</label>
                                    <input type="date"
                                        className="form-control"
                                        name="startDate"
                                        value={this.state.startDate}
                                        onChange={this.onChange.bind(this)} />
                                </div>
                            </div>
                        </div>
                        <div className="row ml-3">
                            <div className="col-12">
                                <div className="form-group">
                                    <label>End Date</label>
                                    <input type="date"
                                        className="form-control"
                                        name="endDate"
                                        value={this.state.endDate}
                                        onChange={this.onChange.bind(this)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-9">
                        <LineChart width={600} height={300} data={this.state.reportData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" padding={{ left: 30, right: 30 }} />
                            <YAxis domain={[dataMin => 0, dataMax => (dataMax * 2)]} type="number" interval="preserveStartEnd" />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="#007bff" activeDot={{ r: 4 }} />
                        </LineChart>
                    </div>
                </div>

            </div>
        );
    }
}