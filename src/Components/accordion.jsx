import React from "react";
import "./accordion.css"
import Form from 'react-bootstrap/Form';
import data from './data.json'




// accordion modal
const Accordion = () => {
    return (
        <>
            <main className="content">
                {
                    data.map(post => {
                        return (
                            <div key={post.id}>

                                <h6>{post.title}</h6>
                                <h6>{post.content}</h6>

                            </div>

                        )
                    })
                }


                <div className="reset-apply">
                    <button type="button" class="btn btn-primary">Reset</button>
                    <button type="button" class="btn btn-secondary">Apply</button>
                </div>
                <div className="accordion-item" style={{ padding: '10px' }}>
                    <h2 className="accordion-header" id="headingOne">
                        <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                        >
                            Shiv Pizza Point
                        </button>
                    </h2>
                    <div
                        id="collapseOne"
                        className="accordion-collapse collapse show"
                        aria-labelledby="headingOne"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">  <input className="form-check-input" type="checkbox" id="gridCheck" /></th>
                                        <th scope="col"> Item Name</th>
                                        <th scope="col">MRP</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Slae Price</th>
                                        <th scope="col">Commission %</th>
                                        <th scope="col">Increase by</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">   <input className="form-check-input" type="checkbox" id="gridCheck" />
                                        </th>
                                        <td>

                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                placeholder=""
                                                name="zip"
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                placeholder=""
                                                name="zip"
                                            />
                                        </td>
                                        <td>
                                            <Form.Control

                                                type="number"
                                                placeholder=""
                                                name="zip"
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                placeholder=""
                                                name="zip"
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                placeholder=""
                                                name="zip"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">  <input className="form-check-input" type="checkbox" id="gridCheck" />
                                        </th>
                                        <td>
                                            cheese Pizza
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                placeholder=""
                                                name="zip"
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                placeholder=""
                                                name="zip"
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                placeholder=""
                                                name="zip"
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                placeholder=""
                                                name="zip"
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                placeholder=""
                                                name="zip"
                                            />
                                        </td>

                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <input className="form-check-input" type="checkbox" id="gridCheck" />
                                        </th>
                                        <td>
                                            Burger
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                placeholder=""
                                                name="zip"
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                placeholder=""
                                                name="zip"
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                placeholder=""
                                                name="zip"
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                placeholder=""
                                                name="zip"
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                placeholder=""
                                                name="zip"
                                            />
                                        </td>

                                    </tr>
                                    <tr>
                                        <th scope="row">  <input className="form-check-input" type="checkbox" id="gridCheck" />

                                        </th>
                                        <td>
                                            Cold drink
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                placeholder=""
                                                name="zip"
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                placeholder=""
                                                name="zip"
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                placeholder=""
                                                name="zip"
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                placeholder=""
                                                name="zip"
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                placeholder=""
                                                name="zip"
                                            />
                                        </td>

                                    </tr>
                                    <tr>
                                        <th scope="row">
                                            <input className="form-check-input" type="checkbox" id="gridCheck" />
                                        </th>
                                        <td>
                                            White Pasta
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                placeholder=""
                                                name="zip"
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                placeholder=""
                                                name="zip"
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                placeholder=""
                                                name="zip"
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                placeholder=""
                                                name="zip"
                                            />
                                        </td>
                                        <td>
                                            <Form.Control
                                                type="number"
                                                placeholder=""
                                                name="zip"
                                            />
                                        </td>

                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>


                <div className="accordion-item" style={{ padding: '10px' }}>
                    <h2 className="accordion-header" id="headingTwo">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo"
                            aria-expanded="false"
                            aria-controls="collapseTwo"
                        >
                            Diamond Pizza
                        </button>
                    </h2>
                    <div
                        id="collapseTwo"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Position</th>
                                        <th scope="col">Age</th>
                                        <th scope="col">Start Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Brandon Jacob</td>
                                        <td>Designer</td>
                                        <td>28</td>
                                        <td>2016-05-25</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Bridie Kessler</td>
                                        <td>Developer</td>
                                        <td>35</td>
                                        <td>2014-12-05</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Ashleigh Langosh</td>
                                        <td>Finance</td>
                                        <td>45</td>
                                        <td>2011-08-12</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>Angus Grady</td>
                                        <td>HR</td>
                                        <td>34</td>
                                        <td>2012-06-11</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">5</th>
                                        <td>Raheem Lehner</td>
                                        <td>Dynamic Division Officer</td>
                                        <td>47</td>
                                        <td>2011-04-19</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="accordion-item" style={{ padding: '10px' }}>
                    <h2 className="accordion-header" id="headingThree">
                        <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseThree"
                            aria-expanded="false"
                            aria-controls="collapseThree"
                        >
                            Cash and kadhi
                        </button>
                    </h2>
                    <div
                        id="collapseThree"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingThree"
                        data-bs-parent="#accordionExample"
                    >
                        <div className="accordion-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Position</th>
                                        <th scope="col">Age</th>
                                        <th scope="col">Start Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Brandon Jacob</td>
                                        <td>Designer</td>
                                        <td>28</td>
                                        <td>2016-05-25</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Bridie Kessler</td>
                                        <td>Developer</td>
                                        <td>35</td>
                                        <td>2014-12-05</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Ashleigh Langosh</td>
                                        <td>Finance</td>
                                        <td>45</td>
                                        <td>2011-08-12</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>Angus Grady</td>
                                        <td>HR</td>
                                        <td>34</td>
                                        <td>2012-06-11</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">5</th>
                                        <td>Raheem Lehner</td>
                                        <td>Dynamic Division Officer</td>
                                        <td>47</td>
                                        <td>2011-04-19</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>


            </main>
        </>

    )
}
export default Accordion;