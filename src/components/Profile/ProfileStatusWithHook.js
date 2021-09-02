import React, {useEffect, useState} from "react";


const ProfileStatusWithHook = (props) => {

    let [eMode, setEMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => {
        setStatus(props.status)

    }, [props.status])

    const activeEMode = () => {
        setEMode(true)
    }

    const deactivateEMode = () => {
        setEMode(false)
        props.updateUserStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <>
            { !eMode &&
                <div>
                    <span onDoubleClick={activeEMode}>{status || 'No status!'}</span>
                </div>
            }
            { eMode &&
                <div>
                    <input onChange = {onStatusChange}
                           onBlur = {deactivateEMode}
                           autoFocus={true}
                           value = {status}
                           type="text" />
                </div>
            }


        </>
    )
}
    // constructor(props) {
    //     super(props);
    // }
    // state = {
    //     editMode: false,
    //     status: this.props.status
    // }
    //
    // editModeOn = () => {
    //     this.setState({
    //         editMode: true
    //     })
    // }
    // editModeOff = () => {
    //     this.setState({
    //         editMode: false
    //     })
    //     this.props.updateUserStatus(this.state.status)
    // }
    // onStatusChange = (e) => {
    //     this.setState({
    //         status: e.currentTarget.value
    //     })
    // }
    //
    // componentDidUpdate = (prevProps, prevState) => {
    //     if (prevProps.status !== this.props.status) {
    //         this.setState({
    //             status: this.props.status
    //         })
    //     }
    // }
    //
    // render () {


export default ProfileStatusWithHook