import React from "react";
import { Form, NavLink } from "react-router";
import "../assets/css/account.css"

export default function Register () {
  return(
    <div className="container register-container">
      <section className="reg-main">
        <h1>Create your account</h1>
        <Form method="post" className="register-form">
          <label htmlFor="reg-email"/>
          <input name="email" type="email" id="reg-email" placeholder="Email" autoComplete="on" autoFocus />
          <label htmlFor="reg-password"/>
          <input name="password" type="password" id="reg-password" placeholder="Password" autoComplete="off"/>
          <button>Submit</button>
        </Form>
        <aside>Already have an account? <NavLink to="/login">Log in</NavLink></aside>
      </section>
    </div>
  )
}