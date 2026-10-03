import React, { useState } from 'react';
import { Calendar, Users, Clock, CheckCircle2, MapPin, Sparkles, AlertCircle } from 'lucide-react';
import { TableReservation } from '../types/cafe';
import { SEATING_AREAS, TIME_SLOTS } from '../data/cafeData';

export const ReservationSection: React.FC = () => {
  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  });
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[3]); // 11:30 AM
  const [guestsCount, setGuestsCount] = useState(2);
  const [seatingArea, setSeatingArea] = useState<TableReservation['seatingArea']>('The Sunlit Conservatory');
  const [specialOccasion, setSpecialOccasion] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  const [confirmedReservation, setConfirmedReservation] = useState<TableReservation | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !phone.trim() || !email.trim()) return;

    const newReservation: TableReservation = {
      id: `VB-${Math.floor(1000 + Math.random() * 9000)}`,
      guestName,
      email,
      phone,
      date,
      timeSlot,
      guestsCount,
      seatingArea,
      specialOccasion: specialOccasion || undefined,
      specialRequests: specialRequests || undefined,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'Confirmed',
    };

    setConfirmedReservation(newReservation);
  };

  const handleReset = () => {
    setConfirmedReservation(null);
    setSpecialRequests('');
  };

  return (
    <section id="reservation" className="py-20 bg-[#FAF7F2] border-b border-[#E8DFC9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold tracking-widest uppercase text-[#C88242] block mb-2">
            Table Hospitality
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#181411]">
            Reserve Your Experience
          </h2>
          <p className="mt-2 text-sm text-[#5A4F46] font-light">
            Enjoy priority seating in our garden conservatory, quiet library, or front-row barista counter.
          </p>
        </div>

        {confirmedReservation ? (
          /* Confirmation Voucher Screen */
          <div className="max-w-xl mx-auto bg-white border border-[#E8DFC9] rounded-xl p-8 shadow-md text-center space-y-6 animate-in fade-in zoom-in-95">
            <div className="w-14 h-14 bg-[#EAF5EC] text-[#2E7D32] rounded-full mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C88242]">Reservation Confirmed</span>
              <h3 className="font-serif text-2xl font-bold text-[#181411] mt-1">We look forward to hosting you</h3>
              <p className="text-xs text-[#5A4F46] mt-1">
                A confirmation has been sent to <span className="font-medium text-[#181411]">{confirmedReservation.email}</span>
              </p>
            </div>

            {/* Voucher Details */}
            <div className="bg-[#FAF7F2] border border-[#DDD3BF] rounded-lg p-5 text-left text-xs space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-[#E8DFC9]">
                <span className="text-[#8C7E72] uppercase tracking-wider text-[11px]">Booking ID</span>
                <span className="font-mono font-bold text-[#181411] text-sm">{confirmedReservation.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8C7E72]">Guest Name</span>
                <span className="font-medium text-[#181411]">{confirmedReservation.guestName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8C7E72]">Date & Time</span>
                <span className="font-medium text-[#181411]">{confirmedReservation.date} · {confirmedReservation.timeSlot}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8C7E72]">Party Size</span>
                <span className="font-medium text-[#181411]">{confirmedReservation.guestsCount} Guests</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#8C7E72]">Selected Zone</span>
                <span className="font-medium text-[#C88242]">{confirmedReservation.seatingArea}</span>
              </div>
              {confirmedReservation.specialOccasion && (
                <div className="flex justify-between items-center">
                  <span className="text-[#8C7E72]">Occasion</span>
                  <span className="font-medium text-[#181411]">{confirmedReservation.specialOccasion}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:Table at Velvet & Bean Roastery\nDESCRIPTION:Booking ID: ${confirmedReservation.id}\nSTATUS:CONFIRMED\nEND:VEVENT\nEND:VCALENDAR`;
                  const blob = new Blob([icsContent], { type: 'text/calendar' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `Velvet-Bean-Reservation-${confirmedReservation.id}.ics`;
                  a.click();
                }}
                className="w-full sm:flex-1 py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#181411] hover:bg-[#2A221C] rounded-md transition-colors"
              >
                Add to Calendar (.ics)
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto py-2.5 px-4 text-xs font-medium text-[#5A4F46] hover:text-[#181411] border border-[#DDD3BF] rounded-md hover:bg-[#FAF7F2]"
              >
                Book Another Table
              </button>
            </div>
          </div>
        ) : (
          /* Reservation Form */
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-[#E8DFC9] rounded-xl p-6 sm:p-10 shadow-sm space-y-8"
          >
            {/* Step 1: Atmosphere Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#181411] mb-3">
                1. Select Desired Seating Atmosphere
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {SEATING_AREAS.map((area) => (
                  <button
                    key={area.name}
                    type="button"
                    onClick={() => setSeatingArea(area.name as any)}
                    className={`p-4 text-left border rounded-lg transition-all flex flex-col justify-between ${
                      seatingArea === area.name
                        ? 'border-[#C88242] bg-[#FAF3EA] ring-1 ring-[#C88242]'
                        : 'border-[#E8DFC9] bg-[#FAF7F2]/50 hover:bg-white'
                    }`}
                  >
                    <div>
                      <span className="font-serif font-bold text-sm text-[#181411] block mb-1">
                        {area.name}
                      </span>
                      <p className="text-[11px] text-[#5A4F46] leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                    <span className="text-[10px] text-[#C88242] font-semibold mt-3 block">
                      {area.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Date, Time & Guests */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#F1EBDD]">
              {/* Date */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#181411] mb-2">
                  Reservation Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="w-full px-3.5 py-2.5 text-xs text-[#181411] bg-white border border-[#DDD3BF] rounded-md focus:outline-none focus:ring-1 focus:ring-[#C88242]"
                  />
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#181411] mb-2">
                  Time Slot
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs text-[#181411] bg-white border border-[#DDD3BF] rounded-md focus:outline-none focus:ring-1 focus:ring-[#C88242]"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              {/* Party Size */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#181411] mb-2">
                  Party Size
                </label>
                <div className="flex items-center border border-[#DDD3BF] rounded-md bg-white h-[42px] px-2 justify-between">
                  <button
                    type="button"
                    onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                    className="px-3 py-1 font-bold text-sm text-[#5A4F46] hover:text-[#181411]"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold text-[#181411] tabular-nums">
                    {guestsCount} {guestsCount === 1 ? 'Guest' : 'Guests'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setGuestsCount(Math.min(12, guestsCount + 1))}
                    className="px-3 py-1 font-bold text-sm text-[#5A4F46] hover:text-[#181411]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Step 3: Guest Contact Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-[#F1EBDD]">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#181411] mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Arham Khan"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-3 py-2 text-xs text-[#181411] bg-white border border-[#DDD3BF] rounded-md focus:outline-none focus:ring-1 focus:ring-[#C88242]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#181411] mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs text-[#181411] bg-white border border-[#DDD3BF] rounded-md focus:outline-none focus:ring-1 focus:ring-[#C88242]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#181411] mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="arham@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs text-[#181411] bg-white border border-[#DDD3BF] rounded-md focus:outline-none focus:ring-1 focus:ring-[#C88242]"
                />
              </div>
            </div>

            {/* Optional Occasion & Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#F1EBDD]">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#181411] mb-1.5">
                  Occasion (Optional)
                </label>
                <select
                  value={specialOccasion}
                  onChange={(e) => setSpecialOccasion(e.target.value)}
                  className="w-full px-3 py-2 text-xs text-[#181411] bg-white border border-[#DDD3BF] rounded-md focus:outline-none focus:ring-1 focus:ring-[#C88242]"
                >
                  <option value="">Casual Visit / Coffee Date</option>
                  <option value="Birthday Celebration">Birthday Celebration</option>
                  <option value="Business Meeting / Creative Session">Business Meeting / Creative Session</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Book Club or Gathering">Book Club or Gathering</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#181411] mb-1.5">
                  Dietary / Seating Notes
                </label>
                <input
                  type="text"
                  placeholder="e.g. Need high chair, corner quiet booth, wheelchair access..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-3 py-2 text-xs text-[#181411] bg-white border border-[#DDD3BF] rounded-md focus:outline-none focus:ring-1 focus:ring-[#C88242]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-[#E8DFC9] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#6F6358] flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-[#C88242]" />
                <span>Tables held for 15 minutes past reservation time. Free cancellation anytime.</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#181411] hover:bg-[#C88242] rounded-md transition-colors shadow-sm whitespace-nowrap"
              >
                Confirm Table Reservation
              </button>
            </div>

          </form>
        )}

      </div>
    </section>
  );
};
