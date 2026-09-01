"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

import { cn } from "../../lib/utils";

type ImageItem = {
  id: number | string
  title: string
  desc: string
  url: string
  span: string
}

interface InteractiveImageBentoGalleryProps {
  imageItems: ImageItem[]
  title?: string
  description?: string
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    } as const,
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } as const,
  },
}

const ExpandIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
)

const ImageModal = ({
  item,
  onClose,
}: {
  item: ImageItem
  onClose: () => void
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4 py-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, y: 20, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="relative w-full max-w-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="overflow-hidden rounded-2xl md:rounded-[28px] bg-charcoal shadow-2xl">
          <img
            src={item.url}
            alt={item.title}
            className="max-h-[70vh] w-full object-contain bg-black"
          />
          <div className="px-6 py-5 md:px-8 md:py-6">
            <h3 className="display text-[22px] md:text-[26px] text-white">{item.title}</h3>
            <p className="mt-1 text-[13.5px] text-white/70 leading-relaxed">{item.desc}</p>
          </div>
        </div>
      </motion.div>
      <button
        onClick={onClose}
        className="absolute right-5 top-5 md:right-8 md:top-8 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white/80 transition-colors hover:text-white hover:bg-white/20"
        aria-label="Close image view"
      >
        <X size={20} />
      </button>
    </motion.div>
  )
}

const InteractiveImageBentoGallery: React.FC<InteractiveImageBentoGalleryProps> = ({
  imageItems,
  title,
  description,
}) => {
  const [selectedItem, setSelectedItem] = useState<ImageItem | null>(null)

  return (
    <section id="gallery-grid" className="relative w-full">
      {(title || description) && (
        <div className="text-center mb-12">
          {title && (
            <h2 className="display text-3xl text-charcoal sm:text-4xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-lg text-taupe">
              {description}
            </p>
          )}
        </div>
      )}

      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 auto-rows-[170px] sm:auto-rows-[210px] md:auto-rows-[250px] grid-flow-dense gap-3 md:gap-5"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
      >
        {imageItems.map((item) => (
          <motion.button
            key={item.id}
            variants={itemVariants}
            onClick={() => setSelectedItem(item)}
            aria-label={`View ${item.title}`}
            className={cn(
              "group relative overflow-hidden rounded-2xl md:rounded-[28px] text-left cursor-pointer",
              "shadow-[0_10px_30px_rgba(61,43,52,0.12)] transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(61,43,52,0.22)]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose focus-visible:ring-offset-2",
              item.span,
            )}
          >
            <img
              src={item.url}
              alt={item.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative z-10 flex h-full flex-col justify-end p-4 md:p-6">
              <h3 className="display text-[18px] md:text-[23px] text-white leading-tight">{item.title}</h3>
              <p className="mt-1.5 max-h-0 overflow-hidden text-[12.5px] text-white/80 leading-snug opacity-0 transition-all duration-500 group-hover:max-h-12 group-hover:opacity-100">
                {item.desc}
              </p>
            </div>

            <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md opacity-0 scale-90 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100">
              <ExpandIcon />
            </span>
          </motion.button>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedItem && (
          <ImageModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

export default InteractiveImageBentoGallery
