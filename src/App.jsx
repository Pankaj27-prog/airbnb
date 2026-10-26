
import { useEffect, useState } from "react";
import PhotoTour from "./PhotoTour";
import {
  Search,
  Globe,
  Menu,
  Share,
  Heart,
  Grid3X3,
  Star,
  Tag,
  ChevronDown,
  ChevronRight,
  Flag,
  Waves,
  Wind,
  DoorOpen,
  Award,
  Wifi,
  Car,
  Bath,
  PawPrint,
  Video,
  Monitor,
  CookingPot,
  Ban,
  ChevronLeft,
  Keyboard,
  CircleCheck,
  KeyRound,
  MessageCircle,
  Map,
  SprayCan,
  BedDouble,
  Gift,
  Package,
  House,
  CalendarX2,
  Shield,
  GraduationCap,
  BadgeCheck,
  Home,
  Plus,
  Minus,
  Cake,
} from "lucide-react";
import "./App.css";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const NIGHTLY_RATE = 28499 / 5;
const UNAVAILABLE_AFTER = new Date(2026, 10, 17);

function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function sameDay(a, b) {
  return (
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function nightsBetween(start, end) {
  if (!start || !end) return 0;
  return Math.round((startOfDay(end) - startOfDay(start)) / 86400000);
}

function formatCardDate(date) {
  if (!date) return "Add date";
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${month}/${day}/${date.getFullYear()}`;
}

function formatRangeLabel(start, end) {
  if (!start || !end) return "Add your travel dates for exact pricing";
  const opts = { day: "numeric", month: "short", year: "numeric" };
  return `${start.toLocaleDateString("en-GB", opts)} - ${end.toLocaleDateString("en-GB", opts)}`;
}

function formatLongDay(date) {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
}

function formatPrice(amount) {
  return `₹${new Intl.NumberFormat("en-IN").format(amount)}`;
}

function isUnavailable(date) {
  return startOfDay(date) > UNAVAILABLE_AFTER;
}

function MonthGrid({ year, month, checkIn, checkOut, onSelect, nav }) {
  const firstWeekday = new Date(year, month, 1).getDay();
  const dayCount = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: firstWeekday }, () => null).concat(
    Array.from({ length: dayCount }, (_, i) => new Date(year, month, i + 1))
  );

  return (
    <div className="month-grid">
      <div className="month-head">
        {nav?.left}
        <h4>
          {MONTH_NAMES[month]} {year}
        </h4>
        {nav?.right}
      </div>
      <div className="weekday-row">
        {WEEKDAYS.map((day, index) => (
          <span key={`${day}-${index}`}>{day}</span>
        ))}
      </div>
      <div className="day-grid">
        {cells.map((date, index) => {
          if (!date) {
            return <span key={`empty-${index}`} className="day empty" />;
          }

          const unavailable = isUnavailable(date);
          const isStart = sameDay(date, checkIn);
          const isEnd = sameDay(date, checkOut);
          const inRange =
            checkIn &&
            checkOut &&
            startOfDay(date) > startOfDay(checkIn) &&
            startOfDay(date) < startOfDay(checkOut);

          return (
            <button
              key={date.toISOString()}
              type="button"
              className={`day${isStart ? " start" : ""}${isEnd ? " end" : ""}${
                inRange ? " in-range" : ""
              }${unavailable ? " unavailable" : ""}`}
              disabled={unavailable}
              onClick={() => onSelect(date)}
            >
              <span>{date.getDate()}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Laurel({ flip = false }) {
  return (
    <svg
      className={`laurel${flip ? " flip" : ""}`}
      viewBox="0 0 72 120"
      aria-hidden="true"
    >
      <path
        d="M48 112c-20-12-32-34-32-56C16 30 30 12 48 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M36 22c8 4 14 4 20 1-4 8-12 12-20 12 2-4 2-9 0-13z" />
      <path d="M30 40c9 3 16 2 22-2-5 10-14 15-23 15 3-4 3-9 1-13z" />
      <path d="M26 60c10 3 17 1 23-3-6 11-16 16-25 16 3-4 4-9 2-13z" />
      <path d="M28 80c9 3 16 1 21-3-5 10-14 15-23 15 3-4 4-8 2-12z" />
      <path d="M34 98c8 3 14 1 18-3-4 9-12 13-20 13 3-3 4-7 2-10z" />
    </svg>
  );
}

const photos = [
  {
    src: "/images/terrace-main.png",
    alt: "Outdoor lounge and jacuzzi",
  },
  {
    src: "/images/terrace-seating.png",
    alt: "Outdoor seating area",
  },
  {
    src: "/images/jacuzzi.png",
    alt: "Private jacuzzi",
  },
  {
    src: "/images/bedroom.png",
    alt: "Bedroom interior",
  },
  {
    src: "/images/building.png",
    alt: "Apartment building",
  },
];

const ratingCategories = [
  { name: "Cleanliness", score: "5.0", Icon: SprayCan },
  { name: "Accuracy", score: "5.0", Icon: CircleCheck },
  { name: "Check-in", score: "5.0", Icon: KeyRound },
  { name: "Communication", score: "5.0", Icon: MessageCircle },
  { name: "Location", score: "4.8", Icon: Map },
  { name: "Value", score: "4.8", Icon: Tag },
];

const overallBars = [
  { label: "5", width: "92%" },
  { label: "4", width: "6%" },
  { label: "3", width: "2%" },
  { label: "2", width: "1%" },
  { label: "1", width: "1%" },
];

const reviewHighlights = [
  { label: "Comfort", count: 6, Icon: BedDouble },
  { label: "Accuracy", count: 5, Icon: CircleCheck },
  { label: "Hot tub", count: 5, Icon: Bath },
  { label: "Condition", count: 4, Icon: House },
  { label: "Hospitality", count: 8, Icon: Gift },
  { label: "Cleanliness", count: 4, Icon: SprayCan },
  { label: "Amenities", count: 2, Icon: Package },
];

const guestReviews = [
  {
    name: "Amit",
    initial: "A",
    color: "#f4d6c8",
    tenure: "2 months on Airbnb",
    when: "1 week ago",
    text: "Very helpful and responsive team. Safe and peaceful stay. loved everything about the property.",
  },
  {
    name: "Aheesh",
    initial: "A",
    color: "#d7e3d0",
    tenure: "3 years on Airbnb",
    when: "2 weeks ago",
    text: "We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.",
    long: true,
  },
  {
    name: "Samiksha",
    initial: "S",
    color: "#ead7c3",
    tenure: "8 months on Airbnb",
    when: "May 2026",
    text: "the host nitish was really great help",
  },
  {
    name: "Vedant",
    initial: "V",
    color: "#ddd6f3",
    tenure: "4 years on Airbnb",
    when: "May 2026",
    text: "We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine.",
    long: true,
  },
  {
    name: "Vaibhav S",
    initial: "V",
    color: "#f3d0d8",
    tenure: "3 years on Airbnb",
    when: "May 2026",
    text: "Great great experience living out there , can't expect more , will always look for it in the future and will recommend my friends too.",
  },
  {
    name: "Mohd",
    initial: "M",
    color: "#d5e4f5",
    tenure: "5 years on Airbnb",
    when: "May 2026",
    text: "Great place. Exactly as described in the listing.",
  },
];

const extraReviews = [
  {
    name: "Priya",
    initial: "P",
    color: "#fde68a",
    tenure: "1 year on Airbnb",
    when: "April 2026",
    text: "Loved the jacuzzi and the location. Super easy check-in and a quiet night's sleep.",
  },
  {
    name: "Rahul",
    initial: "R",
    color: "#bbf7d0",
    tenure: "6 months on Airbnb",
    when: "March 2026",
    text: "Clean apartment, fast wifi, and walking distance to Candolim Beach.",
  },
];

const coHosts = [
  { name: "Sharath", color: "#c4b5a5" },
  { name: "Simran", color: "#9ca3af" },
  { name: "Shruti", color: "#f9a8d4", initial: "S" },
  { name: "Aman Dev Pahwa", color: "#d6b89a" },
  { name: "Pallavi", color: "#a8b5a0" },
  { name: "Amisha", color: "#bfdbfe", initial: "A" },
  { name: "Maria Karen Priyanka", color: "#e7d5c5" },
  { name: "Sanyukta", color: "#c4a574" },
];

const nearbyStays = [
  {
    title: "Beautiful Studio with a view to die for",
    price: "₹23,600",
    rating: "4.91",
    image: "/images/terrace-main.png",
  },
  {
    title: "NAQAB - 1bhk with private pool",
    price: "₹42,218",
    rating: "4.95",
    image: "/images/bedroom.png",
  },
  {
    title: "Greentique Luxury Flat with plunge pool, Calangute",
    price: "₹44,506",
    rating: "4.94",
    image: "/images/terrace-seating.png",
  },
  {
    title: "The Tropical Studio | 5 mins to Beach",
    price: "₹22,824",
    rating: "4.96",
    image: "/images/jacuzzi.png",
  },
  {
    title: "Luxury Casa Bella 1BHK with plunge pool, Calangute",
    price: "₹39,942",
    rating: "4.95",
    image: "/images/building.png",
  },
  {
    title: "Poolside 1BHK near Candolim Beach",
    price: "₹31,400",
    rating: "4.92",
    image: "/images/terrace-main.png",
  },
  {
    title: "Calm Garden Studio, Calangute",
    price: "₹19,850",
    rating: "4.88",
    image: "/images/bedroom.png",
  },
  {
    title: "Sea breeze loft with workspace",
    price: "₹27,990",
    rating: "4.93",
    image: "/images/terrace-seating.png",
  },
  {
    title: "Family 1BHK with private sit-out",
    price: "₹33,210",
    rating: "4.90",
    image: "/images/jacuzzi.png",
  },
  {
    title: "Designer apartment close to nightlife",
    price: "₹36,750",
    rating: "4.97",
    image: "/images/building.png",
  },
];

export default function App() {
  const [saved, setSaved] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [destination, setDestination] = useState("Anywhere");
  const [dates, setDates] = useState("Anytime");
  const [guests, setGuests] = useState("Add guests");
  const [message, setMessage] = useState("");
  const [bookingGuests, setBookingGuests] = useState(2);
  const [showGuests, setShowGuests] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [reserved, setReserved] = useState(false);
  const [showAllAmenities, setShowAllAmenities] = useState(false);
  const [checkIn, setCheckIn] = useState(new Date(2026, 9, 18));
  const [checkOut, setCheckOut] = useState(new Date(2026, 9, 23));
  const [viewMonth, setViewMonth] = useState(new Date(2026, 9, 1));
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState({});
  const [showNeighbourhood, setShowNeighbourhood] = useState(false);
  const [nearbyPage, setNearbyPage] = useState(0);
  const [mapZoom, setMapZoom] = useState(1);
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const syncRoute = () => setRoute(window.location.pathname);
    window.addEventListener("popstate", syncRoute);
    return () => window.removeEventListener("popstate", syncRoute);
  }, []);

  const openPhotoTour = (sectionId) => {
    const path = sectionId ? `/photos#${sectionId}` : "/photos";
    window.history.pushState({}, "", path);
    setRoute("/photos");
  };

  const closePhotoTour = () => {
    window.history.pushState({}, "", "/");
    setRoute("/");
  };

  const nights = nightsBetween(checkIn, checkOut);
  const stayTotal = nights > 0 ? Math.round(NIGHTLY_RATE * nights) : 28499;
  const nextMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1);

  const notify = (text) => {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 2200);
  };

  const shareListing = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      notify("Link copied");
    } catch {
      notify("Copy the page URL to share");
    }
  };

  const selectStayDate = (date) => {
    const picked = startOfDay(date);
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(picked);
      setCheckOut(null);
      return;
    }
    if (picked <= startOfDay(checkIn)) {
      setCheckIn(picked);
      setCheckOut(null);
      return;
    }
    setCheckOut(picked);
  };

  const clearDates = () => {
    setCheckIn(null);
    setCheckOut(null);
  };

  if (route.startsWith("/photos")) {
    return <PhotoTour onBack={closePhotoTour} />;
  }

  return (
    <div className="app">
      <header className="navbar">
        <a className="logo" href="#" aria-label="Airbnb home">
          <svg viewBox="0 0 36 40" aria-hidden="true">
            <path
              d="M18 3C15 3 13 6 12 9L4 27C2 32 4 36 9 36C12 36 15 33 18 28C21 33 24 36 27 36C32 36 34 32 32 27L24 9C23 6 21 3 18 3Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.7"
            />
            <path
              d="M18 17C14 17 12 22 18 30C24 22 22 17 18 17Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
            />
          </svg>
          <span>airbnb</span>
        </a>

        <div className="search-bar">
          <button
            className="search-part destination"
            onClick={() =>
              setDestination(
                destination === "Anywhere" ? "Goa, India" : "Anywhere"
              )
            }
          >
            <span className="home-icon">🏡</span>
            {destination}
          </button>

          <span className="separator" />

          <button
            className="search-part"
            onClick={() =>
              setDates(dates === "Anytime" ? "Add dates" : "Anytime")
            }
          >
            {dates}
          </button>

          <span className="separator" />

          <button
            className="search-part guests"
            onClick={() =>
              setGuests(guests === "Add guests" ? "1 guest" : "Add guests")
            }
          >
            {guests}
          </button>

          <button
            className="search-button"
            aria-label="Search stays"
            onClick={() => notify(`Search: ${destination}`)}
          >
            <Search size={19} strokeWidth={2.7} />
          </button>
        </div>

        <div className="nav-actions">
          <button
            className="host-button"
            onClick={() => notify("Become a host")}
          >
            Become a host
          </button>

          <button
            className="round-button"
            aria-label="Language and currency"
            onClick={() => notify("Language and currency")}
          >
            <Globe size={20} />
          </button>

          <div className="menu-container">
            <button
              className="round-button menu-button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu size={22} />
            </button>

            {menuOpen && (
              <div className="dropdown">
                <button onClick={() => notify("Log in")}>Log in</button>
                <button onClick={() => notify("Sign up")}>Sign up</button>
                <hr />
                <button onClick={() => notify("Help Centre")}>
                  Help Centre
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="listing">
        <div className="listing-header">
          <h1>Romantic Jacuzzi 1BHK Candolim | Mirashya UG10</h1>

          <div className="listing-actions">
            <button className="text-action" onClick={shareListing}>
              <Share size={17} />
              <span>Share</span>
            </button>

            <button
              className={`text-action ${saved ? "saved" : ""}`}
              onClick={() => {
                setSaved(!saved);
                notify(saved ? "Removed from saved" : "Saved to wishlist");
              }}
              aria-pressed={saved}
            >
              <Heart
                size={20}
                fill={saved ? "currentColor" : "none"}
              />
              <span>{saved ? "Saved" : "Save"}</span>
            </button>
          </div>
        </div>

        <section
          className="photo-grid"
          id="photos"
          aria-label="Property photos"
        >
          {photos.map((photo, index) => (
            <button
              key={photo.src}
              className={`photo photo-${index + 1}`}
              aria-label={`Property photo ${index + 1}: ${photo.alt}`}
              onClick={() =>
                openPhotoTour(
                  index === 3
                    ? "bedroom"
                    : index === 4
                    ? "exterior"
                    : index === 2
                    ? "pool"
                    : "living-room-1"
                )
              }
            >
              <img src={photo.src} alt={photo.alt} />
            </button>
          ))}

          <button
            className="show-photos"
            onClick={() => openPhotoTour()}
          >
            <Grid3X3 size={17} />
            <span>Show all photos</span>
          </button>
        </section>

        <div className="listing-details">
          <header className="listing-topbar">
            <nav className="section-tabs" aria-label="Listing sections">
              <a className="active" href="#photos">
                Photos
              </a>
              <a href="#amenities">Amenities</a>
              <a href="#reviews">Reviews</a>
              <a href="#location">Location</a>
            </nav>

            <div className="top-reserve">
              <div className="top-reserve-summary">
                <strong>{formatPrice(stayTotal)}</strong>{" "}
                {nights > 0 ? `for ${nights} nights` : "Add dates"}
                <span className="top-rating">
                  <Star size={13} fill="currentColor" /> 4.95 · 19 reviews
                </span>
              </div>
              <button
                type="button"
                className="top-reserve-button"
                onClick={() =>
                  document
                    .getElementById("booking")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Reserve
              </button>
            </div>
          </header>

          <div className="listing-body">
            <section className="listing-main">
              <h2 className="listing-title">
                Entire serviced apartment in Candolim, India
              </h2>
              <p className="listing-meta">
                3 guests · 1 bedroom · 1 bed · 1 bathroom
              </p>

              <section className="guest-favourite">
                <div className="guest-favourite-badge">
                  <Award size={34} strokeWidth={1.5} />
                  <strong>
                    Guest
                    <br />
                    favourite
                  </strong>
                  <Award size={34} strokeWidth={1.5} />
                </div>
                <p className="guest-favourite-copy">
                  One of the most loved homes on Airbnb,
                  <br className="desktop-break" /> according to guests
                </p>
                <div className="score-block">
                  <strong>4.95</strong>
                  <span aria-hidden="true">★★★★★</span>
                </div>
                <div className="score-block reviews-count">
                  <strong>19</strong>
                  <span>Reviews</span>
                </div>
              </section>

              <section className="host-row">
                <div className="host-avatar" aria-hidden="true">
                  MIRASHYA
                </div>
                <div>
                  <strong>Hosted by Mirashya Homes</strong>
                  <p>2 years hosting</p>
                </div>
              </section>

              <hr className="section-rule" />

              <section className="highlights">
                <div className="highlight">
                  <Waves size={25} strokeWidth={1.5} />
                  <div>
                    <strong>Outdoor entertainment</strong>
                    <p>
                      The pool and alfresco dining are great for summer trips.
                    </p>
                  </div>
                </div>
                <div className="highlight">
                  <Wind size={25} strokeWidth={1.5} />
                  <div>
                    <strong>Designed for staying cool</strong>
                    <p>Beat the heat with the A/C and ceiling fan.</p>
                  </div>
                </div>
                <div className="highlight">
                  <DoorOpen size={25} strokeWidth={1.5} />
                  <div>
                    <strong>Self check-in</strong>
                    <p>You can check in with the building staff.</p>
                  </div>
                </div>
              </section>

              <hr className="section-rule" />

              <div className="translation-notice">
                Some info has been automatically translated.{" "}
                <button
                  type="button"
                  onClick={() => notify("Showing the original description.")}
                >
                  Show original
                </button>
              </div>

              <section className="listing-description">
                <p>
                  🌴 Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes!
                  ✨ Stay in this cozy 1BHK in the heart of Candolim, featuring a
                  private jacuzzi 🛁 for the perfect unwind. Enjoy high-speed WiFi
                  📺, Smart TV 📱, pet-friendly comfort 🐾, and stylish interiors.
                  Just minutes from Candolim Beach 🏖️, popular cafés, restaurants,
                  and nightlife 🍹.
                </p>

                {showMore && (
                  <p>
                    Relax in a comfortable space designed for your Goa getaway.
                    Enjoy nearby beaches, local food, shopping, and entertainment.
                    The apartment is suitable for couples, friends, and small
                    families looking for a relaxing stay.
                  </p>
                )}

                <button
                  type="button"
                  className="show-more-link"
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? "Show less" : "Show more"}{" "}
                  <ChevronRight size={18} />
                </button>
              </section>

              <section className="sleep-section">
                <h3>Where you&apos;ll sleep</h3>
                <div className="sleep-grid">
                  <button
                    type="button"
                    className="sleep-card"
                    onClick={() => openPhotoTour("bedroom")}
                  >
                    <img src="/images/bedroom.png" alt="Bedroom" />
                    <strong>Bedroom</strong>
                    <span>1 double bed</span>
                  </button>
                  <button
                    type="button"
                    className="sleep-card"
                    onClick={() => openPhotoTour("living-room-1")}
                  >
                    <img src="/images/terrace-seating.png" alt="Living room" />
                    <strong>Living room</strong>
                    <span>1 sofa</span>
                  </button>
                </div>
              </section>

              <section className="offers-section" id="amenities">
                <h3>What this place offers</h3>
                <ul className="amenity-grid">
                  <li>
                    <CookingPot size={24} strokeWidth={1.6} />
                    Kitchen
                  </li>
                  <li>
                    <Wifi size={24} strokeWidth={1.6} />
                    Wifi
                  </li>
                  <li>
                    <Monitor size={24} strokeWidth={1.6} />
                    Dedicated workspace
                  </li>
                  <li>
                    <Car size={24} strokeWidth={1.6} />
                    Free parking on premises
                  </li>
                  <li>
                    <Waves size={24} strokeWidth={1.6} />
                    Pool
                  </li>
                  <li>
                    <Bath size={24} strokeWidth={1.6} />
                    Hot tub
                  </li>
                  <li>
                    <PawPrint size={24} strokeWidth={1.6} />
                    Pets allowed
                  </li>
                  <li>
                    <Video size={24} strokeWidth={1.6} />
                    Exterior security cameras on property
                  </li>
                  <li className="unavailable">
                    <Ban size={24} strokeWidth={1.6} />
                    Carbon monoxide alarm
                  </li>
                  <li className="unavailable">
                    <Ban size={24} strokeWidth={1.6} />
                    Smoke alarm
                  </li>
                </ul>
                <button
                  type="button"
                  className="show-amenities"
                  onClick={() => setShowAllAmenities(!showAllAmenities)}
                >
                  {showAllAmenities ? "Hide extra amenities" : "Show all 50 amenities"}
                </button>
                {showAllAmenities && (
                  <ul className="amenity-grid extra-amenities">
                    <li>
                      <Wind size={24} strokeWidth={1.6} />
                      Air conditioning
                    </li>
                    <li>
                      <Waves size={24} strokeWidth={1.6} />
                      Private jacuzzi
                    </li>
                    <li>
                      <Monitor size={24} strokeWidth={1.6} />
                      Smart TV
                    </li>
                    <li>
                      <DoorOpen size={24} strokeWidth={1.6} />
                      Self check-in
                    </li>
                  </ul>
                )}
              </section>

              <section className="calendar-section" id="calendar">
                <h3>
                  {nights > 0
                    ? `${nights} nights in Candolim`
                    : "Select check-in date"}
                </h3>
                <p className="calendar-range">
                  {formatRangeLabel(checkIn, checkOut)}
                </p>

                <div className="months-wrap">
                  <MonthGrid
                    year={viewMonth.getFullYear()}
                    month={viewMonth.getMonth()}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    onSelect={selectStayDate}
                    nav={{
                      left: (
                        <button
                          type="button"
                          className="month-nav"
                          aria-label="Previous month"
                          onClick={() =>
                            setViewMonth(
                              new Date(
                                viewMonth.getFullYear(),
                                viewMonth.getMonth() - 1,
                                1
                              )
                            )
                          }
                        >
                          <ChevronLeft size={18} />
                        </button>
                      ),
                    }}
                  />
                  <MonthGrid
                    year={nextMonth.getFullYear()}
                    month={nextMonth.getMonth()}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    onSelect={selectStayDate}
                    nav={{
                      right: (
                        <button
                          type="button"
                          className="month-nav"
                          aria-label="Next month"
                          onClick={() =>
                            setViewMonth(
                              new Date(
                                viewMonth.getFullYear(),
                                viewMonth.getMonth() + 1,
                                1
                              )
                            )
                          }
                        >
                          <ChevronRight size={18} />
                        </button>
                      ),
                    }}
                  />
                </div>

                <div className="calendar-footer">
                  <button
                    type="button"
                    className="keyboard-btn"
                    aria-label="Keyboard shortcuts"
                    onClick={() => notify("Use the calendar to pick dates")}
                  >
                    <Keyboard size={18} />
                  </button>
                  <button
                    type="button"
                    className="clear-dates"
                    onClick={clearDates}
                  >
                    Clear dates
                  </button>
                </div>
              </section>
            </section>

            <aside className="booking-sidebar">
              <div className="promo-banner">
                <Tag size={23} fill="#6c9e64" color="#6c9e64" />
                <div>
                  <span>
                    {claimed ? "Discount claimed!" : "Get 10% off your next stay."}
                  </span>
                  <a href="#booking">Terms apply</a>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setClaimed(true);
                    notify("Discount claimed");
                  }}
                >
                  {claimed ? "Claimed" : "Claim"}
                </button>
              </div>

              <section className="booking-card" id="booking">
                <div className="booking-price">
                  <strong>{formatPrice(stayTotal)}</strong>
                  <span>
                    {nights > 0 ? ` for ${nights} nights` : " Add dates"}
                  </span>
                </div>

                <div className="booking-fields">
                  <label>
                    <span>CHECK-IN</span>
                    <input
                      type="text"
                      readOnly
                      value={formatCardDate(checkIn)}
                      aria-label="Check-in date"
                      onClick={() =>
                        document
                          .getElementById("calendar")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                    />
                  </label>
                  <label>
                    <span>CHECKOUT</span>
                    <input
                      type="text"
                      readOnly
                      value={formatCardDate(checkOut)}
                      aria-label="Checkout date"
                      onClick={() =>
                        document
                          .getElementById("calendar")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                    />
                  </label>
                  <button
                    type="button"
                    className="guest-picker"
                    onClick={() => setShowGuests(!showGuests)}
                    aria-expanded={showGuests}
                  >
                    <span>
                      <small>GUESTS</small>
                      {bookingGuests}{" "}
                      {bookingGuests === 1 ? "guest" : "guests"}
                    </span>
                    <ChevronDown size={20} />
                  </button>

                  {showGuests && (
                    <div className="guest-menu">
                      <span>Guests</span>
                      <div className="guest-stepper">
                        <button
                          type="button"
                          disabled={bookingGuests <= 1}
                          onClick={() =>
                            setBookingGuests(Math.max(1, bookingGuests - 1))
                          }
                        >
                          −
                        </button>
                        <strong>{bookingGuests}</strong>
                        <button
                          type="button"
                          disabled={bookingGuests >= 3}
                          onClick={() =>
                            setBookingGuests(Math.min(3, bookingGuests + 1))
                          }
                        >
                          +
                        </button>
                      </div>
                      <small>Maximum 3 guests</small>
                    </div>
                  )}
                </div>

                <div className="cancellation-note">
                  Free cancellation before{" "}
                  <strong>
                    {checkIn
                      ? formatLongDay(
                          new Date(
                            checkIn.getFullYear(),
                            checkIn.getMonth(),
                            checkIn.getDate() - 1
                          )
                        )
                      : "your trip"}
                  </strong>
                </div>

                <button
                  type="button"
                  className="reserve-button"
                  onClick={() => {
                    setReserved(true);
                    notify("Reservation request submitted (demo)");
                  }}
                >
                  {reserved ? "Request submitted" : "Reserve"}
                </button>

                <p className="charge-note">
                  {reserved
                    ? "This is a demo. No payment was made."
                    : "You won't be charged yet"}
                </p>
              </section>

              <button
                type="button"
                className="report-listing"
                onClick={() => notify("Report listing")}
              >
                <Flag size={16} fill="currentColor" />
                <span>Report this listing</span>
              </button>
            </aside>
          </div>

          <section className="reviews-hero" id="reviews">
            <div className="reviews-score">
              <Laurel />
              <span>4.95</span>
              <Laurel flip />
            </div>
            <h3>Guest favourite</h3>
            <p>
              This home is a guest favourite based on ratings, reviews and
              reliability
            </p>
            <button
              type="button"
              className="how-reviews"
              onClick={() => notify("How reviews work")}
            >
              How reviews work
            </button>
          </section>

          <section className="reviews-breakdown" aria-label="Guest reviews">
            <div className="rating-strip">
              <div className="overall-rating">
                <strong>Overall rating</strong>
                <div className="bar-chart">
                  {overallBars.map((bar) => (
                    <div key={bar.label} className="bar-row">
                      <span>{bar.label}</span>
                      <div className="bar-track">
                        <div className="bar-fill" style={{ width: bar.width }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {ratingCategories.map((item) => (
                <div key={item.name} className="category-score">
                  <span>{item.name}</span>
                  <strong>{item.score}</strong>
                  <item.Icon size={28} strokeWidth={1.5} />
                </div>
              ))}
            </div>

            <div className="highlight-row">
              {reviewHighlights.map((item) => (
                <span key={item.label} className="highlight-chip">
                  <item.Icon size={16} strokeWidth={1.7} />
                  {item.label} {item.count}
                </span>
              ))}
            </div>

            <div className="review-grid">
              {(showAllReviews
                ? [...guestReviews, ...extraReviews]
                : guestReviews
              ).map((review) => {
                const expanded = expandedReviews[review.name];
                const clipped =
                  review.long && !expanded
                    ? `${review.text.slice(0, 180)}....`
                    : review.text;

                return (
                  <article key={review.name} className="review-card">
                    <div className="reviewer">
                      <div
                        className="reviewer-avatar"
                        style={{ background: review.color }}
                      >
                        {review.initial}
                      </div>
                      <div>
                        <strong>{review.name}</strong>
                        <p>{review.tenure}</p>
                      </div>
                    </div>
                    <p className="review-meta">
                      ★★★★★ · {review.when}
                    </p>
                    <p className="review-text">{clipped}</p>
                    {review.long && (
                      <button
                        type="button"
                        className="show-more-link"
                        onClick={() =>
                          setExpandedReviews((current) => ({
                            ...current,
                            [review.name]: !current[review.name],
                          }))
                        }
                      >
                        {expanded ? "Show less" : "Show more"}
                      </button>
                    )}
                  </article>
                );
              })}
            </div>

            <button
              type="button"
              className="show-amenities"
              onClick={() => setShowAllReviews(!showAllReviews)}
            >
              {showAllReviews ? "Show fewer reviews" : "Show all 19 reviews"}
            </button>
          </section>

          <section className="location-section" id="location">
            <h3>Where you&apos;ll be</h3>
            <p>Candolim, Goa, India</p>
            <div className="map-canvas">
              <div
                className="map-surface"
                style={{ transform: `scale(${mapZoom})` }}
              >
                <div className="map-water" />
                <div className="map-blob one" />
                <div className="map-blob two" />
                <div className="map-pin" aria-hidden="true">
                  <Home size={18} color="#fff" />
                </div>
              </div>
              <button type="button" className="map-search" aria-label="Search map">
                <Search size={16} />
              </button>
              <div className="map-zoom">
                <button
                  type="button"
                  aria-label="Zoom in"
                  onClick={() => setMapZoom((value) => Math.min(1.4, value + 0.1))}
                >
                  <Plus size={16} />
                </button>
                <button
                  type="button"
                  aria-label="Zoom out"
                  onClick={() => setMapZoom((value) => Math.max(0.9, value - 0.1))}
                >
                  <Minus size={16} />
                </button>
              </div>
            </div>
            <p className="map-note">
              Exact location will be provided after booking.
            </p>
            <h4>Neighbourhood highlights</h4>
            <p>
              Located in the heart of Candolim, Amor de Goa offers a peaceful stay
              with easy access to beaches, cafés, and popular attractions.
            </p>
            {showNeighbourhood && (
              <p>
                You can walk to Candolim Beach, local bakeries, and nightlife
                spots, while still coming back to a quiet apartment for the
                evening.
              </p>
            )}
            <button
              type="button"
              className="show-more-link"
              onClick={() => setShowNeighbourhood(!showNeighbourhood)}
            >
              {showNeighbourhood ? "Show less" : "Show more"}{" "}
              <ChevronRight size={18} />
            </button>
          </section>

          <section className="host-section">
            <h3>Meet your host</h3>
            <div className="host-layout">
              <div className="host-profile-card">
                <div className="host-profile-main">
                  <div className="host-profile-avatar">
                    MIRASHYA
                    <span className="host-check">
                      <BadgeCheck size={16} fill="#e31c5f" color="#fff" />
                    </span>
                  </div>
                  <strong>
                    Mirashya
                    <br />
                    Homes
                  </strong>
                  <span>Host</span>
                </div>
                <dl>
                  <div>
                    <dt>1,463</dt>
                    <dd>Reviews</dd>
                  </div>
                  <div>
                    <dt>
                      4.68
                      <Star size={12} fill="currentColor" />
                    </dt>
                    <dd>Rating</dd>
                  </div>
                  <div>
                    <dt>2</dt>
                    <dd>Years hosting</dd>
                  </div>
                </dl>
              </div>

              <div className="host-copy">
                <p className="host-fact">
                  <Cake size={18} strokeWidth={1.7} /> Born in the 80s
                </p>
                <p className="host-fact">
                  <GraduationCap size={18} strokeWidth={1.7} /> Where I went to
                  school: NICMAR GOA
                </p>

                <h4>Co-Hosts</h4>
                <div className="cohost-grid">
                  {coHosts.map((person) => (
                    <div key={person.name} className="cohost">
                      <span style={{ background: person.color }}>
                        {person.initial || person.name.charAt(0)}
                      </span>
                      {person.name}
                    </div>
                  ))}
                </div>

                <h4>Host details</h4>
                <p>Response rate: 100%</p>
                <p>Responds within an hour</p>
                <button
                  type="button"
                  className="message-host"
                  onClick={() => notify("Message host")}
                >
                  Message host
                </button>
                <p className="host-safety">
                  <Shield size={16} /> To help protect your payment, always use
                  Airbnb to send money and communicate with hosts.
                </p>
              </div>
            </div>
          </section>

          <section className="things-to-know">
            <h3>Things to know</h3>
            <div className="know-grid">
              <div>
                <CalendarX2 size={22} strokeWidth={1.6} />
                <h4>Cancellation policy</h4>
                <p>
                  Free cancellation before 17 October. Cancel before check-in on
                  18 October for a partial refund.
                </p>
                <p>Review this host&apos;s full policy for details.</p>
                <button
                  type="button"
                  className="show-more-link"
                  onClick={() => notify("Full cancellation policy")}
                >
                  Learn more
                </button>
              </div>
              <div>
                <KeyRound size={22} strokeWidth={1.6} />
                <h4>House rules</h4>
                <p>Check-in after 2:00 pm</p>
                <p>Checkout before 11:00 am</p>
                <p>3 guests maximum</p>
                <button
                  type="button"
                  className="show-more-link"
                  onClick={() => notify("All house rules")}
                >
                  Learn more
                </button>
              </div>
              <div>
                <Shield size={22} strokeWidth={1.6} />
                <h4>Safety &amp; property</h4>
                <p>Carbon monoxide alarm not reported</p>
                <p>Smoke alarm not reported</p>
                <p>Exterior security cameras on property</p>
                <button
                  type="button"
                  className="show-more-link"
                  onClick={() => notify("Safety details")}
                >
                  Learn more
                </button>
              </div>
            </div>
          </section>

          <section className="nearby-stays">
            <div className="nearby-head">
              <h3>More stays nearby</h3>
              <div className="nearby-nav">
                <span>
                  {nearbyPage + 1}/{Math.ceil(nearbyStays.length / 5)}
                </span>
                <button
                  type="button"
                  aria-label="Previous stays"
                  disabled={nearbyPage === 0}
                  onClick={() => setNearbyPage((page) => Math.max(0, page - 1))}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  aria-label="Next stays"
                  disabled={nearbyPage >= Math.ceil(nearbyStays.length / 5) - 1}
                  onClick={() =>
                    setNearbyPage((page) =>
                      Math.min(Math.ceil(nearbyStays.length / 5) - 1, page + 1)
                    )
                  }
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            <div className="nearby-grid">
              {nearbyStays
                .slice(nearbyPage * 5, nearbyPage * 5 + 5)
                .map((stay) => (
                  <button
                    type="button"
                    className="nearby-card"
                    key={stay.title}
                    onClick={() => notify(stay.title)}
                  >
                    <img src={stay.image} alt={stay.title} />
                    <strong>{stay.title}</strong>
                    <span>
                      {stay.price} · ★ {stay.rating}
                    </span>
                  </button>
                ))}
            </div>
          </section>
        </div>
      </main>

      {message && (
        <div className="toast" role="status">
          {message}
        </div>
      )}
    </div>
  );
}
