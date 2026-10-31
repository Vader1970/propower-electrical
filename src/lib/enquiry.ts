export type EnquiryField = "name" | "email" | "phone" | "type" | "message";
export type EnquiryForm = Record<EnquiryField, string>;
export type EnquiryErrors = Partial<Record<EnquiryField, string>>;

export const emptyEnquiry: EnquiryForm = { name: "", email: "", phone: "", type: "", message: "" };

export function validateEnquiry(f: EnquiryForm): EnquiryErrors {
  const e: EnquiryErrors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Please enter a valid email address.";
  if (f.phone.trim() && !/^[0-9+()\s-]{7,}$/.test(f.phone.trim())) e.phone = "Please check your phone number.";
  if (!f.type) e.type = "Please choose a project type.";
  if (f.message.trim().length < 10) e.message = "Tell us a little more about your project.";
  return e;
}
