import React from 'react';
import './MostUsedCategories.scss';
import ReportsService from './../../../../core/services/reports.service';
import * as moment from 'moment';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class MostUsedCategories extends React.Component {
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
        ReportsService.getMostUsedCategoriesReport(this.state).then((resp) => {
            console.log(resp);
            const data = [];

            for (const key in resp.item.items) {
                if (resp.item.items.hasOwnProperty(key)) {
                    const element = resp.item.items[key];
                    data.push({ name: key, count: element })
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
            <div className="most-used-categories">
                <div className="row header-row">
                    <div className="col-12">
                        <h4>Most Used categories report</h4>
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
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                    </div>
                </div>

            </div>
        );
    }
}