import React from "react";


class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    editModeOn = () => {
        this.setState({
            editMode: true
        })
    }
    editModeOff = () => {
        this.setState({
            editMode: false
        })
        this.props.updateUserStatus(this.state.status)
    }
    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render () {
        return (
            <>
                {!this.state.editMode?
                    <div>
                        <span onDoubleClick={() => this.editModeOn()}>{this.props.status || 'No status!'}</span>
                    </div>:
                    <div>
                        <input onChange = {this.onStatusChange} autoFocus={true} onBlur = {() => this.editModeOff()}
                               type="text" value = {this.state.status}/>
                    </div>
                }


            </>
        )
    }
}
export default ProfileStatus