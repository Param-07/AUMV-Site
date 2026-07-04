import ContactHero from "./ContactHero";
import ContactCards from "./ContactCards";
import ContactForm from "./ContactForm";
import ContactMap from "./ContactMap";

const Contact = () => {
  return (
    <div className="pt-[90px] bg-white">
      <ContactHero />
      <ContactCards />
      <ContactForm />
      <ContactMap />
    </div>
  );
};

export default Contact;