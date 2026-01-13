import {
  FaShippingFast,
  FaHeadset,
  FaShieldAlt,
  FaUndoAlt,
} from "react-icons/fa";

const Services = () => {
  const serviceData = [
    {
      id: 1,
      icon: <FaShippingFast className="text-primary text-4xl" />,
      title: "Swift Global Delivery",
      description:
        "Free express shipping on all orders over $150. Tracked and insured.",
    },
    {
      id: 2,
      icon: <FaShieldAlt className="text-primary text-4xl" />,
      title: "Secure Checkout",
      description:
        "100% protected payments with bank-grade SSL encryption technology.",
    },
    {
      id: 3,
      icon: <FaUndoAlt className="text-primary text-4xl" />,
      title: "Hassle-Free Returns",
      description:
        "Not satisfied? Return any item within 30 days—no questions asked.",
    },
    {
      id: 4,
      icon: <FaHeadset className="text-primary text-4xl" />,
      title: "Expert Assistance",
      description:
        "Our dedicated support team is available 24/7 for all your tech needs.",
    },
  ];

  return (
    <section className="container mx-auto my-6 bg-white pt-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {serviceData.map((service) => (
            <div
              key={service.id}
              className="group bg-gray-100 p-8 transition-colors hover:bg-[#f0f4ff]"
            >
              <div className="mb-6 inline-block transition-transform group-hover:scale-110">
                {service.icon}
              </div>
              <h3 className="mb-3 text-xl font-bold text-slate-800">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
