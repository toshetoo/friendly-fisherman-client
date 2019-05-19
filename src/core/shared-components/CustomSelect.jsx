
import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/lib/animated';

export default class CustomSelect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    handleSelectChange = (selectedOption) => {
        this.props.onSelectChange(selectedOption);
    }

    render() {
    
        const { selectedOption, options } = this.props;

        return (
            <Select
                closeMenuOnSelect={false}
                components={makeAnimated()}
                value={selectedOption}
                onChange={this.handleSelectChange}
                options={options}
                placeholder="Category"
            />
        );
    }
}