import React, {Component} from 'react';
import {Button, FormGroup, ControlLabel, FormControl, HelpBlock, Alert} from 'react-bootstrap'
import {getRecordStates, getUser} from "../api/RecordsApi";
import {getContainerById, updateContainer} from "../api/ContainersApi";
import {getDateTimeString} from "../utilities/DateTime";

class UpdateContainer extends Component {

    constructor(props, context) {
        super(props, context);
        this.state =
            {
                user: props.userData,
                alertMsg: "",

                containerNumber: null,
                records: [],

                titleValidationMsg: "",
                titleValidationState: "success",
                title: "",

                userLocations: null,

                locationValidationMsg: "",
                locationValidationState: "success",
                locationId: null,

                //TODO State
                stateValidationMsg: "",
                stateValidationState: "success",
                stateId: null,

                consignmentCodeValidationMsg: "",
                consignmentCodeValidationState: "success",
                consignmentCode: "",

                notesValidationMsg: "",
                notesValidationState: "success",
                notes: null,


                responseJson: {
                    containerId: null,
                    title: null,
                    location: "",
                    state: null,
                    notes: null,
                    locationId: null,
                    stateId: null
                },
                recordStateResponse: null,
            };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        let setData = this.setData;
        let that = this;
        getContainerById(this.props.match.params.containerId, this.state.user.id)
            .then(response => response.json())
            .then(data => {
                this.setState({title: data.title});
                this.setState({locationId: data.locationId});
                this.setState({stateId: data.stateId});
                this.setState({containerNumber: data.containerNumber});
                this.setState({consignmentCode: data.consignmentCode});
                this.setState({notes: data.notes});
                this.setState({records: data.childRecordIds});
                if (data && !data.exception) {
                    setData(that, data);
                }
                console.log(this.state);
            })
            .catch(err => {
                console.error("Error loading container: " + err.message);
            });

        getUser(this.state.user.id)
            .then(response => response.json())
            .then(data => {
                this.setState({userLocations: data.locations});
            })
            .catch(err => {
                console.error("Error loading record: " + err.message);
                this.setState({alertMsg: "The application was unable to connect to the server. Please try again later."})
            });
        getRecordStates()
            .then(response => response.json())
            .then(data => {
                this.setState({recordStateResponse: data});
            })
            .catch(err => {
                console.error("Error loading record states: " + err.message);
                this.setState({alertMsg: "The application was unable to connect to the server. Please try again later."})
            });
    }

    setData = (context, data) => {
        let keys = Object.keys(data);
        keys.forEach(key => {
            if (key.endsWith("At")) {
                data[key] = getDateTimeString(new Date(data[key]));
            }
        });
        context.setState({"responseJson": data});
    };

    handleChange(e) {
        e.persist();
        this.setState({[e.target.name]: e.target.value}, () => {
            if (e.target.name === "title") {
                const length = this.state.responseJson["title"].length;
                if (length >= 1 && length < 256) {
                    this.setState({titleValidationState: 'success'});
                }
                else if (length >= 250) {
                    this.setState({titleValidationMsg: "Please enter less than 256 characters"});
                    this.setState({titleValidationState: 'error'});
                }
                else {
                    this.setState({titleValidationState: null});
                }
            }

            if (e.target.name === "location") {
                const length = this.state.location.length;
                if (length >= 1) {
                    this.setState({locationValidationState: 'success'});
                }
                else {
                    this.setState({locationValidationState: 'error'});
                    this.setState({locationValidationMsg: 'Location should be pre-selected. Please notify the developers.'});
                }
            }

            if (e.target.name === "consignmentCode") {
                const length = this.state.consignmentCode.length;
                if (length >= 1 && length <= 50) {
                    this.setState({consignmentCodeValidationState: 'success'});
                }
                else if (length > 50) {
                    this.setState({consignmentCodeValidationState: 'error'});
                    this.setState({consignmentCodeValidationMsg: 'Please enter less than 51 characters only'});
                }
                else {
                    this.setState({consignmentCode: ""});
                    this.setState({consignmentCodeValidationState: 'success'});
                }
            }

            if (e.target.name === "notes") {
                const length = this.state.notes.length;
                if (length >= 0) {
                    this.setState({notesValidationState: 'success'});
                }
            }

        });
    }

