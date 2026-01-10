"use client";
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: (e: any) => void;
  onPrev: (e: any) => void;
}

export default function Lightbox({ isOpen, images, currentIndex, onClose, onNext, onPrev }: LightboxProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white/95 backdrop-blur-xl flex items-center justify-center p-4" onClick={onClose}>
      <button className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"><X size={20} /></button>
      <div className="relative w-full max-w-5xl h-[80vh]">
        <Image src={images[currentIndex]} alt="Gallery" fill className="object-contain" />
        {images.length > 1 && (
          <>
            <button onClick={onPrev} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 rounded-full shadow-md hover:bg-white"><ChevronLeft size={24} /></button>
            <button onClick={onNext} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 rounded-full shadow-md hover:bg-white"><ChevronRight size={24} /></button>
          </>
        )}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-xs tracking-widest text-gray-400 uppercase">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}