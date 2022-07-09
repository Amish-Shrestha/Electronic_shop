import { Label } from "@mui/icons-material";
import { Input } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

const Checkout = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className="form-body">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="name">
            <label> Full Name : </label>
            <Input
              {...register("Fullname", { required: true, maxLength: 40 })}
            />
        </div>

        <div className="billing-address">
            <label> Billing Address : </label>
        <Input
          {...register("Billing address", { required: true, maxLength: 20 })}
        />
        </div>
        
        <div className="delivery-address">
            <label> Delivery Address : </label>
        <Input
          {...register("Delivery address", { required: true, maxLength: 20 })}
        />
        </div>
        
        <div className="telephone-number">
            <label> Telephone Number : </label>
        <Input
          {...register("Telephone number", { required: true, maxLength: 15 })}
        />
        </div>
        
        <div className="current-date">
            <label> Current Date : </label>
            <Input  type="date" {...register("Current Date",  {required: true })} />
        </div>
        
        <input type="submit" className="btn btn-primary" />
      </form>
    </div>
  );
};
export default Checkout;
