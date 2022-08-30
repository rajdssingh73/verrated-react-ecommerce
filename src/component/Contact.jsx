import React from "react";

export default function Contact() {
  return (
    <div className="container my-5 py-5">
      <div className="col-12">
        <h1 className="display-6 fw-bolder text-center">Contact Us</h1>
        <hr />
      </div>
      <div className="row">
        
        <div className="col-md-12 ms-auto">
          <h2>How can we help you?</h2>
          <p>
            Please let us know how we can assist you by filling in the form
            below. Please allow us 24 hours to respond to your enquiry.
          </p>
          <form>
            Name:
            <div className="row mb-1">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="First name"
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last name"
                />
              </div>
            </div>
            <div className="row mb-1">
              <div className="col">
                Phone:
                <input
                  type="integer"
                  className="form-control"
                  placeholder="Phone"
                />
              </div>
              <div className="col">
                Email:
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
            </div>
            <label>Drop us a query</label>
            <textarea className="form-control" rows="3" />
            <button
              type="submit"
              className="btn btn-primary mt-3"
              onClick={() => alert("Thank you, we will get back to you soon.")}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
