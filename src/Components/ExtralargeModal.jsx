import React, { useState } from "react";
import "./ExtralargModal.css"
import Imageupload from "./imageupload";

const ExtraLargeModal = (props) => {
    const [inputValues, setInputValues] = useState({
        dish_name: '',
        dish_price: '',
        description: '',
        type: '',
        category: '',
        veg: '',
        non_veg: '',
    });
    function handlechange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setInputValues({
            ...inputValues,
            [name]: value,
        })
    }
    function handlesubmit(event) {
        event.preventDefault();
        console.log(inputValues);
    }
    return (

        <>
            <form onSubmit={handlesubmit} >
                <div className={`modal fade ${props.status ? "show" : ""}`} id="smallModal" tabIndex={-1} style={{ display: props.status ? "block" : 'none' }}>
                    <div className="modal-dialog modal-md popup-modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Item</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                />
                            </div>
                            <div className="modal-body">
                                <Imageupload />

                                <label for="inputNanme4" class="form-label " >Item Name</label>
                                <input type="text" class="form-control" id="inputNanme4" name="dish_name" onChange={handlechange} />

                                <label for="inputNanme4" class="form-label Item ">Item Price</label>
                                <input type="number" class="form-control" id="inputNanme4" name="dish_price" onChange={handlechange} />

                                <label for="inputNanme4" class="form-label Item ">Item Descripiton(Optional)</label>
                                <input type="text" class="form-control" id="inputNanme4" name="description" onChange={handlechange} />


                                <label for="inputState" class="form-label Item ">Item type</label>
                                <select id="inputState" class="form-select" name="type" onChange={handlechange}>
                                    <option selected>Select type</option>
                                    <option>New</option>
                                    <option>Most popular</option>
                                    <option>Combo offer</option>
                                    <option>Chef's special</option>
                                    <option>Today offer</option>
                                    <option>Add on</option>
                                    <option>Must try</option>
                                </select>
                                <label for="inputState" class="form-label Item ">Category</label>
                                <select id="inputState" class="form-select" name="category" onChange={handlechange}>
                                    <option selected>Search Category</option>
                                    <option>Roast Style</option>
                                    <option>Coffee Blends</option>
                                    <option>Geographic Origins</option>
                                    <option>In the News</option>
                                    <option>Our products</option>
                                    <option>Beans</option>
                                    <option>Coffee Grinders</option>
                                    <option>Add New Category </option>
                                </select>
                                <>
                                    <legend className="col-form-label col-sm-2 pt-0"></legend>
                                    <div className="col-sm-10 veg-non-veg">
                                        <div className="form-check ">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="veg"
                                                id="gridRadios1"
                                                defaultValue="veg"
                                                defaultChecked=""
                                                onChange={handlechange}
                                            />
                                            <label className="form-check-label" htmlFor="gridRadios1">
                                                Veg
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="veg"
                                                id="gridRadios2"
                                                defaultValue="non-veg"
                                                onChange={handlechange}
                                            />
                                            <label className="form-check-label" htmlFor="gridRadios2">
                                                Non veg
                                            </label>
                                        </div>
                                    </div>
                                </>

                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal" onClick={props.handleClick}
                                >
                                    Close
                                </button>
                                <button type="submit" className="btn btn-primary" >
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>

    )
}


export default ExtraLargeModal;