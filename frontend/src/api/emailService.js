import emailjs from "emailjs-com";
import { config } from "../config";

emailjs.init(config.userId); // Initialize EmailJS with user ID

export const sendEmail = (formData) => {
  return emailjs.send(
    config.serviceId,
    config.templateId,
    {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    }
  );
};
