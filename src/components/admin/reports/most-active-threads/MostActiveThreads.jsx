import React from 'react';
import './MostActiveThreads.scss';
import ReportsService from './../../../../core/services/reports.service';
import * as moment from 'moment';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class MostActiveThreads extends React.Component {
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
        ReportsService.getMostActiveThreadsReport(this.state).then((resp) => {
            console.log(resp);
            const data = [];

            for (const element of resp.item.items) {
                    data.push({ name: element.title, answers: element.answersCount })
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
            <div className="most-active-threads">
                <div className="row header-row">
                    <div className="col-12">
                        <h4>Most Active Threads report</h4>
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
                    <BarChart
                            width={600}
                            height={300}
                            data={this.state.reportData}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="1 1" />
                            <XAxis dataKey="name" />
                            <YAxis  domain={[dataMin => 0, dataMax => (dataMax * 2)]} type="number" interval="preserveStartEnd"/>
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="answers" fill="#82ca9d" />
                        </BarChart>
                    </div>
                </div>

            </div>
        );
    }
}