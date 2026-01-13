import { Quote } from "lucide-react";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Verified Buyer",
      text: "The quality of the products exceeded my expectations. Shipping was incredibly fast!",
    },
    {
      id: 2,
      name: "Sarah Miller",
      role: "Fashion Blogger",
      text: "I love the new arrivals section. Always finding unique pieces that I can't find anywhere else.",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Loyal Customer",
      text: "Best customer service I've experienced in a long time. They truly care about their customers.",
    },
  ];

  return (
    <section className="container mx-auto my-4 px-4">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
          Customer Stories
        </h2>
        <div className="mx-auto mt-2 h-1 w-16 bg-indigo-600"></div>
      </div>

      <div className="grid grid-cols-1 gap-0 border border-slate-200 md:grid-cols-3">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-slate-200 p-8 transition-colors last:border-r-0 hover:bg-slate-50 md:border-r md:border-b-0"
          >
            <Quote className="mb-4 text-indigo-500" size={32} />
            <p className="mb-6 text-slate-600 italic">"{review.text}"</p>
            <div>
              <h4 className="font-bold text-slate-900">{review.name}</h4>
              <p className="text-xs font-semibold tracking-widest text-indigo-600 uppercase">
                {review.role}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="divider mt-8"></div>
    </section>
  );
};

export default Testimonials;
