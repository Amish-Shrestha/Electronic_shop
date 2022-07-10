import { Input } from "@mui/material";
import React from "react";
import "./checkout.scss";
import { useForm } from "react-hook-form";
import { Form, Container } from "react-bootstrap";

const Checkout = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className="form-body">
      <Container>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-header">
            <h2>Please enter your delivery and contact details</h2>
          </div>
          <div className="name common">
            <div className="row">
              <div className="col md-6">
                <div className="label">
                  <Form.Label> Full Name : </Form.Label>
                </div>
              </div>
              <div className="col md-6">
                <Input
                  {...register("Fullname", { required: true, maxLength: 40 })}
                />
              </div>
            </div>
          </div>

          <div className="billing-address common">
            <div className="row">
              <div className="col md-6">
                <div className="label">
                  <Form.Label> Billing Address : </Form.Label>
                </div>
              </div>
              <div className="col md-6">
                <Input
                  {...register("Billing address", {
                    required: true,
                    maxLength: 20,
                  })}
                />
              </div>
            </div>
          </div>

          <div className="delivery-address common">
            <div className="row">
              <div className="col md-6">
                <div className="label">
                  <Form.Label> Delivery Address : </Form.Label>
                </div>
              </div>
              <div className="col md-6">
                <Input
                  {...register("Delivery address", {
                    required: true,
                    maxLength: 20,
                  })}
                />
              </div>
            </div>
          </div>

          <div className="telephone-number common">
            <div className="row">
              <div className="col md-6">
                <div className="label">
                  <Form.Label> Telephone Number : </Form.Label>
                </div>
              </div>
              <div className="col md-6">
                <Input
                  type="number"
                  {...register("Telephone number", {
                    required: true,
                    maxLength: 15,
                  })}
                />
              </div>
            </div>
          </div>

          <div className="current-date common">
            <div className="row">
              <div className="col md-6">
                <div className="label">
                  <Form.Label> Current Date : </Form.Label>
                </div>
              </div>
              <div className="col md-6">
                <Input
                  type="date"
                  {...register("Current Date", { required: true })}
                />
              </div>
            </div>
          </div>

          <div className="button-submit">
            <input type="submit" className="btn btn-primary" />
          </div>
        </Form>
      </Container>
    </div>
  );
};
export default Checkout;
