import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import CenteredMessage from "../../../../components/CenteredMessage";
import SubHeadLine from "../../../../components/Subheadline";
import {selectedTimeRecordSelector} from "../ducks/selectedTimeRecord";
import LevelsVisualizer from "./LevelsVisualizer";
import ObjectInfo from "../../../app/containers/ObjectInfo";
import moment from "moment";

class IntervalVisualizer extends Component {
    static propTypes = {
        selectedTimeRecord: PropTypes.instanceOf(Array).isRequired
    };

    render() {
        const {selectedTimeRecord} = this.props;

        if (selectedTimeRecord.length == 0) {
            return <CenteredMessage>Select events on the Time Line to view them.</CenteredMessage>
        }

        var interval = selectedTimeRecord[0];
        return <div>
            <SubHeadLine title="Interval"/>
            <ObjectInfo header="Interval" url={interval.url}/>
            <br/>
            <b>Begin: </b>
            {moment(interval.begin).toString()}
            <br/>
            <b>End: </b>
            {moment(interval.end).toString()}
            <hr/>
            <LevelsVisualizer timeRecordUrl={interval.url}/>
        </div>

    }
}

const selector = createStructuredSelector({
    selectedTimeRecord: selectedTimeRecordSelector,
});

export default connect(selector)(IntervalVisualizer);