    handleSubmit(event) {
        const regexValidationState = /^.*ValidationState$/;
        let keys = Object.keys(this.state);
        let failValidation = false;
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            if (regexValidationState.test(key)) {
                if (this.state[key] === null) {
                    failValidation = true;
                    let returnObj = {};
                    returnObj[key] = "error";
                    this.setState(returnObj);
                    let returnObjMsg = {};
                    let keyValidationMsg = key.replace("ValidationState", "ValidationMsg");
                    returnObjMsg[keyValidationMsg] = "Please fill out the required field.";
                    this.setState(returnObjMsg);
                }
                if (this.state[key] === "error") {
                    failValidation = true;
                }
            }
        }
        if (!failValidation) {
            this.setState({
                title: this.state.title ? this.state.title.trim() : this.state.title,
                consignmentCode: this.state.consignmentCode ? this.state.consignmentCode.trim() : this.state.consignmentCode,
                notes: this.state.notes ? this.state.notes.trim() : this.state.notes
            }, () => {
                updateContainer(this.props.match.params.containerId, this.state, this.state.user.id)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        if (data.status === 401 || data.status === 400 || data.status === 404 || data.status === 500) {
                            this.setState({alertMsg: data.message});
                            window.scrollTo(0, 0)
                        }
                        else {
                            this.props.history.push("/viewContainer/" + data.containerId);
                        }
                    })
                    .catch(error => {
                        this.setState({alertMsg: "The application was unable to connect to the network. Please try again later."});
                        window.scrollTo(0, 0)
                    });
            });
        }

        event.preventDefault();
    }

    render() {
        let listLocationJson = null;
        let listRecordStatesJson = null;
        if (this.state.recordStateResponse !== null) {
            listRecordStatesJson = this.state.recordStateResponse.map((item, i) =>
                <option key={i} value={item.id}>{item.name}</option>);
        }
        if (this.state.userLocations !== null) {
            listLocationJson = this.state.userLocations.map((item, i) =>
                <option key={i} value={item.locationId}>{item.locationName}</option>);
        }

        const requiredLabel = <span style={{color: 'red'}}>(Required)</span>;

        let formStyle = {
            margin: 'auto',
            width: '50%',
            padding: '10px',
            textAlign: 'left'
        };

        return (
            <div>
                {this.state.alertMsg.length !== 0
                    ? <Alert bsStyle="danger"><h4>{this.state.alertMsg}</h4></Alert>
                    : null
                }
                <h1>Update Container</h1>
                <h2>{this.state.containerNumber}</h2>
                <form onSubmit={this.handleSubmit} style={formStyle}>
                    <FormGroup
                        validationState={this.state.titleValidationState}
                    >
                        <ControlLabel>Title {requiredLabel}</ControlLabel>
                        <FormControl
                            name="title"
                            type="text"
                            value={this.state.title}
                            placeholder="Enter text"
                            onChange={this.handleChange}
                        />
                        {this.state.titleValidationState === "error"
                            ? <HelpBlock>{this.state.titleValidationMsg}</HelpBlock>
                            : null
                        }
                    </FormGroup>
                    <FormGroup
                        controlId="formLocation"
                        onChange={this.handleChange}
                        validationState={this.state.locationValidationState}
                    >
                        <ControlLabel>Location {requiredLabel}</ControlLabel>
                        <FormControl
                            name="locationId"
                            componentClass="select"
                        >
                            {listLocationJson}
                        </FormControl>

                        {this.state.locationValidationState === "error"
                            ? <HelpBlock>{this.state.locationValidationMsg}</HelpBlock>
                            : null
                        }
                    </FormGroup>
                    <FormGroup
                        controlId="formControlsSelect "
                        onChange={this.handleChange}
                        validationState={this.state.stateValidationState}

                    >
                        <ControlLabel>State {requiredLabel}</ControlLabel>
                        <FormControl name="stateId"
                                     componentClass="select"
                                     placeholder="select"
                                     value={this.state.stateId}
                        >
                            {listRecordStatesJson}
                        </FormControl>
                        {this.state.containerValidationState === "error"
                            ? <HelpBlock>{this.state.containerValidationMsg}</HelpBlock>
                            : null
                        }
                    </FormGroup>
                    <FormGroup
                        validationState={this.state.consignmentCodeValidationState}
                    >
                        <ControlLabel>Consignment Code</ControlLabel>
                        <FormControl
                            name="consignmentCode"
                            type="text"
                            value={this.state.consignmentCode}
                            placeholder="Enter text"
                            onChange={this.handleChange}
                        />
                        {this.state.consignmentCodeValidationState === "error"
                            ? <HelpBlock>{this.state.consignmentCodeValidationMsg}</HelpBlock>
                            : null
                        }
                    </FormGroup>
                    <FormGroup
                        validationState={this.state.notesValidationState}
                    >
                        <ControlLabel>Notes</ControlLabel>
                        <FormControl
                            name="notes"
                            componentClass="textarea"
                            value={this.state.notes}
                            placeholder="Enter text"
                            onChange={this.handleChange}
                        />
                        {this.state.notesValidationState === "error"
                            ? <HelpBlock>{this.state.notesValidationMsg}</HelpBlock>
                            : null
                        }
                    </FormGroup>
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        )
    }
}

export default UpdateContainer;
