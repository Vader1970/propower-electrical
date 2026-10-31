"use client";

import { useEffect, useRef, type ChangeEvent, type FormEvent } from "react";
import { projectTypes, site } from "@/data/site";
import { validateEnquiry, type EnquiryField } from "@/lib/enquiry";
import { useEnquiry } from "./EnquiryProvider";
import { ArrowLeft, ArrowRight } from "./icons";
import styles from "./Contact.module.css";

const fieldOrder: EnquiryField[] = ["name", "email", "phone", "type", "message"];

export default function ContactForm() {
  const { form, errors, checked, setField, setErrors, setChecked } = useEnquiry();
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const focusFormOnEdit = useRef(false);

  useEffect(() => {
    if (checked) {
      statusRef.current?.focus();
    } else if (focusFormOnEdit.current) {
      focusFormOnEdit.current = false;
      formRef.current?.querySelector<HTMLElement>("#f-name")?.focus();
    }
  }, [checked]);

  const edit = () => {
    focusFormOnEdit.current = true;
    setChecked(false);
  };

  const onField = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setField(e.target.name as EnquiryField, e.target.value);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errs = validateEnquiry(form);
    setErrors(errs);
    const firstInvalid = fieldOrder.find((k) => errs[k]);
    if (firstInvalid) {
      setChecked(false);
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
    } else {
      setChecked(true);
    }
  };

  const a11y = (k: EnquiryField) => ({
    "aria-invalid": errors[k] ? (true as const) : (false as const),
    "aria-describedby": errors[k] ? `f-${k}-error` : undefined,
  });

  const errorFor = (k: EnquiryField) =>
    errors[k] ? (
      <span id={`f-${k}-error`} role="alert" className={styles.error}>
        {errors[k]}
      </span>
    ) : null;

  const firstName = form.name.trim().split(/\s+/)[0] || "there";

  if (checked) {
    return (
      <div ref={statusRef} role="status" tabIndex={-1} className={styles.status}>
        <span className={styles.statusLabel}>Demonstration only · Nothing has been sent</span>
        <p className={styles.statusText}>
          Thanks, {firstName}. Your enquiry is complete, but this concept form is not connected to a submission
          service yet.
        </p>
        <p className={styles.statusHelp}>
          To reach ProPower today, call{" "}
          <a href={site.phoneHref} className={styles.statusLink}>
            {site.phoneDisplay}
          </a>{" "}
          or email{" "}
          <a href={site.emailHref} className={`${styles.statusLink} ${styles.statusLinkWrap}`}>
            {site.email}
          </a>
          .
        </p>
        <button type="button" onClick={edit} className={styles.edit}>
          <span>Edit enquiry</span>
          <ArrowLeft size={16} />
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="f-name" className={styles.label}>
          Name <span className={styles.req}>*</span>
        </label>
        <input
          id="f-name"
          name="name"
          type="text"
          autoComplete="name"
          value={form.name}
          onChange={onField}
          className={styles.control}
          {...a11y("name")}
        />
        {errorFor("name")}
      </div>
      <div className={styles.field}>
        <label htmlFor="f-email" className={styles.label}>
          Email <span className={styles.req}>*</span>
        </label>
        <input
          id="f-email"
          name="email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={onField}
          className={styles.control}
          {...a11y("email")}
        />
        {errorFor("email")}
      </div>
      <div className={styles.field}>
        <label htmlFor="f-phone" className={styles.label}>
          Phone
        </label>
        <input
          id="f-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={onField}
          className={styles.control}
          {...a11y("phone")}
        />
        {errorFor("phone")}
      </div>
      <div className={styles.field}>
        <label htmlFor="f-type" className={styles.label}>
          Project type <span className={styles.req}>*</span>
        </label>
        <select
          id="f-type"
          name="type"
          value={form.type}
          onChange={onField}
          className={`${styles.control} ${styles.select}`}
          {...a11y("type")}
        >
          <option value="">Select a project type</option>
          {projectTypes.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
        {errorFor("type")}
      </div>
      <div className={`${styles.field} ${styles.wide}`}>
        <label htmlFor="f-message" className={styles.label}>
          Tell us about your project <span className={styles.req}>*</span>
        </label>
        <textarea
          id="f-message"
          name="message"
          rows={5}
          value={form.message}
          onChange={onField}
          className={`${styles.control} ${styles.textarea}`}
          {...a11y("message")}
        />
        {errorFor("message")}
      </div>
      <div className={styles.submitRow}>
        <p className={styles.note}>
          Concept prototype. Enquiries are checked in your browser but are not sent anywhere until a submission
          service is connected.
        </p>
        <button type="submit" className={styles.submit}>
          <span>Check enquiry</span>
          <ArrowRight />
        </button>
      </div>
    </form>
  );
}
