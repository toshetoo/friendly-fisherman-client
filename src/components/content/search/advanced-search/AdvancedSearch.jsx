import React from 'react';
import CustomSelect from './../../../../core/shared-components/CustomSelect';
import CategoriesService from './../../../../core/services/categories.service';
import DatePicker from 'react-datepicker';
import './AdvancedSearch.scss';

export default class AdvancedSearch extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            from: '',
            to: ''
        }
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


    render() {
        const { selectedOption, categories } = this.state;

        return (
            <div className="advanced-filters">
                <div className="row">
                    <div className="col-12 text-left">
                        <h3>Advanced Search criteria</h3>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="keywords">Keywords</label>
                            <input type="text" id="keywords" />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="form-group">
                            <label htmlFor="keywords">Search in category</label>
                            <CustomSelect
                                value={selectedOption}
                                onSelectChange={this.handleSelectChange}
                                options={categories}
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <DatePicker
                            name="from"
                            placeholderText="From"
                            selected={this.state.from}
                            selectsStart
                            startDate={this.state.from}
                            endDate={this.state.to}
                            onChange={(date) => this.setState({ from: date })}
                            required
                        />
                    </div>

                    <div className="col-6">
                        <DatePicker
                            name="to"
                            placeholderText="To"
                            selected={this.state.to}
                            selectsEnd
                            startDate={this.state.startDate}
                            endDate={this.state.to}
                            onChange={(date) => this.setState({ to: date })}
                            required
                        />
                    </div>
                </div>
            </div>
        )
    }
}