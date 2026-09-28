const testimonials = [
  {
    id: "testimonial-1",
    name: "Emeka Nwosu",
    role: "Community manager",
    quote:
      "Our winners got paid without a single spreadsheet. The confirmation trail is exactly what sponsors wanted.",
  },
  {
    id: "testimonial-2",
    name: "Amina Yusuf",
    role: "Hackathon organizer",
    quote:
      "We launched registrations in an afternoon and finally had one clear place to manage every team.",
  },
  {
    id: "testimonial-3",
    name: "Kwame Mensah",
    role: "Product builder",
    quote:
      "The whole event felt calmer. Everyone knew what was next, from submission through judging.",
  },
  {
    id: "testimonial-4",
    name: "Zainab Bello",
    role: "Program lead",
    quote:
      "Hackanow let our team focus on the builders instead of chasing forms and reconciling lists.",
  },
  {
    id: "testimonial-5",
    name: "Tobi Adeyemi",
    role: "Developer advocate",
    quote:
      "Reviewing projects was fast, transparent, and easy for every judge—even the first-time ones.",
  },
  {
    id: "testimonial-6",
    name: "Nana Ama Boateng",
    role: "Ecosystem manager",
    quote:
      "The live event view gave our partners confidence that every milestone was under control.",
  },
  {
    id: "testimonial-7",
    name: "Chidi Okafor",
    role: "Startup founder",
    quote:
      "Submitting our project took minutes, and the feedback trail helped us keep building afterward.",
  },
  {
    id: "testimonial-8",
    name: "Faduma Ali",
    role: "Community organizer",
    quote:
      "From check-in to prizes, the experience felt considered for both our team and the participants.",
  },
  {
    id: "testimonial-9",
    name: "Sena Agbo",
    role: "Engineering lead",
    quote:
      "Our judges could compare strong projects without losing the context behind each submission.",
  },
  {
    id: "testimonial-10",
    name: "Lerato Molefe",
    role: "Innovation manager",
    quote:
      "We replaced a tangle of tools with one flow that our entire organizing team understood.",
  },
  {
    id: "testimonial-11",
    name: "Abena Ofori",
    role: "Operations director",
    quote:
      "The reporting was ready when sponsors asked, without another late night assembling updates.",
  },
  {
    id: "testimonial-12",
    name: "David Mwangi",
    role: "Technical mentor",
    quote:
      "Builders spent more time shipping and less time wondering where to submit their work.",
  },
];

const ROW_COUNT = 5;
const CARDS_PER_ROW = 6;
const PIXELS_PER_SECOND = 35;

const rowOffsets = ["0rem", "8.75rem", "2.5rem", "11.25rem", "5rem"];

const rowDistributions = Array.from({ length: ROW_COUNT }, (_, rowIndex) =>
  Array.from({ length: CARDS_PER_ROW }, (_, cardIndex) => {
    const testimonialIndex = (rowIndex * 5 + cardIndex * 7) % testimonials.length;
    return testimonials[testimonialIndex];
  }),
);

function TestimonialCard(testimonial, instanceId) {
  const article = document.createElement("article");
  article.className = "testimonial-card";
  article.dataset.testimonialId = testimonial.id;

  const header = document.createElement("header");
  header.className = "testimonial-card__header";

  const person = document.createElement("div");
  person.className = "testimonial-card__person";

  const name = document.createElement("h3");
  name.className = "testimonial-card__name";
  name.id = `${testimonial.id}-${instanceId}-name`;
  name.textContent = testimonial.name;

  const role = document.createElement("p");
  role.className = "testimonial-card__role";
  role.textContent = testimonial.role;

  const mark = document.createElement("span");
  mark.className = "testimonial-card__mark";
  mark.setAttribute("aria-hidden", "true");

  const quote = document.createElement("blockquote");
  quote.className = "testimonial-card__quote";
  quote.setAttribute("aria-labelledby", name.id);
  quote.textContent = `“${testimonial.quote}”`;

  person.append(name, role);
  header.append(person, mark);
  article.append(header, quote);

  return article;
}

function TestimonialsWall({ duplicate = false } = {}) {
  const wall = document.createElement("div");
  wall.className = "testimonials-wall";

  if (duplicate) {
    wall.setAttribute("aria-hidden", "true");
  }

  rowDistributions.forEach((rowTestimonials, rowIndex) => {
    const row = document.createElement("div");
    row.className = "testimonials-row";
    row.style.setProperty("--row-offset", rowOffsets[rowIndex]);

    rowTestimonials.forEach((testimonial, cardIndex) => {
      const instanceId = `${duplicate ? "copy" : "source"}-${rowIndex}-${cardIndex}`;
      row.append(TestimonialCard(testimonial, instanceId));
    });

    wall.append(row);
  });

  return wall;
}

function TestimonialsHeader() {
  const header = document.createElement("header");
  header.className = "testimonials-header";

  const eyebrow = document.createElement("p");
  eyebrow.className = "testimonials-eyebrow";
  eyebrow.textContent = "Testimonials";

  const heading = document.createElement("h1");
  heading.className = "testimonials-heading";
  heading.id = "testimonials-heading";
  heading.textContent = "Builders and organizers speak for themselves";

  header.append(eyebrow, heading);
  return header;
}

function TestimonialsSection() {
  const section = document.createElement("section");
  section.className = "testimonials-section";
  section.setAttribute("aria-labelledby", "testimonials-heading");

  const viewport = document.createElement("div");
  viewport.className = "testimonials-viewport";

  const track = document.createElement("div");
  track.className = "testimonials-track";

  const primaryWall = TestimonialsWall();
  const duplicateWall = TestimonialsWall({ duplicate: true });

  track.append(primaryWall, duplicateWall);
  viewport.append(track);
  section.append(TestimonialsHeader(), viewport);

  const updateMarqueeMetrics = () => {
    const wallWidth = primaryWall.getBoundingClientRect().width;
    const duration = wallWidth / PIXELS_PER_SECOND;

    section.style.setProperty("--loop-distance", `${wallWidth}px`);
    section.style.setProperty("--marquee-duration", `${duration}s`);
  };

  const observer = new ResizeObserver(updateMarqueeMetrics);
  observer.observe(primaryWall);

  document.fonts?.ready.then(updateMarqueeMetrics);
  requestAnimationFrame(updateMarqueeMetrics);

  return section;
}

const app = document.querySelector("#main-content");
app.append(TestimonialsSection());
