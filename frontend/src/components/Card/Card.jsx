import { Calendar, Clock, MapPin, Users } from "lucide-react";

const Card = ({ event }) => {
  return (
    <div
      className="bg-white/5 backdrop-blur-lg border border-white/10 
                    rounded-2xl p-6 shadow-xl hover:shadow-2xl 
                    hover:scale-[1.02] transition-all duration-300"
    >
      {/* Top Badges */}
      <div className="flex justify-between mb-4">
        <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 uppercase">
          {event.type || event.category}
        </span>

        <span className="text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-400 uppercase">
          {event.mode}
        </span>
      </div>

      {/* Poster */}
      {/* {event.poster && (
        <img
          // src={event.poster}
          alt={event.title}
          className="w-full h-40 object-cover rounded-xl mb-4"
        />
      )} */}

      {/* Title */}
      <h3 className="text-xl font-bold text-grey-900 mb-2">{event.title}</h3>

      {/* Description */}
      <p className="text-gray-800 font-semibold text-sm mb-4">
        {event.description}
      </p>

      {/* Info Section */}
      <div className="space-y-2 text-sm text-gray-800 mb-5">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          {new Date(event.date).toLocaleDateString()}
          <Clock size={16} className="ml-3" />
          {event.time}
        </div>

        <div className="flex items-center gap-2">
          <MapPin size={16} />
          {event.location || event.venue}
        </div>

        {event.capacity && (
          <div className="flex items-center gap-2">
            <Users size={16} />
            {event.capacity} Seats
          </div>
        )}
      </div>

      {/* CTA */}
      <button
        className="w-full py-2 rounded-xl bg-gradient-to-r 
                         from-indigo-600 to-purple-600 
                         text-white font-semibold 
                         hover:opacity-90 transition"
      >
        Register Now
      </button>
    </div>
  );
};

export default Card;
