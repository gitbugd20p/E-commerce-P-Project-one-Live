import bedSideTable from "../../assets/images/bed-side-table.png";
import appleVisionPro from "../../assets/images/apple-vision-pro.png";
import decoratingSwing from "../../assets/images/decorating-swing.png";

const UpcomingProducts = () => {
  const upcomingItems = [
    {
      id: 1,
      img: bedSideTable,
      title: "Bedside Table African Cherry",
    },
    {
      id: 2,
      img: appleVisionPro,
      title: "Apple Vision Pro",
    },
    {
      id: 3,
      img: decoratingSwing,
      title: "Decoration Swing",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-4">
      {/* Header & Description */}
      <div className="mb-12 space-y-4 text-center">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase md:text-4xl">
          Upcoming Products
        </h2>
        <div className="mx-auto h-1 w-20 bg-indigo-600"></div>{" "}
        {/* Accent line */}
        <p className="mx-auto max-w-2xl text-lg text-slate-600">
          We are constantly innovating. Get a sneak peek at our next generation
          of premium products arriving in store very soon.
        </p>
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {upcomingItems.map((item) => (
          <div
            key={item.id}
            className="group relative cursor-pointer overflow-hidden bg-[#eeefff]"
          >
            {/* Image Container */}
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={item.img}
                alt={item.title}
                className="h-full w-full object-contain px-8 py-4 transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
            </div>

            {/* Subtle Overlay on Hover */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span className="bg-white px-6 py-2 text-sm font-bold tracking-widest text-slate-900 uppercase">
                Coming Soon
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="divider mt-8"></div>
    </section>
  );
};

export default UpcomingProducts;
