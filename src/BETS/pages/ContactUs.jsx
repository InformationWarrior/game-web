import React from "react";
import styles from "../../styles/BETS/ContactUs.module.css"; // Import CSS module

const ContactUs = () => {
  return (
    <div className={styles["contact-us-container"]}>
      <div className={styles["contact-us-header"]}>
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you! Fill out the form below to get in touch.
        </p>
      </div>
      <form className={styles["contact-us-form"]}>
        <div className={styles["form-group"]}>
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" placeholder="Your Name" />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
          />
        </div>
        <div className={styles["form-group"]}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Your Message"
          ></textarea>
        </div>
        <button type="submit" className={styles["contact-us-button"]}>
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
