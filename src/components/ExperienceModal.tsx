import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { waLink } from '../lib/whatsapp';

export type Experience = {
  title: string;
  img: string;
  desc: string;
  longDesc: string;
  highlights?: string[];
};

export default function ExperienceModal({
  item,
  onClose,
  onReserve,
}: {
  item: Experience | null;
  onClose: () => void;
  onReserve: (title: string) => void;
}) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-charcoal/70 backdrop-blur-sm px-4 py-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="relative w-full max-w-[560px] max-h-[90vh] overflow-y-auto card-clean bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 w-9 h-9 rounded-full bg-white/85 backdrop-blur flex items-center justify-center text-charcoal hover:text-rose transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            <div className="aspect-[16/10] overflow-hidden">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
            </div>

            <div className="p-7 md:p-9">
              <h3 className="display text-[28px] md:text-[32px] text-charcoal mb-4">{item.title}</h3>
              <p className="text-[15px] leading-relaxed text-taupe">{item.longDesc}</p>

              {item.highlights && item.highlights.length > 0 && (
                <ul className="mt-6 space-y-2.5">
                  {item.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] text-charcoal/85">
                      <span className="text-rose mt-0.5 flex-shrink-0">&#10022;</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => onReserve(item.title)}
                  className="btn-primary justify-center flex-1"
                >
                  Reserve This Experience
                </button>
                <a
                  href={waLink(`Hi Erica! I'd love to learn more about ${item.title}.`)}
                  target="_blank"
                  rel="noopener"
                  className="btn-secondary justify-center flex-1 border border-blush/50"
                >
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
