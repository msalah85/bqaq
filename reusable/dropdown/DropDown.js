import React, { useEffect, useState, useRef } from 'react';

const DropDownItem = (props) => {
    return (
        <button type="button" className="dropdown-component-item" onClick={() => { props.handleSelection(props.item.name, props.item.id); }}>
            {props.item && props.item.name}
        </button>
    )
}

const items = [{ name: "item A", id: "111" }, { name: "item B", id: "222" }, { name: "item C", id: "333" }, { name: "item D", id: "444" },]

function DropDown(props) {
    // this dropdown component need array of values name and id + pass handlechange function

    const [showDropdown, setshowDropdown] = useState(false)

    const toggleDropdown = () => {
        setshowDropdown(!showDropdown)
    }

    const [selectedValue, setSelectedValue] = useState(props.default)

    //reset default eacht time pass different data
    useEffect(() => {
        setSelectedValue(props.default)
    }, [props.default])

    const handleSelection = (value, id) => {
        setSelectedValue(value)
        props.onChange(value, id)
    }

    //handle value passed to the component
    useEffect(() => {
        if (props.valueName && props.valueId) {
            handleSelection(props.valueName, props.valueId)
        } else if (props.valueName == null && props.valueId == null) {
            setSelectedValue(props.default)
        }
    }, [props.valueName, props.valueId])

    //handle toggle search input field with item card on change show the text box
    const inputRef = useRef(null);

    const [showTextInput, setShowTextInput] = useState(false)

    const [searchInput, setSearchInput] = useState("")

    const handleChangeTextInput = (e) => {
        setShowTextInput(true)
        setSearchInput(e.target.value)
    }

    const handleFocus = () => {
        if (showDropdown) {
            setshowDropdown(false);
        } else {
            setshowDropdown(true);
            inputRef.current.focus()
        }
    }

    const handleBlur = () => {
        if (showDropdown) {
            setTimeout(() => {
                setshowDropdown(false);
                setShowTextInput(false);
                setSearchInput("")
            }, 250);
        }
    }

    //Handle loading data spinner
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (props.isLoading) {
            setIsLoading(true)
        } else {
            setIsLoading(false)
        }
    }, [props.isLoading])

    //Clean Up
    useEffect(() => {
        return () => {
            setshowDropdown(false)
            setShowTextInput(false)
            setSearchInput("")
        }
    }, [])

    return (
        <div className="dropdown-component">
            {showDropdown ? (
                <div onClick={handleFocus} onBlur={handleBlur} style={props.validation ? { border: "1px solid #d60000" } : {}} className="dropdown-component__cont-rotate">
                    <h6 style={showTextInput ? { opacity: "0" } : { opacity: "1" }}>{selectedValue}</h6>
                    <input tabIndex="-1" autoComplete="chrome-off" ref={inputRef} style={showTextInput ? { opacity: "1" } : { opacity: "0" }} type="text" onChange={handleChangeTextInput} />
                    <img src={'/assets/downArrow.png'} />
                </div>
            ) : (
                <div onClick={handleFocus} onBlur={handleBlur} style={props.validation ? { border: "1px solid #d60000" } : {}} className="dropdown-component__cont">
                    <h6 style={showTextInput ? { opacity: "0" } : { opacity: "1" }}>{selectedValue}</h6>
                    <input tabIndex="-1" autoComplete="chrome-off" value={searchInput} ref={inputRef} style={showTextInput ? { opacity: "1" } : { opacity: "0" }} type="text" onChange={handleChangeTextInput} />
                    <img src={'/assets/downArrow.png'} />
                </div>
            )
            }
            {showDropdown ? (
                searchInput.length > 0 ? (
                    <div className="dropdown-component__dropdown">
                        {!isLoading ? (
                            props.data && props.data.filter((field) => field.name.toLowerCase().includes(searchInput.toLowerCase())).length > 0 ?
                                (
                                    props.data && props.data.filter((field) => field.name.toLowerCase().includes(searchInput.toLowerCase())).map((item, index) => {
                                        return <DropDownItem item={item} index={index} handleSelection={handleSelection}
                                            setShowTextInput={setShowTextInput} setSearchInput={setSearchInput} />
                                    })
                                ) : <div className="dropdown-component__no-data">No result found</div>
                        ) : (
                            <div className="dropdown-component__spinner">
                                <div class="spinner">
                                    <div class="bounce1"></div>
                                    <div class="bounce2"></div>
                                    <div class="bounce3"></div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="dropdown-component__dropdown">
                        {!isLoading ? (
                            props.data && props.data.length > 0 ? (
                                props.data.map((item, index) => {
                                    return <DropDownItem item={item} index={index} handleSelection={handleSelection}
                                        setShowTextInput={setShowTextInput} setSearchInput={setSearchInput} />
                                })
                            ) : (
                                <div className="dropdown-component__no-data">No data found</div>
                            )
                        ) : (
                            <div className="dropdown-component__spinner">
                                <div class="spinner">
                                    <div class="bounce1"></div>
                                    <div class="bounce2"></div>
                                    <div class="bounce3"></div>
                                </div>
                            </div>
                        )}

                    </div>
                )
            ) : null}
        </div>
    )
}

export default DropDown;



