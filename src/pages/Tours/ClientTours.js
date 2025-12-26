import "./ClientTours.css";

export default function Tours() {
  const tours = [
    {
      id: 1,
      title: "Ella Adventure",
      days: 3,
      price: 250,
      description: "Explore Ella, Nine Arches Bridge, and scenic mountains."
    },
    {
      id: 2,
      title: "Sigiriya Day Tour",
      days: 1,
      price: 120,
      description: "Visit the Sigiriya Rock Fortress and nearby villages."
    },
    {
      id: 3,
      title: "Kandy Cultural Trip",
      days: 2,
      price: 180,
      description: "Temple of the Tooth, Kandy Lake, and cultural shows."
    },
    {
      id: 4,
      title: "Galle Heritage Tour",
      days: 1,
      price: 140,
      description: "Galle Fort, beaches, and colonial architecture."
    }
  ];

  return (
    <section className="client-tours">
      <h2>Our Tour Packages</h2>
      <p className="subtitle">
        Choose from our carefully designed travel experiences.
      </p>

      <div className="tours-grid">
        {tours.map((tour) => (
          <div key={tour.id} className="tour-card">
            <h3>{tour.title}</h3>

            <p className="days">
              <b>{tour.days}</b> Day{tour.days > 1 ? "s" : ""}
            </p>

            <p className="description">{tour.description}</p>

            <p className="price">${tour.price}</p>

            <button className="btn-view">
              View Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
