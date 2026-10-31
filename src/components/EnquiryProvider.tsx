"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { emptyEnquiry, type EnquiryErrors, type EnquiryField, type EnquiryForm } from "@/lib/enquiry";

type EnquiryContextValue = {
  form: EnquiryForm;
  errors: EnquiryErrors;
  checked: boolean;
  setField: (name: EnquiryField, value: string) => void;
  setErrors: (errors: EnquiryErrors) => void;
  setChecked: (checked: boolean) => void;
  /** Prefills the project type from a service CTA and returns the form to editing. */
  selectType: (type: string) => void;
};

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [form, setForm] = useState<EnquiryForm>(emptyEnquiry);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [checked, setChecked] = useState(false);

  const value = useMemo<EnquiryContextValue>(
    () => ({
      form,
      errors,
      checked,
      setErrors,
      setChecked,
      setField: (name, v) => {
        setForm((f) => ({ ...f, [name]: v }));
        setErrors((e) => ({ ...e, [name]: undefined }));
      },
      selectType: (type) => {
        setForm((f) => ({ ...f, type }));
        setChecked(false);
        setErrors((e) => ({ ...e, type: undefined }));
      },
    }),
    [form, errors, checked],
  );

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>;
}

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used within EnquiryProvider");
  return ctx;
}
