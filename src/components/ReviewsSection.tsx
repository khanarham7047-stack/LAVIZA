import React, { useState } from 'react';
import { Star, MessageSquarePlus, X, Check } from 'lucide-react';
import { Review } from '../types/cafe';
import { REVIEWS_DATA } from '../data/cafeData';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(REVIEWS_DATA);
  const [modalOpen, setModalOpen] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [newRecommended, setNewRecommended] = useState('Velvet Signature Cappuccino');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const created: Review = {
      id: `rev-${Date.now()}`,
      author: newAuthor,
      roleOrCity: newRole || 'Local Guest',
      rating: newRating,
      date: 'Just now',
      comment: newComment,
      recommendedItem: newRecommended,
      avatarInitials: newAuthor
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || 'VG',
    };

    setReviews([created, ...reviews]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setNewAuthor('');
      setNewRole('');
      setNewComment('');
    }, 1200);
  };

  return (
    <section id="reviews" className="py-20 bg-[#FAF7F2] border-b border-[#E8DFC9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-[#C88242] block mb-2">
              Guest Impressions
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#181411]">
              Stories from the Coffee Table
            </h2>
            <div className="flex items-center gap-2 mt-2 text-xs text-[#5A4F46]">
              <div className="flex text-[#C88242]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-bold text-[#181411]">4.9 out of 5</span>
              <span aria-hidden="true">·</span>
              <span>Based on 1,480+ Google & In-House Reviews</span>
            </div>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#181411] border border-[#181411] rounded-md hover:bg-[#181411] hover:text-white transition-colors inline-flex items-center gap-2 self-start sm:self-auto"
          >
            <MessageSquarePlus className="w-4 h-4" />
            Write a Review
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white border border-[#E8DFC9] rounded-lg p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-[#C88242] mb-3">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-[#40352C] font-light leading-relaxed italic mb-4">
                  "{r.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#F1EBDD] space-y-2">
                <div className="text-[11px] text-[#8C7E72]">
                  <span className="font-medium text-[#181411]">Fav:</span> {r.recommendedItem}
                </div>
                
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#EFE8DC] text-[#181411] flex items-center justify-center text-xs font-bold font-serif">
                    {r.avatarInitials}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#181411] leading-none">{r.author}</p>
                    <p className="text-[10px] text-[#8C7E72] mt-0.5">{r.roleOrCity} · {r.date}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Write Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] border border-[#DDD3BF] w-full max-w-md rounded-xl p-6 shadow-2xl relative animate-in fade-in">
            <div className="flex justify-between items-center pb-4 border-b border-[#E8DFC9]">
              <h3 className="font-serif text-lg font-bold text-[#181411]">Share Your Experience</h3>
              <button onClick={() => setModalOpen(false)} className="text-[#8C7E72] hover:text-[#181411]">
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="py-12 text-center text-[#2E7D32] space-y-2">
                <Check className="w-10 h-10 mx-auto" />
                <p className="font-serif text-lg font-bold text-[#181411]">Thank You for Your Review!</p>
                <p className="text-xs text-[#5A4F46]">Your feedback helps our roasters continually refine the craft.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="mt-4 space-y-4 text-xs">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#181411] mb-1">Your Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className={`p-1.5 rounded ${newRating >= star ? 'text-[#C88242]' : 'text-gray-300'}`}
                      >
                        <Star className="w-5 h-5 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#181411] mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD3BF] rounded-md focus:outline-none focus:ring-1 focus:ring-[#C88242]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#181411] mb-1">Role / Neighborhood</label>
                  <input
                    type="text"
                    placeholder="e.g. Local Coffee Lover, South Delhi"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD3BF] rounded-md focus:outline-none focus:ring-1 focus:ring-[#C88242]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#181411] mb-1">Your Favorite Order</label>
                  <input
                    type="text"
                    placeholder="e.g. Ethiopian V60, Almond Croissant"
                    value={newRecommended}
                    onChange={(e) => setNewRecommended(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD3BF] rounded-md focus:outline-none focus:ring-1 focus:ring-[#C88242]"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-[#181411] mb-1">Review Comments *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="How was the coffee aroma, hospitality, and atmosphere?"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-white border border-[#DDD3BF] rounded-md focus:outline-none focus:ring-1 focus:ring-[#C88242]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#181411] hover:bg-[#C88242] rounded-md transition-colors"
                >
                  Publish Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
