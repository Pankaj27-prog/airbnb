import { useEffect } from "react";
import { X } from "lucide-react";
import "./PhotoTour.css";

const living1 = "/images/terrace-seating.png";
const living2 = "/images/terrace-main.png";
const jacuzzi = "/images/jacuzzi.png";
const bedroom = "/images/bedroom.png";
const exterior = "/images/building.png";
const gym1 = "/images/gym1.png";
const gym2 = "/images/gym2.png";
const gym3 = "/images/gym3.png";
const gym4 = "/images/gym4.png";
const kitchen1 = "/images/kitchen1.png";
const kitchen2 = "/images/kitchen2.png";
const pool1 = "/images/pool1.png";
const pool2 = "/images/pool2.png";
const pool3 = "/images/pool3.png";

const rooms = [
  {
    id: "living-room-1",
    name: "Living room 1",
    amenities: "Sofa · Air conditioning · Ceiling fan · TV",
    photos: [
      { src: living1, size: "wide" },
      { src: living1, size: "half", pos: "left" },
      { src: living1, size: "half", pos: "right" },
    ],
  },
  {
    id: "living-room-2",
    name: "Living room 2",
    amenities: "Ceiling fan · Hot tub",
    photos: [
      { src: living2, size: "wide" },
      { src: jacuzzi, size: "half" },
      { src: living2, size: "half", pos: "bottom" },
      { src: living2, size: "wide", pos: "center" },
      { src: living2, size: "half", pos: "left" },
      { src: living2, size: "half", pos: "right" },
      { src: living2, size: "wide", pos: "top" },
    ],
  },
  {
    id: "kitchen",
    name: "Full kitchen",
    amenities:
      "Freezer · Fridge · Blender · Cooker · Cooking basics · Kettle · Microwave · Toaster · Wine glasses · Coffee · Crockery and cutlery",
    photos: [
      { src: kitchen1, size: "half", pos: "left" },
      { src: kitchen2, size: "half", pos: "right" },
    ],
  },
  {
    id: "bedroom",
    name: "Bedroom",
    amenities:
      "Double bed · Air conditioning · Bed linen · Ceiling fan · Clothes storage · Cot · Hangers · Iron · Room-darkening blinds · Cleaning available during stay · Cleaning products · Long-term stays allowed · Private entrance · Wifi",
    photos: [
      { src: bedroom, size: "wide" },
      { src: bedroom, size: "half", pos: "left" },
      { src: bedroom, size: "half", pos: "right" },
      { src: bedroom, size: "wide", pos: "center" },
      { src: bedroom, size: "half", pos: "top" },
      { src: bedroom, size: "half", pos: "bottom" },
    ],
  },
  {
    id: "bathroom",
    name: "Full bathroom",
    amenities: "Hairdryer · Hot water · Shampoo · Shower gel",
    photos: [{ src: jacuzzi, size: "wide" }],
  },
  {
    id: "gym",
    name: "Gym",
    amenities: "Air conditioning · Gym · Exercise equipment · Ceiling fan",
    photos: [
      { src: gym1, size: "wide", pos: "center" },
      { src: gym2, size: "half", pos: "left" },
      { src: gym3, size: "half", pos: "right" },
      { src: gym4, size: "half", pos: "top" },
      { src: gym1, size: "half", pos: "bottom" },
    ],
  },
  {
    id: "exterior",
    name: "Exterior",
    amenities: "",
    photos: [
      { src: exterior, size: "wide" },
      { src: exterior, size: "half", pos: "left" },
      { src: exterior, size: "half", pos: "right" },
      { src: exterior, size: "wide", pos: "bottom" },
      { src: exterior, size: "half", pos: "top" },
      { src: exterior, size: "half", pos: "center" },
    ],
  },
  {
    id: "pool",
    name: "Pool",
    amenities: "Pool",
    photos: [
      { src: pool1, size: "wide" },
      { src: pool2, size: "half", pos: "left" },
      { src: pool3, size: "half", pos: "right" },
    ],
  },
  {
    id: "additional",
    name: "Additional photos",
    amenities: "",
    photos: [
      { src: living2, size: "wide" },
      { src: living2, size: "half", pos: "left" },
      { src: living2, size: "half", pos: "right" },
      { src: living1, size: "wide", pos: "center" },
      { src: living1, size: "half", pos: "top" },
      { src: living2, size: "half", pos: "bottom" },
      { src: living1, size: "wide" },
      { src: living2, size: "half" },
      { src: living1, size: "half", pos: "right" },
      { src: living1, size: "wide", pos: "bottom" },
    ],
  },
];

export default function PhotoTour({ onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    const hash = window.location.hash;
    if (!hash) return;
    window.setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    }, 80);
  }, []);

  return (
    <div className="photo-tour">
      <header className="tour-header">
        <button type="button" className="tour-close" onClick={onBack} aria-label="Close photo tour">
          <X size={18} />
        </button>
        <h1>Photo tour</h1>
      </header>

      <nav className="tour-nav" aria-label="Photo rooms">
        {rooms.map((room) => (
          <a key={room.id} href={`#${room.id}`} className="tour-thumb">
            <img src={room.photos[0].src} alt="" />
            <span>{room.name}</span>
          </a>
        ))}
      </nav>

      {rooms.map((room) => (
        <section key={room.id} id={room.id} className="tour-section">
          <div className="tour-copy">
            <h2>{room.name}</h2>
            {room.amenities ? <p>{room.amenities}</p> : null}
          </div>
          <div className="tour-photos">
            {room.photos.map((photo, index) => (
              <img
                key={`${room.id}-${index}`}
                src={photo.src}
                alt={`${room.name} photo ${index + 1}`}
                className={`tour-photo ${photo.size}${photo.pos ? ` pos-${photo.pos}` : ""}`}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
